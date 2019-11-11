var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
var axios = require('axios')
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

app.get('/project', async function(req, res, next) {
  try {
    let query = 'SELECT * FROM `project`'
    let param = []

    if (req.query.limit) {
      query += ' WHERE `id`=?'
      param = [req.query.projectid + req.query.limit]
    } else if (req.query.stage) {
      query += ' WHERE `stage`=?'
      param.push(req.query.stage)
    }

    const [project] = await mypool.execute(query, param)
    res.send(project)
  } catch (err) {
    next(err)
  }
})

app.get('/comment', async function(req, res, next) {
  try {
    let query =
      'SELECT comment.*, user.name, user.surname FROM comment' +
      ' LEFT JOIN user ON comment.user = user.id' +
      ' WHERE comment.project = ? ORDER BY id DESC'
    let param = [req.query.projectid]
    const [comment] = await mypool.execute(query, param)
    res.send(comment)
  } catch (err) {
    next(err)
  }
})

app.get('/userproject', async function(req, res, next) {
  try {
    let query =
      'SELECT * FROM `project` WHERE `id` IN (SELECT `project` FROM `userproject` WHERE `user`=?)'
    let param = [req.query.userid]
    const [project] = await mypool.execute(query, param)
    res.send(project)
  } catch (err) {
    next(err)
  }
})

app.get('/uservote', async function(req, res, next) {
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
    res.send(uservote)
  } catch (err) {
    next(err)
  }
})

app.get('/user', async function(req, res, next) {
  req.headers.authorization = req.headers.authorization.slice(7)

  if (req.headers.authorization == 'undefined') {
    return res.status(500).send('JWT is undefined')
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
      res.send({ user: user[0] })
    } catch (err) {
      next(err)
    }
  }
})

app.get('/userlist', async function(req, res, next) {
  try {
    let query =
      'SELECT `id`,`name`,`surname`,`email`,' +
      '`E`,`T`,`C`,`I`,`F`,`U`,`D`,`active`,`role`,' +
      '`paymentdeadline`,`paypalagreementid`,`created`,`updated` FROM `user`'
    let param = []
    const [userlist] = await mypool.execute(query, param)
    res.send(userlist)
  } catch (err) {
    next(err)
  }
})

app.get('/tag', async function(req, res, next) {
  try {
    let query = 'SELECT * FROM `tag` where `project`=?'
    let param = [req.query.projectid]
    const [tag] = await mypool.execute(query, param)
    res.send(tag)
  } catch (err) {
    next(err)
  }
})

app.get('/place', async function(req, res, next) {
  try {
    let query = 'SELECT `id`, `country`, `name` FROM `place`'
    let param = []
    const [place] = await mypool.execute(query, param)
    res.send(place)
  } catch (err) {
    next(err)
  }
})

app.get('/country', async function(req, res, next) {
  try {
    let query = 'SELECT `id`, `name` FROM `country`'
    let param = []
    const [country] = await mypool.execute(query, param)
    res.send(country)
  } catch (err) {
    next(err)
  }
})

app.get('/news', async function(req, res, next) {
  try {
    let query = 'SELECT * FROM `news` ORDER BY `news`.`date` DESC'
    let param = []
    const [news] = await mypool.execute(query, param)
    res.send(news)
  } catch (err) {
    next(err)
  }
})

/////// UPDATE ///////

app.put('/user', async function(req, res, next) {
  if (!req.body.name || !req.body.password) {
    res.status(400)
    res.send({ error: 'Bad data' })
  } else {
    bcrypt.hash(req.body.password, 10, async function(err, hash) {
      req.body.password = hash
      try {
        let query =
          'UPDATE `user` SET `name`=?,`surname`=?,`email`=?,`password`=? WHERE `id`=?'
        let param = [
          req.body.name,
          req.body.surname,
          req.body.email,
          req.body.password,
          req.body.id
        ]
        const [user] = await mypool.execute(query, param)
        res.send('updated: ' + user)
      } catch (err) {
        next(err)
      }
    })
  }
})

/////// POST ///////

