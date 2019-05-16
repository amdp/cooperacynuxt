var express = require("express")
var app = express()
var bodyParser = require("body-parser")
const nodemailer = require("nodemailer");
var Jimp = require('jimp');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const fileUpload = require('express-fileupload')
const mysql = require('mysql2');
const mydb = mysql.createConnection({connectionLimit: 200, host:'localhost', user: 'cooperacy', password: 'c00p3r4t10n', database: 'coo', multipleStatements: true});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(fileUpload())

process.env.SECRET_KEY = 'secret'

const Sequelize = require("sequelize"); const db = {};
const sequelize = new Sequelize("coo","cooperacy","c00p3r4t10n", { host: 'localhost', dialect: 'mysql', operatorsAliases: 0, 
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 } })
db.sequelize = sequelize; db.Sequelize = Sequelize

var cc=['D','U','F','I','C','T','E']; var cclong = ['diversity','understanding','freedom','transparency','care','trust','equivalence']

//////////////////////////////////////////////////////////////////////
///////                  PROJECTS AND COMMENTS                 ///////
//////////////////////////////////////////////////////////////////////

app.get(
"/proptype", async (req, res) =>{var proptypequery='SELECT * FROM `'+req.query.proptype+'`'
  if (req.query.where) proptypequery += ' WHERE '+req.query.where
  mydb.promise().query(proptypequery)
  .then(([project, fields])=>{res.send(project)}).catch(err => {console.error(err); res.send (err) })
})

app.post(
  "/project", (req, res) => {
    if (req.params.id != 'new'){mydb.promise().query('SELECT * FROM `project` WHERE `project`.`name`="' + req.body.name 
    + '" AND `project`.`id`=' + req.params.id + ' LIMIT 1;')
      .then(([project,fields]) => {
        if(project) { projectModel.update(req.body, { where: {id: req.params.id}})
          .then(()=>{res.json({id: req.params.id}) })
        }else{res.json('exists')}
      })
      .catch(err => {console.error(err); res.send (err) })
    }else{
      projectModel.findOne({ where: { name: req.body.name } })
      .then(project => { if(!project) {
          projectModel.create(req.body)
          .then(()=>{
            // we use a raw query to retieve the id of the projectx we created
            // warning: you can use also @@IDENTITY or mysql_insert_id() instead of LAST_INSERT_ID()
            return sequelize.query('SELECT LAST_INSERT_ID() AS lastId', {type: Sequelize.QueryTypes.SELECT})
            .then(lastId => {res.json({id: lastId[0].lastId})})
          })
          .catch(err => {console.error(err); res.send (err) })
        }else{res.json('exists')}
      })
    }
})

app.post(
  "/comment", (req, res) => {
    if (req.body.id != 'new'){ commentModel.update(req.body, { where: {id: req.body.id}})
      .then(()=>{res.json({id: req.body.id}) })
      .catch(err => {console.error(err); res.send (err) })
    }else{
      let query = 'INSERT INTO `comment` (`user`,`project`,`parent`,`content`) VALUES (\''
      +req.body.user+'\',\''+req.body.project+'\',\''+req.body.parent+'\',\''+req.body.content+'\')'
      mydb.promise().query(query)
      .then(([row,fields])=>{res.json({id: row.insertId})})
      .catch(err => {console.error(err); res.send (err) })
    }
})

//////////////////////////////////////////////////////////////////////
///////                          USER                          ///////
//////////////////////////////////////////////////////////////////////

app.post(
  "/login", (req, res) => {
  userModel.findOne({ where: { email: req.body.email }})
      .then(user => { 
        if(user){
              if(bcrypt.compareSync(req.body.password, user.password)) { 
                  let accessToken = jwt.sign({id: user.id}, process.env.SECRET_KEY, { expiresIn: "20d" })
                  res.json({ token: { accessToken } })
              }
          }else{ res.status(400).json({error: 'User does not exist'}) }
      })
      .catch(err => {console.error(err); res.send (err) })
})

app.post(
  "/logout", (req, res) => { res.json({ status: 'OK' }) })

app.post(
  "/user", (req, res) => {
    const today = new Date()
    userModel.findOne({ where: { email: req.body.email } })
        .then(user => { 
          if(!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              req.body.password = hash; userModel.create(req.body)
//INSERT INTO `user` (`id`,`name`,`surname`,`email`,`password`,`E`,`T`,`C`,`I`,`F`,`U`,`D`,`active`,`role`) VALUES (?,?,);
              .then (user => {
                sequelize.query('SELECT LAST_INSERT_ID() AS lastId', {type: Sequelize.QueryTypes.SELECT})
                .then(id => {res.json({id: id[0].lastId}) })
              })
              .catch(err => {console.error(err); res.send (err) })
            })
          }else{ res.send('exists') }
        })
        .catch(err => {console.error(err); res.send (err) })
})

