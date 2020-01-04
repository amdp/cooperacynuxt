const pkg = require('./package')
require('dotenv').config()
import fs from 'fs'
import path from 'path'
module.exports = {
  mode: 'universal',
  plugins: [],
  build: {},
  serverMiddleware: ['./api'],
  css: ['@assets/coo.css'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    //'@nuxtjs/pwa',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt',
    //['@nuxtjs/dotenv', { systemvars: true, path: '/' }],
    //'@nuxtjs/proxy',
    ['@nuxtjs/google-analytics', { id: 'UA-105334297-1' }]
  ],
  loading: {
    color: '#FF8800',
    failedColor: 'black',
    height: '3px',
    continuous: true
  },
  env: {
    URLHOME: process.env.URLHOME,
    DBURL: process.env.DBURL,
    PAYPALID: process.env.PAYPALID,
    RECAPTCHA: process.env.RECAPTCHA
  },
  axios: {
    https: process.env.HTTPS ? true : false,
    baseURL: process.env.DBURL
  },
  server: process.env.HTTPS
    ? {
      port: process.env.PORT,
      host: process.env.HOST,
      https: {
        key: fs.readFileSync(
          path.resolve(process.env.HTTPSDIR, process.env.HTTPSKEY)
        ),
        cert: fs.readFileSync(
          path.resolve(process.env.HTTPSDIR, process.env.HTTPSCERT)
        )
      }
    }
    : { host: process.env.HOST, port: process.env.PORT },
  pwa: {
    manifest: {
      name: 'Cooperacy',
      lang: 'en'
    }
  },
  head: {
    title: 'Cooperacy',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1'
      },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Prompt:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap'
      }
    ]
  },

  auth: {
    strategies: {
      google: { client_id: process.env.GOOGLEID },
      twitter: { client_id: process.env.TWITTERID },
      auth0: { domain: 'nuxt-auth.auth0.com', client_id: process.env.AUTH0ID },
      github: {
        client_id: process.env.GITHUBID,
        client_secret: process.env.GITHUBSECRET
      },
      facebook: {
        client_id: process.env.FBID,
        scope: ['public_profile', 'email', 'user_birthday'],
        userinfo_endpoint:
          'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday'
      },
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'token.accessToken'
          },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/user', method: 'get', propertyName: 'user' }
        }
      }
    },
    redirect: {
      home: '/user',
      login: '/login',
      user: '/login',
      logout: '/login'
    }
  }
}
