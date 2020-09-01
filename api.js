var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
var axios = require('axios')
var fs = require('fs')
const fileUpload = require('express-fileupload')
app.use(fileUpload())
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const jimp = require('jimp')
const cc = ['D', 'U', 'F', 'I', 'C', 'T', 'E']
const mysql = require('mysql2')
const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.MYSQLUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBDB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})
const mypool = pool.promise()

/////// GET ///////

app.get('/project', async function (req, res, next) {
  //SEARCH
  if (req.query.search) {
    try {
      let query = 'SELECT *, MATCH (`name`) AGAINST (\'' + req.query.search + '\' IN NATURAL LANGUAGE MODE) AS score FROM `project` WHERE MATCH (`name`) AGAINST(\'' + req.query.search + '\' IN NATURAL LANGUAGE MODE) LIMIT ?;'
      let param = [req.query.limit]
      const [project] = await mypool.execute(query, param)
      return res.status(200).send(project)
    } catch (err) {
      next(err)
    }
  }
  //NON-SEARCH

  try {
    if (req.query.author) {//!used to control the number of funded project of an author!
      let query = 'SELECT * FROM `project` WHERE `stage`=? and `budget`>? and `author`=? ORDER BY C DESC LIMIT ?'
      let param = [7, 0, req.query.author, req.query.limitauth]
      const [project] = await mypool.execute(query, param)
      res.status(200).send(project)
    } else if (req.query.projectid) {//SINGLE PROJECT
      let query = 'SELECT * FROM `project` WHERE `id`=? ORDER BY `C` DESC LIMIT ?'
      param = [req.query.projectid + req.query.limit]
      const [project] = await mypool.execute(query, param)
      res.status(200).send(project)
    } else {//HOME
      let query = 'SELECT * FROM `project` WHERE `project`.`stage`<>1 ORDER BY `C` DESC LIMIT ?'
      param = [req.query.limit]
      const [project] = await mypool.execute(query, param)
      res.status(200).send(project)
    }
  } catch (err) {
    next(err)
  }
})

app.get('/comment', async function (req, res, next) {
  try {
    let query =
      'SELECT comment.*, user.name, user.surname FROM comment' +
      ' LEFT JOIN user ON comment.user = user.id' +
      ' WHERE comment.project = ? ORDER BY id DESC'
    let param = [req.query.projectid]
    const [comment] = await mypool.execute(query, param)
    res.status(200).send(comment)
  } catch (err) {
    next(err)
  }
})

app.get('/fundingvar', async function (req, res, next) {
  let fundingvar = {}
  try {
    let query = 'SELECT SUM(`E`) as `totalE` FROM `project`'
    const [result1] = await mypool.execute(query)
    fundingvar.totalE = result1[0].totalE
    query = 'SELECT COUNT(`user`.`active`) as `totaluser` from `user` where `user`.`active` = 1'
    const [result2] = await mypool.execute(query)
    fundingvar.totaluser = result2[0].totaluser
    query = 'SELECT SUM(`user`.`active`*`user`.`fee`) as `totalfee` from `user`'
    const [result3] = await mypool.execute(query)
    fundingvar.totalfee = result3[0].totalfee
  } catch (err) {
    next(err)
  }
  res.status(200).send(fundingvar)
})

app.get('/userproject', async function (req, res, next) {
  try {
    let query =
      'SELECT * FROM `project` WHERE `id` IN (SELECT `project` FROM `projectvote` WHERE `user`=? and `condition`=?)'
    let param = [req.query.userid, 'F']
    const [project] = await mypool.execute(query, param)
    res.status(200).send(project)
  } catch (err) {
    next(err)
  }
})

app.get('/uservote', async function (req, res, next) {
  //gets the votes of projects and comments that have been cast by current user
  try {
    let query =
      'select * from `' + req.query.proptype + 'vote` where `user` = ?'
    let param = [req.query.userid]
    if (req.query.limit) {
      query += ' AND `project`= ?'
      param = [req.query.userid, req.query.projectid]
    }
    const [uservote] = await mypool.execute(query, param)
    res.status(200).send(uservote)
  } catch (err) {
    next(err)
  }
})

app.get('/user', async function (req, res, next) {
  req.headers.authorization = req.headers.authorization.slice(7)
  if (req.headers.authorization == 'undefined') {
    return res.status(500).send('Headers sent undefined')
  } else {
    try {
      jwt.verify(req.headers.authorization, process.env.JWTSECRET)
    } catch (err) {
      res.status(401).send(err + ': Auth Token Wrong or Expired')
      return axios({
        method: 'post',
        url: process.env.DBURL + '/logout'
      })
    }
    let id = jwt.decode(req.headers.authorization)
    try {
      let query = 'SELECT * FROM `user` AS `user` WHERE `user`.`id` =  ?'
      let param = [id.id]
      const [user] = await mypool.execute(query, param)
      res.status(200).send({ user: user[0] })
    } catch (err) {
      next(err)
    }
  }
})

app.get('/userlist', async function (req, res, next) {
  try {
    let query =
      'SELECT * FROM `user` ORDER BY `name`'
    let param = []
    const [userlist] = await mypool.execute(query, param)
    res.status(200).send(userlist)
  } catch (err) {
    next(err)
  }
})

app.get('/professional', async function (req, res, next) {
  try {
    let query =
      'SELECT projectprofessional.*, user.name, user.surname' +
      ' FROM projectprofessional LEFT JOIN user ON projectprofessional.user = user.id' +
      ' where projectprofessional.project = ? ORDER BY id DESC'
    let param = [req.query.project]
    var [professional] = await mypool.execute(query, param)
    res.status(200).send(professional)
  } catch (err) {
    next(err)
  }
})

app.get('/tag', async function (req, res, next) {
  try {
    let query = 'SELECT * FROM `tag` where `project`=?'
    let param = [req.query.project]
    const [tag] = await mypool.execute(query, param)
    res.status(200).send(tag)
  } catch (err) {
    next(err)
  }
})

app.get('/place', async function (req, res, next) {
  try {
    let query = 'SELECT `id`, `country`, `name` FROM `place`'
    const [place] = await mypool.execute(query)
    res.status(200).send(place)
  } catch (err) {
    next(err)
  }
})

app.get('/country', async function (req, res, next) {
  try {
    let query = 'SELECT `id`, `name` FROM `country`'
    const [country] = await mypool.execute(query)
    res.status(200).send(country)
  } catch (err) {
    next(err)
  }
})

