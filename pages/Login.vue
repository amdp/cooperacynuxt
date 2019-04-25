<template>
  <div>
    <div v-if="!this.$auth.loggedIn" class="row">
      <div class="col-2"></div>
      <div class="col-4">
        <div class="d-flex justify-content-center">
          <b-form @submit.prevent="login" class="needs-valitation" autocomplete="on">
            <b-form-group label-for="emailLogin" label="Email:">
              <b-form-input id="emailLogin" v-model="emailLogin" size="sm" required autocomplete="current-email"></b-form-input></b-form-group>
            <b-form-group label-for="passwordLogin" label="Password:">
              <b-form-input  id="passwordLogin" v-model="passwordLogin" size="sm" required type="password" autocomplete="current-password" ></b-form-input></b-form-group>
              <a class="ad" to="">Forgot password?</a>
              <b-button type="submit" class="btn bhdiversity white btn-block mt-3 gray border-0">Login</b-button>
          </b-form>
        </div>
      </div>
      <div class="col-4">
            <div v-for="s in strategies" :key="s.key" class="mb-3">
            <b-btn @click="$auth.loginWith(s.key)" block :class="s.color">Login with {{ s.name }}</b-btn>
            </div>
      </div>
      <div class="col-2"></div>
    </div>
    <newuser />
  </div>
</template>

<script>
import axios from 'axios'
import Newuser from '@/components/Newuser'

export default {
  middleware: ['auth'],
  components: {
   Newuser: Newuser,
  },
  data() {
      return { 
        emailLogin: '',
        passwordLogin: '',
      }
    },
  methods: {
    async login() { this.error = null
      return this.$auth
        .loginWith('local', { data: { email: this.emailLogin, password: this.passwordLogin }})
        .catch(e => { this.error = e + ''})
    },
  },
  computed: {
    mailInputState() { return this.mail.length > 1 ? true : false }, //to be completed
    strategies: () => ([
     { key: 'wechat', name: 'WeChat', color: 'login-button border-0 bhcare' },
     { key: 'google', name: 'Google', color: 'login-button border-0 bhequivalence' },
     { key: 'facebook', name: 'Facebook', color: 'login-button border-0 bhfreedom' },
     { key: 'github', name: 'GitHub', color: 'login-button border-0 bhunderstanding' }
    ]),
    redirect() { return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
  },
}
</script>
  