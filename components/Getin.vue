<template>
  <div v-if="this.$auth.loggedIn == false" class="container">
    <div class="d-flex justify-content-end mt-4">
      <form @submit.prevent="login">
        <div class="form-group"><label for="email">Email</label>
          <input v-model="formEmail" type="email" class="form-control" name="email" placeholder="Email" />
        </div>
        <div class="form-group"><label for="password">Password</label>
          <input v-model="formPassword" type="password" class="form-control" name="password" placeholder="Password" />
        </div>
        <button class="btn btn-lg btn-primary btn-lock" type="submit">Get in!</button>
      </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
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
        .post('/serverDB/login', {
          email: this.formEmail,
          password: this.formPassword
        })
        .then(res => {
          localStorage.setItem('usertoken', res.data)
          this.formEmail = ''
          this.formPassword = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>
