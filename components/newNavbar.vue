<template>
  <!--  DESKTOP NAV -->
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
          <nuxt-link class="menu-item" to="/aboutyou">ABOUT YOU</nuxt-link>
          <nuxt-link class="menu-item" to="/aboutus">ABOUT US</nuxt-link>
          <nuxt-link class="menu-item" to="/platform">THE PLATFORM</nuxt-link>
          <nuxt-link class="menu-item" to="/governance">GOVERNANCE</nuxt-link>
        </div>
        <div
          class="navbar-links text-center"
          id="corporate"
          v-if="navState == 'corporate'"
        >
          <nuxt-link class="menu-item" to="/corporate"
            >CORPORATE WORLD</nuxt-link
          >
          <nuxt-link class="menu-item" to="/overview"
            >MEASURING COOPERATION</nuxt-link
          >
          <nuxt-link class="menu-item" to="/coopenspace"
            >CO-OPEN SPACE</nuxt-link
          >
          <nuxt-link class="menu-item" to="/cohackathon"
            >CO-HACKATHON</nuxt-link
          >
          <nuxt-link class="menu-item" to="/workshops">WORKSHOPS</nuxt-link>
        </div>
        <div
          class="navbar-links text-center"
          id="science"
          v-if="navState == 'science'"
        >
          <nuxt-link class="menu-item" to="/cooperation">COOPERATION</nuxt-link>
          <nuxt-link class="menu-item" to="/integration">INTEGRATION</nuxt-link>
          <nuxt-link class="menu-item" to="/cci"
            >COOPERATION CONTEXT INDEX</nuxt-link
          >
          <nuxt-link class="menu-item" to="/science">RESEARCH</nuxt-link>
          <nuxt-link class="menu-item" to="/news">NEWS</nuxt-link>
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
            <a
              target="_blank"
              href="https://www.facebook.com/cooperacy.org/"
              class="fab fa-facebook"
            ></a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/cooperacy/"
              class="fab fa-linkedin"
            ></a>
            <a
              target="_blank"
              href="https://discord.gg/kzBB3Xj"
              class="fab fa-discord"
            ></a>
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
/* IMPORT FONTAWESOME */
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
.menu-item {
  font-size: 11px;
  margin: 0px 5px;
  cursor: pointer;
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
  display: none;
  position: absolute;
  left: calc(50% - 7px);
  bottom: 0;
}
.project-active:after,
.science-active:after,
.corporate-active:after {
  display: inline-block;
}
.fa-times,
.fa-bars {
  font-size: 30px;
}

/* COLORS */
#project .menu-item:hover,
.fa-discord:hover {
  color: var(--equivalence);
}
.project-active:after {
  background-color: var(--equivalence);
}
#corporate .menu-item:hover,
.fa-facebook:hover {
  color: var(--freedom);
}
.corporate-active:after {
  background-color: var(--freedom);
}
#science .menu-item:hover,
.fa-linkedin:hover {
  color: var(--understanding);
}
.science-active:after {
  background-color: var(--understanding);
}

/* MEDIA QUERIES */
@media (max-width: 992px) {
  .nav-menu-container,
  .right-container {
    display: none !important;
  }
}
@media (min-width: 992px) {
  .burger-btn,
  .mobile-dropdown {
    display: none;
  }
}
</style>
