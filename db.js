var express = require("express"); var app = express()
var bodyParser = require("body-parser"); app.use(bodyParser.json()); app.use(bodyParser.urlencoded({extended: false}))
const fileUpload = require("express-fileupload"); app.use(fileUpload())
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const Jimp = require('jimp'); process.env.SECRET_KEY = 'secret'
const cc=['D','U','F','I','C','T','E']
const mysql = require("mysql2"); const mydb = mysql.createConnection({
  connectionLimit: 200, host:'localhost', user: 'cooperacy', password: 'c00p3r4t10n', database: 'coo', multipleStatements: true})

/////// GET ///////

app.get("/project", (req, res) =>{let query = 'SELECT * FROM `project`'; let param=[];
  if (req.query.limit){query +=' WHERE `id`=?'; param=[req.query.projectid+req.query.limit]}
  else if (req.query.stage){query +=' WHERE `stage`=?'; param.push(req.query.stage)}
  mydb.execute(query,param, function(err,project,fields){if(err){console.error(err);res.send(err)}else res.send(project)}) })

app.get("/comment", (req, res) =>{mydb.execute('SELECT * FROM `comment` WHERE `project` = ? ORDER BY `id` DESC',[req.query.projectid],
   function(err,comment,fields){if(err){console.error(err);res.send(err)}else res.send(comment)}) })

app.get("/userproject", (req, res) =>{mydb.execute('SELECT * FROM `project` WHERE `id` IN (SELECT `project` FROM `userproject` WHERE `user`=?)',[req.query.userid], function(err,project,fields){if(err){console.error(err);res.send(err)}else res.send(project)}) })

app.get("/uservote", (req, res) => {//gets votes of projects and comments that have been voted by current user
  let query = 'select * from `'+req.query.proptype+'vote` where `user` = ?'
  let param=[req.query.userid]; if (req.query.limit){query += ' AND `project`= ?';param=[req.query.userid,req.query.projectid]}
  mydb.execute(query,param,function(err,uservote,fields){if(err){console.error(err);res.send(err)}else res.send(uservote)}) })

app.get("/user", async (req, res) => {req.headers.authorization = req.headers.authorization.slice(7)
  check=jwt.verify(req.headers.authorization,process.env.SECRET_KEY); let id=jwt.decode(req.headers.authorization)
  mydb.execute('SELECT * FROM `user` AS `user` WHERE `user`.`id` =  ?', [id.id],
    function(err, [user], fields) {if (err) {console.error(err); res.send (err) } else res.json({ user }) } ) })

app.get("/category", (req, res) => { mydb.execute( 'SELECT * FROM `category` WHERE `category`.`id`!= ?', [0],
  function(err, category, fields) {if (err) {console.error(err); res.send (err) } else res.json(category) } ) })

app.get("/tag", (req, res) => { mydb.execute( 'SELECT * FROM `tag`',[],
  function(err, tag, fields) {if (err) {console.error(err); res.send (err) } else res.json(tag) } ) })

app.get("/place", (req, res) => { mydb.execute( 'SELECT `id`, `country`, `name` FROM `place`',[],
function(err, place, fields) {if (err) {console.error(err); res.send (err) } else res.json(place) } ) })

app.get("/country", (req, res) => { mydb.execute( 'SELECT `id`, `name` FROM `country`',[],
function(err, country, fields) {if (err) {console.error(err); res.send (err) } else res.json(country) } ) })


/////// UPDATE ///////


app.put("/user", (req, res) => { if(!req.body.name || !req.body.password) { res.status(400); res.json({ error: "Bad data" }) } else { 
  bcrypt.hash(req.body.password, 10, (err, hash) => { req.body.password = hash;
    mydb.execute('UPDATE `user` SET `name`=?,`surname`=?,`email`=?,`password`=? WHERE `id`=?',
      [req.body.name, req.body.surname, req.body.email, req.body.password, req.body.id ],
      function(err, user, fields) {if (err) {console.error(err); res.send (err) } else res.json('updated: ' + user)} ) }) } 
})

