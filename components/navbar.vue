<template>
  <b-navbar
    toggleable="lg"
    class="fixed-top bg-white d-flex flex-fill justify-content-center p-0"
  >
    <b-row class="w-100">
      <!-- logo -->
      <b-col cols="5 d-flex">
        <b-navbar-brand class="headerlogo mb-2" to="/"
          ><img class="headerlogo" src="@/assets/image/main/wordlogo.png" />
        </b-navbar-brand>
      </b-col>
      <!-- end logo -->

      <!-- menu -->
      <b-col cols="2 d-flex justify-content-start">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <div class="container d-flex justify-content-start">
            <b-navbar-nav class="minini">
              <b-nav-item-dropdown text="THE PROJECT" no-caret right>
                <b-dropdown-item to="/aboutyou">ABOUT YOU</b-dropdown-item>
                <b-dropdown-item to="/aboutus">ABOUT US</b-dropdown-item>
                <b-dropdown-item to="/platform">THE PLATFORM</b-dropdown-item>
                <b-dropdown-item to="/governance">GOVERNANCE</b-dropdown-item>
              </b-nav-item-dropdown>

              <b-nav-item-dropdown text="CORPORATE" no-caret right>
                <b-dropdown-item to="/corporate"
                  >COOPREATION IN THE CORPORATE WORLD</b-dropdown-item
                >
                <b-dropdown-item to="/overview"
                  >CAN WE MEASURE COOPERATION?</b-dropdown-item
                >
                <b-dropdown-item to="/coopenspace"
                  >OPEN SPACE COOPERATION</b-dropdown-item
                >
                <b-dropdown-item to="/cohackathon"
                  >COOPERATIVE HACKATHON</b-dropdown-item
                >
                <b-dropdown-item to="/workshops"
                  >COOPERATION WORKSHOPS</b-dropdown-item
                >
              </b-nav-item-dropdown>

              <b-nav-item-dropdown text="SCIENCE" no-caret right>
                <b-dropdown-item to="/cooperation">COOPERATION</b-dropdown-item>
                <b-dropdown-item to="/integration">INTEGRATION</b-dropdown-item>
                <b-dropdown-item to="/cci"
                  >COOPERATION CONTEXT INDEX</b-dropdown-item
                >
                <b-dropdown-item to="/science"
                  >COOPERACY RESEARCH ASSOCIATION</b-dropdown-item
                >
                <b-dropdown-item to="/news">NEWS</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </div>
        </b-collapse>
      </b-col>
      <!-- <b-col
        v-if="this.$auth.loggedIn"
        cols="12"
        class="p-0"
        style="margin-bottom: 2px"
      >
        <votebar :voteprop="$auth.user" :proptype="'user'" />
      </b-col> -->
      <!-- end menu -->

      <!-- user/login -->
      <b-col cols="5 d-flex justify-content-end">
        <b-navbar-nav class="up mini mr-3" v-if="this.$auth.loggedIn">
          <b-nav-item to="/user" class="p-0">
            {{ this.$auth.user.name + ' ' + this.$auth.user.surname }}
            <img
              class="usercoologo m-2 p-0"
              src="@/assets/image/main/coo.png"
            />
            <img
              v-if="userImage"
              class="userlogo rounded-circle m-2 p-0"
              :src="userImage"
            />
          </b-nav-item>
          <b-nav-item
            v-if="this.$auth.loggedIn"
            @click="$auth.logout()"
            class="minimini"
            >LOGOUT</b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav v-if="!this.$auth.loggedIn">
          <div class="container d-flex justify-content-end">
            <b-nav-item to="/login">LOGIN</b-nav-item>
          </div>
        </b-navbar-nav>
      </b-col>
      <b-col
        v-if="!this.$auth.loggedIn"
        cols="12"
        class="p-0 bg-secondary"
        style="height: 1px"
        >&nbsp;</b-col
      >
      <!-- end user/login  -->
    </b-row>
  </b-navbar>
</template>

<script>
import votebar from './votebar'

export default {
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
