<template>
  <div>
    <p class="subheading up care text-center">
      THANK YOU
    </p>
    <p class="base text-center">
      You will be now redirected to the login page.<br /><br /><br />
    </p>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Cooperacy - Thank You'
    }
  },
  async mounted() {
    setTimeout(function () {
      location.href = '/login'
    }, 1500)
  }
}
</script>