app.put(
  "/user", (req, res) => { 
    if(!req.body.name || !req.body.password) { 
    res.status(400); res.json({ error: "Bad data" }) } else { 
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        req.body.password = hash; userModel.update(req.body, { where: {id: req.body.id}})
        .then(user => {res.json('updated: ' + user) }) 
        .catch(err => {console.error(err); res.send (err) })
      })
  }
})

app.get(
  "/user", (req, res, next) => {
  req.headers.authorization = req.headers.authorization.slice(7)
  try { check = jwt.verify(req.headers.authorization, process.env.SECRET_KEY) }
  catch (err) {console.error(err)}
  let id = jwt.decode(req.headers.authorization)
  mydb.promise().query('SELECT * FROM `user` AS `user` WHERE `user`.`id` = '+id.id)
  .then(([[user],fields]) => {res.json({ user })})
  .catch(err => {console.error(err); res.send (err) })
})
  

//////////////////////////////////////////////////////////////////////
///////                         VOTING                         ///////
//////////////////////////////////////////////////////////////////////

app.post(
"/vote", (req, res) => {var commentvar; var commentvalue; //At the beginning we prepare two comment-related variables
  if (req.body.proptype=='project'){commentvar='';commentvalue=''} //they are null if the vote goes to the projectvote table
  else{commentvar=', `project`';commentvalue=', '+req.body.projectid} //they specify the project if the vote goes to the commentvote table
  let checkquery = 'SELECT * from `'+req.body.proptype+'vote` where `user` = '+req.body.user+' AND `condition` = \''
    +req.body.condition+'\' AND `'+req.body.proptype+'` = '+req.body.id
  mydb.promise().query(checkquery) //the presence of an existing vote is checked
  .then(([[vote], fields])=>{//if there is no vote like the one clicked by the user,
    if(!vote){ //a new vote is added into the database
      let newvotequery = 'INSERT INTO `'+req.body.proptype+'vote` (`user`, `'+req.body.proptype+'`, `condition`' + commentvar
        +' ) VALUES ('+req.body.user+', '+req.body.id+', \''+req.body.condition+'\''+commentvalue+')'
      mydb.promise().query(newvotequery)
      .then(()=>{//then the relative comment or project condition value is updated
        let updatequery = 'UPDATE `'+req.body.proptype+'` SET `'+req.body.condition+'` = `'+req.body.condition
        +'`+1 where `'+req.body.proptype+'`.`id` = '+req.body.id
        mydb.promise().query(updatequery)})
        .then(([rows,fields])=>res.send(rows))
        .catch(err => res.send (err))
    }else{ //if instead a vote exists, it is copied into the removed votetable:
      let copyquery = 'INSERT INTO `removed'+req.body.proptype.charAt(0)+'vote` (`user`, `'+req.body.proptype+'`, `condition`' 
      + commentvar +' ) VALUES ('+req.body.user+', '+req.body.id+', \''+req.body.condition+'\''+commentvalue+')'
      mydb.promise().query(copyquery)
      .then(()=>{ //then the relative comment or project is updated:
        let updatequery = 'UPDATE `'+req.body.proptype+'` SET `'+req.body.condition+'` = `'+req.body.condition
        +'`-1 where `'+req.body.proptype+'`.`id` = '+req.body.id
        mydb.promise().query(updatequery)})
        .then(()=>{//Finally, when all is safe, the old vote is removed:
          let deletequery = 'DELETE FROM `'+req.body.proptype+'vote` where `id` = '+vote.id
          mydb.promise().query(deletequery)})
          .then(()=>{res.send('OK')})
    .catch(err => {console.error(err); res.send (err) })
    }
  })
  .catch(err => {console.error(err); res.send (err) })
})

app.get(
  "/uservote", (req, res) => {
    uservotequery = 'select * from `'+req.query.proptype+'vote` where `user` = \''+req.query.id+'\''
    if (req.query.where){uservotequery += ' AND ' +req.query.where}
    mydb.promise().query(uservotequery)
    .then(([uservote, fields]) => {res.send(uservote)})
    .catch(err => {console.error(err); res.send (err) })
  })

//////////////////////////////////////////////////////////////////////
///////                      MISCELLANOUS                      ///////
//////////////////////////////////////////////////////////////////////

