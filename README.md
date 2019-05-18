# cooperacynuxt

> cooperacynuxt

Hello, welcome to Cooperacy Platform universal app. 
It is based on NodeJs, Express, Vue, Nuxt with Vuex store + Vue Bootstrap and on a MySQL database.
It uses Babel and Webpack, along with some minor extensions like the nice Jimp (Js Gimp).

First place where to start is to see the MySql database. Then pass to db.js file, that is the main and only Express file of access to database.
Then please continue to the "store" folder and see how global variables are managed by the Vuex store through Actions connected with the db.js file.
Finally, see the index.vue file in the pages, continue to the defaul layout, and review the pages and their components.

You can conclude your overview with a brief look at the assets and at the only css file on top of the Vue Bootstrap css architecture (No, we kept it 'simple' and didn't implement SCSS/SASS).
Note: we tend to use all >singular< naming for database tables and internal variables.

Have fun and happy coding!


## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

#On a new terminal, start the experimental money pool distributor:
$ ./pool

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

Please keep this file 42 lines short. For detailed explanation on how things work on Cooperacy, check the Platform idea on https://cooperacy.org/platform.
About Nuxt, checkout [Nuxt.js docs](https://nuxtjs.org).

And don't worry. Be happy!