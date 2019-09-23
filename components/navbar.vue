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
            class="mobile-nav-item pb-1 font-weight-bold"
            id="login-btn"
            v-if="!this.$auth.loggedIn"
            to="/login"
            >LOGIN</nuxt-link
          >
          <a href="" v-else>{{
            this.$auth.user.name + ' ' + this.$auth.user.surname
          }}</a>
          <div class="social-icons">
            <a href="https://www.linkedin.com/company/cooperacy/">
              <img src="../assets/icons/linkedin.svg" id="linkedin" />
            </a>
            <a href="https://www.youtube.com/channel/UCbeRtTRYXwsbSPc9JvSMvtQ">
              <img src="../assets/icons/youtube.svg" id="youtube" />
            </a>
            <a href="https://www.facebook.com/cooperacy.org/">
              <img src="../assets/icons/facebook.svg" id="facebook" />
            </a>
          </div>
        </div>
      </div>

      <!-- MOBILE HARMBURGER BUTTON -->
      <div class="col-2 h-100 burger-btn ml-auto text-right" @click="resetNav">
        <img v-if="!isDropdownVisible" src="../assets/icons/bars.svg" />
        <img v-else src="../assets/icons/times.svg" />
      </div>
    </b-navbar>

    <!-- MOBILE DROPDOWN -->
    <div class="mobile-dropdown text-center pt-2" v-if="isDropdownVisible">
      <div class="mobile-nav-box">
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
          <nuxt-link class="mobile-nav-item" to="/aboutyou"
            >ABOUT YOU</nuxt-link
          >
          <nuxt-link class="mobile-nav-item" to="/aboutus">ABOUT US</nuxt-link>
          <nuxt-link class="mobile-nav-item" to="/platform"
            >THE PLATFORM</nuxt-link
          >
          <nuxt-link class="mobile-nav-item" to="/governance"
            >GOVERNANCE</nuxt-link
          >
        </div>
      </div>
      <div class="mobile-nav-box">
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
          <nuxt-link class="mobile-nav-item" to="/corporate"
            >CORPORATE WORLD</nuxt-link
          >
          <nuxt-link class="mobile-nav-item" to="/overview"
            >MEASURING COOPERATION</nuxt-link
          >
          <nuxt-link class="mobile-nav-item" to="/coopenspace"
            >CO-OPEN SPACE</nuxt-link
          >
          <nuxt-link class="mobile-nav-item" to="/cohackathon"
            >CO-HACKATHON</nuxt-link
          >
          <nuxt-link class="mobile-nav-item" to="/workshops"
            >WORKSHOPS</nuxt-link
          >
        </div>
      </div>
      <div class="mobile-nav-box">
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
          <nuxt-link class="mobile-nav-item" to="/cooperation"
            >COOPERATION</nuxt-link
          >
          <nuxt-link class="mobile-nav-item" to="/integration"
            >INTEGRATION</nuxt-link
          >
          <nuxt-link class="mobile-nav-item" to="/cci"
            >COOPERATION CONTEXT INDEX</nuxt-link
          >
          <nuxt-link class="mobile-nav-item" to="/science">RESEARCH</nuxt-link>
          <nuxt-link class="mobile-nav-item" to="/news">NEWS</nuxt-link>
        </div>
      </div>
      <div class="mobile-nav-box" @click="resetNav">
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
.social-icons img {
  transition-duration: 0.3s;
}
#linkedin:hover {
  filter: invert(100%) url('../assets/icons/linkedin.svg#transparency-filter');
}
#facebook:hover {
  filter: invert(100%) url('../assets/icons/facebook.svg#freedom-filter');
}
#youtube:hover {
  filter: invert(90%) url('../assets/icons/youtube.svg#youtube-filter');
}
</style>
