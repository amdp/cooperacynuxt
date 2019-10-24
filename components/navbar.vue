<template>
  <!--  dekstop nav -->
  <div class="w-100 nav-container">
    <b-navbar
      toggleable="lg"
      class="navbar d-flex justify-content-start flex-wrap"
      @mouseleave="navState = null"
    >
      <nuxt-link
        @click.native="resetNav"
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
          <div class="nav" @mouseenter="navState = 'research'">
            <div
              class="nav-item"
              :class="{ 'research-active': navState == 'research' }"
            >
              RESEARCH
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
          id="research"
          v-if="navState == 'research'"
        >
          <nuxt-link class="menu-item" to="/cooperation">COOPERATION</nuxt-link>
          <nuxt-link class="menu-item" to="/integration">INTEGRATION</nuxt-link>
          <nuxt-link class="menu-item" to="/cci"
            >COOPERATION CONTEXT INDEX</nuxt-link
          >
          <nuxt-link class="menu-item" to="/science">SCIENCE</nuxt-link>
          <nuxt-link class="menu-item" to="/news">NEWS</nuxt-link>
        </div>
      </div>
      <div
        class="col-2 d-flex flex-column align-items-end h-100 right-container"
      >
        <div class="text-center h-100 d-flex flex-column">
          <nuxt-link
            class="mobile-menu-item pb-1 font-weight-bold"
            id="login-btn"
            v-if="!this.$auth.loggedIn"
            to="/login"
            >LOGIN</nuxt-link
          >
          <nuxt-link to="/user" v-else>{{
            this.$auth.user.name + ' ' + this.$auth.user.surname
          }}</nuxt-link>
          <div class="social-icons">
            <a href="https://www.facebook.com/cooperacy.org/">
              <img src="../assets/icons/facebook.svg" id="facebook" />
            </a>
            <a href="https://www.linkedin.com/company/cooperacy/">
              <img src="../assets/icons/linkedin.svg" id="linkedin" />
            </a>
            <a href="https://www.youtube.com/channel/UCbeRtTRYXwsbSPc9JvSMvtQ">
              <img src="../assets/icons/youtube.svg" id="youtube" />
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
      <div class="mobile-nav-box" @click="navState = 'project'">
        <div
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
          <nuxt-link class="mobile-menu-item" to="/aboutyou"
            >ABOUT YOU</nuxt-link
          >
          <nuxt-link class="mobile-menu-item" to="/aboutus">ABOUT US</nuxt-link>
          <nuxt-link class="mobile-menu-item" to="/platform"
            >THE PLATFORM</nuxt-link
          >
          <nuxt-link class="mobile-menu-item" to="/governance"
            >GOVERNANCE</nuxt-link
          >
        </div>
      </div>
      <div class="mobile-nav-box" @click="navState = 'corporate'">
        <div
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
          <nuxt-link class="mobile-menu-item" to="/corporate"
            >CORPORATE WORLD</nuxt-link
          >
          <nuxt-link class="mobile-menu-item" to="/overview"
            >MEASURING COOPERATION</nuxt-link
          >
          <nuxt-link class="mobile-menu-item" to="/coopenspace"
            >CO-OPEN SPACE</nuxt-link
          >
          <nuxt-link class="mobile-menu-item" to="/cohackathon"
            >CO-HACKATHON</nuxt-link
          >
          <nuxt-link class="mobile-menu-item" to="/workshops"
            >WORKSHOPS</nuxt-link
          >
        </div>
      </div>
      <div class="mobile-nav-box" @click="navState = 'research'">
        <div
          class="nav-item"
          :class="{ 'research-active': navState == 'research' }"
        >
          RESEARCH
        </div>
        <div
          class="mt-2 d-flex flex-column"
          v-if="navState == 'research'"
          @click="resetNav"
        >
          <nuxt-link class="mobile-menu-item" to="/cooperation"
            >COOPERATION</nuxt-link
          >
          <nuxt-link class="mobile-menu-item" to="/integration"
            >INTEGRATION</nuxt-link
          >
          <nuxt-link class="mobile-menu-item" to="/cci"
            >COOPERATION CONTEXT INDEX</nuxt-link
          >
          <nuxt-link class="mobile-menu-item" to="/science">SCIENCE</nuxt-link>
          <nuxt-link class="mobile-menu-item" to="/news">NEWS</nuxt-link>
        </div>
      </div>
      <nuxt-link
        to="/login"
        v-if="!this.$auth.loggedIn"
        @click.native="resetNav"
      >
        <div class="mobile-nav-box">
          <p class="nav-item">LOGIN</p>
        </div>
      </nuxt-link>
      <nuxt-link to="/user" @click.native="resetNav" v-else>
        <div class="mobile-nav-box">
          <p class="nav-item">
            {{ this.$auth.user.name + ' ' + this.$auth.user.surname }}
          </p>
        </div>
      </nuxt-link>
    </div>
    <b-col v-if="this.$auth.loggedIn" cols="12" class="p-0 fluid">
      <votebar :voteprop="$auth.user" :proptype="'user'" />
    </b-col>
  </div>
</template>

<script>
import votebar from './votebar'
export default {
  components: { votebar },
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
.nav-container {
  height: auto;
}
</style>
