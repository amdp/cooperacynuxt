var express = require("express")
var app = express()
var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
var axios=require("axios")
const fileUpload = require("express-fileupload")
app.use(fileUpload())
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")
const Jimp = require('jimp')
const cc=['D','U','F','I','C','T','E']
const mysql = require("mysql2");
const mydb = mysql.createConnection({ connectionLimit: 200, host: 'localhost',
  user: process.env.MYSQLUSER, password: process.env.DBPASSWORD, database: process.env.DBDB, multipleStatements: true})

/////// GET ///////

app.get("/project", (req, res) =>{let query = 'SELECT * FROM `project`'; let param=[];
  if (req.query.limit){query +=' WHERE `id`=?'; param=[req.query.projectid+req.query.limit]}
  else if (req.query.stage){query +=' WHERE `stage`=?'; param.push(req.query.stage)}
  mydb.execute(query,param, function(err,project,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else res.send(project)}) })

app.get("/comment", (req, res) =>{mydb.execute(
  'SELECT comment.*, user.name, user.surname FROM comment'
  + ' LEFT JOIN user ON comment.user = user.id'
  + ' WHERE comment.project = ? ORDER BY id DESC',
  [req.query.projectid],
  function(err,comment,fields){
    if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else res.send(comment)}) })

app.get("/userproject", (req, res) =>{mydb.execute('SELECT * FROM `project` WHERE `id` IN (SELECT `project` FROM `userproject` WHERE `user`=?)',[req.query.userid], function(err,project,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else res.send(project)}) })

app.get("/uservote", (req, res) => {//gets votes of projects and comments that have been voted by current user
  let query = 'select * from `'+req.query.proptype+'vote` where `user` = ?'
  let param=[req.query.userid]; if (req.query.limit){query += ' AND `project`= ?';param=[req.query.userid,req.query.projectid]}
  mydb.execute(query,param,function(err,uservote,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else res.send(uservote)}) })

app.get("/user", async (req, res) => {
  req.headers.authorization = req.headers.authorization.slice(7)
  if (req.headers.authorization=='undefined'){return res.status(500).send('JWT is undefined') }
  else{ try {jwt.verify(req.headers.authorization,process.env.JWTSECRET)}
        catch(e){res.status(401).send(e+': Auth Token Wrong or Expired')
          return axios({method: 'post', url: process.env.HOST+':'+process.env.PORT+'/db/logout' })}
    let id=jwt.decode(req.headers.authorization)
    mydb.execute(
      'SELECT * FROM `user` AS `user` WHERE `user`.`id` =  ?', [id.id],
    function(err, [user], fields) {if (err) {console.log('e: '+JSON.stringify(err)); res.send (err) } else res.json({ user }) } ) } })

app.get("/category", (req, res) => { mydb.execute(
  'SELECT * FROM `category` WHERE `category`.`id`!= ?', [0],
  function(err, category, fields) {if (err) {console.log('e: '+JSON.stringify(err)); res.send (err) } else res.json(category) } ) })

app.get("/tag", (req, res) => { mydb.execute(
  'SELECT * FROM `tag` where `project`=?',[req.query.projectid],
  function(err, tag, fields) {if (err) {console.log('e: '+JSON.stringify(err)); res.send (err) } else res.json(tag) } )})

app.get("/place", (req, res) => { mydb.execute(
  'SELECT `id`, `country`, `name` FROM `place`',[],
function(err, place, fields) {if (err) {console.log('e: '+JSON.stringify(err)); res.send (err) } else res.json(place) } ) })

app.get("/country", (req, res) => { mydb.execute(
  'SELECT `id`, `name` FROM `country`',[],
function(err, country, fields) {if (err) {console.log('e: '+JSON.stringify(err)); res.send (err) } else res.json(country) } ) })

app.get("/news", (req, res) => { mydb.execute(
  'SELECT * FROM `news` ORDER BY `news`.`date` DESC',[],
function(err, news, fields) {if (err) {console.log('e: '+JSON.stringify(err)); res.send (err) } else res.json(news) } ) })

/////// UPDATE ///////

