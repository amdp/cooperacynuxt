var express = require("express")
var bodyParser = require("body-parser")
var Jimp = require('jimp');
var app = express()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const fileUpload = require('express-fileupload')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(fileUpload())

process.env.SECRET_KEY = 'secret'

const Sequelize = require("sequelize"); const db = {};
const sequelize = new Sequelize("coo","cooperacy","c00p3r4t10n", { host: 'localhost', dialect: 'mysql', operatorsAliases: 0, 
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 } })
db.sequelize = sequelize; db.Sequelize = Sequelize

//////////////////////////////////////////////////////////////////////
///////                        PROJECTS                        ///////
//////////////////////////////////////////////////////////////////////

app.get(
  "/projects", (req, res) => { projectModel.findAll ()
    .then(projects => { res.json(projects) }) .catch(err => { res.send(err) })
})

app.get(
  "/project/:id", (req, res) => { projectModel.findOne ({where: {id: req.params.id}})
    .then(project => { res.json(project) }) .catch(err => { res.send(err) })
})

app.post(
  "/project/:id", (req, res) => {
    if (req.params.id != 'new'){
      sequelize.query(
        'SELECT * FROM `projects` WHERE `projects`.`name`="' + req.body.name + 
        '" AND `projects`.`id`=' + req.params.id + ' LIMIT 1;',
        {type: Sequelize.QueryTypes.SELECT})
      .then(project => {
        if(project) {
          projectModel.update(req.body, { where: {id: req.params.id}})
          .then(()=>{res.json({id: req.params.id}) })
        }else{res.json('exists')}
      })
      .catch(err => { res.send (err) })
    }else{
      projectModel.findOne({ where: { name: req.body.name } })
      .then(project => {
        if(!project) {
          projectModel.create(req.body)
          .then(()=>{
            // we use a raw query to retieve the id of the project we created
            // warning: you can use also @@IDENTITY or mysql_insert_id() instead of LAST_INSERT_ID()
            return sequelize.query('SELECT LAST_INSERT_ID() AS lastId', {type: Sequelize.QueryTypes.SELECT})
            .then(lastId => {res.json({id: lastId[0].lastId})})
          })
          .catch(err => { res.send (err) }) 
        }else{res.json('exists')}
      })
    }
})

app.put(
  "/projects/:id", (req, res) => { if(!req.body.name) { 
    res.status(400); res.json({ error: "Bad data" }) } else { projectModel.update( 
      {name: req.body.name}, { where: {id: req.params.id} }) .then( () => { res.send ("Project Updated.") }) .error(err => res.send(err))
  }
})

app.delete(
  "/projects/:id", (req, res) => { projectModel.destroy ({ 
    where: { id: req.params.id } }) .then( () => { res.send("Project deleted.") }) .catch(err => { res.send(err) })
})

app.post(
  "/projectimage", function(req, res) {
  if (Object.keys(req.files).length == 0) { res.status(400).send('No files were uploaded.'); return }
  try {uploadPath = './assets/images/projects/' + req.body.id + '.png'} catch (err) {console.log(err)}
  req.files.file.mv(uploadPath, function(err) { if (err) { return res.status(500).send(err) } })
  Jimp.read(uploadPath)
    .then(uploadPath => {
      return uploadPath
        .resize(256, 256) // resize
        .quality(60) // set quality
        .write(uploadPath); // save
    })
  .then(res.json({ status: 'OK' }))
  .catch(err => {console.error(err);})
})

//////////////////////////////////////////////////////////////////////
///////                        COMMENTS                        ///////
//////////////////////////////////////////////////////////////////////

app.get(
  "/comments", (req, res) =>{commentModel.findAll({where: {'project': req.query.id }})
    .then(comments => { res.json(comments) }) .catch(err => { res.send(err) })})

app.post(
  "/commentimage", function(req, res) {
  if (Object.keys(req.files).length == 0) { res.status(400).send('No files were uploaded.'); return }
  try {uploadPath = './assets/images/comments/' + req.body.id + '.png'} catch (err) {console.log(err)}
  req.files.file.mv(uploadPath, function(err) { if (err) { return res.status(500).send(err) } })
  Jimp.read(uploadPath)
    .then(uploadPath => {
      return uploadPath
        .resize(256, 256) // resize
        .quality(60) // set quality
        .write(uploadPath); // save
    })
  .then(res.json({ status: 'OK' }))
  .catch(err => {console.error(err);})
  
})


