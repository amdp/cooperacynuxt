<template>
  <div class="container">
    <div class="row">
      <div class="md6 mt5 mx-auto">
        <form @submit.prevent="login">
          <h1 class="h3 mb3 font-weight-normal">
            Sign in
          </h1>
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
            Sign in
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'
export default {
  data() {
    return {
      formEmail: '',
      formPassword: ''
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
          localStorage.setItem('usertoken', res.data)
          this.formEmail = ''
          this.formPassword = ''
          this.emitMethod()
          router.push({ name: 'Profile' })
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