app.put("/user", (req, res) => { if(!req.body.name || !req.body.password) { res.status(400); res.json({ error: "Bad data" }) } else {
  bcrypt.hash(req.body.password, 10, (err, hash) => { req.body.password = hash;
    mydb.execute('UPDATE `user` SET `name`=?,`surname`=?,`email`=?,`password`=? WHERE `id`=?',
      [req.body.name, req.body.surname, req.body.email, req.body.password, req.body.id ],
      function(err, user, fields) {if (err) {console.log('e: '+JSON.stringify(err)); res.send (err) } else res.json('updated: ' + user)} ) }) }
})

/////// POST ///////

app.post("/login", async (req, res) => { mydb.execute('SELECT * FROM `user` WHERE `user`.`email`= ? LIMIT 1',[req.body.email],
  function(err,[user],fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{if(user){
    if(bcrypt.compareSync(req.body.password,user.password)) {
      let accessToken = jwt.sign({id: user.id}, process.env.JWTSECRET, { expiresIn: '2h' })
      let today=new Date(Date.now()).toJSON().slice(0,10)
      if (user.paypalagreementid == 'bank') {
        if (!user.paymentdeadline) {return res.status(500).send('The user hasn\'t been activated yet.')}
        if (user.paymentdeadline.toJSON().slice(0,10) >= today){res.json({token:{accessToken}})}
        else {res.status(401).send('Bank transfer membership has expired')}
      } else {
        let agreementid=user.paypalagreementid
        let today45ago=new Date(Date.now() + -45*24*3600*1000).toJSON().slice(0,10)
        axios({ method: 'post', headers: {'content-type':'application/json','Access-Control-Allow-Credentials':true},
          auth:{'username':process.env.PAYPALID,'password':process.env.PAYPALPASSWORD}, data: 'grant_type=client_credentials',
          url: 'https://api.paypal.com/v1/oauth2/token',}).then((response)=>{let paypaltoken=response.data.access_token
          axios({method: 'get', url: 'https://api.paypal.com/v1/payments/billing-agreements/'+agreementid+
          '/transactions?start_date='+today45ago+'&end_date='+today,
          headers: { 'Authorization':'Bearer '+paypaltoken, 'Content-Type':'application/json' } })
          .then((transaction)=>{let list=transaction.data.agreement_transaction_list;
            if(list[list.length-1].status=='Completed'){res.json({token:{accessToken}})}
            else if(list[list.length-1].status=='Updated' && list[list.length-2].status=='Completed'){res.json({token:{accessToken}})}
            else{res.send('Paypal membership has expired or has been suspended')} })
            .catch(err => {console.log('e '+JSON.stringify(err.response.data));})
          .catch(err => {console.log('e '+JSON.stringify(err.response.data));}) })
      }
    }else{res.status(400).json({error: 'User does not exist'})} } } } )  } )

app.post("/logout", (req, res) => { res.json({ status: 'OK' }) })

app.post("/checkpassword", async (req, res) => {
  mydb.execute('SELECT * FROM `user` AS `user` WHERE `user`.`id` =  ? and `user`.`email` = ? LIMIT 1', [req.body.id, req.body.email],
    function(err, [user], fields) {
      if(err) {console.log('e: '+JSON.stringify(err)); res.send (err) }
      if(user){
        if(bcrypt.compareSync(req.body.password,user.password))
          res.send(true)
        else res.send(false)
      }else res.send(false)   })  })

app.post("/recoverpassword", async (req, res) => {
  if (req.body.email) {mydb.execute(
    'SELECT * FROM `user` WHERE `user`.`email`= ? LIMIT 1',[req.body.email],
    function(err,[user],fields){if(err){
      console.log('e: '+JSON.stringify(err));res.send(err)}
      else{if(user){
        let token = jwt.sign(
          {id: user.id, newpassword: req.body.password}, process.env.JWTSECRET, { expiresIn: '2h' })
        let transporter=nodemailer.createTransport({
          host:'smtp.gmail.com',port:465,secure:true,
          auth:{user: process.env.MAILUSER,
            pass: process.env.MAILPASSWORD}})
          let mailOptions = {
            from: '"Cooperacy" <cooperacy@cooperacy.org>',
            to:req.body.email, subject:'Change your Cooperacy password',
            text:'Click here to set the new password:\n'
              +process.env.HOST+':'+process.env.PORT+
              '/recover?jws='+token
              +'\nIf you didn\'t, ignore this email'
          }
      transporter.sendMail(mailOptions, (error, info) => { if (error) { return console.error(error) }
          console.log('Message %s sent: %s', info.messageId, info.response); res.render('index') }) }
      else {res.send('No user with this email')}} })
  }else if (req.body.token){
    try {jwt.verify(req.body.token,process.env.JWTSECRET)}
    catch(e){return res.status(401).send(
      e + ': Auth Token Wrong or Expired')}
    var {id,newpassword}=jwt.decode(req.body.token)
    bcrypt.hash(newpassword, 10, (err, hash) => {
      newpassword = hash
      mydb.execute('UPDATE `user` SET `password`=? WHERE `id`=?',
          [newpassword, id],
          function(err, user, fields) {if (err) {console.log('e: '+JSON.stringify(err)); res.send (err) } else res.json('updated')} ) }) }
})

