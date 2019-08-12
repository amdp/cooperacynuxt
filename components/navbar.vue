<template>
  <b-navbar
    toggleable="lg"
    class="fixed-top bg-white d-flex flex-fill justify-content-center align-middle p-0"
  >
    <b-row class="w-100">
      <b-col cols="4 d-flex">
        <!-- logo -->
        <b-navbar-brand class="headerlogo mt-1" to="/"
          ><img class="headerlogo" src="@/assets/image/main/wordlogo.png" />
        </b-navbar-brand>
      </b-col>

      <b-navbar-toggle target=".nav-collapse"></b-navbar-toggle>

      <b-col cols="4 d-flex">
        <b-collapse class="nav-collapse" is-nav>
          <!--menu-->
          <div class="container d-flex justify-content-center">
            <b-navbar-nav class="minini">
              <b-nav-item-dropdown text="THE PROJECT" no-caret center
                ><b-dropdown-item>
                  <nuxt-link to="/aboutyou"
                    >ABOUT YOU &nbsp;&nbsp;&nbsp;</nuxt-link
                  >

                  <nuxt-link to="/aboutus"
                    >ABOUT US &nbsp;&nbsp;&nbsp;</nuxt-link
                  >

                  <nuxt-link to="/platform"
                    >THE PLATFORM &nbsp;&nbsp;&nbsp;</nuxt-link
                  >

                  <nuxt-link to="/governance"
                    >GOVERNANCE &nbsp;&nbsp;&nbsp;</nuxt-link
                  >
                </b-dropdown-item>
              </b-nav-item-dropdown>

              <b-nav-item-dropdown text="CORPORATE" no-caret right>
                <b-dropdown-item>
                  <nuxt-link to="/corporate"
                    >CORPORATE WORLD &nbsp;&nbsp;&nbsp;</nuxt-link
                  >

                  <nuxt-link to="/overview"
                    >MEASURES &nbsp;&nbsp;&nbsp;</nuxt-link
                  >

                  <nuxt-link to="/coopenspace"
                    >CO-OPEN SPACE &nbsp;&nbsp;&nbsp;</nuxt-link
                  >

                  <nuxt-link to="/cohackathon"
                    >CO-HACKATHON &nbsp;&nbsp;&nbsp;</nuxt-link
                  >

                  <nuxt-link to="/workshops"
                    >WORKSHOPS &nbsp;&nbsp;&nbsp;</nuxt-link
                  >
                </b-dropdown-item>
              </b-nav-item-dropdown>

              <b-nav-item-dropdown text="SCIENCE" no-caret right>
                <b-dropdown-item>
                  <nuxt-link to="/cooperation"
                    >COOPERATION &nbsp;&nbsp;&nbsp;</nuxt-link
                  >

                  <nuxt-link to="/integration">
                    INTEGRATION &nbsp;&nbsp;&nbsp;</nuxt-link
                  >

                  <nuxt-link to="/cci"> CCI &nbsp;&nbsp;&nbsp;</nuxt-link>

                  <nuxt-link to="/science">
                    CRA &nbsp;&nbsp;&nbsp;
                  </nuxt-link>

                  <nuxt-link to="/news"> NEWS</nuxt-link>
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </div>
          <!-- end menu -->
        </b-collapse>
      </b-col>

      <b-col cols="3 d-flex p-0">
        <b-collapse class="nav-collapse" is-nav>
          <!-- user name and surname -->
          <div
            class="container d-flex justify-content-end p-0"
            v-if="this.$auth.loggedIn"
          >
            <b-navbar-nav class="up minini">
              <b-nav-text class="align-middle">
                {{ this.$auth.user.name + ' ' + this.$auth.user.surname }}
              </b-nav-text>
            </b-navbar-nav>
          </div>
        </b-collapse>
      </b-col>
      <b-col cols="1 d-flex">
        <b-collapse class="nav-collapse" is-nav>
          <!-- login -->
          <div
            class="container d-flex justify-content-end"
            v-if="!this.$auth.loggedIn"
          >
            <b-navbar-nav class="up minini">
              <b-nav-item to="/login">LOGIN</b-nav-item>
            </b-navbar-nav>
          </div>
          <div
            class="container d-flex justify-content-end"
            v-if="this.$auth.loggedIn"
          >
            <b-navbar-nav @click="show = !show">
              <!-- logout dropdown -->
              <img
                class="usercoologo m-2 p-0"
                src="@/assets/image/main/coo.png"
              />
              <img
                v-if="userImage"
                class="userlogo rounded-circle m-2 p-0"
                :src="userImage"
              />
              <div
                class="minimini hideover"
                @click="$auth.logout()"
                v-if="show"
              >
                LOGOUT
              </div>
            </b-navbar-nav>
          </div>
        </b-collapse>
      </b-col>
      <b-col
        v-if="this.$auth.loggedIn"
        cols="12"
        class="p-0"
        style="margin-bottom: 2px"
      >
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
  </b-navbar>
</template>

<script>
import votebar from './votebar'

export default {
  data() {
    return { show: false }
  },
  components: { votebar: votebar },
  computed: {
    userImage() {
      try {
        return require('../assets/image/user/' + this.$auth.user.id + '.png')
      } catch (e) {
        return
      }
    }
  }
}
</script>
