<!-- WARNING!!! don't delete the navbar until you tested the whole auth access -->

<template>
  <nav
    class="navbar navbar-expand-md navbarCooperacy d-flex flex-fill justify-content-center"
  >
    <a class="d-flex flex-fill justify-content-center m-0 noline" href="/">
      <img class="header-logo" src="../assets/images/wordlogo.png" />
    </a>
    <!-- Collapsed Hamburger -->
    <button
      type="button"
      class="navbar-toggler"
      data-toggle="collapse"
      data-target="#cooperacyMenu"
      aria-controls="cooperacyMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggle-icon"></span>
    </button>
  </nav>
</template>

<script>
import EventBus from './EventBus'

EventBus.$on('logged-in', test => {
  console.log(test)
})

export default {
  data() {
    return {
      auth: '',
      user: ''
    }
  },

  mounted() {
    EventBus.$on('logged-in', status => {
      this.auth = status
    })
  },

  methods: {
    logout() {
      localStorage.removeItem('usertoken')
    }
  }
}
</script>