app.post("/place", (req, res) => {mydb.execute('SELECT * FROM `place` WHERE `place`.`country`=? AND `place`.`name`=?  LIMIT 1',
[req.body.country, req.body.name], function(err, [place], fields) {if (err) {console.log('e: '+JSON.stringify(err)); res.send (err) }else{
if(!place){mydb.execute('INSERT INTO `place` (`country`,`name`) VALUES (?,?)',[req.body.country,req.body.name],
  function(err,place,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}
  else{res.json({id: place.insertId})} } ) }else{res.json('exists')} } } ) })

app.post("/project", (req, res) => {
  if (req.body.id != 'new'){mydb.execute(
    'UPDATE `project` SET `name`=?,`country`=?,`place`=?,`brief`=?,`content`=?,`video`=?,`anonymous`=?,`parent`=?,`stage`=?,`budget`=?,`hudget`=? WHERE `project`.`id`=?',[req.body.name,req.body.country,req.body.place,req.body.brief,req.body.content,req.body.video,req.body.anonymous,req.body.parent,req.body.stage,req.body.budget,req.body.hudget,req.body.id],
    function(err,project,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)} else res.json(req.body.id)})
  }else{mydb.execute('SELECT * FROM `project` WHERE `project`.`name`= ? LIMIT 1',[req.body.name],
    function(err, [project], fields) {if (err) {console.log('efind: '+JSON.stringify(err)); res.send (err) }else{if(!project){mydb.execute(
      'INSERT INTO `project` (`name`,`country`,`place`,`brief`,`content`,`video`,`anonymous`,`parent`,`stage`,`budget`,`hudget`)'
      +' VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [req.body.name,req.body.country,req.body.place,req.body.brief,req.body.content,req.body.video,req.body.anonymous,req.body.parent,req.body.stage,req.body.budget,req.body.hudget],
      function(err,project,fields){if(err){console.log('einsert: '+JSON.stringify(err));res.send(err)}
      else{res.json({id: project.insertId})} } ) }else{res.json('exists')} } } )} })

app.post("/comment", (req, res) => {
  if (req.body.id != 'new'){mydb.execute(
    'UPDATE `comment` SET `parent`=?, `project`=?, `user`=?, `content`=? WHERE `comment`.`id`=?',
    [req.body.parent,req.body.project,req.body.user,req.body.content,req.body.id],
    function(err,comment,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{mydb.execute(
      'SELECT * FROM `comment` WHERE `id` = ?', [req.body.id],
      function(err,[comment],fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{res.json(comment)} }) }})
  }else{mydb.execute('INSERT INTO `comment` (`parent`,`project`,`user`,`content`) VALUES (?,?,?,?)',
    [req.body.parent,req.body.project,req.body.user,req.body.content],
    function(err,comment,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{mydb.execute(
      'SELECT * FROM `comment` WHERE `id` = ?', [comment.insertId],
      function(err,[comment],fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{res.json(comment)}} )}})}})

app.post("/user",  (req, res) => {mydb.execute('SELECT * FROM `user` WHERE `user`.`email`= ? LIMIT 1',[req.body.email],
  function(err,[user],fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{
    if(!user){
      bcrypt.hash(req.body.password,10,(err,hash) => {mydb.execute(
        'INSERT INTO `user` (`name`,`surname`,`email`,`password`,`paypalagreementid`) VALUES (?,?,?,?,?)',
        [req.body.name,req.body.surname,req.body.email,hash,req.body.paypalagreementid],
        function(err,user,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{res.json({id: user.insertId})}})})
    }else{ res.send('exists') } } } ) })