app.post(
  "/image", function(req, res) {
  if (req.body.empty){
    standardimage = './assets/image/'+req.body.proptype+'/1.png'
    Jimp.read(standardimage)
    .then(standardimage => {
      return standardimage
        .resize(256, 256) // resize
        .quality(60) // set quality
        .write('./assets/image/'+ req.body.proptype + '/' + req.body.id + '.png'); // save
    })
    .then(()=>{res.json({ status: 'OK' }) })
    .catch(err => {console.error(err); res.send (err) })
  } else if (Object.keys(req.files).length == 0) { res.status(400).send('No files were uploaded.') }
  else {try {uploadPath = './assets/image/'+ req.body.proptype + '/' + req.body.id + '.png'} catch (err) {console.error(err)}
  req.files.file.mv(uploadPath, function(err) { if (err) { return res.status(500).send(err) } })
  Jimp.read(uploadPath)
    .then(uploadPath => {
      return uploadPath
        .resize(256, 256) // resize
        .quality(60) // set quality
        .write(uploadPath); // save
    })
  .then(res.json({ status: 'OK' }))
  .catch(err => {console.error(err); res.send (err) })}
})

app.get( // we apply a filter to avoid main category = 0
"/category", (req, res) => { mydb.promise().query( 'SELECT * FROM `category` WHERE `category`.`id`!="0"')
  .then(([category,fields]) => { res.json(category) }) .catch(err => {console.error(err); res.send (err) })
})

app.get(
"/tag", (req, res) => { mydb.promise().query( 'SELECT * FROM `tag`')
  .then(([tag,fields]) => { res.json(tag) }) .catch(err => {console.error(err); res.send (err) })
})

app.post(
"/tag", (req, res) => { mydb.promise().query('INSERT INTO `tag` (`project`, `name`) VALUES ('+req.body.project+', '+req.body.name+'\')')
  .then(result => { res.send (result) }) .catch(err => {console.error(err); res.send (err) })
})

app.post('/email', function (req, res) {
  let transporter = nodemailer.createTransport({host: 'smtp.gmail.com', port: 465, secure: true,
      auth: { user: 'cooperacy@cooperacy.org', pass: 'c00p3r4t10n'}})
  let mailOptions = {from: '"Cooperacy" <cooperacy@cooperacy.org>',
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.body,
      //html: '<b>NodeJS Email Tutorial</b>' // html body
  }
  transporter.sendMail(mailOptions, (error, info) => { if (error) { return console.error(error) }
      console.log('Message %s sent: %s', info.messageId, info.response); res.render('index')
})})

//////////////////////////////////////////////////////////////////////
///////                          CCI                           ///////
//////////////////////////////////////////////////////////////////////

/* app.get(
  "/project", (req, res) => { projectModel.findAll ()
    .then(project => { res.json(project) }) .catch(err => {console.error(err); res.send (err) })
}) */

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////                         ADMINS                         ///////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

app.post(
  "/resetcpvoting", (req, res) => {//###### make it better with array of project and comment ids instead of max
    var votetype = ['comment', 'project']
    for (let i=0;i<votetype.length;i++){
      mydb.promise().query('SELECT `id` from `'+votetype[i]+'`')
      .then(([ids, fields]) =>{ 
        for (let j=0;j<ids.length;j++){
          queryreset =
             'select @D:=count(`condition`) from `'+votetype[i]+'vote` where `'+votetype[i]+'`=\'' +ids[j].id+ '\' AND `condition`=\'D\'; '
            +'select @U:=count(`condition`) from `'+votetype[i]+'vote` where `'+votetype[i]+'`=\'' +ids[j].id+ '\' AND `condition`=\'U\'; '
            +'select @F:=count(`condition`) from `'+votetype[i]+'vote` where `'+votetype[i]+'`=\'' +ids[j].id+ '\' AND `condition`=\'F\'; '
            +'select @I:=count(`condition`) from `'+votetype[i]+'vote` where `'+votetype[i]+'`=\'' +ids[j].id+ '\' AND `condition`=\'I\'; '
            +'select @C:=count(`condition`) from `'+votetype[i]+'vote` where `'+votetype[i]+'`=\'' +ids[j].id+ '\' AND `condition`=\'C\'; '
            +'select @T:=count(`condition`) from `'+votetype[i]+'vote` where `'+votetype[i]+'`=\'' +ids[j].id+ '\' AND `condition`=\'T\'; '
            +'select @E:=count(`condition`) from `'+votetype[i]+'vote` where `'+votetype[i]+'`=\'' +ids[j].id+ '\' AND `condition`=\'E\'; '
            +'update `'+votetype[i]+'` set `D` = @D, `U` = @U, `F` = @F, `I` = @I, `C` = @C, `T` = @T, `E` = @E where `'
            +votetype[i]+'`.`id` = \'' +ids[j].id+ '\';'
          mydb.promise().query(queryreset)
          .then(([res, fields]) =>{ console.log(' '+JSON.stringify(res))})
          .catch(err=>{console.error(err); res.send (err) })
        }
      })
      .catch(err=>{console.error(err); res.send (err) })
    }
    res.send('OK')
})

