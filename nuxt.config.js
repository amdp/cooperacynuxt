const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  serverMiddleware: ['./db'],

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFD000' },

  /*
  ** Global CSS
  */
  css: ['@assets/css/coo.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
  ],
  
  /*
   ** Axios module configuration
   */
  axios: {
    proxy: true
  },

  proxy: { '/db': 'http://127.0.0.1:3000' },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'http://127.0.0.1:3000/db/login', method: 'post', propertyName: 'token.accessToken' },
          logout: { url: 'http://127.0.0.1:3000/db/logout', method: 'post' },
          user: { url: 'http://127.0.0.1:3000/db/user', method: 'get', propertyName: 'user' }
        //tokenRequired: true,
        //tokenType: 'Bearer'
        },
      },
    },
    redirect: { home: '/', user: '/', logout: '/' }
  },
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
