<template>
  <b-container class="p-0 m-0">
    <div class="w-100 nav-container z-0 fixer"></div>
    <!--  dekstop nav -->
    <div class="w-100 nav-container">
      <b-navbar
        toggleable="lg"
        class="navbar d-flex justify-content-start m-0 p-0"
        @mouseleave="navState = null"
      >
        <div class="col-6 col-sm-4 col-lg-2 p-0" @click="hideNav()">
          <nuxt-link
            to="/"
            tag="img"
            class="img-logo img-fluid"
            :src="wordLogo"
          />
        </div>
        <div class="col-8 d-flex flex-column h-100 nav-only-desktop">
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
            <nuxt-link class="menu-item" to="/main/aboutyou"
              >ABOUT YOU</nuxt-link
            >
            <nuxt-link class="menu-item" to="/main/aboutus">ABOUT US</nuxt-link>
            <nuxt-link class="menu-item" to="/main/platform"
              >THE PLATFORM</nuxt-link
            >
            <nuxt-link class="menu-item" to="/main/governance"
              >GOVERNANCE</nuxt-link
            >
          </div>
          <div
            class="navbar-links text-center"
            id="corporate"
            v-if="navState == 'corporate'"
          >
            <nuxt-link class="menu-item" to="/main/corporate"
              >CORPORATE WORLD</nuxt-link
            >
            <nuxt-link class="menu-item" to="/main/overview"
              >MEASURING COOPERATION</nuxt-link
            >
            <nuxt-link class="menu-item" to="/main/coopenspace"
              >CO-OPEN SPACE</nuxt-link
            >
            <nuxt-link class="menu-item" to="/main/cohackathon"
              >CO-HACKATHON</nuxt-link
            >
            <nuxt-link class="menu-item" to="/main/workshops"
              >WORKSHOPS</nuxt-link
            >
          </div>
          <div
            class="navbar-links text-center"
            id="science"
            v-if="navState == 'science'"
          >
            <nuxt-link class="menu-item" to="/main/cooperation"
              >COOPERATION</nuxt-link
            >
            <nuxt-link class="menu-item" to="/main/integration"
              >INTEGRATION</nuxt-link
            >
            <nuxt-link class="menu-item" to="/cci">
              COOPERATION CONTEXT INDEX
            </nuxt-link>
            <nuxt-link class="menu-item" to="/main/research"
              >RESEARCH</nuxt-link
            >
            <nuxt-link class="menu-item" to="/news">NEWS</nuxt-link>
          </div>
        </div>
        <div
          class="col-2 d-flex flex-column align-items-end h-100 nav-only-desktop"
        >
          <div class="text-center h-100 d-flex flex-column">
            <nuxt-link
              class="mobile-menu-item pb-1 font-weight-bold"
              id="login-btn"
              v-if="!this.$auth.loggedIn"
              to="/login"
            >
              LOGIN
            </nuxt-link>
            <nuxt-link to="/user" v-else>
              {{ this.$auth.user.name + ' ' + this.$auth.user.surname }}
            </nuxt-link>
            <div class="social-icons">
              <a href="https://www.facebook.com/cooperacy.org/" target="_blank">
                <img src="../assets/icons/facebook.svg" id="facebook" />
              </a>
              <a
                href="https://www.linkedin.com/company/cooperacy/"
                target="_blank"
              >
                <img src="../assets/icons/linkedin.svg" id="linkedin" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCbeRtTRYXwsbSPc9JvSMvtQ"
                target="_blank"
              >
                <img src="../assets/icons/youtube.svg" id="youtube" />
              </a>
              <a @click="colormode()">
                <img src="../assets/icons/moonbyadriencoquet.svg" id="moon" />
              </a>
            </div>
          </div>
        </div>

        <!-- MOBILE HAMBURGER BUTTON -->
        <div
          class="col-2 h-100 burger-btn ml-auto text-right mr-2"
          @click="toggleNav"
        >
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
            @click="hideNav()"
          >
            <nuxt-link class="mobile-menu-item" to="/main/aboutyou">
              ABOUT YOU
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/aboutus"
              >ABOUT US</nuxt-link
            >
            <nuxt-link class="mobile-menu-item" to="/main/platform">
              THE PLATFORM
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/governance">
              GOVERNANCE
            </nuxt-link>
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
            @click="hideNav()"
          >
            <nuxt-link class="mobile-menu-item" to="/main/corporate">
              CORPORATE WORLD
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/overview">
              MEASURING COOPERATION
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/coopenspace">
              CO-OPEN SPACE
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/cohackathon">
              CO-HACKATHON
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/workshops">
              WORKSHOPS
            </nuxt-link>
          </div>
        </div>
        <div class="mobile-nav-box" @click="navState = 'science'">
          <div
            class="nav-item"
            :class="{ 'science-active': navState == 'science' }"
          >
            SCIENCE
          </div>
          <div
            class="mt-2 d-flex flex-column"
            v-if="navState == 'science'"
            @click="hideNav()"
          >
            <nuxt-link class="mobile-menu-item" to="/main/cooperation">
              COOPERATION
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/integration">
              INTEGRATION
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/cci">
              COOPERATION CONTEXT INDEX
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/research"
              >RESEARCH</nuxt-link
            >
            <nuxt-link class="mobile-menu-item" to="/news">NEWS</nuxt-link>
          </div>
        </div>
        <nuxt-link to="/login" v-if="!this.$auth.loggedIn" @click="hideNav()">
          <div class="mobile-nav-box">
            <p class="nav-item">LOGIN</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/user" @click="hideNav()" v-else>
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
  </b-container>
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
    resetNavState: function () {
      this.navState = null
    },
    hideNav: function () {
      this.isDropdownVisible = false
      this.resetNavState()
    },
    toggleNav: function () {
      this.isDropdownVisible = !this.isDropdownVisible
      this.resetNavState()
    },
    colormode: function () {
      if (this.$colorMode.preference == 'light') {
        this.$colorMode.preference = 'dark'
      } else {
        this.$colorMode.preference = 'light'
      }
    }
  }
}
</script>
