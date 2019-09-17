<template>
  <div class="w-100 nav-container">
    <b-navbar
      toggleable="lg"
      class="navbar d-flex justify-content-start"
      @mouseleave="navState = null"
    >
      <nuxt-link
        to="/"
        tag="img"
        class="img-logo col-6 col-sm-4 col-lg-2 p-0"
        :src="wordLogo"
      ></nuxt-link>
      <div class="col-8 d-flex flex-column h-100 nav-menu-container">
        <div class="navbar-menu w-100 text-center">
          <div class="nav" @mouseenter="navState = 'project'">
            <div
              class="nav-item"
              :class="{ 'project-active': navState == 'project' }"
            >
              THE PROJECT
            </div>
          </div>
          <div class="nav" @mouseenter="navState = 'corporate'">
            <div
              class="nav-item"
              :class="{ 'corporate-active': navState == 'corporate' }"
            >
              CORPORATE
            </div>
          </div>
          <div class="nav" @mouseenter="navState = 'science'">
            <div
              class="nav-item"
              :class="{ 'science-active': navState == 'science' }"
            >
              SCIENCE
            </div>
          </div>
        </div>
        <div
          class="navbar-links text-center"
          id="project"
          v-if="navState == 'project'"
        >
          <nuxt-link class="dropdown" to="/aboutyou">ABOUT YOU</nuxt-link>
          <nuxt-link class="dropdown" to="/aboutus">ABOUT US</nuxt-link>
          <nuxt-link class="dropdown" to="/platform">THE PLATFORM</nuxt-link>
          <nuxt-link class="dropdown" to="/governance">GOVERNANCE</nuxt-link>
        </div>
        <div
          class="navbar-links text-center"
          id="corporate"
          v-if="navState == 'corporate'"
        >
          <nuxt-link class="dropdown" to="/corporate"
            >CORPORATE WORLD</nuxt-link
          >
          <nuxt-link class="dropdown" to="/overview"
            >MEASURING COOPERATION</nuxt-link
          >
          <nuxt-link class="dropdown" to="/coopenspace"
            >CO-OPEN SPACE</nuxt-link
          >
          <nuxt-link class="dropdown" to="/cohackathon">CO-HACKATHON</nuxt-link>
          <nuxt-link class="dropdown" to="/workshops">WORKSHOPS</nuxt-link>
        </div>
        <div
          class="navbar-links text-center"
          id="science"
          v-if="navState == 'science'"
        >
          <nuxt-link class="dropdown" to="/cooperation">COOPERATION</nuxt-link>
          <nuxt-link class="dropdown" to="/integration">INTEGRATION</nuxt-link>
          <nuxt-link class="dropdown" to="/cci"
            >COOPERATION CONTEXT INDEX</nuxt-link
          >
          <nuxt-link class="dropdown" to="/science">RESEARCH</nuxt-link>
          <nuxt-link class="dropdown" to="/news">NEWS</nuxt-link>
        </div>
      </div>
      <div
        class="col-2 d-flex flex-column align-items-end h-100 right-container"
      >
        <div class="text-center h-100 d-flex flex-column">
          <nuxt-link
            class="mb-1 pb-1 font-weight-bold"
            id="login-btn"
            v-if="!this.$auth.loggedIn"
            to="/login"
            >LOGIN</nuxt-link
          >
          <a href="" v-else>{{
            this.$auth.user.name + ' ' + this.$auth.user.surname
          }}</a>
          <div class="social-icons">
            <a href="#" class="fab fa-facebook"></a>
            <a href="#" class="fab fa-twitter"></a>
            <a href="#" class="fab fa-instagram"></a>
            <a href="#" class="fab fa-linkedin"></a>
          </div>
        </div>
      </div>

      <!-- MOBILE HARMBURGER BUTTON -->
      <div class="col-2 h-100 burger-btn ml-auto text-right" @click="resetNav">
        <i
          class="fas"
          :class="[isDropdownVisible ? 'fa-times' : 'fa-bars']"
        ></i>
      </div>
    </b-navbar>

    <!-- MOBILE DROPDOWN -->
    <div class="mobile-dropdown text-center pt-2" v-if="isDropdownVisible">
      <div class="pt-2 pb-2 border-bottom">
        <div
          @click="navState = 'project'"
          class="nav-item"
          :class="{ 'project-active': navState == 'project' }"
        >
          THE PROJECT
        </div>
        <div
          class="mt-2 d-flex flex-column"
          v-if="navState == 'project'"
          @click="resetNav"
        >
          <nuxt-link class="mb-1" to="/aboutyou">ABOUT YOU</nuxt-link>
          <nuxt-link class="mb-1" to="/aboutus">ABOUT US</nuxt-link>
          <nuxt-link class="mb-1" to="/platform">THE PLATFORM</nuxt-link>
          <nuxt-link class="mb-1" to="/governance">GOVERNANCE</nuxt-link>
        </div>
      </div>
      <div class="pt-2 pb-2 border-bottom">
        <div
          @click="navState = 'corporate'"
          class="nav-item"
          :class="{ 'corporate-active': navState == 'corporate' }"
        >
          CORPORATE
        </div>
        <div
          class="mt-2 d-flex flex-column"
          v-if="navState == 'corporate'"
          @click="resetNav"
        >
          <nuxt-link class="mb-1" to="/corporate">CORPORATE WORLD</nuxt-link>
          <nuxt-link class="mb-1" to="/overview"
            >MEASURING COOPERATION</nuxt-link
          >
          <nuxt-link class="mb-1" to="/coopenspace">CO-OPEN SPACE</nuxt-link>
          <nuxt-link class="mb-1" to="/cohackathon">CO-HACKATHON</nuxt-link>
          <nuxt-link class="mb-1" to="/workshops">WORKSHOPS</nuxt-link>
        </div>
      </div>
      <div class="pt-2 pb-2 border-bottom">
        <div
          @click="navState = 'science'"
          class="nav-item"
          :class="{ 'science-active': navState == 'science' }"
        >
          SCIENCE
        </div>
        <div
          class="mt-2 d-flex flex-column"
          v-if="navState == 'science'"
          @click="resetNav"
        >
          <nuxt-link class="mb-1" to="/cooperation">COOPERATION</nuxt-link>
          <nuxt-link class="mb-1" to="/integration">INTEGRATION</nuxt-link>
          <nuxt-link class="mb-1" to="/cci"
            >COOPERATION CONTEXT INDEX</nuxt-link
          >
          <nuxt-link class="mb-1" to="/science">RESEARCH</nuxt-link>
          <nuxt-link class="mb-1" to="/news">NEWS</nuxt-link>
        </div>
      </div>
      <div class="pt-2 pb-2 border-bottom" @click="resetNav">
        <nuxt-link to="/login" class="nav-item">LOGIN</nuxt-link>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      navState: null,
      isDropdownVisible: false
    }
  },
  computed: {
    wordLogo() {
      try {
        return require('../assets/image/main/wordlogo.png')
      } catch (e) {
        return 'not found'
      }
    }
  },
  methods: {
    resetNav: function() {
      this.isDropdownVisible = !this.isDropdownVisible
      this.navState = null
    }
  }
}
</script>

