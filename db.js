var express = require("express")
var bodyParser = require("body-parser")
var cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const fileUpload = require('express-fileupload')
const fs = require('fs')

var app = express()
app.use(cors())
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
    .then(projects => { res.json(projects) }) .catch(err => { res.send("Error: " + err) })
})

app.post(
  "/projects", (req, res) => { 
  const today = new Date()
  const projectData = { id: req.body.id, parent: req.body.parent, category: req.body.category, stage: req.body.stage, collected: req.body.collected, budget: req.body.budget, hudget: req.body.hudget, anonymous: req.body.anonymous, name: req.body.name, brief: req.body.brief, content: req.body.content, image: req.body.image, video: req.body.video, date: today, E: req.body.E, T: req.body.T, C: req.body.C, I: req.body.I, F: req.body.F, U: req.body.U, D: req.body.D }
  projectModel.findOne({ where: { name: req.body.name } })
    .then(project => {if(!project) {
      projectModel.create(projectData)
      // now we use a raw query to retieve the id of the project we created, warning: you can use also @@IDENTITY or mysql_insert_id() instead of LAST_INSERT_ID()
      .then (project => {
        sequelize.query('SELECT LAST_INSERT_ID() AS lastId', {type: Sequelize.QueryTypes.SELECT})
        .then(id => {res.json({id: id[0].lastId}) })
      })
        .catch(err => { res.send ('error :' + err) })
      }else{ res.json({error: "project already exists"}) }
  })
  .catch(err => { res.send ('error :' + err) }) 
})

app.delete(
  "/projects/:id", (req, res) => { projectModel.destroy ({ 
    where: { id: req.params.id } }) .then( () => { res.send("Project deleted.") }) .catch(err => { res.send("Error: " + err) })
})

app.put(
  "/projects/:id", (req, res) => { if(!req.body.name) { 
    res.status(400); res.json({ error: "Bad data" }) } else { projectModel.update( 
      {name: req.body.name}, { where: {id: req.params.id} }) .then( () => { res.send ("Project Updated.") }) .error(err => res.send(err))
  }
})

//////////////////////////////////////////////////////////////////////
///////                        PROJECTS                        ///////
///////                         VOTING                         ///////
//////////////////////////////////////////////////////////////////////
app.get(
  "/pvotes", (req, res) => { pvoteModel.findAll ()
  .then(pvotes => { res.json(pvotes) }) .catch(err => { res.send("Error: " + err) })
})

app.post(
  "/pvotes", (req, res) => { if(!req.body.name){ 
  res.status(400); res.json({ error: "Bad data" })} else { pvoteModel.create(req.body) 
    .then(() => { res.send("Vote added") }) .catch(err => { res.send("Error: " + err) })
    // this should also add a ++ to projectModel.[votenr]
}
})

app.delete(
  "/pvotes/:id", (req, res) => { pvoteModel.destroy ({ 
  where: { id: req.params.id } }) .then( () => { res.send("Vote removed.") }) .catch(err => { res.send("Error: " + err) })
  // this should also cut via -- to projectModel.[votenr]
  // this should also add the same row to premovedvotes
})

//////////////////////////////////////////////////////////////////////
///////                         USERS                          ///////
//////////////////////////////////////////////////////////////////////
app.post(
  "/user", (req, res) => {
    const today = new Date()
    const userData = { id: req.body.id, name: req.body.name, surname: req.body.surname, email: req.body.email, image: req.body.image, E: req.body.E, T: req.body.T, C: req.body.C, I: req.body.I, F: req.body.F, U: req.body.U, D: req.body.D,
      active: req.body.active, roles: req.body.roles, remember_token: req.body.remember_token, payment_type: req.body.payment_type, 
      transaction_id: req.body.transaction_id, transaction_state: req.body.transaction_state, transaction_created_at: today, transaction_updated_at: today, updated: today, created: today}
    userModel.findOne({ where: { email: req.body.email } })
        .then(user => { 
          if(!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              userData.password = hash; userModel.create(userData)
              .then(user => { res.json({status: user.email + 'registered'}) }) 
              .catch(err => { res.send ('error :' + err) })
            })
          }else{ res.json({error: "user already exists"}) }
        })
        .catch(err => { res.send ('error :' + err) })
})

