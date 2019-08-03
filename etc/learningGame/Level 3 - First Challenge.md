# THE COOPERACY CODERS LEARNING GAME

![Image](/assets/image/github/image3.png)


## LEVEL THREE: BACK TO THE BASICS

In these upcoming lessons we will start 
back from basic html and learn step by step
some basic Vue, Vuex and the rest of NUXT.
Overcoming this last third LEVEL you will
start a final level to be part of the
real developers: the CONTRIBUTORS!

### CHALLENGE ONE: ONE SIMPLE VARIABLE AND ONE SIMPLE FUNCTION IN VUE


VUE AND NUXT
Vue works mostly with pages and components. 
Pages are htmls with the special Vue 
functionalities and dynamic tricks.
Components are reusable bits of code,
part of pages that you can reuse in any page.
Be aware, though, that in NUXT some Vue 
stuff will work differently.
Some functions DO NOT WORK in 
components, like, do you guys remember 
the async fetch function you saw in
the index.vue page?
If you use that special function
in a component it won't work.


So VUE is quite similar to HTML with
some powerful tricks in the script part
let's see what could be interesting
of the script you find at the end of 
the Vue pages.

The most simple and important function
is the data() function

The syntax is data() { return { ..} }
In data() you can add a
list of variables you
want to use in the HTML
or for your other functionalities.


I rarely use the same name
for variables of different
use, so, if I have to send
to the server a username through 
a form, I will user formUsername
for the variable in the form,
and `username: formUsername` when
I will send the username to
the server, so I know that
I am assigning the fromUsername 
text in the form box TO the
username variable I am sending to
the server.

I can easily recognise which is 
the page form variable
and which is the one 
I am sending to the server.


methods: {..} is a list of functions
it lists the functions you want to use
in your page.


Now, let's test it. Let's take any page
.vue we already have in the project 
and insert in the data function one 
variable:

```
data() {
  return {
    test: 'test ok!' //use whatever text you want here
  } }
```

and in `methods:` another function:

```
methods: {
  someAlert(){
   alert(this.test)
  }
}
```

and now let's add a div with a
@click in the middle of 
the html part:

```
 <div @click="someAlert">TEST ALERT</div>
```

Now reload the page, and if clicking on 
the div with TEST ALERT you get an alert
you've done it!
Screenshot your alert message and paste it
in the discord channel to pass the level :)
