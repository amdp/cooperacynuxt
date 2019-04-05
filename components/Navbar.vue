<template>
  <b-navbar toggleable="lg" class="p-1 fixed-top bg-white d-flex flex-fill justify-content-center">
    <b-navbar-brand to="/"><img class="header-logop" src="@/assets/images/wordlogo.png"  /></b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav></b-navbar-nav>

      <b-navbar-nav class="ml-auto">
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
        <b-nav-item-dropdown text="LOGIN" no-caret right>
          <b-dropdown-item to="#">ME</b-dropdown-item>
          <b-dropdown-item to="#">LOGOUT</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

          