/////// POST ///////

app.post("/logout", (req, res) => { res.json({ status: 'OK' }) })

app.post("/place", (req, res) => {mydb.execute('SELECT * FROM `place` WHERE `place`.`country`=? AND `place`.`name`=?  LIMIT 1',
[req.body.country, req.body.name], function(err, [place], fields) {if (err) {console.error(err); res.send (err) }else{
if(!place){mydb.execute('INSERT INTO `place` (`country`,`name`) VALUES (?,?)',[req.body.country,req.body.name],
  function(err,place,fields){if(err){console.error(err);res.send(err)}
  else{res.json({id: place.insertId})} } ) }else{res.json('exists')} } } ) })

app.post("/project", (req, res) => {
  if (req.body.id != 'new'){mydb.execute(
    'UPDATE `project` SET `name`=?,`country`=?,`place`=?,`brief`=?,`content`=?,`video`=?,`anonymous`=?,`parent`=?,`stage`=?,`budget`=?,`hudget`=? WHERE `project`.`id`=?',[req.body.name,req.body.country,req.body.place,req.body.brief,req.body.content,req.body.video,req.body.anonymous,req.body.parent,req.body.stage,req.body.budget,req.body.hudget,req.body.id],
    function(err,project,fields){if(err){console.error(err);res.send(err)} else res.json(req.body.id)})
  }else{mydb.execute('SELECT * FROM `project` WHERE `project`.`name`= ? LIMIT 1',[req.body.name],
    function(err, [project], fields) {if (err) {console.error(err); res.send (err) }else{if(!project){mydb.execute(
      'INSERT INTO `project` (`name`,`country`,`place`,`brief`,`content`,`video`,`anonymous`,`parent`,`stage`,`budget`,`hudget`)'
      +' VALUES (?,?,?,?,?,?,?,?,?,?)',
      [req.body.name,req.body.country,req.body.place,req.body.brief,req.body.content,req.body.video,req.body.anonymous,req.body.parent,req.body.stage,req.body.budget,req.body.hudget],
      function(err,project,fields){if(err){console.error(err);res.send(err)}
      else{res.json({id: project.insertId})} } ) }else{res.json('exists')} } } )} })

app.post("/comment", (req, res) => {  
  if (req.body.id != 'new'){mydb.execute(
    'UPDATE `comment` SET `parent`=?, `project`=?, `user`=?, `content`=? WHERE `comment`.`id`=?',
    [req.body.parent,req.body.project,req.body.user,req.body.content,req.body.id],
    function(err,comment,fields){if(err){console.error(err);res.send(err)}else{mydb.execute(
      'SELECT * FROM `comment` WHERE `id` = ?', [req.body.id],
      function(err,[comment],fields){if(err){console.error(err);res.send(err)}else{res.json(comment)} }) }})
  }else{mydb.execute('INSERT INTO `comment` (`parent`,`project`,`user`,`content`) VALUES (?,?,?,?)',
    [req.body.parent,req.body.project,req.body.user,req.body.content],
    function(err,comment,fields){if(err){console.error(err);res.send(err)}else{mydb.execute(
      'SELECT * FROM `comment` WHERE `id` = ?', [comment.insertId],
      function(err,[comment],fields){if(err){console.error(err);res.send(err)}else{res.json(comment)}} )}})}})

app.post("/login", (req, res) => { mydb.execute('SELECT * FROM `user` WHERE `user`.`email`= ? LIMIT 1',[req.body.email],
  function(err,[user],fields){if(err){console.error(err);res.send(err)}else{if(user){
    if(bcrypt.compareSync(req.body.password,user.password)) { 
      let accessToken = jwt.sign({id: user.id}, process.env.SECRET_KEY, { expiresIn: "20d" }); res.json({ token: { accessToken } }) }
    }else{res.status(400).json({error: 'User does not exist'})} } } )  } )