app.post('/login', async function(req, res, next) {
  try {
    let query = 'SELECT * FROM `user` WHERE `user`.`email`= ? LIMIT 1'
    let param = [req.body.email]
    const [user] = await mypool.execute(query, param)
    logincheck(user[0])
  } catch (err) {
    next(err)
  }
  async function logincheck(user) {
    if (!user) {
      res.status(400).json({ error: 'User does not exist' })
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let accessToken = jwt.sign({ id: user.id }, process.env.JWTSECRET, {
          expiresIn: '2h'
        })
        let today = new Date(Date.now()).toJSON().slice(0, 10)
        // bank transfer membership
        if (user.paypalagreementid == 'bank') {
          if (!user.paymentdeadline) {
            return res.status(500).send("The user hasn't been activated yet.")
          }
          if (user.paymentdeadline.toJSON().slice(0, 10) >= today) {
            res.send({ token: { accessToken } })
          } else {
            res.status(401).send('Bank transfer membership has expired')
          }
        } else {
          // paypal membership check
          try {
            let agreementid = user.paypalagreementid
            let today45ago = new Date(Date.now() + -45 * 24 * 3600 * 1000)
              .toJSON()
              .slice(0, 10)
            let response = await axios({
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
            let paypaltoken = response.data.access_token
            let transaction = await axios({
              method: 'get',
              url:
                'https://api.paypal.com/v1/payments/billing-agreements/' +
                agreementid +
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
              res.send({ token: { accessToken } })
            } else if (
              list[list.length - 1].status == 'Updated' &&
              list[list.length - 2].status == 'Completed'
            ) {
              res.send({ token: { accessToken } })
            } else {
              res.send('Paypal membership has expired or has been suspended')
            }
          } catch (err) {
            next(err)
          }
        }
      }
    }
  }
})

app.post('/logout', (req, res) => {
  res.send({ status: 'OK' })
})

app.post('/checkpassword', async function(req, res, next) {
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
      if (bcrypt.compareSync(req.body.password, user.password)) res.send(true)
      else res.send(false)
    } else res.send(false)
  }
})

app.post('/recoverpassword', async function(req, res, next) {
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
    res.status(404).send('No mail nor token, exiting.')
  }
  async function recoverpassword(user) {
    //this happens when the user wants to change his password
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
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.error(error)
        }
        console.log('Message %s sent: %s', info.messageId, info.response)
        res.render('index')
      })
    } else {
      res.send('No user with this email')
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
      res.send('updated')
    } catch (err) {
      next(err)
    }
  }
})

app.post('/place', async function(req, res, next) {
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
      res.send('exists')
    } else {
      try {
        let query = 'INSERT INTO `place` (`country`,`name`) VALUES (?,?)'
        let param = [req.body.country, req.body.name]
        const [place] = await mypool.execute(query, param)
        res.send({ id: place.insertId })
      } catch (err) {
        next(err)
      }
    }
  }
})

app.post('/project', async function(req, res, next) {
  if (req.body.id != 'new') {
    try {
      let query =
        'UPDATE `project` SET `name`=?,`country`=?,`place`=?,`brief`=?,`content`=?,`video`=?,`anonymous`=?,`parent`=?,`stage`=?,`budget`=?,`hudget`=? WHERE `project`.`id`=?'
      let param = [
        req.body.name,
        req.body.country,
        req.body.place,
        req.body.brief,
        req.body.content,
        req.body.video,
        req.body.anonymous,
        req.body.parent,
        req.body.stage,
        req.body.budget,
        req.body.hudget,
        req.body.id
      ]
      await mypool.execute(query, param)
      res.send({ id: req.body.id })
    } catch (err) {
      next(err)
    }
  } else {
    try {
      let query = 'SELECT * FROM `project` WHERE `project`.`name`= ? LIMIT 1'
      let param = [req.body.name]
      const [project] = await mypool.execute(query, param)
      if (project[0]) {
        res.send('exists')
      } else {
        addproject()
      }
    } catch (err) {
      next(err)
    }
  }
  async function addproject() {
    try {
      let query =
        'INSERT INTO `project` (`name`,`country`,`place`,`brief`,`content`,`video`,`anonymous`,`parent`,`stage`,`budget`,`hudget`)' +
        ' VALUES (?,?,?,?,?,?,?,?,?,?,?)'
      let param = [
        req.body.name,
        req.body.country,
        req.body.place,
        req.body.brief,
        req.body.content,
        req.body.video,
        req.body.anonymous,
        req.body.parent,
        req.body.stage,
        req.body.budget,
        req.body.hudget
      ]
      const [project] = await mypool.execute(query, param)
      res.send({ id: project.insertId })
    } catch (err) {
      next(err)
    }
  }
})