app.post("/tag", (req, res) => { if (req.body.tag == 'add'){
    mydb.execute('INSERT INTO `tag` (`project`,`name`) VALUES (?,?)',[req.body.project,req.body.name],
    function(err,tag,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{res.send(tag)} })
  }else {mydb.execute('DELETE FROM `tag` where `project` = ? and `name` = ?',[req.body.project,req.body.name],
  function(err,tag,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{res.send(tag)} }) }})

app.post("/image", function(req, res) {
  if (req.body.empty){standardimage = './assets/image/'+req.body.proptype+'/1.png'
    Jimp.read(standardimage).then(standardimage => { return standardimage
      .resize(256, 256) .quality(60) .write('./assets/image/'+ req.body.proptype + '/' + req.body.id + '.png') })
    .then(()=>{res.json({ status: 'OK' }) }).catch(err => {console.log('e: '+JSON.stringify(err)); res.send (err) })
  } else {try {uploadPath = './assets/image/'+ req.body.proptype + '/' + req.body.id + '.png'} catch (err) {console.error(err)}
  req.files.file.mv(uploadPath, function(err) { if (err) { return res.status(500).send(err) } })
  Jimp.read(uploadPath).then(uploadPath => { return uploadPath
        .resize(256, 256) .quality(60) .write(uploadPath)    })
  .then(res.json({ status: 'OK' })).catch(err => {console.log('e: '+JSON.stringify(err)); res.send (err) })} })

app.post('/newuseremail', function (req, res) {
  let transporter=nodemailer.createTransport({host:'smtp.gmail.com',port:465,secure:true,
  auth:{user: process.env.MAILUSER, pass: process.env.MAILPASSWORD}})
  let mailOptions = {
    from: '"Cooperacy" <cooperacy@cooperacy.org>',
    to:req.body.to, subject:req.body.subject,
    html: {path: req.body.body}
  }
  transporter.sendMail(mailOptions, (error, info) => { if (error) { return console.error(error) }
      console.log('Message %s sent: %s', info.messageId, info.response); res.render('index') })})

app.post('/contactemail', function(req, res) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: process.env.MAILUSER, pass: process.env.MAILPASSWORD }
  }); /* to add html in mailOptions use " html: '<b>test</b>' " */
  const mailOptions = {
    from: req.body.email,
    to: '"Cooperacy" <cooperacy@cooperacy.org>',
    // conveniently replies to the submitter of the form's email
    replyTo: `"${req.body.name}" <${req.body.email}>`,
    subject: req.body.subject,
    text: `Name: ${req.body.name}\n` + `Email: ${req.body.email}\n\n` + `Message: \n\n${req.body.body}`
  };
  console.log(mailOptions);
  transporter
    .sendMail(mailOptions)
    .then(info => {
      console.log('Message %s sent: %s', info.messageId, info.response);
      res.status(200).json({
        message: `Thank you ${req.body.name} for your message!<br/>` +
          `We'll get in touch as soon as possible.<br />`
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: `An error occured ${req.body.name}!<br/>` +
                  `Please try again later.`
      });
    });
});