app.get('/news', async function (req, res, next) {
  try {
    let query = 'SELECT * FROM `news` ORDER BY `news`.`date` DESC'
    const [news] = await mypool.execute(query)
    res.status(200).send(news)
  } catch (err) {
    next(err)
  }
})

app.get('/survey', async function (req, res, next) {
  if (!req.query.id) {
    try {
      let query = 'SELECT `surveyid`, `group`, `country`, `place`, `participant`,`name`, `desc` FROM `cooperationtool` WHERE `project` IS NULL GROUP BY `surveyid`, `group`, `country`, `place`, `participant`,`name`, `desc` ORDER BY `surveyid`'
      const [survey] = await mypool.execute(query)
      res.status(200).send(survey)
    } catch (err) {
      next(err)
    }
  } else {
    try {
      let query = 'SELECT * FROM `cooperationtool` WHERE `id`=? LIMIT 1'
      let param = [req.query.id]
      const [survey] = await mypool.execute(query, param)
      const parallel = await parallelsurvey(survey[0])
      let mysurvey = { main: survey, parallel: parallel }
      res.status(200).send(mysurvey)
    } catch (err) {
      next(err)
    }

    async function parallelsurvey(currentsurvey) {
      let parallel
      if (currentsurvey.project) {
        //in an if, keep query and param out of the "try"
        let query = 'SELECT COUNT(`id`) as surveynum,`surveyid`,`group`,`country`,`place`,AVG(`month`) AS month,`participant`,`name`,`desc`,AVG(`MBD`) AS MBD,AVG(`BD`) AS BD,AVG(`MRD`) AS MRD,AVG(`RD`) AS RD,AVG(`MBU`) AS MBU,AVG(`BU`) AS BU,AVG(`MRU`) AS MRU,AVG(`RU`) AS RU,AVG(`MBF`) AS MBF,AVG(`BF`) AS BF,AVG(`MRF`) AS MRF,AVG(`RF`) AS RF,AVG(`MBI`) AS MBI,AVG(`BI`) AS BI,AVG(`MRI`) AS MRI,AVG(`RI`) AS RI,AVG(`MBC`) AS MBC,AVG(`BC`) AS BC,AVG(`MRC`) AS MRC,AVG(`RC`) AS RC,AVG(`MBX`) AS MBX,AVG(`BX`) AS BX,AVG(`MRX`) AS MRX,AVG(`RX`) AS RX,AVG(`MBH`) AS MBH,AVG(`BH`) AS BH,AVG(`MRH`) AS MRH,AVG(`RH`) AS RH,AVG(`MBT`) AS MBT,AVG(`BT`) AS BT,AVG(`MRT`) AS MRT,AVG(`RT`) AS RT,AVG(`MBE`) AS MBE,AVG(`BE`) AS BE,AVG(`MRE`) AS MRE,AVG(`RE`) AS RE,AVG(`P`) AS P,GROUP_CONCAT(`PText`) AS PText,AVG(`PD`) AS PD,GROUP_CONCAT(`PDText`) AS PDText,AVG(`PU`) AS PU,GROUP_CONCAT(`PUText`) AS PUText,AVG(`PF`) AS PF,GROUP_CONCAT(`PFText`) AS PFText,AVG(`PI`) AS PI,GROUP_CONCAT(`PIText`) AS PIText,AVG(`PC`) AS PC,GROUP_CONCAT(`PCText`) AS PCText,AVG(`PT`) AS PT,GROUP_CONCAT(`PTText`) AS PTText,AVG(`PE`) AS PE,GROUP_CONCAT(`PEText`) AS PEText,AVG(`PFinal`) AS PFinal,GROUP_CONCAT(`PFinalText`) AS PFinalText  from `cooperationtool` WHERE `project` = ? GROUP BY `surveyid`,`project`,`group`,`country`,`place`,`participant`,`name`,`desc`'
        let param = [currentsurvey.project]
        try {
          [parallel] = await mypool.execute(query, param)
        } catch (err) {
          next(err)
        }
      } else {
        //in an if, keep query and param out of the "try"
        query = 'SELECT COUNT(`id`) as surveynum,`surveyid`,`group`,`country`,`place`,AVG(`month`) AS month,`participant`,`name`,`desc`,AVG(`MBD`) AS MBD,AVG(`BD`) AS BD,AVG(`MRD`) AS MRD,AVG(`RD`) AS RD,AVG(`MBU`) AS MBU,AVG(`BU`) AS BU,AVG(`MRU`) AS MRU,AVG(`RU`) AS RU,AVG(`MBF`) AS MBF,AVG(`BF`) AS BF,AVG(`MRF`) AS MRF,AVG(`RF`) AS RF,AVG(`MBI`) AS MBI,AVG(`BI`) AS BI,AVG(`MRI`) AS MRI,AVG(`RI`) AS RI,AVG(`MBC`) AS MBC,AVG(`BC`) AS BC,AVG(`MRC`) AS MRC,AVG(`RC`) AS RC,AVG(`MBX`) AS MBX,AVG(`BX`) AS BX,AVG(`MRX`) AS MRX,AVG(`RX`) AS RX,AVG(`MBH`) AS MBH,AVG(`BH`) AS BH,AVG(`MRH`) AS MRH,AVG(`RH`) AS RH,AVG(`MBT`) AS MBT,AVG(`BT`) AS BT,AVG(`MRT`) AS MRT,AVG(`RT`) AS RT,AVG(`MBE`) AS MBE,AVG(`BE`) AS BE,AVG(`MRE`) AS MRE,AVG(`RE`) AS RE,AVG(`P`) AS P,GROUP_CONCAT(`PText`) AS PText,AVG(`PD`) AS PD,GROUP_CONCAT(`PDText`) AS PDText,AVG(`PU`) AS PU,GROUP_CONCAT(`PUText`) AS PUText,AVG(`PF`) AS PF,GROUP_CONCAT(`PFText`) AS PFText,AVG(`PI`) AS PI,GROUP_CONCAT(`PIText`) AS PIText,AVG(`PC`) AS PC,GROUP_CONCAT(`PCText`) AS PCText,AVG(`PT`) AS PT,GROUP_CONCAT(`PTText`) AS PTText,AVG(`PE`) AS PE,GROUP_CONCAT(`PEText`) AS PEText,AVG(`PFinal`) AS PFinal,GROUP_CONCAT(`PFinalText`) AS PFinalText from `cooperationtool` WHERE `surveyid` = ? GROUP BY `surveyid`,`project`,`group`,`country`,`place`,`participant`,`name`,`desc`'
        param = [currentsurvey.surveyid]
        try {
          [parallel] = await mypool.execute(query, param)
        } catch (err) {
          next(err)
        }
      }
      return parallel
    }
  }
})