app.post(
  "/resetvoting", (req, response) => {
    //user calculation algorithm !!!to be modified, it should become adaptive, also considering how much the user vote!!!
    //first we select all the user through their id list: 
    mydb.promise().query('SELECT `id` from `user`')
    .then(([userids,fields]) => {
      for (let i=0;i<userids.length;i++){
        //and then we select all comments per every user (although we could include those to which the user commented thanks to commentsvote):
        querycomments = 
            'select @D:=COALESCE(sum(`D`),0) from `comments` where `user` = \''+userids[i].id+'\';'
          + 'select @U:=COALESCE(sum(`U`),0) from `comments` where `user` = \''+userids[i].id+'\';'
          + 'select @F:=COALESCE(sum(`F`),0) from `comments` where `user` = \''+userids[i].id+'\';'
          + 'select @I:=COALESCE(sum(`I`),0) from `comments` where `user` = \''+userids[i].id+'\';'
          + 'select @C:=COALESCE(sum(`C`),0) from `comments` where `user` = \''+userids[i].id+'\';'
          + 'select @T:=COALESCE(sum(`T`),0) from `comments` where `user` = \''+userids[i].id+'\';'
          + 'select @E:=COALESCE(sum(`E`),0) from `comments` where `user` = \''+userids[i].id+'\';'
          + 'update `user` set `D` = @D, `U` = @U, `F` = @F, `I` = @I, `C` = @C, `T` = @T, `E` = @E where `user`.`id` = \'' +userids[i].id+ '\';'
          mydb.promise().query(querycomments)
        .catch(err=>{console.error(err); res.send (err) })
      }
      for (let i=0;i<userids.length;i++){
        queryretrieve = 'select `D`,`U`,`F`,`I`,`C`,`T`,`E` from `user` where id = \''+userids[i].id+'\';'
        mydb.promise().query(queryretrieve)
        .then(([[res],fields])=>{
          cc=['D','U','F','I','C','T','E']; var sum=0; var sum2=0; var sum3=0; var max=0; var res2={}; var res3={}; queryupdate = 'update `user` set ';
          for(let j=0;j<cc.length;j++){ sum += res[cc[j]]}
          if(sum==0){for(let j=0;j<cc.length;j++){res[cc[j]] = 4}
          }else{
            for(let j=0;j<cc.length;j++){res2[cc[j]]=res[cc[j]]*21/sum} 
            for(let j=0;j<cc.length;j++){if (max < res2[cc[j]]){max=res2[cc[j]]}}
            for(let j=0;j<cc.length;j++){res2[cc[j]]=res2[cc[j]]*(1-Math.abs((max-6)/max))}
            for(let j=0;j<cc.length;j++){sum2 += res2[cc[j]]}
            for(let j=0;j<cc.length;j++){res3[cc[j]]=Math.abs(6-res2[cc[j]])/7}
            for(let j=0;j<cc.length;j++){sum3 += res3[cc[j]]}
            for(let j=0;j<cc.length;j++){res[cc[j]] = Math.round(res3[cc[j]]/sum3*(21-sum2)+res2[cc[j]]+1)}
          }
          for(let j=0;j<cc.length;j++){queryupdate = queryupdate + ' `condition` = \''+res[cc[j]]+'\','}
          queryupdate = queryupdate.substring(0, queryupdate.length-1) + ' where id = \''+userids[i].id+'\';'
          mydb.promise().query(queryupdate)
          .then(([res,fields])=>{console.log(' '+JSON.stringify(res))
        })
          .catch(err=>{console.error(err); res.send (err) })
          })
      }
    })
    .catch(err=>{console.error(err); res.send (err) })
    response.send('OK')
})

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////                        DATABASE                        ///////
///////                         MODELS                         ///////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

