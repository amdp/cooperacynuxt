# THE COOPERACY CODERS LEARNING GAME

![Image](/assets/image/github/image3.png)


## FINAL LEVEL: START DEVELOPING!

THE CONTACT FORM

Let's try to re-make the CONTACT FORM on our own.
First of all, let's open db.js.
You'll see in the first lines
many declarations.
Express, bodyparser, till Mysql2 are
tools node uses to handle the 
requests, do server stuff etc.
The first lines are thus for 
server node functionalities.


app.xx is the Express object 
that calls the different functions:

"app.get" corresponds to GET XMLHTTP axios requests

"app.post" to POST XMLHTTP requests and so on


mydb is the mysql connection,

mydb.execute() is to issue 
commands to the mysql server
and databases.


req and res are two very important
variables relative to the request 
and the response of the server

So if you see res.send(), the server
is sending the response to the client.

If you see req.body.user, you are
referencing the BODY of the request
and pointing to the "user" variable
that you sent to the server.

The 'SELECT blabla' lines are SQL
commands or queries sent to MYSQL.

The contact page should be easier
to develop as it has no MYSQL call
but goes to the server to 
send an email, so it is our first
developer challenge.

The page you wanna start with is
contactform.vue, just have a look
copy it and rename it contactform2.vue
with an empty file.

Try to clear all of it and 
write it your own way.
You need to enter the html part
and the script one.

You would optionally need then to insert a 
google captcha too.

You can use all the other vue pages
as hints. For example, useredit.vue 
could be used as hint for creating
the form instead of copying the
contactform itself.

As you see, we should use 
VUE BOOTSTRAP HTML TAGS
so remember to 
turn the usual `<div class="row">`
into `<b-row>`.
 
Read about vue bootstrap here:
https://bootstrap-vue.js.org/docs/components

SCRIPT PART

So, as you see, in useredit.vue
you have the list of the form 
variables in data(){return{.. }


So try to create some vue bootstrap
form and add all its variables
in the script part into the 
data() function.


The middleware: ['auth'] 
is just to make it private,
that is, for logged in members,
so you should remove it.


methods: { ..}, as we know,
is for js functions.

You should make only one 
function connected to the form
that sends the contact 
form info to the server so that
the server sends the email to 
cooperacy@cooperacy.org.


How do we do that?
We simply copy the way
useredit "edits" the user.

You will see this:


         `    async userUpdate(){
      var updateUser = await this.$store.dispatch('updateUserAction', { 
        id: this.id,
        name: this.formName,
        surname: this.formSurname,
        email: this.formEmail,
        password: this.formPassword,
      })`
        
this is the function that starts
from the form (look for "submit"
or "prevent" to find out where the
function is called.)      
In the function the "dispatch" 
triggers the action
in /store/index.js and after the
name of the action and the COMMA,
you insert the data to be sent, 
in this case
data that corresponds to the
form variables.
You send them to the PAYLOAD object 
that you will find in the VUEX action:


`    { 
        id: this.id,
        name: this.formName,
        surname: this.formSurname,
        email: this.formEmail,
        password: this.formPassword,
      })`
      

this part is clear: form form data
it becomes data for the server. 
This is what in the VUEX action 
will be called "payload".


VUEX PAYLOAD

What is a payload? Do you remember
the anaology with the market
and the ships? Payload is what
the ships load, carry and deliver
to the server.

Payload is the container 
of the DATA that you pass 
to the VUEX ACTION
or mutation etc.
It is JUST A TERM.
VUEX likes to call it PAYLOAD.
it could be BOX, CONTAINER, HEIDI..
Being VUEX a "store"
like a place where you store stuff
payload is like stuff,
so you send the pack with 
the data inserted in the VUE form
to the "store".

The pack is called payload 
and awaits to be sent and 
receive something back.
The ACTION sends the payload 
to the server.


To send the contact email, you need 
to create a new VUEX action in the
/store/index.js. Call it 
contactAction2 and steal from this:


  `newuserAction: async (context, payload) => {let {data} = await axios.post(process.env.DBURL+'/user', payload)
    let go = {to: payload.email, subject: 'user registration confirmation', body: 'You have been registered.'}
    axios.post(process.env.DBURL+'/email', go); return data },`
    

`newuserAction: async (context, payload) => {`
is the standard for a vuex action in nuxt:
payload is the array or object in
which you insert all the form data
you retreive in the vue page.
Remember to update the "dispatch" in
the VUE page with the right VUEX
action name you just created.


Try to make your contact form
slightly different than the previous!


So, set the Action up in vuex
and prepare the "dispatch" in the
vue page to deliver the "payload"
to the VUEX store.

If you want to see what is inside
of a payload, you can use:

`console.log('payload: '+JSON.stringify(payload))`

in the /store/index.js function.
Of course you can use it for many
other debugging, but remember you
cannot use it with req.body in the
db.js file!


SERVERSIDE

Now comes the final part: NODE.
Go to db.js, you'll find this 
function to steal from and use
for your contact form:


```
app.post('/newuseremail', function (req, res) {let transporter=nodemailer.createTransport({host:'ENTER YOUR SMTP like  smtp.gmail.com',port:465,secure:true, 
  auth:{user:'process.env.MAILUSER',pass:'process.ENV.MAILPASSWORD'}}) /* to add html in mailOptions use " html: '<b>test</b>' " */
  let mailOptions = {from: '"Cooperacy" <cooperacy@cooperacy.org>', to:req.body.to, subject:req.body.subject, text:req.body.body}
  transporter.sendMail(mailOptions, (error, info) => { if (error) { return console.error(error) }
      console.log('Message %s sent: %s', info.messageId, info.response); res.render('index') })}) 
```


This function uses nodemailer,
a module to send emails via
nodejs/express.
It's one of the constants we defined 
in the top of the db.js file.

This function SENDS a mail 
to the user when s/he registers.

What we want instead is to SEND 
a mail to cooperacy@cooperacy.org
with some text in the contact
form box.
So `auth:{user:xx,pass:xx}` is fine,
while `from: '"Cooperacy" 
<cooperacy@cooperacy.org>'`, 
is wrong, I mean it is ok for the 
user function in db.js right now
but not for the one you should make!

The contact form is simply a mail 
you send to get some info
now let's focus on req.body


The bodyParser module 
transforms the payload
you sent via the VUEX
store, into variables called
request body, or, in short,
req.body.

So if payload has payload.to 
payload.baby and payload.mom
you will have req.body.to 
req.body.baby and req.body.mom.

It is just copying the VUEX
payload into something called req.body.

So now just duplicate the email function
and try to make that function to send
via your smtp server and using
your credentials a mail to
cooperacy@cooperacy.org

If you need to know if you sent an 
email, just check on your sent emails
folder.


Alright, time to code it down and test it!
Did you manage to send a contact email?
If you did it, move your name and email to
the "CONTRIBUTORS" level!!
Please also add your current COUNTRY!

If you didn't manage, don't worry,
write us in the discord channel and we
will help you out!

CONGRATULATIONS THEN!
NOW YOU WILL START CODING,
ASK FOR A TASK IN THE DISCORD CHANNEL!!