app.post("/user",  (req, res) => {mydb.execute('SELECT * FROM `user` WHERE `user`.`email`= ? LIMIT 1',[req.body.email],
  function(err,[user],fields){if(err){console.error(err);res.send(err)}else{if(!user){
    bcrypt.hash(req.body.password,10,(err,hash) => {mydb.execute(
      'INSERT INTO `user` (`name`,`surname`,`email`,`password`) VALUES (?,?,?,?)',
      [req.body.name,req.body.surname,req.body.email,hash],
      function(err,user,fields){if(err){console.error(err);res.send(err)}else{res.json({id: user.insertId})}})})
    }else{ res.send('exists') } } } ) })

app.post("/tag", (req, res) => { mydb.execute('INSERT INTO `tag` (`project`,`name`) VALUES (?,?)',[req.body.project,req.body.name],
  function(err,tag,fields){if(err){console.error(err);res.send(err)}else{res.send(tag)} }) })

app.post("/image", function(req, res) {if (req.body.empty){standardimage = './assets/image/'+req.body.proptype+'/1.png'
    Jimp.read(standardimage).then(standardimage => { return standardimage
      .resize(256, 256) .quality(60) .write('./assets/image/'+ req.body.proptype + '/' + req.body.id + '.png') })
    .then(()=>{res.json({ status: 'OK' }) }).catch(err => {console.error(err); res.send (err) })
  } else if (Object.keys(req.files).length == 0) { res.status(400).send('No files were uploaded.') }
  else {try {uploadPath = './assets/image/'+ req.body.proptype + '/' + req.body.id + '.png'} catch (err) {console.error(err)}
  req.files.file.mv(uploadPath, function(err) { if (err) { return res.status(500).send(err) } })
  Jimp.read(uploadPath).then(uploadPath => { return uploadPath
        .resize(256, 256) .quality(60) .write(uploadPath)    })
  .then(res.json({ status: 'OK' })).catch(err => {console.error(err); res.send (err) })} })

app.post('/email', function (req, res) {let transporter=nodemailer.createTransport({host:'smtp.gmail.com',port:465,secure:true, 
  auth:{user:'cooperacy@cooperacy.org',pass:'c00p3r4t10n'}}) /* to add html in mailOptions use " html: '<b>test</b>' " */
  let mailOptions = {from: '"Cooperacy" <cooperacy@cooperacy.org>', to:req.body.to, subject:req.body.subject, text:req.body.body}
  transporter.sendMail(mailOptions, (error, info) => { if (error) { return console.error(error) }
      console.log('Message %s sent: %s', info.messageId, info.response); res.render('index') })})

