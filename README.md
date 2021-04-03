# Cooperacynuxt

> cooperacynuxt

Hello, welcome to Cooperacy Platform universal app, based on NodeJs, Express, Vue, Nuxt (including Babel and Webpack, check [Nuxt.js docs](https://nuxtjs.org)) with Vuex store + Vue Bootstrap and on a MySQL database, along with some minor extensions like the nice Jimp (Js Gimp).

The first place where to start is to see the MySql database you find in /etc/dumbdatabase. Then pass to api.js file, that is the main and only Express file used to access the database and some other minor server-side functions. Then please continue to the "store" folder and see how shared state variables are managed by VUEX and through Actions connected with the api.js file.
Finally, see the index.vue file in the pages, continue to the default layout and review the pages and their components.
You can conclude your overview with a brief look at the assets and at the only CSS file on top of the Vue Bootstrap CSS architecture (No, we kept it simple' and didn't implement SCSS/SASS). Note: we tend to use all >singular< naming for database tables and internal variables.

If you want to learn all the technologies used, we are slowly creating a gamified crash guide, check the learning game:
https://github.com/amdp/cooperacynuxt/blob/master/etc/learningGame.md

The result is online at https://cooperacy.org. For detailed explanation on how things work on Cooperacy, check the Platform idea on https://cooperacy.org/main/platform. Have fun and happy coding!

## Setup

```bash
# install dependencies
$ npm install

# copy .env and edit the env with all the information needed
$ cp etc/dumbenv .env 

# serve with hot reload at 127.0.0.1:3000 (do not use localhost:3000)
$ npm run dev

# create at least one country with id 2 into the mysql table "country" and a place with country id 2 in "place"
# create at least one country with id 1 into the mysql table "country" and a place with country id 1 in "place" as "general" one
# also add in "cooperation" table a cooperation with id 700 and call it "announcements" or whatever
# also add in "cooperation" table a cooperation with id 1 and call it "cooperacy" or whatever with:
# mode 101, category 1, parent 1, author your user id, collected 100, budget 200, professional 0, hudget 1

# create a new user using the login page - do it with BANK TRANSFER

# in the database go to your new user payment deadline and edit it with value "9999-12-31 00:00:00" or whatever date you like after today

# try to login and enjoy

# build for production and launch server
$ npm run build
$ npm start
```
