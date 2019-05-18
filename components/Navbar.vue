<template>
  <b-navbar toggleable="lg" class="p-1 fixed-top bg-white d-flex flex-fill justify-content-center">
    <b-navbar-brand to="/" v-if="!this.$auth.loggedIn"><img class="headerlogo" src="@/assets/image/main/wordlogo.png"  /></b-navbar-brand>
    <b-navbar-brand to="/user" v-if="this.$auth.loggedIn" >
          <img class="usercoologo m-2" src="@/assets/image/main/coo.png"  />
          <img v-if="userImage" class="userlogo m-2 rounded-circle" :src="userImage">
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="w-100">
        <div v-if="this.$auth.loggedIn" class="row w-100">
          <div class="col d-flex justify-content-start">
            <h3 class="diversity up base mr-3">{{this.$auth.user.name + ' ' + this.$auth.user.surname}}</h3>
            <a class="au minimini" to="useredit">EDIT</a>
          </div>
          <div class="w-100"></div>
          <div class="col ml-4 pl-4"><div class="row dflex justify-content-start">
            <votebar :voteprop="$auth.user" :proptype="'user'" />
            </div>
          </div>
        </div>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto mr-4">
        <b-nav-item-dropdown text="THE PROJECT" no-caret right>
          <b-dropdown-item to="aboutyou">ABOUT YOU</b-dropdown-item>
          <b-dropdown-item to="aboutus">ABOUT US</b-dropdown-item>
          <b-dropdown-item to="platform">THE PLATFORM</b-dropdown-item>
          <b-dropdown-item to="governance">GOVERNANCE</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="SERVICES" no-caret right>
            <b-dropdown-item to="coorporate">COOPERATION SERVICES</b-dropdown-item>
            <b-dropdown-item to="openecosystem">OPEN SPACE COOPERATION</b-dropdown-item>
            <b-dropdown-item to="overview">COOPERATION OVERVIEW</b-dropdown-item>
            <b-dropdown-item to="cohackathon">COOPERATIVE HACKATHON</b-dropdown-item>
            <b-dropdown-item to="workshops">COOPERATION WORKSHOPS</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="SCIENCE" no-caret right>
            <b-dropdown-item to="cooperation">COOPERATION</b-dropdown-item>
            <b-dropdown-item to="integration">INTEGRATION</b-dropdown-item>
            <b-dropdown-item to="cci">COOPERATION CONTEXT INDEX</b-dropdown-item>
            <b-dropdown-item to="science">COOPERACY RESEARCH ASSOCIATION</b-dropdown-item>
            <b-dropdown-item to="news">NEWS</b-dropdown-item>
        </b-nav-item-dropdown>
        <span> &nbsp;&nbsp;&nbsp;</span>
        <b-nav-item v-if="!this.$auth.loggedIn" to="login">LOGIN</b-nav-item>
        <b-nav-item v-if="this.$auth.loggedIn" @click="$auth.logout()">LOGOUT</b-nav-item>        
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Votebar from '@/components/Votebar'

export default {
  components: {
    Votebar: Votebar,
  },
  computed: {
    userImage: function () { if (this.$auth.user.id) { return require('../assets/image/user/' + this.$auth.user.id + '.png')}}
  }
}
</script>
          