app.post('/comment', async function(req, res, next) {
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
      res.send(comment[0])
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
      res.send(comment[0])
    } catch (err) {
      next(err)
    }
  }
})

app.post('/user', async function(req, res, next) {
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
      res.send('exists')
    } else {
      let hashed = await bcrypt.hash(req.body.password, 10)
      try {
        let query =
          'INSERT INTO `user` (`name`,`surname`,`email`,`password`,`paypalagreementid`) VALUES (?,?,?,?,?)'
        let param = [
          req.body.name,
          req.body.surname,
          req.body.email,
          hashed,
          req.body.paypalagreementid
        ]
        const [user] = await mypool.execute(query, param)
        res.send({ id: user[0].insertId })
      } catch (err) {
        next(err)
      }
    }
  }
})

app.post('/tag', async function(req, res, next) {
  if (req.body.tag == 'add') {
    try {
      let query = 'INSERT INTO `tag` (`project`,`name`) VALUES (?,?)'
      let param = [req.body.project, req.body.name]
      const [tag] = await mypool.execute(query, param)
      res.send(tag)
    } catch (err) {
      next(err)
    }
  } else {
    try {
      let query = 'DELETE FROM `tag` where `project` = ? and `name` = ?'
      let param = [req.body.project, req.body.name]
      const [tag] = await mypool.execute(query, param)
      res.send(tag)
    } catch (err) {
      next(err)
    }
  }
})

app.post('/image', async function(req, res, next) {
  try {
    var uploadPath =
      './assets/image/' + req.body.proptype + '/' + req.body.id + '.png'
    req.files.file.mv(uploadPath)
  } catch (err) {
    next(err)
  }
  try {
    jimp.read(uploadPath).then(function(uploadPath) {
      return uploadPath
        .resize(256, 256)
        .quality(60)
        .write(uploadPath)
    })
    res.send({ status: 'OK', id: req.body.id })
  } catch (err) {
    next(err)
  }
})

app.post('/newuseremail', function(req, res) {
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

app.post('/contactemail', function(req, res) {
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

app.post('/cci', async function(req, res, next) {
  try {
    let query = 'SELECT * FROM `CCI' + req.body.cciyear + '`'
    let param = []
    const [CCI] = await mypool.execute(query, param)
    res.send(CCI)
  } catch (err) {
    next(err)
  }
})
app.get('/map', async function(req, res, next) {
  try {
    let query = 'SELECT * FROM `CCI2017`'
    let param = []
    const [CCI] = await mypool.execute(query, param)
    let ccimakeup = {}
    for (let i = 0; i < CCI.length; i++) {
      let country = CCI[i]['country']
      ccimakeup[country] = CCI[i]
    }
    res.send(ccimakeup)
  } catch (err) {
    next(err)
  }
})

app.post('/vote', async function(req, res, next) {
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
  res.send('OK')

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
          mypool.execute(query, param)
        } catch (err) {
          next(err)
        }
      }
    }
    if (req.body.condition == 'F' && req.body.proptype == 'project') {
      //meanwhile we add every platform effect the vote may have
      try {
        let query = 'INSERT INTO `userproject` (`user`,`project`) VALUES (?,?)'
        let param = [req.body.user, req.body.id]
        mypool.execute(query, param)
      } catch (err) {
        next(err)
      }
      try {
        let query =
          'UPDATE `project` SET `participant`=`participant`+1 where `project`.`id`=?'
        let param = [req.body.id]
        mypool.execute(query, param)
      } catch (err) {
        next(err)
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
    //finally, we revoke every platform effect the vote may have had:
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
    if (req.body.condition == 'F' && req.body.proptype == 'project') {
      try {
        let query =
          'DELETE FROM `userproject` where `user` = ? and `project` = ?'
        let param = [req.body.user, req.body.id]
        mypool.execute(query, param)
      } catch (err) {
        next(err)
      }
      try {
        let query =
          'UPDATE `project` SET `participant`=`participant`-1 where `project`.`id`=?'
        let param = [req.body.id]
        mypool.execute(query, param)
      } catch (err) {
        next(err)
      }
    }
  }
})

//admin

app.post('/resetvoting', async function(req, res, next) {
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
          if (userid == 7) {
            console.log('cycleid ' + JSON.stringify(values[cc[c]]))
          }
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
  res.send('OK')
})

//error function triggered by next
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
  console.log('nexterr: ' + JSON.stringify(err))
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
