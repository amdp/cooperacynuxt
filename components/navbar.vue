<template>
  <div class="container m-0 p-0">
    <div class="fixed-top bg-white p-0 d-none d-lg-block">
      <b-row class="w-100 m-0">
        <b-col cols="2" class="p-0">
          <!-- logo -->
          <div class="container headerlogo p-0">
            <nuxt-link to="/" tag="img" class="imglogo" :src="wordLogo">
            </nuxt-link>
          </div>
        </b-col>
        <b-col cols="8" class="p-0 d-flex">
          <!--menu-->
          <b-row class="w-100 m-0 upmenu">
            <b-col cols="12" class="p-0 d-flex">
              <div class="container d-flex justify-content-center p-0 t14 mt-2">
                <div @mouseover="menushow('project')" class="pr-4">
                  THE PROJECT
                </div>
                <div @mouseover="menushow('corporate')" class="pr-4">
                  CORPORATE
                </div>
                <div @mouseover="menushow('science')">
                  SCIENCE
                </div>
              </div>
            </b-col>
            <b-col cols="12" class="d-flex">
              <div
                class="container d-flex justify-content-center submenu"
                v-if="coomenus.project"
              >
                <nuxt-link class="mr-3" to="/aboutyou">ABOUT YOU</nuxt-link>
                <nuxt-link class="mr-3" to="/aboutus">ABOUT US</nuxt-link>
                <nuxt-link class="mr-3" to="/platform">THE PLATFORM</nuxt-link>
                <nuxt-link class="mr-3" to="/governance"> GOVERNANCE</nuxt-link>
              </div>
              <div
                class="container d-flex justify-content-center submenu"
                v-if="coomenus.corporate"
              >
                <nuxt-link class="mr-3" to="/corporate">
                  CORPORATE WORLD
                </nuxt-link>
                <nuxt-link class="mr-3" to="/overview">
                  MEASURING COOPERATION
                </nuxt-link>
                <nuxt-link class="mr-3" to="/coopenspace">
                  CO-OPEN SPACE
                </nuxt-link>
                <nuxt-link class="mr-3" to="/cohackathon">
                  CO-HACKATHON
                </nuxt-link>
                <nuxt-link class="mr-3" to="/workshops">
                  WORKSHOPS
                </nuxt-link>
              </div>
              <div
                class="container d-flex justify-content-center submenu"
                v-if="coomenus.science"
              >
                <nuxt-link class="mr-3" to="/cooperation">
                  COOPERATION
                </nuxt-link>
                <nuxt-link class="mr-3" to="/integration">
                  INTEGRATION
                </nuxt-link>
                <nuxt-link class="mr-3" to="/cci">
                  COOPERATION CONTEXT INDEX
                </nuxt-link>
                <nuxt-link class="mr-3" to="/science">
                  COOPERACY RESEARCH ASSOCIATION
                </nuxt-link>
                <nuxt-link class="mr-3" to="/news">
                  NEWS
                </nuxt-link>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="1" class="p-0 d-flex">
          <!-- user name and surname -->
          <div
            class="container d-flex justify-content-end p-0"
            v-if="this.$auth.loggedIn"
          >
            <b-navbar-nav class="up t12">
              <b-nav-text class="align-middle">
                {{ this.$auth.user.name + ' ' + this.$auth.user.surname }}
              </b-nav-text>
            </b-navbar-nav>
          </div>
        </b-col>
        <b-col cols="1" class="p-0 d-flex">
          <!-- login -->
          <div
            class="container d-flex justify-content-end"
            v-if="!this.$auth.loggedIn"
          >
            <b-navbar-nav class="up t14">
              <b-nav-item to="/login">LOGIN</b-nav-item>
            </b-navbar-nav>
          </div>
          <!-- user image link -->
          <div
            class="container d-flex justify-content-center p-0"
            v-if="this.$auth.loggedIn"
          >
            <nuxt-link
              to="/user"
              tag="img"
              class="userlogo rounded-circle"
              :src="userImage"
            >
            </nuxt-link>
          </div>
        </b-col>
        <b-col v-if="this.$auth.loggedIn" cols="12" class="p-0 d-flex">
          <votebar :voteprop="$auth.user" :proptype="'user'" />
        </b-col>

        <b-col
          v-if="!this.$auth.loggedIn"
          cols="12"
          class="p-0 bg-secondary"
          style="height: 1px"
          >&nbsp;
        </b-col>
      </b-row>
    </div>

    <!---------------------------- mobile ---------------------------->
    <b-navbar toggleable="lg" class="fixed-top bg-white p-0 d-lg-none">
      <div class="container m-0 p-0">
        <b-row class="w-100 m-0 rebar">
          <b-col cols="3" class="float-left">
            <b-navbar-brand class="headerlogo" to="/">
              <img class="headerlogo" src="@/assets/image/main/wordlogo.png" />
            </b-navbar-brand>
          </b-col>
          <b-col cols="9" class="p-0 float-right">
            <b-navbar-toggle
              target="nav-collapse"
              class="float-right"
            ></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav class="t12 float-right">
                <b-nav-dropdown text="THE PROJECT">
                  <b-dropdown-item to="/aboutyou" class="t12">
                    ABOUT YOU
                  </b-dropdown-item>
                  <b-dropdown-item to="/aboutus" class="t12">
                    ABOUT US
                  </b-dropdown-item>
                  <b-dropdown-item to="/platform" class="t12">
                    THE PLATFORM
                  </b-dropdown-item>
                  <b-dropdown-item to="/governance" class="t12">
                    GOVERNANCE
                  </b-dropdown-item>
                </b-nav-dropdown>

                <b-nav-dropdown text="CORPORATE">
                  <b-dropdown-item to="/corporate" class="t12">
                    CORPORATE WORLD
                  </b-dropdown-item>
                  <b-dropdown-item to="/overview" class="t12">
                    MEASURING COOPERATION
                  </b-dropdown-item>
                  <b-dropdown-item to="/coopenspace" class="t12">
                    CO-OPEN SPACE
                  </b-dropdown-item>
                  <b-dropdown-item to="/cohackathon" class="t12">
                    CO-HACKATHON
                  </b-dropdown-item>
                  <b-dropdown-item to="/workshops" class="t12">
                    WORKSHOPS
                  </b-dropdown-item>
                </b-nav-dropdown>
                <b-nav-dropdown text="SCIENCE">
                  <b-dropdown-item to="/cooperation" class="t12">
                    COOPERATION
                  </b-dropdown-item>
                  <b-dropdown-item to="/integration" class="t12">
                    INTEGRATION
                  </b-dropdown-item>
                  <b-dropdown-item to="/cci" class="t12">
                    COOPERATION CONTEXT INDEX
                  </b-dropdown-item>
                  <b-dropdown-item to="/science" class="t12">
                    COOPERACY RESEARCH ASSOCIATION
                  </b-dropdown-item>
                  <b-dropdown-item to="/news" class="t12">
                    NEWS
                  </b-dropdown-item>
                </b-nav-dropdown>
              </b-navbar-nav>
            </b-collapse>
          </b-col>
        </b-row>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import votebar from './votebar'

export default {
  data() {
    return {
      coomenus: { project: false, corporate: false, science: false }
    }
  },
  components: { votebar: votebar },
  computed: {
    userImage() {
      try {
        return require('../assets/image/user/' + this.$auth.user.id + '.png')
      } catch (e) {
        return require('../assets/image/main/coo.png')
      }
    },
    wordLogo() {
      try {
        return require('../assets/image/main/wordlogo.png')
      } catch (e) {
        return 'not found'
      }
    }
  },
  methods: {
    menushow(menu) {
      this.coomenus['project'] = false
      this.coomenus['corporate'] = false
      this.coomenus['science'] = false
      this.coomenus[menu] = true
    }
  }
}
</script>
