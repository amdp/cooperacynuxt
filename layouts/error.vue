<template>
  <div class="container mb-5">
    <p class="b t16" v-if="error.statusCode === 404">Page not found</p>
    <p
      class="b t16"
      v-else
      v-html="'Error (code ' + error.statusCode + '): ' + error.message"
    ></p>
    <nuxt-link to="/" class="it">Go back to the Home Page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'default', // you can set a custom layout for the error page
  mounted() {
    console.log(' ' + JSON.stringify(this.error))
  }
}
</script>