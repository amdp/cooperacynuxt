<template>
  <div class="m-3 ">
    <div v-if="!this.$auth.$state.loggedIn" class="d-flex justify-content-end mt-4">
      <b-form @submit.prevent="login" class="mt-3 needs-valitation" autocomplete="on">
        <b-form-group label-for="mailInput" label="Email:">
          <b-form-input id="mailInput" v-model="email" size="sm" required autocomplete="current-email"></b-form-input></b-form-group>
        <b-form-group label-for="passwordInput" label="Password:">
          <b-form-input type="password" id="passwordInput" v-model="password" size="sm" required autocomplete="current-password"></b-form-input></b-form-group>
          <b-button type="submit" class="btn bhdiversity white btn-block mt-3 gray border-0">Login</b-button>
      </b-form>
    </div>
    <div>User status: <b-badge>{{ this.$auth.$state.loggedIn ? 'Logged In' : 'Guest' }}</b-badge></div>
  </div>
</template>

<script>
import axios from 'axios'
import jwtdecode from 'jwt-decode'

export default {
  
data() {
      return {
        email: '',
        password: '',
      }
    },
  methods: {
    async login() {
      this.error = null
      return this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .catch(e => {
          this.error = e + ''
        })

    }
  }
}

/*
data() {
    const decoded
    this.$auth.getToken('local') ? decoded = jwtdecode( this.$auth.getToken('local') ) : console.log('not logged in')
    return {
      formEmail: '',
      formPassword: '',
      name: decoded.name,
      surname: decoded.surname,
      email: decoded.email,
      E: decoded.E,
      T: decoded.T,
      C: decoded.C,
      I: decoded.I,
      F: decoded.F,
      U: decoded.U,
      D: decoded.D
    }
  },
}*/
</script>
