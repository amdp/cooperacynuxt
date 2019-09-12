<template>
  <div class="w-100">
    <b-navbar toggleable="lg" class="navbar">
      <nuxt-link to="/" tag="img" class="img-logo" :src="wordLogo"></nuxt-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="THE PROJECT" right>
            <b-dropdown-item
              ><nuxt-link to="/aboutyou">ABOUT YOU</nuxt-link></b-dropdown-item
            >
            <b-dropdown-item
              ><nuxt-link to="/aboutus">ABOUT US</nuxt-link></b-dropdown-item
            >
            <b-dropdown-item
              ><nuxt-link to="/platform"
                >THE PLATFORM</nuxt-link
              ></b-dropdown-item
            >
            <b-dropdown-item
              ><nuxt-link to="/governance"
                >GOVERNANCE</nuxt-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="CORPORATE" right>
            <b-dropdown-item
              ><nuxt-link to="/corporate"
                >CORPORATE WORLD</nuxt-link
              ></b-dropdown-item
            >
            <b-dropdown-item
              ><nuxt-link to="/overview"
                >MEASURING COOPERATION</nuxt-link
              ></b-dropdown-item
            >
            <b-dropdown-item
              ><nuxt-link to="/coopenscience"
                >CO-OPEN SCIENCE</nuxt-link
              ></b-dropdown-item
            >
            <b-dropdown-item
              ><nuxt-link to="/cohackathon"
                >CO-HACKATHON</nuxt-link
              ></b-dropdown-item
            >
            <b-dropdown-item
              ><nuxt-link to="/workshops">WORKSHOPS</nuxt-link></b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="SCIENCE" right>
            <b-dropdown-item
              ><nuxt-link to="/cooperation"
                >COOPERATION</nuxt-link
              ></b-dropdown-item
            >
            <b-dropdown-item
              ><nuxt-link to="/integration"
                >INTEGRATION</nuxt-link
              ></b-dropdown-item
            >
            <b-dropdown-item
              ><nuxt-link to="/cci"
                >COOPERATION SCIENCE INDEX</nuxt-link
              ></b-dropdown-item
            >
            <b-dropdown-item
              ><nuxt-link to="/science">RESEARCH</nuxt-link></b-dropdown-item
            >
            <b-dropdown-item
              ><nuxt-link to="/news">NEWS</nuxt-link></b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item class="ml-5"
            ><nuxt-link to="/login">LOGIN</nuxt-link></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>


<script>
export default {
  computed: {
    wordLogo() {
      try {
        return require('../assets/image/main/wordlogo.png')
      } catch (e) {
        return 'not found'
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  border-bottom: 1px #d3e0e9 solid;
  height: 10vh;
  opacity: 0.8;
  z-index: 5;
}
.img-logo {
  width: 230px;
  z-index: 6;
  cursor: pointer;
}
</style>