var projectModel = db.sequelize.define(
  'project',
  {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
    parent: {type: Sequelize.INTEGER, defaultValue: 1},
    category: {type: Sequelize.INTEGER, defaultValue: 1},
    stage: {type: Sequelize.INTEGER, defaultValue: 7},
    collected: {type: Sequelize.DECIMAL, defaultValue: 0},
    budget: {type: Sequelize.DECIMAL, defaultValue: 0},
    hudget: {type: Sequelize.INTEGER, defaultValue: 2},
    anonymous: {type: Sequelize.TINYINT, defaultValue: 0},
    name: {type: Sequelize.CHAR, allowNull: false},
    brief: {type: Sequelize.CHAR},
    content:  {type: Sequelize.CHAR},
    video: { type: Sequelize.CHAR },
    E: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    T: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    C: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    I: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    F: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    U: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    D: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    created: { type: 'TIMESTAMP' },
    updated: { type: 'TIMESTAMP' },
  },
  {    timestamps: false, tableName: 'project',    },
)

var commentModel = db.sequelize.define(
  'comment',
  {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
    user: {type: Sequelize.INTEGER, allowNull: false},
    project: {type: Sequelize.INTEGER, allowNull: false},
    parent: {type: Sequelize.INTEGER, allowNull: true,},
    content:  {type: Sequelize.CHAR},
    E: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    T: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    C: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    I: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    F: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    U: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    D: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    created: { type: 'TIMESTAMP' },
    updated: { type: 'TIMESTAMP' },
  },
  {    timestamps: false, tableName: 'comment',    },
)

var userModel = db.sequelize.define(
  'user',
  {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
      name: {type: Sequelize.CHAR, allowNull: false},
      surname: {type: Sequelize.CHAR, allowNull: false},
      email:  {type: Sequelize.CHAR, unique: true, allowNull: false},
      password: {type: Sequelize.CHAR, allowNull: false},
      E: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 4},
      T: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 4},
      C: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 4},
      I: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 4},
      F: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 4},
      U: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 4},
      D: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 4},
      active: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 1},
      role: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 2},
      remember_token: { type: Sequelize.CHAR },
      payment_type: { type: Sequelize.CHAR },
      transaction_id: { type: Sequelize.CHAR },
      transaction_state: { type: Sequelize.CHAR },
      transaction_created_at: { type: 'TIMESTAMP' },
      transaction_updated_at: { type: 'TIMESTAMP' },
      created: { type: 'TIMESTAMP' },
      updated: { type: 'TIMESTAMP' },
  }, {
      timestamps: false,
      tableName: 'user',
  }
)

var projectvoteModel = db.sequelize.define(
  'projectvote',
  {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
      user: {type: Sequelize.INTEGER, allowNull: false},
      project: {type: Sequelize.INTEGER, allowNull: false},
      condition:  {type: Sequelize.CHAR, allowNull: false},
      created: { type: 'TIMESTAMP' },
      updated: { type: 'TIMESTAMP' },
  }, {
    timestamps: false,
    tableName: 'projectvote',
  }
)

var commentvoteModel = db.sequelize.define(
  'commentvote',
  {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
      user: {type: Sequelize.INTEGER, allowNull: false},
      comments: {type: Sequelize.INTEGER, allowNull: false},
      condition:  {type: Sequelize.CHAR, allowNull: false},
      created: { type: 'TIMESTAMP' },
      updated: { type: 'TIMESTAMP' },
  }, {
    timestamps: false,
    tableName: 'commentvote',
  }
)

var removedpvoteModel = db.sequelize.define(
  'removedpvote',
  {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
      user: {type: Sequelize.INTEGER, allowNull: false},
      project: {type: Sequelize.INTEGER, allowNull: false},
      condition:  {type: Sequelize.CHAR, allowNull: false},
      created: { type: 'TIMESTAMP' },
      updated: { type: 'TIMESTAMP' },
  }, {
    timestamps: false,
    tableName: 'removedpvote',
  }
)

var removedcvoteModel = db.sequelize.define(
  'removedcvote',
  {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
      user: {type: Sequelize.INTEGER, allowNull: false},
      comment: {type: Sequelize.INTEGER, allowNull: false},
      condition:  {type: Sequelize.CHAR, allowNull: false},
      created: { type: 'TIMESTAMP' },
      updated: { type: 'TIMESTAMP' },
  }, {
    timestamps: false,
    tableName: 'removecpvote',
  }
)

var tagModel = db.sequelize.define(
  'tag',
  {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
      project: {type: Sequelize.INTEGER},
      name: {type: Sequelize.CHAR, allowNull: false},
      created: { type: 'TIMESTAMP' },
      updated: { type: 'TIMESTAMP' },
  }, {
    timestamps: false,
    tableName: 'tag',
  }
)

module.exports = {
  path: '/db',
  handler: app
}