app.post("/vote", (req, res) => {      
  if (req.body.proptype=='project'){mydb.execute(//the presence of an existing project vote is checked
    'SELECT * from `projectvote` where `user`=? AND `condition`=? AND `project`=?', [req.body.user,req.body.condition,req.body.id],
    function(err,[vote],fields){if(err){console.error(err);res.send(err)}else{//if a vote exists, it is copied into the removed votetable
      if(vote){mydb.execute('INSERT INTO `removedpvote` (`user`,`project`,`condition`) VALUES (?,?,?)',
      [req.body.user,req.body.id,req.body.condition],
        function(err,removedvote,fields){if(err){console.error(err);res.send(err)}else{
          if (cc.indexOf(req.body.condition) > -1 ) //then the relative project condition value is updated
          mydb.execute('UPDATE `project` SET `'+req.body.condition+'`=`'+req.body.condition+'`-1 where `project`.`id`=?', [req.body.id],
          function(err,updatedproject,fields){if(err){console.error(err);res.send(err)}else{//when all is safe, the old vote is removed:
            mydb.execute('DELETE FROM `projectvote` where `id` = ?',[vote.id],
            function(err,deletedvote,fields){if(err){console.error(err);res.send(err)}else{res.send('OK')}})} }) }}) }
      else{mydb.execute('INSERT INTO `projectvote` (`user`,`project`,`condition`) VALUES (?,?,?)',//if there is no vote
        [req.body.user,req.body.id,req.body.condition],//a new vote is added into the database
        function(err,voteinserted,fields){if(err){console.error(err);res.send(err)}else{
          if (cc.indexOf(req.body.condition) > -1 ) //then the relative project condition value is updated
          mydb.execute('UPDATE `project` SET `'+req.body.condition+'`=`'+req.body.condition+'`+1 where `project`.`id`=?', [req.body.id],
          function(err,updatedproject,fields){if(err){console.error(err);res.send(err)}else{res.send(updatedproject)}}) }}) } }}) }
  else{mydb.execute(//the presence of an existing comment vote is checked
    'SELECT * from `commentvote` where `user`=? AND `condition`=? AND `comment`=?', [req.body.user,req.body.condition,req.body.id],
    function(err,[vote],fields){if(err){console.error(err);res.send(err)}else{//if a vote exists, it is copied into the removed votetable
      if(vote){mydb.execute('INSERT INTO `removedcvote` (`user`,`comment`,`condition`,`project`) VALUES (?,?,?,?)', 
        [req.body.user,req.body.id,req.body.condition,req.body.projectid],
        function(err,removedvote,fields){if(err){console.error(err);res.send(err)}else{
          if (cc.indexOf(req.body.condition) > -1 )//then the relative comment or project is updated
          mydb.execute('UPDATE `comment` SET `'+req.body.condition+'`=`'+req.body.condition+'`-1 where `comment`.`id`=?', [req.body.id],
          function(err,updatedcomment,fields){if(err){console.error(err);res.send(err)}else{//when all is safe, the old vote is removed:
            mydb.execute('DELETE FROM `commentvote` where `id` = ?',[vote.id],
            function(err,deletedvote,fields){if(err){console.error(err);res.send(err)}else{
            if (cc.indexOf(req.body.condition) > -1 && req.body.user != req.body.author){ //finally, we update the user colorbar
              mydb.execute('UPDATE `user` SET `'+req.body.condition+'`=`'+req.body.condition+'`-1 where `user`.`id`=?',[req.body.author],
              function(err,updateuser,fields){if(err){console.error(err);res.send(err)}else{res.send('OK')}})
            }else{res.send('OK')}}}) }}) }}) }
      else{mydb.execute('INSERT INTO `commentvote` (`user`,`comment`,`condition`,`project`) VALUES (?,?,?,?)',//if there is no vote
        [req.body.user,req.body.id,req.body.condition,req.body.projectid], //a new vote is added into the database
        function(err,voteinserted,fields){if(err){console.error(err);res.send(err)}else{
          if (cc.indexOf(req.body.condition) > -1 ) //then the relative comment condition value is updated
          mydb.execute('UPDATE `comment` SET `'+req.body.condition+'`=`'+req.body.condition+'`+1 where `comment`.`id`=?', [req.body.id],
          function(err,updatedcomment,fields){if(err){console.error(err);res.send(err)}else{
          if (cc.indexOf(req.body.condition) > -1 && req.body.user != req.body.author){ //finally, we update the user colorbar
            mydb.execute('UPDATE `user` SET `'+req.body.condition+'`=`'+req.body.condition+'`+1 where `user`.`id`=?',[req.body.author],
            function(err,updateuser,fields){if(err){console.error(err);res.send(err)}else{res.send(updatedcomment)}})
          }else{res.send(updatedcomment)}}})  }}) } }}) } })

//admin