/////// UPDATE ///////

app.put('/user', async function (req, res, next) {
  if (!req.body.name || !req.body.password) {
    res.status(400)
    res.status(200).send({ error: 'Bad data' })
  } else {
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
      req.body.password = hash
      try {
        let query =
          'UPDATE `user` SET `name`=?,`surname`=?,`email`=?,`password`=?,`nickname`=?,`sexidentity`=?,`birthsex`=?,`birthdate`=?,`birthcountry`=?,`birthplace`=?,`nationality`=?,`nationalities`=? where `id`=?'
        let param = [
          req.body.name,
          req.body.surname,
          req.body.email,
          req.body.password,
          req.body.nickname,
          req.body.sexidentity,
          req.body.birthsex,
          req.body.birthdate,
          req.body.birthcountry,
          req.body.birthplace,
          req.body.nationality,
          req.body.nationalities,
          req.body.id
        ]
        const [user] = await mypool.execute(query, param)
        res.status(200).send('updated: ' + user)
      } catch (err) {
        next(err)
      }
    })
  }
})

app.put('/userpaypal', async function (req, res, next) {
  try {
    let query = 'SELECT * FROM `user` WHERE `user`.`email`= ? LIMIT 1'
    let param = [req.body.email]
    const [user] = await mypool.execute(query, param)
    if (user.length == 0) {
      return res.status(401).send('wrong user/password')
    }
    logincheck(user[0])
  } catch (err) {
    next(err)
  }
  async function logincheck(user) {
    try {
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).send('wrong user/password')
      } else updatePaypal(user)
    } catch (err) {
      next(err)
    }
  }
  async function updatePaypal(user) {
    try {
      let query =
        'UPDATE `user` SET `paypalagreementid`=? WHERE `id`=?'
      let param = [
        req.body.paypalagreementid,
        user.id
      ]
      const [userpaypal] = await mypool.execute(query, param)
      res.status(200).send('updated: ' + userpaypal)
    } catch (err) {
      next(err)
    }
  }
})

/////// POST ///////

app.post('/login', async function (req, res, next) {
  try {
    let query = 'SELECT * FROM `user` WHERE `user`.`email`= ? LIMIT 1'
    let param = [req.body.email]
    const [user] = await mypool.execute(query, param)
    if (user.length == 0) {
      return res.status(401).send('wrong user/password')
    }
    logincheck(user[0])
  } catch (err) {
    next(err)
  }
  async function logincheck(user) {
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send('wrong user/password')
    }
    let accessToken = jwt.sign({ id: user.id }, process.env.JWTSECRET, {
      expiresIn: '2h'
    })
    let today = new Date(Date.now()).toJSON().slice(0, 10)
    // bank transfer membership
    if (user.paypalagreementid == 'bank') {
      if (!user.paymentdeadline) {
        return res
          .status(500)
          .send('expired')
      }
      if (user.paymentdeadline.toJSON().slice(0, 10) >= today) {
        res.status(200).send({ token: { accessToken } })
      } else {
        res.status(401).send('expired')
      }
    } else {
      // paypal membership check
      let today45ago = new Date(Date.now() + -45 * 24 * 3600 * 1000)
        .toJSON()
        .slice(0, 10)
      try {
        var response = await axios({
          method: 'post',
          headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Credentials': true
          },
          auth: {
            username: process.env.PAYPALID,
            password: process.env.PAYPALPASSWORD
          },
          data: 'grant_type=client_credentials',
          url: 'https://api.paypal.com/v1/oauth2/token'
        })
      } catch (err) {
        next(err)
      }
      try {
        let paypaltoken = response.data.access_token
        let transaction = await axios({
          method: 'get',
          url:
            'https://api.paypal.com/v1/payments/billing-agreements/' +
            user.paypalagreementid +
            '/transactions?start_date=' +
            today45ago +
            '&end_date=' +
            today,
          headers: {
            Authorization: 'Bearer ' + paypaltoken,
            'Content-Type': 'application/json'
          }
        })
        let list = transaction.data.agreement_transaction_list
        if (list[list.length - 1].status == 'Completed') {
          res.status(200).send({ token: { accessToken } })
        } else if (
          //sometimes the transaction list has a final record of updated payment:
          list[list.length - 1].status == 'Updated' &&
          list[list.length - 2].status == 'Completed'
        ) {
          res.status(200).send({ token: { accessToken } })
        } else if (
          //sometimes the transaction list has a final record of updated payment:
          list[list.length - 1].status == 'Created' &&
          list[list.length - 2].status == 'Completed'
        ) {
          res.status(200).send({ token: { accessToken } })
        }
        else {
          res.status(401).send(
            'expired'
          )
        }
      } catch (err) {
        next(err)
      }
    }
  }
})

app.post('/logout', (req, res) => {
  res.status(200).send({ status: 'OK' })
})

app.post('/checkpassword', async function (req, res, next) {
  try {
    let query =
      'SELECT * FROM `user` AS `user` WHERE `user`.`id` =  ? and `user`.`email` = ? LIMIT 1'
    let param = [req.body.id, req.body.email]
    const [user] = await mypool.execute(query, param)
    checkpassword(user[0])
  } catch (err) {
    next(err)
  }
  async function checkpassword(user) {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) res.status(200).send(true)
      else res.status(200).send(false)
    } else res.status(200).send(false)
  }
})