<style scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.css);
.nav-container {
  opacity: 1;
  z-index: 5;
  width: 100%;
  position: fixed;
  background-color: white;
}
.navbar {
  border-bottom: 1px #d3e0e9 solid;
}
.img-logo {
  width: 230px;
  z-index: 6;
  cursor: pointer;
}
.nav-item {
  margin: 0 10px;
}
.social-icons a {
  margin: 0 3px;
}
#login-btn {
  border-bottom: 0.8px solid #666666;
}
.navbar-links {
  margin-top: 0.2rem;
}
.dropdown {
  font-size: 11px;
  margin: 0px 5px;
  cursor: pointer;
}
#project .dropdown:hover {
  color: var(--equivalence);
}
#corporate .dropdown:hover {
  color: var(--freedom);
}
#science .dropdown:hover {
  color: var(--understanding);
}
.nav-item,
.nav {
  cursor: pointer;
  display: inline;
  position: relative;
  font-weight: 400;
}
.nav-item:after {
  content: '';
  height: 2px;
  width: 14px;
  border-radius: 40%;
  background: var(--equivalence);
  display: none;
  position: absolute;
  left: calc(50% - 7px);
  bottom: 0;
}

.project-active:after {
  background: var(--equivalence);
  display: inline-block;
}
.corporate-active:after {
  background: var(--freedom);
  display: inline-block;
}
.science-active:after {
  background: var(--understanding);
  display: inline-block;
}
.fa-facebook:hover {
  color: var(--freedom);
}
.fa-twitter:hover {
  color: var(--transparency);
}
.fa-instagram:hover {
  color: var(--equivalence);
}
.fa-linkedin:hover {
  color: var(--understanding);
}
.fa-times,
.fa-bars {
  font-size: 30px;
}
@media (max-width: 992px) {
  .nav-menu-container,
  .right-container {
    display: none !important;
  }
}
</style>