app.post("/resetcpvoting", (req,res)=>{mydb.execute('SELECT `id` from `project`', [], function(err,id,fields){
    {if(err){console.error(err);res.send(err)}else{pcycleid(id)}}})
  function pcycleid(id){for(let j=0;j<id.length;j++){var values={}; cc.forEach(function(c){
    mydb.execute('select count(`condition`) as count from `projectvote` where `project`=? AND `condition`=?',[id[j].id,c],
    function(err,[result],fields){if(err){console.error(err);res.send(err)}else{values[c]=result.count;
      if(values.E != undefined){resetpvote(id[j].id,values); values={}}}})})}}
  function resetpvote(id,values){mydb.execute('update `project` set `D`=?,`U`=?,`F`=?,`I`=?,`C`=?,`T`=?,`E`=? where `project`.`id` = ?',
      [values.D,values.U,values.F,values.I,values.C,values.T,values.E,id],
      function(err,result,fields){if(err){console.error(err);res.send(err)}else{console.log(' '+JSON.stringify(result))}})}

  mydb.execute('SELECT `id` from `comment`', [], function(err,id,fields){
    {if(err){console.error(err);res.send(err)}else{ccycleid(id)}}})
  function ccycleid(id){for(let j=0;j<id.length;j++){var values={}; cc.forEach(function(c){
    mydb.execute('select count(`condition`) as count from `commentvote` where `comment`=? AND `condition`=?',[id[j].id,c],
    function(err,[result],fields){if(err){console.error(err);res.send(err)}else{values[c]=result.count;
      if(values.E != undefined){resetcvote(id[j].id,values); values={}}}})})}}
  function resetcvote(id,values){mydb.execute('update `comment` set `D`=?,`U`=?,`F`=?,`I`=?,`C`=?,`T`=?,`E`=? where `comment`.`id` = ?',
      [values.D,values.U,values.F,values.I,values.C,values.T,values.E,id],
      function(err,result,fields){if(err){console.error(err);res.send(err)}else{console.log(' '+JSON.stringify(result))}})}
})

app.post("/resetuvoting", (req, res) => {//user calculation algorithm /it should become adaptive, considering how much the user votes
  //first we collect all the users id: 
  mydb.execute('SELECT `id` from `user`',[],function(err,id,fields){{if(err){console.error(err);res.send(err)}else{zero(id)}}})
  //we reset all their conditions values to 0:
  function zero(id){for(let j=0;j<id.length;j++){mydb.execute(
    'update `user` set `D`=?,`U`=?,`F`=?,`I`=?,`C`=?,`T`=?,`E`=? where `user`.`id` = ?',
    [0,0,0,0,0,0,0,id[j].id],function(err,result,fields){if(err){console.error(err);res.send(err)}else{findcomment(id[j].id)}})}}
  //then we find all the comments made for each user id:
  function findcomment(id){mydb.execute('select `id` from `comment` where `user`=?',[id],
    function(err,result,fields){if(err){console.error(err);res.send(err)}else{ucycleid(result,id)}})}
  //then from all the comments retrieved, we must get the commentvotes:
  function ucycleid(id,userid){for(let j=0;j<id.length;j++){var values={}; cc.forEach(function(c){
    mydb.execute('select count(`condition`) as count from `commentvote` where `comment`=? AND `condition`=? AND `user`!=?',
    [id[j].id,c,userid], function(err,[result],fields){if(err){console.error(err);res.send(err)}else{values[c]=result.count;
      if(values.E != undefined){resetuvote(userid,values); values={}}}})})}}
  //finally we repeatedly add the counted votes to the users conditions:
  function resetuvote(userid,values){mydb.execute(
    'update `user` set `D`=`D`+?,`U`=`U`+?,`F`=`F`+?,`I`=`I`+?,`C`=`C`+?,`T`=`T`+?,`E`=`E`+? where `user`.`id` = ?',
    [values.D,values.U,values.F,values.I,values.C,values.T,values.E,userid],
    function(err,result,fields){if(err){console.error(err);res.send(err)}else{console.log(''+JSON.stringify(result));response.send('OK')}})}
})

module.exports = {
  path: '/db',
  handler: app
}
