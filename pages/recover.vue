<template>
  <div>
    <p class="subheading up">
      Changing and setting up your new password...
    </p>
  </div>
</template>

<script>
export default {
  async mounted() {
    let change = await this.$store.dispatch('recoverPasswordAction', {
      token: this.$route.query.jws
    })
    if (change == 'updated') {
      setTimeout(function() {
        location.href = '/login'
      }, 1200)
    }
  }
}
</script>
