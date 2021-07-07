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

var evaluation = 1
var voting = 4
var active = 9 //should be higher in value than deactivated, voting and evaluation
var participation = 20
var funding = 101
var btrust = funding + 1
var bunderstanding = funding + 5
var fundinglaststep = 108


/////// GET ///////

app.get('/cooperation', async function (req, res, next) {
  //USE DIRECT DATABASE QUERIES FOR EVERYTHING THAT IS USELESS TO FILTER IN FRONTEND,
  //LIKE COOPERATIONS LIST FOR USER DASHBOARD OR SINGLE COOPERATION
  //FILTER THE REST IN FRONTEND UNTIL THE DATABASE GETS TOO LONG TO LOAD

  //SEARCH
  if (req.query.search) {
    try {
      let query = 'SELECT `cooperation`.*, `tag`.`cooperation`, ' +
        '(MATCH (`cooperation`.`title`,`cooperation`.`brief`,`cooperation`.`content`) ' +
        'AGAINST (\'' + req.query.search + '\' IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION) + ' +
        'MATCH (`tag`.`name`)' +
        'AGAINST (\'' + req.query.search + '\' IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION)) ' +
        'AS score FROM `cooperation` ' +
        'LEFT JOIN `tag` on `cooperation`.`id` = `tag`.`cooperation` WHERE ' +
        'MATCH (`cooperation`.`title`,`cooperation`.`brief`,`cooperation`.`content`) ' +
        'AGAINST (\'' + req.query.search + '\' IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION) ' +
        'OR MATCH (`tag`.`name`) ' +
        'AGAINST (\'' + req.query.search + '\' IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION) ' +
        'ORDER BY score DESC LIMIT ?'
      let param = [req.query.limit]
      let [cooperation] = await mypool.execute(query, param)
      cooperation = cooperation.filter((coo, index, self) =>
        index === self.findIndex((c) => (c.id === coo.id)))
      if (req.query.country) {
        cooperation = cooperation.filter(c =>
          c.country == req.query.country)
      }
      if (req.query.place) {
        cooperation = cooperation.filter(c =>
          c.place == req.query.place)
      }
      return res.status(200).send(cooperation)
    } catch (err) {
      next(err)
    }
  }

  //NON-SEARCH
  try {
    if (req.query.author) {//!used to control the number of funded cooperation of an author!
      let query = 'SELECT * FROM `cooperation` WHERE `mode`>=? and `budget`>? and `author`=? ORDER BY C DESC LIMIT ?'
      let param = [funding, 0, req.query.author, req.query.limitauth]
      const [cooperation] = await mypool.execute(query, param)
      res.status(200).send(cooperation)
    } else if (req.query.cooperationid) {//SINGLE cooperation
      let query = 'SELECT * FROM `cooperation` WHERE `id`=? LIMIT 1'
      param = [req.query.cooperationid]
      const [cooperation] = await mypool.execute(query, param)
      res.status(200).send(cooperation)
    } else if (req.query.limit) {//non-evaluation or deactivated cooperations
      let query = 'SELECT * FROM `cooperation` WHERE `cooperation`.`mode`>=? ORDER BY `C` DESC LIMIT ?'
      param = [active, req.query.limit]
      const [cooperation] = await mypool.execute(query, param)
      res.status(200).send(cooperation)
    } else if (req.query.cooperationtool) {// selecting cooperation in cooperationtool table
      let query = 'SELECT `cooperationtool`.`id` as coosurveyid, `cooperation`.* FROM `cooperation`' +
        'RIGHT JOIN `cooperationtool` ON `cooperation`.`id` = `cooperationtool`.`cooperation`' +
        'WHERE `cooperation`.`mode`>=? ORDER BY `id` DESC'
      param = [active]
      const [cooperation] = await mypool.execute(query, param)
      res.status(200).send(cooperation)
    } else {// selecting non-deactivated cooperation from dropdown
      let query = 'SELECT * FROM `cooperation` WHERE `cooperation`.`mode`>=? ORDER BY `id` DESC'
      param = [active]
      const [cooperation] = await mypool.execute(query, param)
      res.status(200).send(cooperation)
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
      ' WHERE comment.cooperation = ? ORDER BY id DESC'
    let param = [req.query.cooperationid]
    const [comment] = await mypool.execute(query, param)
    res.status(200).send(comment)
  } catch (err) {
    next(err)
  }
})

app.get('/fundingvar', async function (req, res, next) {
  let fundingvar = {}
  try {
    let query = 'SELECT SUM(`E`) as `totalE` FROM `cooperation` WHERE `mode`>=? and `collect`<`budget`'
    param = [funding]
    const [result1] = await mypool.execute(query, param)
    fundingvar.totalE = parseFloat(result1[0].totalE)
    query = 'SELECT COUNT(`user`.`active`) as `totaluser` from `user` where `user`.`active` = ?'
    param = [1]
    const [result2] = await mypool.execute(query, param)
    fundingvar.totaluser = parseFloat(result2[0].totaluser)
    query = 'SELECT SUM(`user`.`active`*`user`.`fee`) as `totalfee` from `user`'
    const [result3] = await mypool.execute(query)
    fundingvar.totalfee = parseFloat(result3[0].totalfee)
  } catch (err) {
    next(err)
  }
  res.status(200).send(fundingvar)
})

app.get('/usercooperation', async function (req, res, next) {
  try {
    let query =
      'SELECT * FROM `cooperation` WHERE `id` IN (SELECT `cooperation` FROM `cooperationvote` WHERE `user`=? and `condition`=?) OR `author` = ?'
    let param = [req.query.userid, 'F', req.query.userid]
    const [cooperation] = await mypool.execute(query, param)
    res.status(200).send(cooperation)
  } catch (err) {
    next(err)
  }
})

app.get('/uservote', async function (req, res, next) {
  //gets the votes of cooperations and comments that have been cast by current user
  try {
    let query =
      'select * from `' + req.query.proptype + 'vote` where `user` = ?'
    let param = [req.query.userid]
    if (req.query.limit) {
      query += ' AND `cooperation`= ?'
      param = [req.query.userid, req.query.cooperationid]
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
      'SELECT cooperationprofessional.*, user.name, user.surname' +
      ' FROM cooperationprofessional LEFT JOIN user ON cooperationprofessional.user = user.id' +
      ' where cooperationprofessional.cooperation = ? ORDER BY id DESC'
    let param = [req.query.cooperation]
    var [professional] = await mypool.execute(query, param)
    res.status(200).send(professional)
  } catch (err) {
    next(err)
  }
})

app.get('/tag', async function (req, res, next) {
  try {
    let query = 'SELECT * FROM `tag` where `cooperation`=?'
    let param = [req.query.cooperation]
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
      let query = 'SELECT `surveyid`, `group`, `country`, `place`, `participant`,`title`, `desc` FROM `cooperationtool` WHERE `cooperation` IS NULL GROUP BY `surveyid`, `group`, `country`, `place`, `participant`,`title`, `desc` ORDER BY `surveyid`'
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
      console.log(' ' + JSON.stringify(survey))
      const parallel = await parallelsurvey(survey[0])
      let mysurvey = { main: survey, parallel: parallel }
      res.status(200).send(mysurvey)
    } catch (err) {
      next(err)
    }

    async function parallelsurvey(currentsurvey) {
      let parallel
      if (currentsurvey.cooperation) {//this is for survey about Cooperacy cooperations
        //in an if, keep query and param out of the "try"
        let query = 'SELECT COUNT(`id`) as surveynum,`surveyid`,`group`,`country`,`place`,AVG(`month`) AS month,`participant`,`title`,`desc`,AVG(`MBD`) AS MBD,AVG(`BD`) AS BD,AVG(`MRD`) AS MRD,AVG(`RD`) AS RD,AVG(`MBU`) AS MBU,AVG(`BU`) AS BU,AVG(`MRU`) AS MRU,AVG(`RU`) AS RU,AVG(`MBF`) AS MBF,AVG(`BF`) AS BF,AVG(`MRF`) AS MRF,AVG(`RF`) AS RF,AVG(`MBI`) AS MBI,AVG(`BI`) AS BI,AVG(`MRI`) AS MRI,AVG(`RI`) AS RI,AVG(`MBC`) AS MBC,AVG(`BC`) AS BC,AVG(`MRC`) AS MRC,AVG(`RC`) AS RC,AVG(`MBX`) AS MBX,AVG(`BX`) AS BX,AVG(`MRX`) AS MRX,AVG(`RX`) AS RX,AVG(`MBH`) AS MBH,AVG(`BH`) AS BH,AVG(`MRH`) AS MRH,AVG(`RH`) AS RH,AVG(`MBT`) AS MBT,AVG(`BT`) AS BT,AVG(`MRT`) AS MRT,AVG(`RT`) AS RT,AVG(`MBE`) AS MBE,AVG(`BE`) AS BE,AVG(`MRE`) AS MRE,AVG(`RE`) AS RE,AVG(`P`) AS P,GROUP_CONCAT(`PText`) AS PText,AVG(`PD`) AS PD,GROUP_CONCAT(`PDText`) AS PDText,AVG(`PU`) AS PU,GROUP_CONCAT(`PUText`) AS PUText,AVG(`PF`) AS PF,GROUP_CONCAT(`PFText`) AS PFText,AVG(`PI`) AS PI,GROUP_CONCAT(`PIText`) AS PIText,AVG(`PC`) AS PC,GROUP_CONCAT(`PCText`) AS PCText,AVG(`PT`) AS PT,GROUP_CONCAT(`PTText`) AS PTText,AVG(`PE`) AS PE,GROUP_CONCAT(`PEText`) AS PEText,AVG(`PFinal`) AS PFinal,GROUP_CONCAT(`PFinalText`) AS PFinalText  from `cooperationtool` WHERE `cooperation` = ? GROUP BY `surveyid`,`cooperation`,`group`,`country`,`place`,`participant`,`title`,`desc`'
        let param = [currentsurvey.cooperation]
        try {
          [parallel] = await mypool.execute(query, param)
        } catch (err) {
          next(err)
        }
      } else {//this is for survey about generic groups
        //in an if, keep query and param out of the "try"
        query = 'SELECT COUNT(`id`) as surveynum,`surveyid`,`group`,`country`,`place`,AVG(`month`) AS month,`participant`,`title`,`desc`,AVG(`MBD`) AS MBD,AVG(`BD`) AS BD,AVG(`MRD`) AS MRD,AVG(`RD`) AS RD,AVG(`MBU`) AS MBU,AVG(`BU`) AS BU,AVG(`MRU`) AS MRU,AVG(`RU`) AS RU,AVG(`MBF`) AS MBF,AVG(`BF`) AS BF,AVG(`MRF`) AS MRF,AVG(`RF`) AS RF,AVG(`MBI`) AS MBI,AVG(`BI`) AS BI,AVG(`MRI`) AS MRI,AVG(`RI`) AS RI,AVG(`MBC`) AS MBC,AVG(`BC`) AS BC,AVG(`MRC`) AS MRC,AVG(`RC`) AS RC,AVG(`MBX`) AS MBX,AVG(`BX`) AS BX,AVG(`MRX`) AS MRX,AVG(`RX`) AS RX,AVG(`MBH`) AS MBH,AVG(`BH`) AS BH,AVG(`MRH`) AS MRH,AVG(`RH`) AS RH,AVG(`MBT`) AS MBT,AVG(`BT`) AS BT,AVG(`MRT`) AS MRT,AVG(`RT`) AS RT,AVG(`MBE`) AS MBE,AVG(`BE`) AS BE,AVG(`MRE`) AS MRE,AVG(`RE`) AS RE,AVG(`P`) AS P,GROUP_CONCAT(`PText`) AS PText,AVG(`PD`) AS PD,GROUP_CONCAT(`PDText`) AS PDText,AVG(`PU`) AS PU,GROUP_CONCAT(`PUText`) AS PUText,AVG(`PF`) AS PF,GROUP_CONCAT(`PFText`) AS PFText,AVG(`PI`) AS PI,GROUP_CONCAT(`PIText`) AS PIText,AVG(`PC`) AS PC,GROUP_CONCAT(`PCText`) AS PCText,AVG(`PT`) AS PT,GROUP_CONCAT(`PTText`) AS PTText,AVG(`PE`) AS PE,GROUP_CONCAT(`PEText`) AS PEText,AVG(`PFinal`) AS PFinal,GROUP_CONCAT(`PFinalText`) AS PFinalText from `cooperationtool` WHERE `surveyid` = ? GROUP BY `surveyid`,`cooperation`,`group`,`country`,`place`,`participant`,`title`,`desc`'
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
  // this function temporarily checks everytime a user logs in whether all the other users
  // should be deactivated
  try {
    let accessToken
    let query = 'SELECT * FROM `user` WHERE `user`.`email`= ? LIMIT 1'
    let param = [req.body.email]
    const [user] = await mypool.execute(query, param)
    if (user.length == 0 || !bcrypt.compareSync(req.body.password, user[0].password)) {
      return res.status(401).send('wrong user/password')
    } else {
      if (await expiredcheck(user[0])) {
        return res.status(402).send('expired')
      } else {
        if (user[0].active === 0) { activeuser(user[0].id, 1) }
        accessToken = jwt.sign({ id: user[0].id }, process.env.JWTSECRET, {
          expiresIn: '2h'
        })
        res.status(200).send({ token: { accessToken } })
      }
    }
  } catch (err) {
    next(err)
  }
  //now we asyncronously remove those with expired membership
  try {
    let query = 'SELECT * FROM `user`'
    const [user] = await mypool.execute(query)
    for (let i = 0; i < user.length; i++) {
      if (user[i].active === 0) {
        continue
      }
      if (await expiredcheck(user[i])) {
        console.log('checked and deactivating: ' + JSON.stringify(user[i]))
        activeuser(user[i].id, 0)
      }
    }
  } catch (err) {
    next(err)
  }

  async function expiredcheck(user) {
    // bank transfer membership
    if (user.paypalagreementid == 'bank') {
      if (user.paymentdeadline) {
        let today = new Date(Date.now()).toJSON().slice(0, 10)
        if (user.paymentdeadline.toJSON().slice(0, 10) >= today) {
          return false
        }
      }
    } else if (!user.paypalagreementid) {
      return true // user has null membership
    } else {
      // paypal membership check
      let today = new Date(Date.now()).toJSON()
      let today45ago = new Date(Date.now() + -45 * 24 * 3600 * 1000)
        .toJSON()
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
          url: 'https://api-m.paypal.com/v1/oauth2/token'
        })
      } catch (err) {
        next(err)
      }
      try {
        let paypaltoken = response.data.access_token
        let transaction = await axios({
          method: 'get',
          url:
            'https://api-m.paypal.com/v1/billing/subscriptions/' +
            user.paypalagreementid +
            '/transactions?start_time=' +
            today45ago +
            '&end_time=' +
            today,
          headers: {
            Authorization: 'Bearer ' + paypaltoken,
            'Content-Type': 'application/json'
          }
        })
        let list = transaction.data.transactions
        if (list[list.length - 1]) {// if any of these is true, then expiration is false
          if ( //case1:
            (list[list.length - 1].status == 'Completed' || list[list.length - 1].status == 'COMPLETED')
            || //case2: sometimes the transaction list has a final record of updated payment
            (
              (list[list.length - 1].status == 'Updated' || list[list.length - 1].status == 'UPDATED') &&
              (list[list.length - 2].status == 'Completed' || list[list.length - 2].status == 'COMPLETED')
            )
            || //case3: sometimes the transaction list has a final record of updated payment
            (
              (list[list.length - 1].status == 'Created' || list[list.length - 1].status == 'CREATED') &&
              (list[list.length - 2].status == 'Completed' || list[list.length - 2].status == 'COMPLETED')
            )
          ) {
            return false
          }
        }
      } catch (err) {
        next(err)
      }
    }
    return true
  }

  async function activeuser(id, set) {
    try {
      let query =
        'UPDATE `user` SET `active`=? WHERE `id`=?'
      let param = [
        set,
        id
      ]
      mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
    if (set = 0) {
      console.log('you should send an email to ' + JSON.stringify(id))
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
      if (!user[0]) {
        console.log(' ' + JSON.stringify('Either the mail is wrong, or the token/password expired, or other problem occurred. Exiting.'))
        res.status(500).send('Either the mail is wrong, or the token/password expired, or other problem occurred. Exiting.')
      }
      console.log('About to start the password recovering for user: ' + JSON.stringify(user[0]))
      recoverpassword(user[0])
    } catch (err) {
      next(err)
    }
  } else if (req.body.token) {
    setuppassword()
  } else {
    console.log(' ' + JSON.stringify('No mail nor token, exiting.'))
    res.status(500).send('No mail nor token, exiting.')
  }
  async function recoverpassword(user) {
    console.log('recover password function for user: ' + JSON.stringify(user))
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
        port: process.env.SMTPPORT,
        secure: true,
        auth: {
          user: process.env.MAILUSER,
          pass: process.env.MAILPASSWORD
        }
      })
      const mailOptions = {
        from: '"Cooperacy Website - Password Tool" <websitemails@cooperacy.org>',
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
      console.log(' ' + JSON.stringify('Auth Token Wrong or Expired'))
      return res.status(401).send(err + ': Auth Token Wrong or Expired')
    }
    var { id, newpassword } = jwt.decode(req.body.token)
    try {
      let newhashedpassword = await bcrypt.hash(newpassword, 10)
      let query = 'UPDATE `user` SET `password`=? WHERE `id`=?'
      let param = [newhashedpassword, id]
      await mypool.execute(query, param)
      console.log('It ' + JSON.stringify('should be updated...'))
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

app.post('/cooperation', async function (req, res, next) {
  if (req.body.created) req.body.created = req.body.created.replace(
    /T|Z/gm,
    function (x) {
      if (x == 'T') return ' '
      if (x == 'Z') return ''
    }
  )
  let param = [
    req.body.mode,
    req.body.category,
    req.body.title,
    req.body.country,
    req.body.place,
    req.body.brief,
    req.body.content,
    req.body.video,
    req.body.anonymous,
    req.body.parent,
    req.body.author,
    req.body.collect,
    req.body.budget,
    req.body.hudget
  ]
  if (req.body.id == 'new') {//checks if cooperation exists
    try {
      let query = 'SELECT * FROM `cooperation` WHERE `cooperation`.`title`= ? LIMIT 1'
      let titlecheck = [req.body.title]
      const [cooperation] = await mypool.execute(query, titlecheck)
      if (cooperation[0]) {
        res.status(200).send('exists')
      } else {
        addcooperation()
      }
    } catch (err) {
      next(err)
    }
  } else {//deactivate case
    if (req.body.mode < 0) { //if we deactivate, we need to copy the state of the cooperation before archiviation
      let deparam = param.slice(0)
      deparam.unshift(req.body.id)//we need req.body.id for the registry
      deparam.push(
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
      let query = 'INSERT INTO `cooperationregistry` (`cooperationid`,`mode`,`category`,`title`,`country`,`place`,`brief`,`content`,`video`,`anonymous`,`parent`,`author`,`collect`,`budget`,`hudget`,`professional`,`E`, `T`, `C`, `I`, `F`, `U`, `D`,`created`) VALUES (?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?)'
      await mypool.execute(query, deparam)
    }
    try {// if not, we just update it
      param.push(req.body.id)//we need req.body.id at the end here
      let query =
        'UPDATE `cooperation` SET `mode`=?,`category`=?,`title`=?,`country`=?,`place`=?,`brief`=?,`content`=?,`video`=?,`anonymous`=?,`parent`=?,`author`=?,`collect`=?,`budget`=?,`hudget`=? WHERE `cooperation`.`id`=?'
      await mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
    res.status(200).send({ id: req.body.id })
  }
  async function addcooperation() {
    try {
      let query =
        'INSERT INTO `cooperation` (`mode`,`category`,`title`,`country`,`place`,`brief`,`content`,`video`,`anonymous`,`parent`,`author`,`collect`,`budget`,`hudget`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
      const [cooperation] = await mypool.execute(query, param)
      res.status(200).send({ id: cooperation.insertId })
    } catch (err) {
      next(err)
    }
  }
})

app.post('/comment', async function (req, res, next) {
  if (req.body.id == 'new') {
    try {
      let query =
        'INSERT INTO `comment` (`parent`,`cooperation`,`user`,`content`) VALUES (?,?,?,?)'
      let param = [
        req.body.parent,
        req.body.cooperation,
        req.body.user,
        req.body.content
      ]
      const [comment] = await mypool.execute(query, param)
      notifycomment(req.body.cooperation)
      returncomment(comment)
    } catch (err) {
      next(err)
    }
  } else {
    try {
      let query =
        'UPDATE `comment` SET `parent`=?, `cooperation`=?, `user`=?, `content`=? WHERE `comment`.`id`=?'
      let param = [
        req.body.parent,
        req.body.cooperation,
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
  async function notifycomment(id) {
    const [cooperationtitle] = await mypool.execute(
      'SELECT `cooperation`.`title` from `cooperation` where `cooperation`.`id` = ?', [req.body.cooperation])
    let notifylist // we create a list of users that currently F-voted the cooperation
    try {
      let query =
        'SELECT `cooperationvote`.`user`, `cooperationvote`.`cooperation`,' +
        ' `cooperationvote`.`condition`, `user`.`name`, `user`.`surname`, `user`.`email` FROM `cooperationvote`' +
        ' LEFT JOIN `user` ON `cooperationvote`.`user` = `user`.`id`' +
        ' WHERE `cooperationvote`.`cooperation` = ? and `cooperationvote`.`condition` = ?'
      let param = [id, 'F']
      const [list] = await mypool.execute(query, param)
      notifylist = list
    } catch (err) {
      next(err)
    }
    for (let i = 0; i < notifylist.length; i++) {
      try {
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: process.env.SMTPPORT,
          secure: true,
          auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPASSWORD
          }
        })
        const mailOptions = {
          from: '"Cooperacy - Comment" <websitemails@cooperacy.org>',
          to: notifylist[i].email,
          subject: 'New comment in ' + cooperationtitle[0].title,
          html: 'Hello, ' + notifylist[i].name + ' ' + notifylist[i].surname + '!<br /><br />' +
            'You have a new notification relative to a new comment in the cooperation "' + cooperationtitle[0].title +
            '" that you are following. <a href="https://cooperacy.org/cooperation/' +
            notifylist[i].cooperation + '">Have a look at the cooperation</a> or read the comment here:<br /> ' +
            req.body.content + ' <br /><br /><br />'
        }
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.error(error)
          }
          console.log('Message %s sent: %s', info.messageId, info.response, mailOptions.to)
          res.render('index')
        })
      } catch (err) {
        next(err)
      }
    }
  }
})

app.post('/notification', async function (req, res, next) {
  let query
  let param
  let itemId
  let user
  for (let i = 0; i < req.body.array.length; i++) {
    itemId = req.body.array[i].id
    try {
      query = 'INSERT INTO `notification` (`user`,`author`,`comment`,`cooperation`,`condition`,`message`) VALUES (?,?,?,?,?,?)'
      param = [itemId, req.body.author, req.body.comment, req.body.cooperation, req.body.condition, req.body.message]
      await mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
    try {
      query = 'SELECT `email`, `name` from `user` where `user`.`id` = ? LIMIT 1'
      param = [itemId]
      user = await mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
    user = user[0][0]
    try {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: process.env.SMTPPORT,
        secure: true,
        auth: {
          user: process.env.MAILUSER,
          pass: process.env.MAILPASSWORD
        }
      })
      const mailOptions = {
        from: '"Cooperacy Website - Tagging" <websitemails@cooperacy.org>',
        to: user.email,
        subject: 'Notification from Cooperacy',
        html: 'Hello, ' + user.name + '<br /><br />' + 'you have a new notification relative to the cooperation ' +
          req.body.cooperation + ': someone tagged you. <a href="https://cooperacy.org/cooperation/' +
          req.body.cooperation + '">Have a look</a> or read the comment here:<br />' +
          req.body.message + '<br /><br /><br />'
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.error(error)
        }
        console.log('Message %s sent: %s', info.messageId, info.response, mailOptions.to)
        res.render('index')
      })
    }
    catch (err) {
      next(err)
    }
  }
  res.status(200).send('OK')

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
      req.body.birthdate = req.body.birthdate.replace(
        /T|Z/gm,
        function (x) {
          if (x == 'T') return ' '
          if (x == 'Z') return ''
        }
      )
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
            'INSERT INTO `cooperationvote` (`user`,`cooperation`,`condition`) VALUES (?,?,?,?)'
          let paramA = [useradded.insertId, '700', 'Announcements', 'F'] //700 is the Annoucements cooperation id
          mypool.execute(queryA, paramA)
        } catch (err) {
          next(err)
        }
        try {
          let query = 'UPDATE `cooperation` SET `F`=`F`+1 where `cooperation`.`id`=?'
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
      let query = 'INSERT INTO `tag` (`cooperation`,`name`) VALUES (?,?)'
      let param = [req.body.cooperation, req.body.name]
      const [tag] = await mypool.execute(query, param)
      res.status(200).send(tag)
    } catch (err) {
      next(err)
    }
  } else {
    try {
      let query = 'DELETE FROM `tag` where `cooperation` = ? and `name` = ?'
      let param = [req.body.cooperation, req.body.name]
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
    port: process.env.SMTPPORT,
    secure: true,
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASSWORD
    }
  })
  const mailOptions = {
    from: '"Cooperacy" <cooperacy@cooperacy.org>',
    to: req.body.to,
    subject: req.body.subject,
    html: { path: req.body.body }
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response, mailOptions.to)
    res.render('index')
  })
})

