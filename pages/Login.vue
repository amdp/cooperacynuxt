<template>
  <div class="container">
    <div class="d-flex justify-content-end mt-4">
      <busy-overlay />
      
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
  </div>
</template>

<script>
import busyOverlay from '@/components/busy-overlay'

export default {
  middleware: ['auth'],
  components: { busyOverlay },
  data() {
    return {
      email: '',
      password: '',
      error: null
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
</script>
