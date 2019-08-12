# THE COOPERACY CODERS LEARNING GAME

![Image](/assets/image/github/image3.png)

### FINAL CHALLENGE LEVEL TWO: RECONSTRUCT A WHOLE STORE PATH!


Before proceeding, let yourself do a crash course
about vuex:
https://www.youtube.com/watch?v=5lVQgZzLMHc


Alright then. It's time to see the docks!
Open the file /store/index.js!


What's in it?
The store has a STATE list, 
that is "LIKE" global variables,
they are "LIKE" globals, not the same.

States are variables accessible from
any vue file, which is good because
sometimes you need to have common
variables across your web pages.


Let's see the store/index.js:
the first part is made of STATES.
`export const state` tells nuxt 
to export from this file the STATES.

Every comma separate a state element.
To call these elements, just imagine
in the <SCRIPT> part of your vue page
to type "this.$store.state.xxxvariablexxx".
 
For example, to retrieve the projects,
you would type in a function:
"this.$store.state.project"
or "store.state.project".

These states are constants,
so they are immutable once they arrive
in the docks store (remember the ships?)

In the reality these states can be changed,
but ONLY BY VUEX store commands,
you can never assign them:
`this.store.state.project = 
[project1, project2, project3]`
would never work.
The commands able to change the states
are called MUTATIONS, and they
come from ACTIONS.


But let's go ahead. 
You see in the file you have also 
"getters", in NUXT the getters are 
less used because of NUXT structure 
itself, so focus on vuex store 
"mutations" and "actions" now.


The mutations SET the store STATES,
they are like the docks workers,
this means they fill the "containers"
of the docks with data usually got 
from the database.

But how do we get the data?
We need to send ships, so here we 
go with the ACTIONS!

The actions are the ships: they go to the 
server database, get the data and 
get back with it. Then they give the data 
to the mutations "workers" that fill 
the "docks containers", the STATE variables.


Again:


STATE = "the containers",

list of shared variables that can be 
used THROUGH vue components and pages

MUTATIONS = "the workers"

internal VUEX commands that SET 
or CHANGE the STATE variables

ACTIONS = "the ships"
used to go to the server 
and get the data out of the DB
or execute other commands
and then mutate the STATE
variables with the DB info


So when NUXT builds,
it sets a list of VUEX STATE 
variables and when a client 
goes on the pages with
STORE calls, it triggers 
STORE ACTIONS that go to the 
database and come back. 
When they are back they 
ask the MUTATIONS to change 
the STATE variables.

Final info:

ONLY ACTIONS go to the database.
They do this in our case through the
axios module.
Axios just simplifies XMLHttpRequests
but we could use XMLHttpRequests 
directly.
Axios or XMLHttpRequests are like
paper orders the ships carry and
give to the server when they arrive.
Those orders are executed and GET,
POST, PUT, DELETE things. Usually
the orders tell to GET DATA.

In any case, the actions use axios 
or xmlhttp requests to get info from 
the remote server database and mutate
the vuex state variables.


Well done! To overcome this challenge 
you have a difficult task: go to
`/pages/index.vue`
get the name of the "store.dispatch"
ACTION. It is between quotes.


Then go to
`/store/index.js`
and look for the same ACTION.
Inside of the ACTION find the
"axios" directive, it shoould be a
"axios.get" one. After the word
DBURL you will find a quoted PATH,
similar to the ACTION name.
Keep that path in mind.

Now go to the file
`/api.js`
in the ///// GET /////
part, look for the same path after
something similar to "axios.get":
`app.get(`

If you find it, copy all of it 
and paste it in the discord server.
If it is the right one, you gained
another level!

CONGRATULATIONS!
This was an hard level because you
had to read a lot in order to prepare
for coding! Get ready then and continue
the game!
You now earned the VUEX EXPLORER LEVEL!