app.post("/vote", (req, res) => {
  if (req.body.proptype=='project'){mydb.execute(//the presence of an existing project vote is checked
    'SELECT * from `projectvote` where `user`=? AND `condition`=? AND `project`=?', [req.body.user,req.body.condition,req.body.id],
    function(err,[vote],fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{//if a vote exists, it is copied into the removed votetable
      if(vote){mydb.execute('INSERT INTO `removedpvote` (`user`,`project`,`condition`) VALUES (?,?,?)',
        [req.body.user,req.body.id,req.body.condition],
        function(err,removedvote,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{
          if (cc.indexOf(req.body.condition) > -1 ) //then the relative project condition value is updated
            mydb.execute('UPDATE `project` SET `'+req.body.condition+'`=`'+req.body.condition+'`-1 where `project`.`id`=?', [req.body.id],
            function(err,updatedproject,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{//when all is safe, the old vote is removed:
              mydb.execute('DELETE FROM `projectvote` where `id` = ?',[vote.id],
              function(err,deletedvote,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{
              //here, we revoke every platform effect the vote may have:
                if (req.body.condition == 'F') mydb.execute('DELETE FROM `userproject` where `user` = ? and `project` = ?',
                  [req.body.user, req.body.id],
                  function(err,deletedvote,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{
                    mydb.execute('UPDATE `project` SET `participant`=`participant`-1 where `project`.`id`=?',[req.body.id],
                    function(err,deletedvote,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{res.send('OK')}}) }}) }}) }}) }}) }
      else{mydb.execute('INSERT INTO `projectvote` (`user`,`project`,`condition`) VALUES (?,?,?)',//if there is no vote
        [req.body.user,req.body.id,req.body.condition],//a new vote is added into the database
        function(err,voteinserted,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{
          if (cc.indexOf(req.body.condition) > -1 ) //then the relative project condition value is updated
            mydb.execute('UPDATE `project` SET `'+req.body.condition+'`=`'+req.body.condition+'`+1 where `project`.`id`=?', [req.body.id],
            function(err,updatedproject,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{
            //here, we add every platform effect the vote may have:
            if (req.body.condition == 'F') mydb.execute('INSERT INTO `userproject` (`user`,`project`) VALUES (?,?)',
              [req.body.user,req.body.id],
              function(err,participatedproject,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{
                mydb.execute('UPDATE `project` SET `participant`=`participant`+1 where `project`.`id`=?',[req.body.id],
                function(err,updateduserproject,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{
                  res.send(updateduserproject)}}) }}) }}) }}) }}}) }
  else{mydb.execute(//the presence of an existing comment vote is checked
    'SELECT * from `commentvote` where `user`=? AND `condition`=? AND `comment`=?', [req.body.user,req.body.condition,req.body.id],
    function(err,[vote],fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{//if a vote exists, it is copied into the removed votetable
      if(vote){mydb.execute('INSERT INTO `removedcvote` (`user`,`comment`,`condition`,`project`) VALUES (?,?,?,?)',
        [req.body.user,req.body.id,req.body.condition,req.body.projectid],
        function(err,removedvote,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{
          if (cc.indexOf(req.body.condition) > -1 )//then the relative comment or project is updated
          mydb.execute('UPDATE `comment` SET `'+req.body.condition+'`=`'+req.body.condition+'`-1 where `comment`.`id`=?', [req.body.id],
          function(err,updatedcomment,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{//when all is safe, the old vote is removed:
            mydb.execute('DELETE FROM `commentvote` where `id` = ?',[vote.id],
            function(err,deletedvote,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{
            if (cc.indexOf(req.body.condition) > -1 && req.body.user != req.body.author){ //finally, we update the user colorbar
              mydb.execute('UPDATE `user` SET `'+req.body.condition+'`=`'+req.body.condition+'`-1 where `user`.`id`=?',[req.body.author],
              function(err,updateuser,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{res.send('OK')}})
            }else{res.send('OK')}}}) }}) }}) }
      else{mydb.execute('INSERT INTO `commentvote` (`user`,`comment`,`condition`,`project`) VALUES (?,?,?,?)',//if there is no vote
        [req.body.user,req.body.id,req.body.condition,req.body.projectid], //a new vote is added into the database
        function(err,voteinserted,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{
          if (cc.indexOf(req.body.condition) > -1 ) //then the relative comment condition value is updated
          mydb.execute('UPDATE `comment` SET `'+req.body.condition+'`=`'+req.body.condition+'`+1 where `comment`.`id`=?', [req.body.id],
          function(err,updatedcomment,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{
          if (cc.indexOf(req.body.condition) > -1 && req.body.user != req.body.author){ //finally, we update the user colorbar
            mydb.execute('UPDATE `user` SET `'+req.body.condition+'`=`'+req.body.condition+'`+1 where `user`.`id`=?',[req.body.author],
            function(err,updateuser,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{res.send(updatedcomment)}})
          }else{res.send(updatedcomment)}}})  }}) } }}) } })

//admin

