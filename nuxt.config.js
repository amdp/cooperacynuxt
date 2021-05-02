const pkg = require('./package')
require('dotenv').config()
import fs from 'fs'
import path from 'path'
module.exports = {
  build: {
    babel: {
      plugins: [["@babel/plugin-proposal-private-methods", { "loose": true }]],
    },
  },
  telemetry: false,
  plugins: [
    { src: '@plugins/vue-tribute', mode: 'client' },
  ],
  serverMiddleware: ['./api'],
  css: ['@assets/coo.scss'],
  components: true,
  modules: [
    '@nuxtjs/axios',
    '@nuxt/http',
    '@nuxtjs/toast',
    '@nuxtjs/auth',
    'nuxt-i18n',
    'bootstrap-vue/nuxt',
  ],
  buildModules: [
    ['@nuxtjs/color-mode', { preference: 'light' }]
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
  i18n: {
    lazy: true,
    langDir: './t',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', dir: 'ltr' },
      { code: 'it', iso: 'it-IT', file: 'it.json', dir: 'ltr' },
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
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
      { property: 'og:desc', content: 'Cooperation as a social system!' },
      { property: 'og:title', content: 'Cooperacy' },
      { property: 'og:image', content: '@assets/image/main/coo.png' },
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
