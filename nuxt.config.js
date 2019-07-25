const pkg = require('./package')
require('dotenv').config()
import fs from 'fs'
import path from 'path'
module.exports = {mode: 'universal', plugins: [], build: {extend(config, ctx) { } }, serverMiddleware: ['./db'],
  css: ['@assets/coo.css'],  modules: ['@nuxtjs/axios','@nuxtjs/toast','@nuxtjs/pwa','@nuxtjs/auth','bootstrap-vue/nuxt',],
  loading: { color: '#FFCC00', failedColor: 'black', height: '3px', continuous: true,  }, env: {DBURL: process.env.DBURL},
  server: process.env.HTTPS ? {
    port: process.env.PORT, 
    host: process.env.HOST,
    https: {
      key: fs.readFileSync(path.resolve(process.env.HTTPSDIR, process.env.HTTPSKEY)),
      cert: fs.readFileSync(path.resolve(process.env.HTTPSDIR, process.env.HTTPSCERT))
    }
  } : { port: process.env.PORT, host: process.env.HOST,},
  
  head: {
    title: pkg.name,
    meta: [{ charset: 'utf-8' },{
      name:'viewport',content:'width=device-width, initial-scale=1'},{hid:'description', name:'description', content: pkg.description}
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  auth: {
    strategies: {
      google: {  client_id: process.env.GOOGLEID },
      twitter: { client_id: process.env.TWITTERID},
      auth0: { domain: 'nuxt-auth.auth0.com', client_id: process.env.AUTH0ID },
      github: {  client_id: process.env.GITHUBID, client_secret: process.env.GITHUBSECRET },
      facebook: {client_id: process.env.FBID,scope: ['public_profile', 'email', 'user_birthday'],
      userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
      },
      local: {
        endpoints:  {
          login:    { url: '/db/login',  method: 'post', propertyName: 'token.accessToken' },
          logout:   { url: '/db/logout', method: 'post' },
          user:     { url: '/db/user',   method: 'get',  propertyName: 'user' }
        },
      },
    },
    redirect: { home: '/user', login: '/login', user: '/login', logout: '/login' }
  },
  
}