app.post('/recoverpassword', async function (req, res, next) {
  if (req.body.email) {
    try {
      let query = 'SELECT * FROM `user` WHERE `user`.`email`= ? LIMIT 1'
      let param = [req.body.email]
      const [user] = await mypool.execute(query, param)
      recoverpassword(user[0])
    } catch (err) {
      next(err)
    }
  } else if (req.body.token) {
    setuppassword()
  } else {
    res.status(500).send('No mail nor token, exiting.')
  }
  async function recoverpassword(user) {
    //this happens when the users want to change their password
    if (user) {
      let token = jwt.sign(
        {
          id: user.id,
          newpassword: req.body.password
        },
        process.env.JWTSECRET,
        { expiresIn: '2h' }
      )
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAILUSER,
          pass: process.env.MAILPASSWORD
        }
      })
      let mailOptions = {
        from: '"Cooperacy Website" <websitemails@cooperacy.org>',
        to: req.body.email,
        subject: 'Change your Cooperacy password',
        text:
          'Click here to set the new password:\n' +
          process.env.URLHOME +
          '/recover?jws=' +
          token +
          '\nOr please just ignore this email'
      }
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.status(500).send(err)
          return console.error(err)
        }
        console.log(
          'Message %s to %s sent: %s',
          info.messageId,
          mailOptions.to,
          info.response
        )
        res.status(200).send(info.response + ' to ' + mailOptions.to)
      })
    } else {
      res.status(500).send('No user with this email')
    }
  }
  async function setuppassword() {
    // this happens instead once he clicks on the confirmation link to change his password
    try {
      jwt.verify(req.body.token, process.env.JWTSECRET)
    } catch (err) {
      return res.status(401).send(err + ': Auth Token Wrong or Expired')
    }
    var { id, newpassword } = jwt.decode(req.body.token)
    try {
      let newhashedpassword = await bcrypt.hash(newpassword, 10)
      let query = 'UPDATE `user` SET `password`=? WHERE `id`=?'
      let param = [newhashedpassword, id]
      await mypool.execute(query, param)
      res.status(200).send('updated')
    } catch (err) {
      next(err)
    }
  }
})

app.post('/place', async function (req, res, next) {
  try {
    let query =
      'SELECT * FROM `place` WHERE `place`.`country`=? AND `place`.`name`=?  LIMIT 1'
    let param = [req.body.country, req.body.name]
    const [place] = await mypool.execute(query, param)
    newplace(place[0])
  } catch (err) {
    next(err)
  }
  async function newplace(place) {
    if (place) {
      res.status(200).send('exists')
    } else {
      try {
        let query = 'INSERT INTO `place` (`country`,`name`) VALUES (?,?)'
        let param = [req.body.country, req.body.name]
        const [place] = await mypool.execute(query, param)
        res.status(200).send({ id: place.insertId })
      } catch (err) {
        next(err)
      }
    }
  }
})

app.post('/project', async function (req, res, next) {
  let param = [
    req.body.stage,
    req.body.category,
    req.body.name,
    req.body.country,
    req.body.place,
    req.body.brief,
    req.body.content,
    req.body.video,
    req.body.anonymous,
    req.body.parent,
    req.body.collect,
    req.body.budget,
    req.body.hudget
  ]
  if (req.body.id == 'new') {
    try {
      let query = 'SELECT * FROM `project` WHERE `project`.`name`= ? LIMIT 1'
      let projectname = [req.body.name]
      const [project] = await mypool.execute(query, projectname)
      if (project[0]) {
        res.status(200).send('exists')
      } else {
        addproject()
      }
    } catch (err) {
      next(err)
    }
  } else {
    if (req.body.stage == 1) { //if we archive, we need to copy the state of the project before archiviation
      param.push( //we already pushed req.body.id
        req.body.budgetstep,
        req.body.budgetstepdoc,
        req.body.fundingstep,
        req.body.professional,
        req.body.E,
        req.body.T,
        req.body.C,
        req.body.I,
        req.body.F,
        req.body.U,
        req.body.D,
        req.body.created
      )
      let query = 'INSERT INTO `projectregistry` (`stage`,`category`,`name`,`country`,`place`,`brief`,`content`,`video`,`anonymous`,`parent`,`collect`,`budget`,`hudget`,`projectid`,`budgetstep`,`budgetstepdoc`,`fundingstep`,`professional`,`E`, `T`, `C`, `I`, `F`, `U`, `D`,`created`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
      await mypool.execute(query, param)
    }
    try {
      param.push(req.body.id)
      let query =
        'UPDATE `project` SET `stage`=?,`category`=?,`name`=?,`country`=?,`place`=?,`brief`=?,`content`=?,`video`=?,`anonymous`=?,`parent`=?,`collect`=?,`budget`=?,`hudget`=? WHERE `project`.`id`=?'
      await mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
    res.status(200).send({ id: req.body.id })
  }
  async function addproject() {
    try {
      param.unshift(req.body.author)
      let query =
        'INSERT INTO `project` (`author`,`stage`,`category`,`name`,`country`,`place`,`brief`,`content`,`video`,`anonymous`,`parent`,`collect`,`budget`,`hudget`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
      const [project] = await mypool.execute(query, param)
      res.status(200).send({ id: project.insertId })
    } catch (err) {
      next(err)
    }
  }
})

app.post('/comment', async function (req, res, next) {
  if (req.body.id == 'new') {
    try {
      let query =
        'INSERT INTO `comment` (`parent`,`project`,`user`,`content`) VALUES (?,?,?,?)'
      let param = [
        req.body.parent,
        req.body.project,
        req.body.user,
        req.body.content
      ]
      const [comment] = await mypool.execute(query, param)
      returncomment(comment)
    } catch (err) {
      next(err)
    }
  } else {
    try {
      let query =
        'UPDATE `comment` SET `parent`=?, `project`=?, `user`=?, `content`=? WHERE `comment`.`id`=?'
      let param = [
        req.body.parent,
        req.body.project,
        req.body.user,
        req.body.content,
        req.body.id
      ]
      await mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
    try {
      let query =
        'SELECT comment.*, user.name, user.surname FROM comment' +
        ' LEFT JOIN user ON comment.user = user.id' +
        ' WHERE comment.id = ?'
      let param = [req.body.id]
      const [comment] = await mypool.execute(query, param)
      res.status(200).send(comment[0])
    } catch (err) {
      next(err)
    }
  }
  async function returncomment(returned) {
    try {
      let query =
        'SELECT comment.*, user.name, user.surname FROM comment' +
        ' LEFT JOIN user ON comment.user = user.id' +
        ' WHERE comment.id = ?'
      let param = [returned.insertId]
      const [comment] = await mypool.execute(query, param)
      res.status(200).send(comment[0])
    } catch (err) {
      next(err)
    }
  }
})

app.post('/user', async function (req, res, next) {
  try {
    let query = 'SELECT * FROM `user` WHERE `user`.`email`= ? LIMIT 1'
    let param = [req.body.email]
    const [user] = await mypool.execute(query, param)
    newuser(user[0])
  } catch (err) {
    next(err)
  }
  async function newuser(user) {
    if (user) {
      return res.status(200).send('exists')
    } else {
      let hashed = await bcrypt.hash(req.body.password, 10)
      try {
        let query =
          'INSERT INTO `user` (`name`,`surname`,`email`,`password`,`paypalagreementid`,`nickname`,`sexidentity`,`birthsex`,`birthdate`,`birthcountry`,`birthplace`,`nationality`,`nationalities`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)'
        let param = [
          req.body.name,
          req.body.surname,
          req.body.email,
          hashed,
          req.body.paypalagreementid,
          req.body.nickname,
          req.body.sexidentity,
          req.body.birthsex,
          req.body.birthdate,
          req.body.birthcountry,
          req.body.birthplace,
          req.body.nationality,
          req.body.nationalities,
        ]
        const [useradded] = await mypool.execute(query, param)
        res.status(200).send({ id: useradded.insertId })
        try {
          let queryA =
            'INSERT INTO `projectvote` (`user`,`project`,`condition`) VALUES (?,?,?)'
          let paramA = [useradded.insertId, '700', 'F'] //700 is the annoucements project id
          mypool.execute(queryA, paramA)
        } catch (err) {
          next(err)
        }
        try {
          let query = 'UPDATE `project` SET `F`=`F`+1 where `project`.`id`=?'
          let param = ['700']
          await mypool.execute(query, param)
        } catch (err) {
          next(err)
        }
      } catch (err) {
        next(err)
      }
    }
  }
})

app.post('/tag', async function (req, res, next) {
  if (req.body.tag == 'add') {
    try {
      let query = 'INSERT INTO `tag` (`project`,`name`) VALUES (?,?)'
      let param = [req.body.project, req.body.name]
      const [tag] = await mypool.execute(query, param)
      res.status(200).send(tag)
    } catch (err) {
      next(err)
    }
  } else {
    try {
      let query = 'DELETE FROM `tag` where `project` = ? and `name` = ?'
      let param = [req.body.project, req.body.name]
      const [tag] = await mypool.execute(query, param)
      res.status(200).send(tag)
    } catch (err) {
      next(err)
    }
  }
})

app.post('/image', async function (req, res, next) {
  let uploadPath =
    './static/assets/image/' + req.body.proptype + '/' + req.body.id + '.png'
  if (req.files) {
    try {
      await req.files.file.mv(uploadPath)
    } catch (err) {
      return next(err)
    }
    try {
      const imgfile = await jimp.read(uploadPath)
      await imgfile
        .resize(256, jimp.AUTO)
        .resize(jimp.AUTO, 256)
        .quality(60)
        .write(uploadPath)
    } catch (err) {
      return next(err)
    }
  }
  if (!req.body.current) {
    fs.symlink('./0.png', uploadPath, function (err) {
      return next(err)
    })
  }
  res.status(200).send({ status: 'OK', id: req.body.id })
})

app.post('/newuseremail', function (req, res) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASSWORD
    }
  })
  let mailOptions = {
    from: '"Cooperacy" <cooperacy@cooperacy.org>',
    to: req.body.to,
    subject: req.body.subject,
    html: { path: req.body.body }
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response)
    res.render('index')
  })
})

