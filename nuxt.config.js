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
  loading: { color: '#FFCC00', failedColor: 'black', height: '3px', continuous: true,  },

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
        endpoints:  {
          login:    { url: 'http://127.0.0.1:3000/db/login',  method: 'post', propertyName: 'token.accessToken' },
          logout:   { url: 'http://127.0.0.1:3000/db/logout', method: 'post' },
          user:     { url: 'http://127.0.0.1:3000/db/user',   method: 'get',  propertyName: 'user' }
        },
      },
      auth0: { domain: 'nuxt-auth.auth0.com', client_id: 'q8lDHfBLJ-Fsziu7bf351OcYQAIe3UJv' },
      facebook: {
        client_id: '1047962248747639',
        userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email', 'user_birthday']
      },
      google: {  client_id: '1076028425381-hrsenfe0jh4i4hiibsvuedm9ia1st5sc.apps.googleusercontent.com' },
      github: {  client_id: process.env.GITHUB_CLIENT_ID, client_secret: process.env.GITHUB_CLIENT_SECRET },
      twitter: { client_id: 'FAJNuxjMTicff6ciDKLiZ4t0D' }
    },
    redirect: { home: '/user', login: '/login', user: '/login', logout: '/login' }
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
