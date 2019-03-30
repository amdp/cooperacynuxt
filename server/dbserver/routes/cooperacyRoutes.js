const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

var cooperacyRouter = express.Router()
var projectModel = require("../models/projectModel")
var userModel = require("../models/userModel")

cooperacyRouter.use(cors())
process.env.SECRET_KEY = 'secret'

cooperacyRouter.get("/projects", (req, res) => { projectModel.findAll ()
    .then(projects => { res.json(projects) })
    .catch(err => { res.send("Error: " + err) })
})

cooperacyRouter.post("/projects", (req, res) => { if(!req.body.name){ 
    res.status(400) 
    res.json({ error: "Bad data" })} else { projectModel.create(req.body) 
      .then(() => { res.send("Project added") })
      .catch(err => { res.send("Error: " + err) })
  }
})

cooperacyRouter.delete("/projects/:id", (req, res) => { projectModel.destroy ({ 
    where: { id: req.params.id } })
    .then( () => { res.send("Project deleted.") })
    .catch(err => { res.send("Error: " + err) })
})

cooperacyRouter.put("/projects/:id", (req, res) => { if(!req.body.name) { 
    res.status(400)
    res.json({ error: "Bad data" }) } else { projectModel.update( 
      {name: req.body.name},
      { where: {id: req.params.id} })
      .then( () => { res.send ("Task Updated.") })
      .error(err => res.send(err))
  }
})

cooperacyRouter.post("/register", (req, res) => {
    const today = new Date()
    const userData = {
        id: req.body.id,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        photo: req.body.photo,
        E: req.body.E,
        T: req.body.T,
        C: req.body.C,
        I: req.body.I,
        F: req.body.F,
        U: req.body.U,
        D: req.body.D,
        active: req.body.active,
        roles: req.body.roles,
        remember_token: req.body.remember_token,
        payment_type: req.body.payment_type,
        transaction_id: req.body.transaction_id,
        transaction_state: req.body.transaction_state,
        transaction_created_at: today,
        transaction_updated_at: today,
        updated_at: today,
        created_at: today
    }
    userModel.findOne({
        where: {
            email: req.body.email
        } })
        .then(user => {
          if(!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              userData.password = hash
              userModel.create(userData)
              .then(user => {
                res.json({status: user.email + 'registered'})
              })
              .catch(err => {
                res.send ('error :' + err)
              })
            })
          }else{
              res.json({error: "user already exists"})
          }
        })
        .catch(err => {
            res.send ('error :' + err)
        })
})

cooperacyRouter.post("/login", (req, res) => {
  userModel.findOne({
      where: {
          email: req.body.email
      }
  })
      .then(user => {
          if(user){
              if(bcrypt.compareSync(req.body.password, user.password)) {
                  let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                      expiresIn: 1440
                  })
                  res.json({
                    token
                  })
              }
          }else{
              res.status(400).json({error: 'User does not exist'})
          }
      })
      .catch(err => {
          res.status(400).json({error: err })
      })
})

  // [GET] /user
  cooperacyRouter.get('/user', (req, res, next) => {
    res.json({ user: req.user })
  })

  // [POST] /logout
  cooperacyRouter.post('/logout', (req, res, next) => {
    res.json({ status: 'OK' })
  })

  // Error handler
  cooperacyRouter.use((err, req, res, next) => {
    console.error(err)
    res.status(401).send(err + '')
  })

  // -- export app --
  module.exports = cooperacyRouter

  /*const today = new Date()
  const userData = {
    id: req.body.id,
    parent: req.body.parent,
    category: req.body.category,
    stage: req.body.stage,
    budget: req.body.budget,
    hudget: req.body.hudget,
    anonymous: req.body.anonymous,
    name: req.body.name,
    brief: req.body.brief,
    content: req.body.content,
    image: req.body.image,
    video: req.body.video,
    date: req.body.date,
    E: req.body.E,
    T: req.body.T,
    C: req.body.C,
    I: req.body.I,
    F: req.body.F,
    U: req.body.U,
    D: req.body.D
  }

  const express = require('express')
  const bodyParser = require('body-parser')
  const cookieParser = require('cookie-parser')
  const jwt = require('express-jwt')
  const jsonwebtoken = require('jsonwebtoken')
  
  // Create app
  const app = express()
  
  // Install middleware
  app.use(cookieParser())
  app.use(bodyParser.json())
  
  // JWT middleware
  app.use(
    jwt({
      secret: 'dummy'
    }).unless({
      path: '/api/auth/login'
    })
  )
  
  // -- Routes --
  
  // [POST] /login
  app.post('/login', (req, res, next) => {
    const { username, password } = req.body
    const valid = username.length && password === '123'
  
    if (!valid) {
      throw new Error('Invalid username or password')
    }
  
    const accessToken = jsonwebtoken.sign(
      {
        username,
        picture: 'https://github.com/nuxt.png',
        name: 'User ' + username,
        scope: ['test', 'user']
      },
      'dummy'
    )
  
    res.json({
      token: {
        accessToken
      }
    })
  })
  
  // Error handler
  app.use((err, req, res, next) => {
    console.error(err) // eslint-disable-line no-console
    res.status(401).send(err + '')
  })*/