//////////////////////////////////////////////////////////////////////
///////                         USERS                          ///////
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
      .catch(err => { res.status(400).json({error: err }) })
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
              .then (user => {
                sequelize.query('SELECT LAST_INSERT_ID() AS lastId', {type: Sequelize.QueryTypes.SELECT})
                .then(id => {res.json({id: id[0].lastId}) })
              })
              .catch(err => { res.send ('error :' + err) })
            })
          }else{ res.json({error: "user already exists"}) }
        })
        .catch(err => { res.send ('error :' + err) })
})

app.put(
  "/user", (req, res) => { 
    if(!req.body.name || !req.body.password) { 
    res.status(400); res.json({ error: "Bad data" }) } else { 
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        req.body.password = hash; userModel.update(req.body, { where: {id: req.body.id}})
        .then(user => { console.log('user updated'), res.json('updated: ' + user) }) 
        .catch(err => { res.send ('error :' + err) })
      })
  }
})

app.get(
  "/user", (req, res, next) => {
  req.headers.authorization = req.headers.authorization.slice(7)
  try { check = jwt.verify(req.headers.authorization, process.env.SECRET_KEY) }
  catch (err) {console.log(err)}
  let id = jwt.decode(req.headers.authorization)
  userModel.findOne({ where: { id: id.id }})
  .then(user => {res.json({ user })})
  .catch(err => {res.send('error: ' + err)})
})

app.post(
  "/userimage", function(req, res) {
    if (Object.keys(req.files).length == 0) { res.status(400).send('No files were uploaded.'); return }
    try {uploadPath = './assets/images/users/' + req.body.id + '.png'} catch (err) {console.log(err)}
    req.files.file.mv(uploadPath, function(err) { if (err) { return res.status(500).send(err) } })
    Jimp.read(uploadPath)
    .then(uploadPath => {
      return uploadPath
        .resize(256, 256) // resize
        .quality(60) // set quality
        .write(uploadPath); // save
    })
    .catch(err => {console.error(err);})
    res.json({ status: 'OK' })
  })
  

//////////////////////////////////////////////////////////////////////
///////                         VOTING                         ///////
//////////////////////////////////////////////////////////////////////

app.post(
  "/votes", (req, res) => {
    // checks if the vote is a project vote:
    if(req.body.project){
      // checks if the vote already exists:
     pvoteModel.findOne({where: {user: req.body.user, vote: req.body.vote, project: req.body.project}})
      .then(vote=>{
        if(!vote){ 
          return pvoteModel.create(req.body)
          .then(()=>{myquery='update `projects` SET `'+req.body.vote+'` = `'+req.body.vote+'`+1 where `projects`.`id` = '+req.body.project
            return sequelize.query(myquery)})
          .then(()=>{return res.send('OK')})
          .catch(err => { res.send(err) })
        }else{
          return removedpvoteModel.create(req.body)
          .then(()=>{return sequelize.query('update `projects` SET `'+req.body.vote+'` = `'+req.body.vote+'`-1 where `projects`.`id` = '+req.body.project)})
          .then(()=>{return pvoteModel.destroy({where: {id: vote.id}})})
          .then(()=>{return res.send('OK')})
          .catch(err => { res.send(err) })
        }
      })
      .catch(err => { res.send(err) })
    }else{
     cvoteModel.findOne({where: {user: req.body.user, vote: req.body.vote, comment: req.body.comment}})
      .then(vote=>{
        if(!vote){
          return cvoteModel.create(req.body)
          .then(()=>{myquery='update `comments` SET `'+req.body.vote+'` = `'+req.body.vote+'`+1 where `comments`.`id` = '+req.body.comment
            return sequelize.query(myquery)})
          .then(()=>{return res.send('OK')})
          .catch(err => { res.send(err) })
        }else{console.log('trovato '+JSON.stringify(req.body))
          return removedcvoteModel.create(req.body)
          .then(()=>{return sequelize.query('update `comments` SET `'+req.body.vote+'` = `'+req.body.vote+'`-1 where `comments`.`id` = '+req.body.comment)})
          .then(()=>{return cvoteModel.destroy({where: {id: vote.id}})})
          .then(()=>{return res.send('OK')})
          .catch(err => { res.send(err) })
        }
      })
      .catch(err => { res.send(err) })
    }
})