app.put(
  "/user", (req, res) => { 
    const today = new Date()
    const userData = {name: req.body.name, surname: req.body.surname, email: req.body.email, password: req.body.password, image: req.body.image, updated: today}
    if(!req.body.name || !req.body.password) { 
    res.status(400); res.json({ error: "Bad data" }) } else { 
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash; userModel.update(userData, { where: {id: req.body.id}})
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
  "/login", (req, res) => {
  userModel.findOne({ where: { email: req.body.email }})
      .then(user => { 
        if(user){
              if(bcrypt.compareSync(req.body.password, user.password)) { 
                  let accessToken = jwt.sign({id: user.id}, process.env.SECRET_KEY, { expiresIn: 1440 })
                  res.json({ token: { accessToken } })
              }
          }else{ res.status(400).json({error: 'User does not exist'}) }
      })
      .catch(err => { res.status(400).json({error: err }) })
})

app.post(
  "/logout", (req, res) => { res.json({ status: 'OK' }) })

//app.use((err, req, res, next) => { console.error(err); res.status(401).send(err + '') }) DELETE THIS?

//////////////////////////////////////////////////////////////////////
///////                          USER                          ///////
///////                         VOTING                         ///////
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
///////                      MISCELLANOUS                      ///////
//////////////////////////////////////////////////////////////////////
app.get(
  "/categories", (req, res) => { categoryModel.findAll ()
  .then(categories => { res.json(categories) }) .catch(err => { res.send("Error: " + err) })
})

app.get(
  "/tags", (req, res) => { categoryModel.findAll ()
  .then(tags => { res.json(tags) }) .catch(err => { res.send("Error: " + err) })
})

app.post(
  "/projectimage", function(req, res) {
  if (Object.keys(req.files).length == 0) { res.status(400).send('No files were uploaded.'); return }
  uploadPath = './assets/images/projects/' + req.files.file.name
  req.files.file.mv(uploadPath, function(err) { if (err) { return res.status(500).send(err); }
  res.send ('file uploaded')
  })
})

app.delete(
  "/projectimage", (req, res) => { pvoteModel.destroy ({ 
  where: { id: req.params.id } }) .then( () => { res.send("Vote removed.") }) .catch(err => { res.send("Error: " + err) })
})

app.post(
  "/userimage", function(req, res) {
    if (Object.keys(req.files).length == 0) { res.status(400).send('No files were uploaded.'); return }
    console.log(req.files.file)
    uploadPath = './asset/images/users/' + req.files.file.name
    req.files.file.mv(uploadPath, function(err) { if (err) { return res.status(500).send(err) } })
    res.json({ status: 'OK' })
  })
    

app.delete(
  "/userimage", (req, res) => { 
    const path = './assets/images/users/' + req.body.delimage
    fs.unlinkSync(path)
    res.json({ status: 'OK' })
    .catch(err => {res.send(err)})
})

app.post(
  "/tags", (req, res) => { 
  const tagData = { id: req.body.id, project: req.body.project, tagName: req.body.tagName }
  tagModel.create(tagData)
  .then(res => {console.log(res)})
  .catch(err => { res.send ('error :' + err) })
})

//////////////////////////////////////////////////////////////////////
///////                          CCI                           ///////
//////////////////////////////////////////////////////////////////////

/* app.get(
  "/projects", (req, res) => { projectModel.findAll ()
    .then(projects => { res.json(projects) }) .catch(err => { res.send("Error: " + err) })
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
    date: { type: 'DATE', defaultValue: Sequelize.NOW },
    E: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    T: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    C: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    I: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    F: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    U: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
    D: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0}
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
      image: { type: Sequelize.CHAR },
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
      transaction_created_at: { type: 'DATE', defaultValue: Sequelize.NOW },
      transaction_updated_at: { type: 'DATE', defaultValue: Sequelize.NOW },
      created: { type: 'DATE', defaultValue: Sequelize.NOW },
      updated: { type: 'DATE', defaultValue: Sequelize.NOW }
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
      vote:  {type: Sequelize.INTEGER, allowNull: false},
      valid: {type: Sequelize.TINYINT, allowNull: false},
      added: { type: 'DATE', defaultValue: Sequelize.NOW },
      removed: { type: 'DATE', defaultValue: Sequelize.NOW },
  }, {
    timestamps: false,
    //tableName: 'votesprojects',
  }
)

var categoryModel = db.sequelize.define(
  'category',
  {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
      name: {type: Sequelize.CHAR, allowNull: false},
  }, {
    timestamps: false
  }
)

var tagModel = db.sequelize.define(
  'tag',
  {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
      project: {type: Sequelize.INTEGER},
      tagName: {type: Sequelize.CHAR, allowNull: false},
  }, {
    timestamps: false
  }
)

/*

var tagModel = db.sequelize.define(
  'tag',
  {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
      project: {type: Sequelize.INTEGER},
      tagName: {type: Sequelize.CHAR, allowNull: false},
  }, {
    timestamps: false
  }
)
*/

module.exports = {
  path: '/db',
  handler: app
}
