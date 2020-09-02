<template>
  <b-container fluid class="m-0 p-0">
    <b-row class="m-0 p-0 w-100 fixed">
      <navbar />
    </b-row>
    <b-row fluid class="justify-content-center w-100 m-0 pl-0 pr-0">
      <navbar />
      <b-col cols="11" lg="8" class="p-0 m-0 mt-5">
        <nuxt />
      </b-col>
    </b-row>
    <b-row>
      <foot />
    </b-row>
  </b-container>
</template>

<script>
export default {
  head() {
    return {
      script: [
        { src: '/gdpr/cookies.js', type: 'text/javascript' },
        { src: '/gdpr/ga.js', type: 'text/javascript', 'data-starcookie': 'statistics' },
        //{ src: '/gdpr/linkedin.js', type: 'text/plain', 'data-starcookie': 'statistics' },
      ],
    }
  },
  created() {
    this.$colorMode.preference = 'light'
  },
}
</script>