//////////////////////////////////////////////////////////////////////
///////                      MISCELLANOUS                      ///////
//////////////////////////////////////////////////////////////////////

app.get(
  "/categories", (req, res) => { // we apply a filter to avoid main category = 0
    sequelize.query( 'SELECT * FROM `categories` WHERE `categories`.`id`!="0"', {type: Sequelize.QueryTypes.SELECT})
  .then(categories => { res.json(categories) }) .catch(err => { res.send(err) })
})

app.get(
  "/tags", (req, res) => { tagsModel.findAll () // we apply a filter to avoid main category = 0
  .then(tags => { res.json(tags) }) .catch(err => { res.send(err) })
})

app.delete(
  "/projectimage", (req, res) => { pvoteModel.destroy ({ 
  where: { id: req.params.id } }) .then( () => { res.send("Vote removed.") }) .catch(err => { res.send(err) })
})

app.post(
  "/tags", (req, res) => { 
  tagModel.create(req.body)
  .catch(err => { res.send ('error :' + err) })
})

//////////////////////////////////////////////////////////////////////
///////                          CCI                           ///////
//////////////////////////////////////////////////////////////////////

/* app.get(
  "/projects", (req, res) => { projectModel.findAll ()
    .then(projects => { res.json(projects) }) .catch(err => { res.send(err) })
}) */

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
    image: { type: Sequelize.CHAR },
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
  {    timestamps: false    },
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
  {    timestamps: false    },
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
      roles: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 2},
      remember_token: { type: Sequelize.CHAR },
      payment_type: { type: Sequelize.CHAR },
      transaction_id: { type: Sequelize.CHAR },
      transaction_state: { type: Sequelize.CHAR },
      transaction_created_at: { type: 'TIMESTAMP' },
      transaction_updated_at: { type: 'TIMESTAMP' },
      created: { type: 'TIMESTAMP' },
      updated: { type: 'TIMESTAMP' },
  }, {
      timestamps: false
  }
)

var pvoteModel = db.sequelize.define(
  'pvote',
  {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
      user: {type: Sequelize.INTEGER, allowNull: false},
      project: {type: Sequelize.INTEGER, allowNull: false},
      vote:  {type: Sequelize.CHAR, allowNull: false},
      valid: {type: Sequelize.TINYINT, allowNull: false},
      created: { type: 'TIMESTAMP' },
      updated: { type: 'TIMESTAMP' },
  }, {
    timestamps: false,
    //tableName: 'pvotes',
  }
)

var cvoteModel = db.sequelize.define(
  'cvote',
  {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
      user: {type: Sequelize.INTEGER, allowNull: false},
      comment: {type: Sequelize.INTEGER, allowNull: false},
      vote:  {type: Sequelize.CHAR, allowNull: false},
      valid: {type: Sequelize.TINYINT, allowNull: false},
      created: { type: 'TIMESTAMP' },
      updated: { type: 'TIMESTAMP' },
  }, {
    timestamps: false,
    //tableName: 'pvotes',
  }
)

var removedpvoteModel = db.sequelize.define(
  'removedpvote',
  {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
      user: {type: Sequelize.INTEGER, allowNull: false},
      project: {type: Sequelize.INTEGER, allowNull: false},
      vote:  {type: Sequelize.CHAR, allowNull: false},
      valid: {type: Sequelize.TINYINT, allowNull: false},
      created: { type: 'TIMESTAMP' },
      updated: { type: 'TIMESTAMP' },
  }, {
    timestamps: false,
  }
)

var removedcvoteModel = db.sequelize.define(
  'removedcvote',
  {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
      user: {type: Sequelize.INTEGER, allowNull: false},
      comment: {type: Sequelize.INTEGER, allowNull: false},
      vote:  {type: Sequelize.CHAR, allowNull: false},
      valid: {type: Sequelize.TINYINT, allowNull: false},
      created: { type: 'TIMESTAMP' },
      updated: { type: 'TIMESTAMP' },
  }, {
    timestamps: false,
  }
)

var tagModel = db.sequelize.define(
  'tag',
  {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
      project: {type: Sequelize.INTEGER},
      tagName: {type: Sequelize.CHAR, allowNull: false},
      created: { type: 'TIMESTAMP' },
      updated: { type: 'TIMESTAMP' },
  }, {
    timestamps: false
  }
)

module.exports = {
  path: '/db',
  handler: app
}