app.post('/contactemail', function (req, res) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: process.env.SMTPPORT,
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
      console.log('Message %s sent: %s', info.messageId, info.response, mailOptions.to)
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

app.post('/budgetstep', async function (req, res, next) {
  req.body.cooperation.created = req.body.cooperation.created.replace(
    /T|Z/gm,
    function (x) {
      if (x == 'T') return ' '
      if (x == 'Z') return ''
    })
  try {// creates new record in the cooperation registry with the budget step document link
    let query = 'INSERT INTO `cooperationregistry` (`cooperationid`,`mode`,`category`,`title`,`country`,`place`,`brief`,`content`,`video`,`anonymous`,`parent`,`author`,`collect`,`budget`,`budgetstep`,`professional`,`hudget`,`E`, `T`, `C`, `I`, `F`, `U`, `D`,`created`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    let param = [req.body.cooperation.id, req.body.cooperation.mode, req.body.cooperation.category, req.body.cooperation.title, req.body.cooperation.country, req.body.cooperation.place, req.body.cooperation.brief, req.body.cooperation.content, req.body.cooperation.video, req.body.cooperation.anonymous, req.body.cooperation.parent, req.body.cooperation.author, req.body.cooperation.collect, req.body.cooperation.budget, req.body.doc, req.body.cooperation.professional, req.body.cooperation.hudget, req.body.cooperation.E, req.body.cooperation.T, req.body.cooperation.C, req.body.cooperation.I, req.body.cooperation.F, req.body.cooperation.U, req.body.cooperation.D, req.body.cooperation.created]
    await mypool.execute(query, param)
  } catch (err) {
    next(err)
  }
  try {// then creates one week deadline event at the end of which if I went down, 
    // it does nothing, as another doc should be provided
    // if E went down cooperation remove some of its collected funds so it goes back collecting,  
    // in any case it creates a new registry record and moves 1 budget step forward
    await mypool.query('DROP EVENT IF EXISTS budgetstepcooperation' + req.body.cooperation.id)
    let query = 'CREATE EVENT budgetstepcooperation' + req.body.cooperation.id
      + ' ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 WEEK DO BEGIN' // (BEGIN 1)
      + '   DECLARE thiscooperation INT; DECLARE ivote INT; DECLARE e0 INT; DECLARE e1 INT;'
      + '   SET thiscooperation = ?; SET ivote = (SELECT `I` from cooperation where id=thiscooperation);'
      + '   IF ivote > 0 THEN SET ivote = ivote;' //if I vote, do nothing
      + '   ELSE BEGIN' //else (BEGIN 2):
      + '       SET e1 = (SELECT `E` from cooperation where id=thiscooperation);'
      + '       SET e0 = (SELECT `E` from cooperationregistry where cooperationid=thiscooperation and'
      + '         id = (SELECT max(id) from cooperationregistry where cooperationid=thiscooperation));'
      + '       IF e1 < e0 THEN' // first, if E unvoting, then drop some collected money
      + '         UPDATE `cooperation` SET `collect` = `collect` * e1/e0 where `id`=thiscooperation;'
      + '       END IF;' // after, go one step forward anyways, because the week passed and no I votes were issued
      + '       INSERT INTO `cooperationregistry` (`cooperationid`,`mode`,`category`,`title`,`country`,`place`,`brief`,`content`,'
      + '         `video`,`anonymous`,`parent`,`author`,`collect`,`budget`,`budgetstep`,`professional`,`hudget`,'
      + '         `E`, `T`, `C`, `I`,`F`, `U`, `D`,`created`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
      + '       UPDATE `cooperation` SET `mode` = `mode`+1  where `id`=thiscooperation;'
      + '     END;' // (END BEGIN 2)
      + '   END IF;' // (END IF/ELSE)
      + ' END;' // (END BEGIN 1)
    console.log('Create event ' + query)
    let param = [req.body.cooperation.id, req.body.cooperation.id, req.body.cooperation.mode, req.body.cooperation.category, req.body.cooperation.title, req.body.cooperation.country, req.body.cooperation.place, req.body.cooperation.brief, req.body.cooperation.content, req.body.cooperation.video, req.body.cooperation.anonymous, req.body.cooperation.parent, req.body.cooperation.author, req.body.cooperation.collect, req.body.cooperation.budget, 'passed', req.body.cooperation.professional, req.body.cooperation.hudget, req.body.cooperation.E, req.body.cooperation.T, req.body.cooperation.C, req.body.cooperation.I, req.body.cooperation.F, req.body.cooperation.U, req.body.cooperation.D, req.body.cooperation.created]
    await mypool.query(query, param)
    notifybudgetpass(req.body.cooperation.mode, req.body.cooperation.id)
    if (req.body.cooperation.mode > 101) { fundingstep(req.body.cooperation) }
  } catch (err) {
    next(err)
  }

  async function notifybudgetpass(special, id) {
    let notifylist // we create a list of users that currently F-voted the cooperation
    try {
      let query =
        'SELECT `cooperationvote`.`user`, `cooperationvote`.`cooperation`,' +
        ' `cooperationvote`.`condition`, `user`.`name`, `user`.`surname`, `user`.`email` FROM `cooperationvote`' +
        ' LEFT JOIN `user` ON `cooperationvote`.`user` = `user`.`id`' +
        ' WHERE `cooperationvote`.`cooperation` = ? and `cooperationvote`.`condition` = ?'
      let param = [id, 'F']
      const [list] = await mypool.execute(query, param)
      notifylist = list
    } catch (err) {
      next(err)
    }
    for (let i = 0; i < notifylist.length; i++) {
      try {
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: process.env.SMTPPORT,
          secure: true,
          auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPASSWORD
          }
        })
        const mailOptions = {
          from: '"Cooperacy Website - Budget Steps" <websitemails@cooperacy.org>',
          to: notifylist[i].email,
          subject: 'Notification from Cooperacy',
          html: 'Hello, ' + notifylist[i].name + ' ' + notifylist[i].surname + '!<br /><br />' +
            'You have a new notification relative to the cooperation ' +
            req.body.cooperation.title + ': a budget document link has been delivered!<br />' +
            '<a href="https://cooperacy.org/cooperation/' + notifylist[i].cooperation +
            '">Have a look</a>: you have three possible actions now: <br /><br />' +
            '1 Do nothing, as you\'re ok with the document provided, ' +
            'in one week the cooperation will go one step forward and probably get a part of the relative funding<br />' +
            '2 Remove your E-vote (equivalence, orange): the cooperation will go one step forward ' +
            'and probably get a part of the relative funding but after that it should recollect ' +
            'the part of money you contributed to pool, which instead goes back to the main collection fund<br />' +
            '3 Only in case of very important safety, transparency-related, legal or dramatic circustances ' +
            'you can halt the process clicking on the I-vote (transparency, turquoise) but remember ' +
            'in that case your name and your reasons will be publicly recorded, ' +
            'so if you really don\'t like something and you think it won\'t be useful ' +
            'to discuss it in the cooperation group then the 2nd point solution is the best.<br />' +
            '<br /><br /><br />'
        }
        if (special > 101) mailOptions.html += 'FUNDING NOTE: having your cooperation passed a budget step, you\'re going to receive the relative funding amount.<br /><br /><br />'
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.error(error)
          }
          console.log('Message %s sent: %s', info.messageId, info.response, mailOptions.to)
          res.render('index')
        })
      } catch (err) {
        next(err)
      }
    }
  }
  async function fundingstep(cooperationtbf) {
    let notifylist // we create a list of admins that should deliver the funds
    try {
      let query =
        'SELECT `user`.`email`, `user`.`name`, `user`.`surname` from `user` WHERE `user`.`role` = ?'
      let param = [1]
      const [list] = await mypool.execute(query, param)
      notifylist = list
    } catch (err) {
      next(err)
    }
    for (let i = 0; i < notifylist.length; i++) {
      try {
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: process.env.SMTPPORT,
          secure: true,
          auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPASSWORD
          }
        })
        const mailOptions = {
          from: '"Cooperacy Website Administration" <websitemails@cooperacy.org>',
          to: notifylist[i].email,
          subject: 'Notification from Cooperacy',
          html: 'Hello, ' + notifylist[i].name + ' ' + notifylist[i].surname + '!<br /><br />' +
            'You have a new ADMINISTRATION related notification relative to the cooperation ' +
            req.body.cooperation.title + ': you should deliver the relative funding amount.<br /><br /><br />' +
            'Techical details: ' + JSON.stringify(cooperationtbf) +
            ' <br /><br /><br />'
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.error(error)
          }
          console.log('Message %s sent: %s', info.messageId, info.response, mailOptions.to)
          res.render('index')
        })
      } catch (err) {
        next(err)
      }
    }
  }
  res.status(200).send('OK')
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
        'INSERT INTO `' + req.body.proptype + 'vote` (`user`,`condition`,`cooperation`'
      let param = [req.body.user, req.body.condition]
      if (req.body.proptype == 'cooperation') {
        query += ') VALUES (?,?,?)'
        param.push(req.body.id)
      }
      if (req.body.proptype == 'comment') {
        query += ',`comment`) VALUES (?,?,?,?)'
        param.push(req.body.cooperationid, req.body.id)
      }
      mypool.execute(query, param)
    } catch (err) {
      next(err)
    }

    //meanwhile the relative cooperation-comment condition value is updated
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
    if (req.body.proptype == 'cooperation' && req.body.condition == 'D') {
      try {
        let query = 'SELECT `D` from `cooperation` where `cooperation`.`id` = ?'
        let param = [req.body.id]
        const [diversity] = await mypool.execute(query, param)
        if ((diversity[0].D - Math.floor(diversity[0].D / 7) * 7) == 0) {
          let query = 'UPDATE `cooperation` SET `E` = `E` - 1 where `cooperation`.`id`=?'
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
        'INSERT INTO `removedcoovote` (`user`,`cooperation`,`condition`) VALUES (?,?,?)'
      let param = [req.body.user, req.body.id, req.body.condition]
      if (req.body.proptype == 'comment') {
        query =
          'INSERT INTO `removedcvote` (`user`,`comment`,`condition`,`cooperation`) VALUES (?,?,?,?)'
        param.push(req.body.cooperationid)
      }
      await mypool.execute(query, param)
    } catch (err) {
      next(err)
    }

    // every 7 diversity votes one equivalence vote is lost, 
    // so we recover it before removing the D vote:
    if (req.body.proptype == 'cooperation' && req.body.condition == 'D') {
      try {
        let query = 'SELECT `D` from `cooperation` where `cooperation`.`id` = ?'
        let param = [req.body.id]
        const [diversity] = await mypool.execute(query, param)
        if ((diversity[0].D - Math.floor(diversity[0].D / 7) * 7) == 0) {
          let query = 'UPDATE `cooperation` SET `E` = `E` + 1 where `cooperation`.`id`=?'
          let param = [req.body.id]
          await mypool.execute(query, param)
        }
      } catch (err) {
        next(err)
      }
    }

    //then the relative cooperation/comment condition value is updated
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
      'DELETE FROM `cooperationprofessional` where `user`=? and `cooperation`=? LIMIT 1'
    let param = [req.body.user, req.body.cooperation]
    var [removed] = await mypool.execute(query, param)
  } catch (err) {
    next(err)
  }
  if (removed.affectedRows == 1) {
    try {
      let query =
        'UPDATE `cooperation` SET `professional`=`professional`-1 where `cooperation`.`id`=?'
      let param = [req.body.cooperation]
      mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
    res.status(200).send('removed')
  } else {
    try {
      let query =
        'INSERT INTO `cooperationprofessional` (`cooperation`, `user`) VALUES (?,?)'
      let param = [req.body.cooperation, req.body.user]
      mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
    try {
      let query =
        'UPDATE `cooperation` SET `professional`=`professional`+1 where `cooperation`.`id`=?'
      let param = [req.body.cooperation]
      mypool.execute(query, param)
    } catch (err) {
      next(err)
    }
    res.status(200).send('added')
  }
})

app.post('/cooperationtool', async function (req, res, next) {
  let surveyoutput = await insertion()
  res.status(200).json({ id: surveyoutput })

  async function insertion() {
    try {
      let query =
        'INSERT INTO `cooperationtool` (`id`,`user`,`surveyid`,`cooperation`,`group`,`country`,`place`,`month`,`participant`,`title`,`desc`,`MBD`,`BD`,`MRD`,`RD`,`MBU`,`BU`,`MRU`,`RU`,`MBF`,`BF`,`MRF`,`RF`,`MBI`,`BI`,`MRI`,`RI`,`MBC`,`BC`,`MRC`,`RC`,`MBX`,`BX`,`MRX`,`RX`,`MBH`,`BH`,`MRH`,`RH`,`MBT`,`BT`,`MRT`,`RT`,`MBE`,`BE`,`MRE`,`RE`,`P`,`PText`,`PD`,`PDText`,`PU`,`PUText`,`PF`,`PFText`,`PI`,`PIText`,`PC`,`PCText`,`PT`,`PTText`,`PE`,`PEText`,`PFinal`,`PFinalText`) VALUES (?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?)'
      let param = [req.body.id, req.body.user, req.body.surveyid, req.body.cooperation, req.body.group, req.body.country, req.body.place, req.body.month, req.body.participant, req.body.title, req.body.desc, req.body.MBD, req.body.BD, req.body.MRD, req.body.RD, req.body.MBU, req.body.BU, req.body.MRU, req.body.RU, req.body.MBF, req.body.BF, req.body.MRF, req.body.RF, req.body.MBI, req.body.BI, req.body.MRI, req.body.RI, req.body.MBC, req.body.BC, req.body.MRC, req.body.RC, req.body.MBX, req.body.BX, req.body.MRX, req.body.RX, req.body.MBH, req.body.BH, req.body.MRH, req.body.RH, req.body.MBT, req.body.BT, req.body.MRT, req.body.RT, req.body.MBE, req.body.BE, req.body.MRE, req.body.RE, req.body.P, req.body.PText, req.body.PD, req.body.PDText, req.body.PU, req.body.PUText, req.body.PF, req.body.PFText, req.body.PI, req.body.PIText, req.body.PC, req.body.PCText, req.body.PT, req.body.PTText, req.body.PE, req.body.PEText, req.body.PFinal, req.body.PFinalText]
      if (req.body.pairing) {
        query = 'UPDATE `cooperationtool` SET `id` = ?,`user` = ?,`surveyid` = ?,`cooperation` = ?,`group` = ?,`country` = ?,`place` = ?,`month` = ?,`participant` = ?,`title` = ?,`desc` = ?,`MBD` = ?,`BD` = ?,`MRD` = ?,`RD` = ?,`MBU` = ?,`BU` = ?,`MRU` = ?,`RU` = ?,`MBF` = ?,`BF` = ?,`MRF` = ?,`RF` = ?,`MBI` = ?,`BI` = ?,`MRI` = ?,`RI` = ?,`MBC` = ?,`BC` = ?,`MRC` = ?,`RC` = ?,`MBX` = ?,`BX` = ?,`MRX` = ?,`RX` = ?,`MBH` = ?,`BH` = ?,`MRH` = ?,`RH` = ?,`MBT` = ?,`BT` = ?,`MRT` = ?,`RT` = ?,`MBE` = ?,`BE` = ?,`MRE` = ?,`RE` = ?,`P` = ?,`PText` = ?,`PD` = ?,`PDText` = ?,`PU` = ?,`PUText` = ?,`PF` = ?,`PFText` = ?,`PI` = ?,`PIText` = ?,`PC` = ?,`PCText` = ?,`PT` = ?,`PTText` = ?,`PE` = ?,`PEText` = ?,`PFinal` = ?,`PFinalText` = ? WHERE `id` = ?'
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

app.post('/budgetcheck', async function (req, res, next) {
  //this function moved from db due to email notification, can be set as a serverside routine
  let completedcoo
  let query
  let param
  try {
    query = 'SELECT * FROM `cooperationregistry` WHERE `budgetstep` = \'budgetcrossed\''
    const [check] = await mypool.execute(query)
    completedcoo = check
  } catch (err) {
    next(err)
  }
  for (let i = 0; i < completedcoo.length; i++) {
    try {
      query = 'UPDATE `cooperationregistry` SET `budgetstep` = \'budgetcrossed-mailsent\''
        + ' WHERE `id` = ? and `budgetstep` = \'budgetcrossed\''
      param = [completedcoo[i].id]
      mypool.execute(query, param)
      notifycoo(completedcoo[i].cooperationid, completedcoo.title)
    } catch (err) {
      next(err)
    }
  }
  async function notifycoo(id, cooperationtitle) {
    let notifylist // we create a list of users that currently F-voted the cooperation
    try {
      let query =
        'SELECT `cooperationvote`.`user`, `cooperationvote`.`cooperation`,' +
        ' `cooperationvote`.`condition`, `user`.`name`, `user`.`surname`, `user`.`email` FROM `cooperationvote`' +
        ' LEFT JOIN `user` ON `cooperationvote`.`user` = `user`.`id`' +
        ' WHERE `cooperationvote`.`cooperation` = ? and `cooperationvote`.`condition` = ?'
      let param = [id, 'F']
      const [list] = await mypool.execute(query, param)
      notifylist = list
    } catch (err) {
      next(err)
    }
    for (let i = 0; i < notifylist.length; i++) {
      try {
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: process.env.SMTPPORT,
          secure: true,
          auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPASSWORD
          }
        })
        const mailOptions = {
          from: '"Cooperacy Website - Budget Line Crossing" <websitemails@cooperacy.org>',
          to: notifylist[i].email,
          subject: 'Notification from Cooperacy',
          html: 'Hello, ' + notifylist[i].name + ' ' + notifylist[i].surname + '!<br /><br />' +
            'You have a new notification relative to the cooperation ' +
            cooperationtitle + ': the collected money crossed the final budget line!<br />' +
            '<a href="https://cooperacy.org/cooperation/' + notifylist[i].cooperation +
            '">Have a look</a> and prepare the relative documentation to get funded! <br /><br /><br />'
        }
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.error(error)
          }
          console.log('Message %s sent: %s', info.messageId, info.response, mailOptions.to)
          res.render('index')
        })
      } catch (err) {
        next(err)
      }
    }
  }
  res.status(200).send('OK')
})

