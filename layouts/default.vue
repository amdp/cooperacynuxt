<template>
  <b-container fluid class="m-0 p-0">
    <b-row class="m-0 p-0 w-100 fixed">
      <navbar />
    </b-row>
    <b-row fluid class="justify-content-center w-100 m-0 p-0">
      <navbar />
      <b-col cols="12" lg="8" class="p-4 mt-4">
        <nuxt />
      </b-col>
    </b-row>
    <b-row fluid class="p-0 m-0">
      <foot />
    </b-row>
  </b-container>
</template>

<script>
import Cookie from '~/assets/gdpr/cookie.js'
export default {
  head() {
    return {
      script: [
        //{ src: '~assets/gdpr/cookies.js', type: 'text/javascript' },
        { src: '/gdpr/ga.js', type: 'text/javascript', 'data-starcookie': 'statistics' },
        //{ src: '/gdpr/linkedin.js', type: 'text/plain', 'data-starcookie': 'statistics' },
      ],
    }
  },
  components: { Cookie },
  mounted() {
    this.$colorMode.preference = 'light'
  },
}
</script>
