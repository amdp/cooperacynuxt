<template>
  <nav class="navbar navbar-expand-md navbarCooperacy">
    <a class="navbar-brand" href="/"
      ><img class="header-logo" src="../assets/images/wordlogo.png"
    /></a>
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

    <div
      id="cooperacyMenu"
      class="collapse navbar-collapse d-flex justify-content-end align-items-end"
    >
      <ul class="navbar-nav">
        <li class="navitem dropdown">
          <a
            href="#"
            class="dropdown-toggle nav-link"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            >THE PROJECT</a
          >
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/aboutyou">ABOUT YOU</a>
            <a class="dropdown-item" href="/aboutus">ABOUT US</a>
            <a class="dropdown-item" href="/platform">THE PLATFORM</a>
            <a class="dropdown-item" href="/governance">GOVERNANCE</a>
          </div>
        </li>
        <li class="dropdown">
          <a
            href="#"
            class="dropdown-toggle nav-link"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            >SERVICES</a
          >
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/coorporate">COOPERATION SERVICES</a>
            <a class="dropdown-item" href="/openecosystem"
              >OPEN SPACE COOPERATION</a
            >
            <a class="dropdown-item" href="/overview">COOPERATION OVERVIEW</a>
            <a class="dropdown-item" href="/cohackathon"
              >COOPERATIVE HACKATHON</a
            >
            <a class="dropdown-item" href="/workshops">COOPERATION WORKSHOPS</a>
          </div>
        </li>
        <li class="dropdown">
          <a
            href="#"
            class="dropdown-toggle nav-link"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            >SCIENCE</a
          >
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/cooperation">COOPERATION</a>
            <a class="dropdown-item" href="/integration">INTEGRATION</a>
            <a class="dropdown-item" href="/cci">COOPERATION CONTEXT INDEX</a>
            <a class="dropdown-item" href="/science"
              >COOPERACY RESEARCH ASSOCIATION</a
            >
            <a class="dropdown-item" href="/news">NEWS</a>
          </div>
        </li>
        <li class="menu-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
        <li v-if="auth != 'loggedin'" class="nav-item">
          <router-link class="nav-link" to="/login">LOGIN</router-link>
        </li>
        <li v-if="auth == 'loggedin'" class="nav-item">
          <router-link class="nav-link" to="/profile">AuthNameHere</router-link>
        </li>
      </ul>
    </div>
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
