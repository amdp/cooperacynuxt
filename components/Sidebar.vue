<template>
  <div class="container">
    <div id="cooperacyMenu" class="collapse navbar-collapse d-flex justify-content-start mt-3">
      <ul class="navbar-nav">
        <li class="navitem dropdown">
          <a href="#" class="nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">THE PROJECT</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/aboutyou">ABOUT YOU</a>
            <a class="dropdown-item" href="./assets/pages/aboutus">ABOUT US</a>
            <router-link class="nav-link" to="/aboutus">ABBAUT US</router-link>
            <a class="dropdown-item" href="/platform">THE PLATFORM</a>
            <a class="dropdown-item" href="/governance">GOVERNANCE</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#" class="nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SERVICES</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/coorporate">COOPERATION SERVICES</a>
            <a class="dropdown-item" href="/openecosystem">OPEN SPACE COOPERATION</a>
            <a class="dropdown-item" href="/overview">COOPERATION OVERVIEW</a>
            <a class="dropdown-item" href="/cohackathon">COOPERATIVE HACKATHON</a>
            <a class="dropdown-item" href="/workshops">COOPERATION WORKSHOPS</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#" class="nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SCIENCE</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/cooperation">COOPERATION</a>
            <a class="dropdown-item" href="/integration">INTEGRATION</a>
            <a class="dropdown-item" href="/cci">COOPERATION CONTEXT INDEX</a>
            <a class="dropdown-item" href="/science">COOPERACY RESEARCH ASSOCIATION</a>
            <a class="dropdown-item" href="/news">NEWS</a>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <b-form data-vv-scope="loginFrm">
        <b-form-group description="Let us know your Email." label="Enter your Email" label-for="email">
          <b-form-input id="email" v-model="loginForm.email" v-validate="'required|email'" name="email" type="email"></b-form-input>
          <span v-show="errors.has('loginFrm.email')" class="alert_danger">{{errors.first('loginFrm.email')}}</span>
        </b-form-group>
        <b-form-group description="Let us know your Password." label="Enter your Password" label-for="pw">
          <b-form-input id="pw" v-model="loginForm.password" v-validate="{ required: true, min: 6 }" name="pw" data-vv-as="Password" type="password">
          </b-form-input>
          <span v-show="errors.has('loginFrm.pw')" class="alert_danger">{{errors.first('loginFrm.pw')}}</span>
        </b-form-group>
          <b-button variant="outline-success" @click="facebook">Facebook</b-button><br />
          <b-button variant="outline-success" @click="login">Login</b-button><br />
          <b-button variant="outline-success" @click="google">Google</b-button><br />
          <b-button variant="outline-success" @click="logout">Logout</b-button><br />
          <b-button variant="outline-success" @click="check">Check</b-button><br />
      </b-form>
    </div>
    <b-modal ref="myModalRef" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
    </b-modal> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  component: {},
  watch: {
    $route() {
      this.showLoginModal()
    }
  },
  methods: {
    showLoginModal() {
      if (
        typeof this.$route.query.login !== 'undefined' &&
        this.$route.query.login === '1'
      ) {
        console.log('error please log in')
        this.$refs.myModalRef.show()
        this.$router.push('/')
      }
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    },
    async google() {
      await this.$auth.loginWith('google').catch(e => {
        console.log('error log in google')
      })
    },
    async facebook() {
      await this.$auth.loginWith('facebook').catch(e => {
        console.log('error log in fb')
      })
    },
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.loginForm.email,
            password: this.loginForm.password
          }
        })
        if (this.$auth.loggedIn) {
          console.log('good log in')
        }
      } catch (e) {
        console.log('error log in')
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
    check() {
      console.log(this.$auth.loggedIn)
    },
    logout() {
      this.$auth.logout()
    }
  }
}
</script>
  </div>
</template>