app.post("/resetcpvoting", (req,res)=>{mydb.execute('SELECT `id` from `project`', [], function(err,id,fields){
    {if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{pcycleid(id)}}})
  function pcycleid(id){for(let j=0;j<id.length;j++){var values={}; cc.forEach(function(c){
    mydb.execute('select count(`condition`) as count from `projectvote` where `project`=? AND `condition`=?',[id[j].id,c],
    function(err,[result],fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{values[c]=result.count;
      if(values.E != undefined){resetpvote(id[j].id,values); values={}}}})})}}
  function resetpvote(id,values){mydb.execute('update `project` set `D`=?,`U`=?,`F`=?,`I`=?,`C`=?,`T`=?,`E`=? where `project`.`id` = ?',
      [values.D,values.U,values.F,values.I,values.C,values.T,values.E,id],
      function(err,result,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{console.log(' '+JSON.stringify(result))}})}

  mydb.execute('SELECT `id` from `comment`', [], function(err,id,fields){
    {if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{ccycleid(id)}}})
  function ccycleid(id){for(let j=0;j<id.length;j++){var values={}; cc.forEach(function(c){
    mydb.execute('select count(`condition`) as count from `commentvote` where `comment`=? AND `condition`=?',[id[j].id,c],
    function(err,[result],fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{values[c]=result.count;
      if(values.E != undefined){resetcvote(id[j].id,values); values={}}}})})}}
  function resetcvote(id,values){mydb.execute('update `comment` set `D`=?,`U`=?,`F`=?,`I`=?,`C`=?,`T`=?,`E`=? where `comment`.`id` = ?',
      [values.D,values.U,values.F,values.I,values.C,values.T,values.E,id],
      function(err,result,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{console.log(' '+JSON.stringify(result))}})}
})

app.post("/resetuvoting", (req, res) => {//user calculation algorithm /it should become adaptive, considering how much the user votes
  //first we collect all the users id:
  mydb.execute('SELECT `id` from `user`',[],function(err,id,fields){{if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{zero(id)}}})
  //we reset all their conditions values to 0:
  function zero(id){for(let j=0;j<id.length;j++){mydb.execute(
    'update `user` set `D`=?,`U`=?,`F`=?,`I`=?,`C`=?,`T`=?,`E`=? where `user`.`id` = ?',
    [0,0,0,0,0,0,0,id[j].id],function(err,result,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{findcomment(id[j].id)}})}}
  //then we find all the comments made for each user id:
  function findcomment(id){mydb.execute('select `id` from `comment` where `user`=?',[id],
    function(err,result,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{ucycleid(result,id)}})}
  //then from all the comments retrieved, we must get the commentvotes:
  function ucycleid(id,userid){for(let j=0;j<id.length;j++){var values={}; cc.forEach(function(c){
    mydb.execute('select count(`condition`) as count from `commentvote` where `comment`=? AND `condition`=? AND `user`!=?',
    [id[j].id,c,userid], function(err,[result],fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{values[c]=result.count;
      if(values.E != undefined){resetuvote(userid,values); values={}}}})})}}
  //finally we repeatedly add the counted votes to the users conditions:
  function resetuvote(userid,values){mydb.execute(
    'update `user` set `D`=`D`+?,`U`=`U`+?,`F`=`F`+?,`I`=`I`+?,`C`=`C`+?,`T`=`T`+?,`E`=`E`+? where `user`.`id` = ?',
    [values.D,values.U,values.F,values.I,values.C,values.T,values.E,userid],
    function(err,result,fields){if(err){console.log('e: '+JSON.stringify(err));res.send(err)}else{console.log(''+JSON.stringify(result));response.send('OK')}})}
})

module.exports = { path: '/db', handler: app }