app.post('/contactemail', function (req, res) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASSWORD
    }
  }) /* to add html in mailOptions use " html: '<b>test</b>' " */
  const mailOptions = {
    from: req.body.formEmail,
    to: '"Cooperacy" <cooperacy@cooperacy.org>',
    // conveniently replies to the submitter of the form's email
    replyTo: `"${req.body.formName}" <${req.body.formEmail}>`,
    subject: req.body.formSubject,
    text:
      `Name: ${req.body.formName}\n` +
      `Email: ${req.body.formEmail}\n\n` +
      `Message: \n\n${req.body.formBody}`
  }
  // console.log(mailOptions);
  transporter
    .sendMail(mailOptions)
    .then(info => {
      console.log('Message %s sent: %s', info.messageId, info.response)
      res.status(200).json({
        message:
          `Thank you ${req.body.formName} for your message!<br/>` +
          `We'll get in touch as soon as possible.<br />`
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message:
          `An error occured ${req.body.formName}!<br/>` +
          `Please try again later.`
      })
    })
})

//CCI to be "vued", post is the future one, remove following app.get('/map'..

app.post('/cci', async function (req, res, next) {
  try {
    let query = 'SELECT * FROM `CCI' + req.body.cciyear + '`'
    let param = []
    const [CCI] = await mypool.execute(query, param)
    res.status(200).send(CCI)
  } catch (err) {
    next(err)
  }
})
app.get('/map', async function (req, res, next) {
  try {
    let query = 'SELECT * FROM `CCI2017`'
    let param = []
    const [CCI] = await mypool.execute(query, param)
    let ccimakeup = {}
    for (let i = 0; i < CCI.length; i++) {
      let country = CCI[i]['country']
      ccimakeup[country] = CCI[i]
    }
    res.status(200).send(ccimakeup)
  } catch (err) {
    next(err)
  }
})

