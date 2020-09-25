<template>
  <div>
    <p class="subheading up">Changing and setting up your new password...</p>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Cooperacy - Re-setting Your Password...'
    }
  },
  async mounted() {
    let change = await this.$store.dispatch('recoverPassword', {
      token: this.$route.query.jws
    })
    if (change == 'updated') {
      setTimeout(function () {
        location.href = '/login'
      }, 1200)
    }
  }
}
</script>
