<template>
  <div id="userbar">
    <h3 class="text-center diversity">{{name}}</h3> <b-button @click="$auth.logout()">Logout</b-button>
      <div class="container">
        <div v-if="this.$auth.$state.loggedIn == false" class="d-flex justify-content-end mt-4">
          <form >
            <div class="form-group"><label for="email">Email</label>
              <input v-model="email" type="email" class="form-control" name="email" placeholder="Email" />
            </div>
            <div class="form-group"><label for="password">Password</label>
              <input v-model="password" type="password" class="form-control" name="password" placeholder="Password" />
            </div>
            <b-button @click="login">Get in!</b-button>
          </form>
        </div>
        <b-button v-if="this.$auth.$state.loggedIn" @click="$auth.logout()">Logout</b-button>
        <div v-if="this.$auth.$state.loggedIn">

        </div>
      </div>
        <div>
      User status:
      <b-badge>{{ this.$auth.$state.loggedIn ? 'Logged In' : 'Guest' }} {{ name }}</b-badge>
    </div>
    <table class="table md-6 mx-auto">
      <tbody>
        <tr><td class="diversity">Name</td><td>{{name}}</td></tr>
        <tr><td class="diversity">Surname</td><td>{{surname}}</td></tr>
        <tr><td class="diversity">Email</td><td>{{email}}</td></tr>
      
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import jwtdecode from 'jwt-decode'



export default {
  middleware: ['auth'],
  data() {
    const token = this.$auth.getToken('local')
    const decoded = jwtdecode(token)
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
  }
}
/* data() {
      return {
        email: '',
        password: '',
        error: null,
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
  }, */
</script>
