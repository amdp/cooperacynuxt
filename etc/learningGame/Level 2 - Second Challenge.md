# THE COOPERACY CODERS LEARNING GAME

![Image](/assets/image/github/image3.png)


### CHALLENGE TWO: THE REPO AND THE THREE LAYERS

Before starting to give you tasks to learn Vue,
let's understand how Nuxt plays between Vue
and the information stored in the server.


Remember: your computer connects to internet
via a browser, this means you are a "client".


On the other side, there is a Server.


To make the client to talk with the server,
you can have two layers, the client one and
the server one.


So when you need data from the server, you send
an "XMLHTTPRequest" and the server answers with
some info. Ping... pong.


In Vue the REQUEST TO and THE ANSWER FROM the 
server CAN be handled by a "store".
They could also work without, but in complex
projects you would need a STORE.


This store is like harbour docks, people ask
for more food at the market (client), and
the market owners go to the docks and tell 
some ships to go and get some food from oversea.


The market owners talk to the docks store,
those huge containers you see in the docks.


The docks send their ships, the ships go
oversea (server) and get the food (data),
then they get back and fill all the 
containers (store) with their contents.


So the docks store the food (data) and
all the market can access it until the
day ends (connection is closed) and the
people (client) are satisfied.


So there are three important files :

1. nuxt.config.js This is the nuxt configuration.
It’s some config that allows nuxt to work properly.

2. store/index.js is the VUEX STORE.
VUEX is just the name of the library,
or better the "state management library" 
that creates the STORE.

This is the docks, it stores data variables 
coming from the ships that went to the database
in a way that the client may 
access to them independently from the starting
market stand, represented by a page file or url.

3. db.js This is a very long file with all the 
node.js backend. It’s full of instructions for 
the database. This is used when the docks (the store)
sends ships to the server and the ships arrive:
should they get some food? Post some data?
Delete an order? Deliver messages?

All these operations are also called API.
The db.js is the API that talks with the server.
We will learn more about it.




So nuxt has three layers:

1 VUE (CLIENT) // 2 VUEX (STORE) // 3 NODE (SERVER)


when you land in a page, 
you are the client
and vue renders the page reading 
the HTML part: see aboutus.vue
for example. It starts with
<template> and ends with </template>,
and it seems pretty much like
standard html.

In fact, Vue is a "progressive
framework" that enhances standard
html with new functionalities.
So the client reads the Vue file
and renders the aboutus vue page.

Go to 127.0.0.1/aboutus and you
will see it.


In some cases, instead, vue executes 
the <SCRIPT> part at the end of the 
.vue file, with some functions
and some CALLS.
 
These calls go to the VUEX store,
to the docks of the previous example,
because they want the ships to go
and carry DATA from the oversea
server. 

How do we recognise these calls?
It's easy, they all start with $store,
or with "this.$store".

For example this.$store.dispatch.
Like in the docks, the STORE
dispatches a message through the
ships in order to get data
from the "oversea" server.


In order to understand, 
see for example index.vue.

In that file (today, end of july), 
you see an async fetch function.
You will learn about the fetch 
function later. That function has
a "store.dispatch" command that is
related to the VUEX store.
You found it? GOOD!


So, "store" is VUEX. 
In this case for the fetch function 
you do not have the word "this"
like in "this.$store.dispatch". 
They are similar commands though,
just remember that store 
refers to the VUEX file 
/store/index.js

Now send in the discord server
a screenshot of the /store/index.js
file and you passed this 
second challenge!
