<template>
  <div class="container">
    <div v-if="auth != 'loggedin'" class="d-flex justify-content-end mt-4">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="formEmail"
            type="email"
            class="form-control"
            name="email"
            placeholder="Email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="formPassword"
            type="password"
            class="form-control"
            name="password"
            placeholder="Password"
          />
        </div>
        <button class="btn btn-lg btn-primary btn-lock" type="submit">
          Get in!
        </button>
      </form>
    </div>
    <div v-if="auth == 'loggedin'" id="userbar">
      <h3 class="text-center diversity">{{ name }}</h3>
      <table class="table md-6 mx-auto">
        <tbody>
          <tr>
            <td class="diversity">Name</td>
            <td>{{ name }}</td>
          </tr>
          <tr>
            <td class="diversity">Surname</td>
            <td>{{ surname }}</td>
          </tr>
          <tr>
            <td class="diversity">Email</td>
            <td>{{ email }}</td>
          </tr>
          <tr>
            <td class="diversity">Color Code</td>
            <td>{{ E }}{{ T }}{{ C }}{{ I }}{{ F }}{{ U }}{{ D }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import router from '../router'
import jwtdecode from 'jwt-decode'
import EventBus from './EventBus'
export default {
  data() {
    if (process.browser) {
      const token = localStorage.usertoken
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
  },
  methods: {
    login() {
      axios
        .post('/cooperacy/login', {
          email: this.formEmail,
          password: this.formPassword
        })
        .then(res => {
          if (process.browser) {
            localStorage.setItem('usertoken', res.data)
            this.formEmail = ''
            this.formPassword = ''
            this.emitMethod()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    emitMethod() {
      EventBus.$emit('logged-in', 'loggedin')
    }
  }
}
</script>
