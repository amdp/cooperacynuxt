<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded">
    <button
      class="navbar-toggle"
      type="button"
      data-toggle="collapse"
      data-target="#navbar1"
      aria-controls="navbar1"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggle-icon"></span>
    </button>

    <div
      id="navbar1"
      class="collapse navbar-collapse justify-content-md-center"
    >
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li v-if="auth == ''" class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li v-if="auth == ''" class="nav-item">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
        <li v-if="auth == 'loggedin'" class="nav-item">
          <router-link class="nav-link" to="/profile">Profile</router-link>
        </li>
        <li v-if="auth == 'loggedin'" class="nav-item">
          <router-link class="nav-link" to="/projectsList"
            >Projects</router-link
          >
        </li>
        <li v-if="auth == 'loggedin'" class="nav-item">
          <a class="nav-link" href="/" @click="logout">Logout</a>
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
