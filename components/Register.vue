<template>
  <div class="container">
    <div class="row">
      <div class="md6 mt5 mx-auto">
        <form @submit.prevent="register">
          <h1 class="h3 mb3 font-weight-normal">
            Register
          </h1>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              v-model="formName"
              type="text"
              class="form-control"
              name="name"
              placeholder="Enter Name"
            />
          </div>
          <div class="form-group">
            <label for="surname">Surname</label>
            <input
              v-model="formSurname"
              type="text"
              class="form-control"
              name="surname"
              placeholder="Enter Surname"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="formEmail"
              type="email"
              class="form-control"
              name="email"
              placeholder="Enter Email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="formPassword"
              type="password"
              class="form-control"
              name="password"
              placeholder="Enter Password"
            />
          </div>
          <button class="btn btn-lg btn-primary btn-lock" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  data() {
    return {
      formName: '',
      formSurname: '',
      formEmail: '',
      formPassword: ''
    }
  },

  methods: {
    register() {
      axios
        .post('/cooperacy/register', {
          name: this.formName,
          surname: this.formSurname,
          email: this.formEmail,
          password: this.formPassword
        })
        .then(res => {
          localStorage.setItem('usertoken', res.data)
          this.formName = ''
          this.formSurname = ''
          this.formEmail = ''
          this.formPassword = ''
          router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