app.post('/budgetstepdoc', async function (req, res, next) {
  try {// updates the project link to the budget step document
    let query = 'UPDATE `project` SET `budgetstepdoc` = ? WHERE `id` = ?'
    let param = [req.body.doc, req.body.project.id]
    await mypool.execute(query, param)
  } catch (err) {
    next(err)
  }
  try {// creates new record in the project registry with the budget step document link
    let query = 'INSERT INTO `projectregistry` (`projectid`,`stage`,`category`,`name`,`country`,`place`,`brief`,`content`,`video`,`anonymous`,`parent`,`collect`,`budget`,`budgetstep`,`fundingstep`,`professional`,`hudget`,`E`, `T`, `C`, `I`, `F`, `U`, `D`,`created`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    let param = [req.body.project.id, req.body.project.stage, req.body.project.category, req.body.project.name, req.body.project.country, req.body.project.place, req.body.project.brief, project.content, req.body.project.video, req.body.project.anonymous, req.body.project.parent, req.body.project.collect, req.body.project.budget, req.body.project.budgetstep, req.body.project.fundingstep, req.body.project.professional, req.body.project.hudget, req.body.project.E, req.body.project.T, req.body.project.C, req.body.project.I, req.body.project.F, req.body.project.U, req.body.project.D, req.body.project.created]
    await mypool.execute(query, param)
  } catch (err) {
    next(err)
  }
  if ((req.body.project.budgetstep == 2 && req.body.project.T >= req.body.project.E * 0.7)
    || (req.body.project.budgetstep == 3 && req.body.project.U >= req.body.project.E * 0.7)) {
    try {// applies trust/uderstandingvotes rule, moves 1 budget step further, creates a new record in the registry
      let query = 'UPDATE `project` SET `budgetstep` = `budgetstep` + 1 where `id`=?;'
        + 'INSERT INTO `projectregistry`(`projectid`,`stage`,`category`,`name`,`country`,`place`,`brief`,`content`,'
        + '`video`,`anonymous`,`parent`,`collect`,`budget`,`budgetstep`,`fundingstep`,`professional`,`hudget`,'
        + '`E`, `T`, `C`, `I`,`F`, `U`, `D`,`created`) SELECT `id`,`stage`,`category`,`name`,`country`,`place`,`brief`,`content`,'
        + '`video`,`anonymous`,`parent`,`collect`,`budget`,`budgetstep`,`fundingstep`,`professional`,`hudget`,'
        + '`E`, `T`, `C`, `I`,`F`, `U`, `D`,`created` from `project` where `id`=?;'
      let param = [req.body.project.id, req.body.project.id]
      await mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
  } else {// if no trustvote nor understandingvote rule can be applied, it creates one week deadline event
    try {// at the end of which if E went down, project goes back to idea stage, 
      // if I downvoted, it goes into pairing state,
      // if at stage 7 it becomes an active project, 
      // else it moves 1 budget step forward and creates a new registry record
      let query = 'delimiter | DROP EVENT IF EXISTS budgetstepproject' + req.body.project.id + '|'
        + 'CREATE EVENT budgetstepproject' + req.body.project.id + ' ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 WEEK DO BEGIN'
        + 'DECLARE thisproject INT; DECLARE e0 INT; DECLARE e1 INT;'
        + 'SET thisproject = ?; SET e1 = (SELECT `E` from project where id=thisproject);'
        + 'SET e0 = (SELECT `E` from projectregistry where projectid=thisproject and'
        + 'id = (SELECT max(id) from projectregistry where projectid=thisproject));'
        + 'IF e1 < e0 THEN'
        + 'UPDATE `project` SET `stage` = 7, `collect` = `collect` * e1/e0 where `id`=thisproject;'
        + 'ELSEIF (SELECT I from project where id=thisproject) > 0 THEN'
        + 'UPDATE `project` SET `stage` = 6 where `id`=thisproject;'
        + 'ELSEIF (SELECT `budgetstep` from project where id=thisproject) = 7 THEN'
        + 'UPDATE `project` SET `stage` = 2 where `id`=thisproject;'
        + 'ELSE UPDATE `project` SET `budgetstep` = `budgetstep` + 1 where `id`=thisproject;'
        + 'INSERT INTO `projectregistry`(`projectid`,`stage`,`category`,`name`,`country`,`place`,`brief`,`content`,'
        + '`video`,`anonymous`,`parent`,`collect`,`budget`,`budgetstep`,`fundingstep`,`professional`,`hudget`,'
        + '`E`, `T`, `C`, `I`,`F`, `U`, `D`,`created`) SELECT `id`,`stage`,`category`,`name`,`country`,`place`,`brief`,`content`,'
        + '`video`,`anonymous`,`parent`,`collect`,`budget`,`budgetstep`,`fundingstep`,`professional`,`hudget`,'
        + '`E`, `T`, `C`, `I`,`F`, `U`, `D`,`created` from `project` where `id`=thisproject;'
        + 'END IF; END| delimiter ;'
      let param = [req.body.project.id, req.body.project.id, req.body.project.id]
      await mypool.execute(query, param)
      res.status(200).send('OK')
    } catch (err) {
      next(err)
    }
  }
})

app.post('/fundingstep', async function (req, res, next) {
  try {
    let query = 'UPDATE project SET fundingstep = fundingstep + 1 where id=?'
    let param = [req.body.project.id]
    await mypool.execute(query, param)
    res.status(200).send('OK')
  } catch (err) {
    next(err)
  }
})

app.post('/vote', async function (req, res, next) {
  try {
    let query =
      'SELECT * from `' +
      req.body.proptype +
      'vote` where `user`=? AND `condition`=? AND `' +
      req.body.proptype +
      '`=?'
    let param = [req.body.user, req.body.condition, req.body.id]
    const [vote] = await mypool.execute(query, param)
    //if a vote exists, it is removed
    if (vote[0]) {
      await removevote(vote[0])
    } else {
      // if not, it is added
      await addvote()
    }
  } catch (err) {
    next(err)
  }
  res.status(200).send('OK')

  async function addvote() {
    try {
      let query =
        'INSERT INTO `projectvote` (`user`,`project`,`condition`) VALUES (?,?,?)'
      let param = [req.body.user, req.body.id, req.body.condition]
      if (req.body.proptype == 'comment') {
        query =
          'INSERT INTO `commentvote` (`user`,`comment`,`condition`,`project`) VALUES (?,?,?,?)'
        param.push(req.body.projectid)
      }
      mypool.execute(query, param)
    } catch (err) {
      next(err)
    }

    //meanwhile the relative project-comment condition value is updated
    try {
      let query =
        'UPDATE `' +
        req.body.proptype +
        '` SET `' +
        req.body.condition +
        '`=`' +
        req.body.condition +
        '`+1 where `' +
        req.body.proptype +
        '`.`id`=?'
      let param = [req.body.id]
      await mypool.execute(query, param)
    } catch (err) {
      next(err)
    }

    // every 7 diversity votes one equivalence vote is lost
    if (req.body.proptype == 'project' && req.body.condition == 'D') {
      try {
        let query = 'SELECT `D` from `project` where `project`.`id` = ?'
        let param = [req.body.id]
        const [diversity] = await mypool.execute(query, param)
        if ((diversity[0].D - Math.floor(diversity[0].D / 7) * 7) == 0) {
          let query = 'UPDATE `project` SET `E` = `E` - 1 where `project`.`id`=?'
          let param = [req.body.id]
          mypool.execute(query, param)
        }
      } catch (err) {
        next(err)
      }
    }

    if (req.body.proptype == 'comment') {
      //only if it is a comment vote, the user colorbar is updated
      if (req.body.user != req.body.author) {
        try {
          let query =
            'UPDATE `user` SET `' +
            req.body.condition +
            '`=`' +
            req.body.condition +
            '`+1 where `user`.`id`=?'
          let param = [req.body.author]
          await mypool.execute(query, param)
        } catch (err) {
          next(err)
        }
      }
    }
  }

  async function removevote(votetoremove) {
    try {
      //the vote is archived (we await for it)
      let query =
        'INSERT INTO `removedpvote` (`user`,`project`,`condition`) VALUES (?,?,?)'
      let param = [req.body.user, req.body.id, req.body.condition]
      if (req.body.proptype == 'comment') {
        query =
          'INSERT INTO `removedcvote` (`user`,`comment`,`condition`,`project`) VALUES (?,?,?,?)'
        param.push(req.body.projectid)
      }
      await mypool.execute(query, param)
    } catch (err) {
      next(err)
    }

    // every 7 diversity votes one equivalence vote is lost, 
    // so we recover it before removing the D vote:
    if (req.body.proptype == 'project' && req.body.condition == 'D') {
      try {
        let query = 'SELECT `D` from `project` where `project`.`id` = ?'
        let param = [req.body.id]
        const [diversity] = await mypool.execute(query, param)
        if ((diversity[0].D - Math.floor(diversity[0].D / 7) * 7) == 0) {
          let query = 'UPDATE `project` SET `E` = `E` + 1 where `project`.`id`=?'
          let param = [req.body.id]
          await mypool.execute(query, param)
        }
      } catch (err) {
        next(err)
      }
    }

    //if in pairing state, the state is removed if I=0
    if (req.body.stage == 6 && req.body.proptype == 'project' && req.body.condition == 'I') {
      try {
        let query = 'SELECT `I` from `project` where `id` = ?'
        let param = [req.body.id]
        const [transparency] = await mypool.execute(query, param)
        if (transparency[0].I == 0) {
          let query = 'UPDATE `project` SET `stage` = 7 where `id`=?'
          let param = [req.body.id]
          await mypool.execute(query, param)
        }
      } catch (err) {
        next(err)
      }
    }

    //then the relative project/comment condition value is updated
    try {
      let query =
        'UPDATE `' +
        req.body.proptype +
        '` SET `' +
        req.body.condition +
        '`=`' +
        req.body.condition +
        '`-1 where `' +
        req.body.proptype +
        '`.`id`=?'
      let param = [req.body.id]
      mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
    //then the old vote is removed:
    try {
      let query = 'DELETE FROM `' + req.body.proptype + 'vote` where `id` = ?'
      let param = [votetoremove.id]
      mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
    //finally, we revoke every effect the vote may have had on the user:
    if (req.body.proptype == 'comment') {
      if (req.body.user != req.body.author) {
        try {
          let query =
            'UPDATE `user` SET `' +
            req.body.condition +
            '`=`' +
            req.body.condition +
            '`-1 where `user`.`id`=?'
          let param = [req.body.author]
          mypool.execute(query, param)
        } catch (err) {
          next(err)
        }
      }
    }
  }
})

app.post('/professional', async function (req, res, next) {
  try {
    let query =
      'DELETE FROM `projectprofessional` where `user`=? and `project`=? LIMIT 1'
    let param = [req.body.user, req.body.project]
    var [removed] = await mypool.execute(query, param)
  } catch (err) {
    next(err)
  }
  if (removed.affectedRows == 1) {
    try {
      let query =
        'UPDATE `project` SET `professional`=`professional`-1 where `project`.`id`=?'
      let param = [req.body.project]
      mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
    res.status(200).send('removed')
  } else {
    try {
      let query =
        'INSERT INTO `projectprofessional` (`project`, `user`) VALUES (?,?)'
      let param = [req.body.project, req.body.user]
      mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
    try {
      let query =
        'UPDATE `project` SET `professional`=`professional`+1 where `project`.`id`=?'
      let param = [req.body.project]
      mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
    res.status(200).send('added')
  }
})

app.post('/cooperationtool', async function (req, res, next) {
  if (!req.body.user) { req.body.user = 0 }
  let surveyoutput = await insertion()
  res.status(200).json({ id: surveyoutput })

  async function insertion() {
    try {
      let query =
        'INSERT INTO `cooperationtool` (`id`,`user`,`surveyid`,`project`,`group`,`country`,`place`,`month`,`participant`,`name`,`desc`,`MBD`,`BD`,`MRD`,`RD`,`MBU`,`BU`,`MRU`,`RU`,`MBF`,`BF`,`MRF`,`RF`,`MBI`,`BI`,`MRI`,`RI`,`MBC`,`BC`,`MRC`,`RC`,`MBX`,`BX`,`MRX`,`RX`,`MBH`,`BH`,`MRH`,`RH`,`MBT`,`BT`,`MRT`,`RT`,`MBE`,`BE`,`MRE`,`RE`,`P`,`PText`,`PD`,`PDText`,`PU`,`PUText`,`PF`,`PFText`,`PI`,`PIText`,`PC`,`PCText`,`PT`,`PTText`,`PE`,`PEText`,`PFinal`,`PFinalText`) VALUES (?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?)'
      let param = [req.body.id, req.body.user, req.body.surveyid, req.body.project, req.body.group, req.body.country, req.body.place, req.body.month, req.body.participant, req.body.name, req.body.desc, req.body.MBD, req.body.BD, req.body.MRD, req.body.RD, req.body.MBU, req.body.BU, req.body.MRU, req.body.RU, req.body.MBF, req.body.BF, req.body.MRF, req.body.RF, req.body.MBI, req.body.BI, req.body.MRI, req.body.RI, req.body.MBC, req.body.BC, req.body.MRC, req.body.RC, req.body.MBX, req.body.BX, req.body.MRX, req.body.RX, req.body.MBH, req.body.BH, req.body.MRH, req.body.RH, req.body.MBT, req.body.BT, req.body.MRT, req.body.RT, req.body.MBE, req.body.BE, req.body.MRE, req.body.RE, req.body.P, req.body.PText, req.body.PD, req.body.PDText, req.body.PU, req.body.PUText, req.body.PF, req.body.PFText, req.body.PI, req.body.PIText, req.body.PC, req.body.PCText, req.body.PT, req.body.PTText, req.body.PE, req.body.PEText, req.body.PFinal, req.body.PFinalText]
      if (req.body.pairing) {
        query = 'UPDATE `cooperationtool` SET `id` = ?,`user` = ?,`surveyid` = ?,`project` = ?,`group` = ?,`country` = ?,`place` = ?,`month` = ?,`participant` = ?,`name` = ?,`desc` = ?,`MBD` = ?,`BD` = ?,`MRD` = ?,`RD` = ?,`MBU` = ?,`BU` = ?,`MRU` = ?,`RU` = ?,`MBF` = ?,`BF` = ?,`MRF` = ?,`RF` = ?,`MBI` = ?,`BI` = ?,`MRI` = ?,`RI` = ?,`MBC` = ?,`BC` = ?,`MRC` = ?,`RC` = ?,`MBX` = ?,`BX` = ?,`MRX` = ?,`RX` = ?,`MBH` = ?,`BH` = ?,`MRH` = ?,`RH` = ?,`MBT` = ?,`BT` = ?,`MRT` = ?,`RT` = ?,`MBE` = ?,`BE` = ?,`MRE` = ?,`RE` = ?,`P` = ?,`PText` = ?,`PD` = ?,`PDText` = ?,`PU` = ?,`PUText` = ?,`PF` = ?,`PFText` = ?,`PI` = ?,`PIText` = ?,`PC` = ?,`PCText` = ?,`PT` = ?,`PTText` = ?,`PE` = ?,`PEText` = ?,`PFinal` = ?,`PFinalText` = ? WHERE `id` = ?'
        param.push(req.body.id)
        await mypool.execute(query, param)
        return req.body.id
      }
      const [inserted] = await mypool.execute(query, param)
      //if the survey is new, it has no "surveyid", so we should add it
      if (!req.body.surveyid) {
        query = 'UPDATE `cooperationtool` SET `surveyid` = ? WHERE `id` = ?'
        param = [inserted.insertId, inserted.insertId]
        await mypool.execute(query, param)
      }
      return inserted.insertId
    } catch (err) {
      next(err)
    }
  }
})

//admin

app.post('/resetvoting', async function (req, res, next) {
  var proptype = ['project', 'comment', 'user']
  for (let i = 0; i < proptype.length; i++) {
    try {
      let query = 'SELECT `id` from `' + proptype[i] + '`'
      const [id] = await mypool.execute(query, [])
      if (proptype[i] == 'user') {
        await zero(id)
      } else {
        await cycleid(id, proptype[i])
      }
    } catch (err) {
      next(err)
    }
  }
  async function cycleid(id, proptype, userid) {
    // with for and variable j we go through all id's of the proptype received
    for (let j = 0; j < id.length; j++) {
      let values = {} //for every id we collect 7 c values
      for (let c = 0; c < cc.length; c++) {
        try {
          let query =
            'select count(`condition`) as count from `' +
            proptype +
            'vote` where `' +
            proptype +
            '`=? AND `condition`=?'
          let param = [id[j].id, cc[c]]
          if (userid) {
            query += ' AND `user`!=?'
            param.push(userid)
          }
          const [result] = await mypool.execute(query, param)
          values[cc[c]] = result[0].count
          if (values.E != undefined) {
            if (userid) {
              resetvote(userid, values, 'user')
            } else {
              resetvote(id[j].id, values, proptype)
            }
            //values = {}
          }
        } catch (err) {
          next(err)
        }
      }
    }
  }
  async function resetvote(id, values, proptype) {
    try {
      let query =
        'update `' +
        proptype +
        '` set `D`=?,`U`=?,`F`=?,`I`=?,`C`=?,`T`=?,`E`=? where `' +
        proptype +
        '`.`id` = ?'
      if (proptype == 'user') {
        // this repeatedly adds the values from the comments to the user colorbar
        query =
          'update `user` set `D`=`D`+?,`U`=`U`+?,`F`=`F`+?,`I`=`I`+?,`C`=`C`+?,`T`=`T`+?,`E`=`E`+? where `user`.`id` = ?'
      }
      let param = [
        values.D,
        values.U,
        values.F,
        values.I,
        values.C,
        values.T,
        values.E,
        id
      ]
      await mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
  }

  //we reset all users conditions values to 0:
  async function zero(id) {
    try {
      for (let j = 0; j < id.length; j++) {
        await mypool.execute(
          'update `user` set `D`=?,`U`=?,`F`=?,`I`=?,`C`=?,`T`=?,`E`=? where `user`.`id` = ?',
          [0, 0, 0, 0, 0, 0, 0, id[j].id]
        )
        findcomment(id[j].id)
      }
    } catch (err) {
      next(err)
    }
  }
  //then we find all the comments made for each user id:
  async function findcomment(id) {
    try {
      let query = 'select `id` from `comment` where `user`=?'
      let param = [id]
      const [resultid] = await mypool.execute(query, param)
      if (resultid.length > 0) {
        cycleid(resultid, 'comment', id)
      }
    } catch (err) {
      next(err)
    }
  }
  res.status(200).send('OK')
})

//error function triggered by next
app.use(function (err, req, res, next) {
  console.log('body: ' + JSON.stringify(req.body))
  console.log('query: ' + JSON.stringify(req.body))
  console.log('nexterr: ' + JSON.stringify(err) + err.stack)
  if (res.headersSent) {
    return next(err) //check  this out
  }
  res.status(500).send(err.stack)
})

module.exports = {
  path: '/api',
  handler: app
}

/*
paypal old queries

CREATE PLAN
axios({method: 'post', url: 'https://api.paypal.com/v1/billing/plans', headers: { 'Authorization':'Bearer '+paypaltoken, 'Content-Type':'application/json'}, data: { 'product_id': 'PROD-8SD41723WB4858822','name': 'Cooperation Membership Plan','billing_cycles': [{'frequency': {'interval_unit': 'MONTH','interval_count': 1},'tenure_type': 'REGULAR','sequence': 1,'total_cycles': 998,'pricing_scheme': {'fixed_price': {'value': '1','currency_code': 'EUR'}}}],'payment_preferences': {'payment_failure_threshold':1}}})

LIST PLANS
axios({method: 'get', url: 'https://api.paypal.com/v1/billing/plans', headers: { 'Authorization':'Bearer '+paypaltoken, 'Content-Type':'application/json'}}).then((response)=>{console.log(JSON.stringify(response.data))}).catch((err)=>{console.log(err.response.data)})

INVESTIGATE PLAN
axios({method: 'get', url: 'https://api.paypal.com/v1/billing/plans/P-9C681042E7918904VLURYYGQ', headers: { 'Authorization':'Bearer '+paypaltoken, 'Content-Type':'application/json'}}).then((response)=>{console.log(JSON.stringify(response.data))}).catch((err)=>{console.log(err.response.data)})

STANDARD API CHECK NOT WORKING WITH OLD AGREEMENTS:
paypal.billingAgreement.get(agreementid,function(err,agreement)
{if(agreement){if(agreement.state=='Active'){res.json({token:{accessToken} })}}
if(agreement){if(agreement.state=='Suspended' || agreement.state=='Cancelled'){res.status(200).send('expired')} }
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
