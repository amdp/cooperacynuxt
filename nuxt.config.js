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
  plugins: ['@plugins/vee-validate.js'],

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

  proxy: { '/serverDB': 'http://127.0.0.1:5000' },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'http://127.0.0.1:5000/login', method: 'post', propertyName: 'token' },
          logout: { url: 'http://127.0.0.1:5000/serverDB/logout', method: 'post', propertyName: 'token' },
          user: { url: 'http://127.0.0.1:5000/user', method: 'get', propertyName: 'data' }
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      },
      facebook: { client_id: '', userinfo_endpoint: false, scope: ['public_profile', 'email'] },
      google: { client_id: '', user: false }
    },
    redirect: { login: '/', logout: '/' }
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