//admin

app.post('/resetvoting', async function (req, res, next) {
  var proptype = ['cooperation', 'comment', 'user']
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

DROP TRIGGER IF EXISTS `gotobudgetsteps`;
DELIMITER ;;
CREATE TRIGGER `gotobudgetsteps` BEFORE UPDATE ON `cooperation` FOR EACH ROW
BEGIN
  IF new.`collect` >= new.`budget` AND new.`mode` > 100 AND new.collect != old.collect THEN
  BEGIN
    SET new.`collect` = new.`budget`;
        INSERT INTO `cooperationregistry`
              (`cooperationid`,`mode`,`category`,`title`,`country`,`place`,
        `brief`,`content`,`video`,`anonymous`,`parent`,`author`,
              `collect`,`budget`,`budgetstep`,`professional`,`hudget`,
              `E`,`T`,`C`,`I`,`F`,`U`,`D`,`created`)
      VALUES (new.`id`,new.`mode`,new.`category`,new.`title`,new.`country`,new.`place`,
      new.`brief`,new.`content`,new.`video`,new.`anonymous`,new.`parent`,new.`author`,
    new.`collect`,new.`budget`,'budgetcrossed',new.`professional`,new.`hudget`,
      new.`E`,new.`T`,new.`C`,new.`I`,new.`F`,new.`U`,new.`D`,new.`created`);
  END;
  END IF;
END ;;
DELIMITER ;


ALTER TABLE `coo`.`cooperation`
CHANGE COLUMN `O2` `O2` DECIMAL(3,2) GENERATED ALWAYS AS
(ROUND((
  (1/(1+exp(5-40*(D/n)))+1/(1+exp(-5+20*((D/n)-(U/n))))+(D/n))/3 +
  abs((C-T)/n)*1/(1+EXP(-1-5*(C-T)/n))+(1-abs((C-T)/n))*(U/n) +
    ((F/n)+1/(1+EXP(5-10*(T))))/2*1/(1+EXP(-5-20*((n-I)/n*(C-T)/n))) +
    GREATEST(LEAST(  ( 1/(1+EXP(-5+20*abs((C-T)/n)))*abs((C-T)/n)+I*(1-abs((C-T)/n)) ) *1/(1+EXP(5-15*(E/n))), 0.9), 0.1) +
    LEAST(C/POW(ln(50),exp(1)),1) +
    T/n+((n-I)/n*(C-T)/n)/2 +
    E/n
)/7,2)) STORED ;

-- T	= (T+add+T)/2 = T+add/2 = T/n+(n-I)/n*(C-T)/n/2
-- C 	= LEAST(C/POW(ln(50),exp(1)),1)
-- I 	= GREATEST(LEAST(  ( 1/(1+EXP(-5+20*abs((C-T)/n)))*abs((C-T)/n)+I*(1-abs((C-T)/n)) ) *1/(1+EXP(5-15*(E))), 0.9), 0.1)
-- F	= (F+1/(1+EXP(5-10*(T))))/2*1/(1+EXP(-5-20*((n-I)/n*(C-T)/n)))
-- add 	= (n-I)/n*(C-T)/n
-- U 	= abs((C-T)/n)*1/(1+EXP(-1-5*(C-T)/n))+(1-abs((C-T)/n))*(U/n)
-- err 	= (C-T)/n
-- D* 	= (1/(1+exp(5-40*(D/n)))+1/(1+exp(-5+20*((D/n)-(U/n))))+(D/n))/3
-- Du 	= 1/(1+exp(-5+20*((D/n)-(U/n))))
-- Dd 	= 1/(1+exp(5-40*(D/n)))

ALTER TABLE `coo`.`cooperation`
CHANGE COLUMN `O` `O` DECIMAL(3,2) GENERATED ALWAYS AS
(ROUND(
  (0.3*( 1/(1+exp(5-40*(D/n))) + 1/(1+exp(-5+20*((D/n)-(U/n)))) + (D/n) )/3
  +0.3*(
    abs	( 			LEAST(C/POW(ln(n),exp(1)),1)-(T/n) )*
    1/(1+EXP(-1-5*( LEAST(C/POW(ln(n),exp(1)),1)-(T/n) )))+
    (1-abs(			LEAST(C/POW(ln(n),exp(1)),1)-(T/n) )) *(U/n)
  )
    +0.3*( T/n+(n-
      1/(1+EXP(-5+20*abs((C-T)/n)))*abs((C-T)/n)+(I+C)/(2*n)*(1-abs((C-T)/n))
      )*
      (					LEAST(C/POW(ln(n),exp(1)),1)-(T/n) )/2
  )
    +0.1*E/n	) *
    1/( 1+( 1-((F/n)+1/(1+EXP(5-10*(T))))/2 * 1/(1+EXP(-5-20*((n-I)/n*(C-T)/n))) ) )
,2)) STORED ;

-- T	  = (T+add+T)/2 = T+add/2 = T/n+(n-I)/n*(C-T)/n/2
-- C 	  = LEAST(C/POW(ln(n),exp(1)),1)
-- I 	  = 1/(1+EXP(-5+20*abs((C-T)/n)))*abs((C-T)/n)+(I+C)/(2*n)*(1-abs((C-T)/n)))
-- F	  = (F+1/(1+EXP(5-10*(T))))/2*1/(1+EXP(-5-20*((n-I)/n*(C-T)/n)))
-- add 	= err*I = (n-I)/n*(C-T)/n
-- U 	  = abs((C-T)/n)*1/(1+EXP(-1-5*(C-T)/n))+(1-abs((C-T)/n))*(U/n)
-- err 	= (C-T)/n
-- D* 	= (1/(1+exp(5-40*(D/n)))+1/(1+exp(-5+20*((D/n)-(U/n))))+(D/n))/3
-- Du 	= 1/(1+exp(-5+20*((D/n)-(U/n))))
-- Dd 	= 1/(1+exp(5-40*(D/n)))

*/
