<template>
  <div v-if="$auth.loggedIn" id="userbar">
    <h3 class="text-center diversity">{{ name }}</h3> <b-button @click="$auth.logout()">Logout</b-button>
    <table class="table md-6 mx-auto">
      <tbody>
        <tr><td class="diversity">Name</td><td>{{ name }}</td></tr>
        <tr><td class="diversity">Surname</td><td>{{ surname }}</td></tr>
        <tr><td class="diversity">Email</td><td>{{ email }}</td></tr>
        <tr><td class="diversity">Color Code</td><td>{{ E }}{{ T }}{{ C }}{{ I }}{{ F }}{{ U }}{{ D }}</td></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import jwtdecode from 'jwt-decode'
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
}
</script>