/*paypal old queries

CREATE PLAN
axios({method: 'post', url: 'https://api.paypal.com/v1/billing/plans', headers: { 'Authorization':'Bearer '+paypaltoken, 'Content-Type':'application/json'}, data: { 'product_id': 'PROD-8SD41723WB4858822','name': 'Cooperation Membership Plan','billing_cycles': [{'frequency': {'interval_unit': 'MONTH','interval_count': 1},'tenure_type': 'REGULAR','sequence': 1,'total_cycles': 998,'pricing_scheme': {'fixed_price': {'value': '1','currency_code': 'EUR'}}}],'payment_preferences': {'payment_failure_threshold':1}}})

LIST PLANS
axios({method: 'get', url: 'https://api.paypal.com/v1/billing/plans', headers: { 'Authorization':'Bearer '+paypaltoken, 'Content-Type':'application/json'}}).then((response)=>{console.log(JSON.stringify(response.data))}).catch((err)=>{console.log(err.response.data)})

INVESTIGATE PLAN
axios({method: 'get', url: 'https://api.paypal.com/v1/billing/plans/P-9C681042E7918904VLURYYGQ', headers: { 'Authorization':'Bearer '+paypaltoken, 'Content-Type':'application/json'}}).then((response)=>{console.log(JSON.stringify(response.data))}).catch((err)=>{console.log(err.response.data)})

STANDARD API CHECK NOT WORKING WITH OLD AGREEMENTS:
paypal.billingAgreement.get(agreementid,function(err,agreement)
{if(agreement){if(agreement.state=='Active'){res.json({token:{accessToken} })}}
if(agreement){if(agreement.state=='Suspended' || agreement.state=='Cancelled'){res.send('expired')} }
if(err){console.log(err.response.data);console.log('Proceeding with other membership test: '+JSON.stringify(err.response.message))})

ADD DESCRIPTION:
axios({method: 'patch', url: 'https://api.paypal.com/v1/billing/plans/P-7BP22733VS088190RLURYZIQ',
            headers: { 'Authorization':'Bearer '+paypaltoken, 'Content-Type':'application/json' }, data:[{
              "op": "add", "path": "/description", "value": "Cooperacy Free Membership for Under 18"
            }] })

FOR ALL REQUESTS:
.then((response)=>{console.log(JSON.stringify(response.data))}).catch((err)=>{console.log(err.response.data)})

INVESTIGATE SUBSCRIPTION:
axios({method: 'get', url: 'https://api.paypal.com/v1/billing/subscriptions/I-V5G6T3VYVDWH', headers: { 'Authorization':'Bearer '+paypaltoken, 'Content-Type':'application/json'}}).then((response)=>{console.log(JSON.stringify(response.data))}).catch((err)=>{console.log(err.response.data)}) => {"status":"ACTIVE","status_update_time":"2019-07-14T12:49:54Z","id":"I-V5G6T3VYVDWH","plan_id":"P-9C681042E7918904VLURYYGQ","start_time":"2019-07-13T22:00:00Z","quantity":"1","shipping_amount":{"currency_code":"EUR","value":"0.0"},"subscriber":{"name":{"given_name":"Alessandro","surname":"Merletti De Palo"},"email_address":"alessandromerlettidepalo@gmail.com","shipping_address":{"name":{"full_name":"Alessandro Merletti De Palo"},"address":{"address_line_1":"Via Moscova 39","address_line_2":"","admin_area_2":"Milano","admin_area_1":"","postal_code":"20121","country_code":"IT"}}},"billing_info":{"outstanding_balance":{"currency_code":"EUR","value":"0.0"},"cycle_executions":[{"tenure_type":"REGULAR","sequence":1,"cycles_completed":1,"cycles_remaining":997,"current_pricing_scheme_version":1}],"last_payment":{"amount":{"currency_code":"EUR","value":"1.0"},"time":"2019-07-14T12:49:53Z"},"next_billing_time":"2019-08-14T10:00:00Z","final_payment_time":"2102-08-14T10:00:00Z","failed_payments_count":0},"auto_renewal":false,"create_time":"2019-07-14T12:48:57Z","update_time":"2019-07-14T12:49:54Z","links":[{"href":"https://api.paypal.com/v1/billing/subscriptions/I-V5G6T3VYVDWH/cancel","rel":"cancel","method":"POST"},{"href":"https://api.paypal.com/v1/billing/subscriptions/I-V5G6T3VYVDWH","rel":"edit","method":"PATCH"},{"href":"https://api.paypal.com/v1/billing/subscriptions/I-V5G6T3VYVDWH","rel":"self","method":"GET"},{"href":"https://api.paypal.com/v1/billing/subscriptions/I-V5G6T3VYVDWH/suspend","rel":"suspend","method":"POST"},{"href":"https://api.paypal.com/v1/billing/subscriptions/I-V5G6T3VYVDWH/capture","rel":"capture","method":"POST"}]} THIS CAN BE USED TO GET THE REAL NAME OF THE PEOPLE BUT NOT IF A GIFT, IN CASE OF GIFT WE HAVE A REFERRER THAT IS LEGALLY RESPONSIBLE
*/
