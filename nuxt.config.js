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

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['@assets/css/coo.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@plugins/axios.js'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
  ],
  
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
    // baseURL: 'http://127.0.0.1:5000'
  },

  proxy: {
    '/cooperacy': 'http://127.0.0.1:5000'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/user', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/user', method: 'get', propertyName: 'data' }
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      },
      facebook: {
        client_id: '',
        userinfo_endpoint: false,
        scope: ['public_profile', 'email'],
        redirect_uri: 'http://localhost:3000/callback'
      },
      google: {
        client_id: '',
        user: false,
        redirect_uri: 'http://localhost:3000/callback'
      }
    },
    redirect: {
      login: '/?login=1',
      logout: '/'
    }
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
