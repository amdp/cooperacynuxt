<template>
  <div class="container">
    <div id="cooperacyMenu" class="collapse navbar-collapse d-flex justify-content-start mt-3">
      <ul class="navbar-nav">
        <li class="navitem dropdown">
          <a href="#" class="nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">THE PROJECT</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/aboutyou">ABOUT YOU</a>
            <a class="dropdown-item" href="./assets/pages/aboutus">ABOUT US</a>
            <router-link class="nav-link" to="/aboutus">ABBAUT US</router-link>
            <a class="dropdown-item" href="/platform">THE PLATFORM</a>
            <a class="dropdown-item" href="/governance">GOVERNANCE</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#" class="nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SERVICES</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/coorporate">COOPERATION SERVICES</a>
            <a class="dropdown-item" href="/openecosystem">OPEN SPACE COOPERATION</a>
            <a class="dropdown-item" href="/overview">COOPERATION OVERVIEW</a>
            <a class="dropdown-item" href="/cohackathon">COOPERATIVE HACKATHON</a>
            <a class="dropdown-item" href="/workshops">COOPERATION WORKSHOPS</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#" class="nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SCIENCE</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/cooperation">COOPERATION</a>
            <a class="dropdown-item" href="/integration">INTEGRATION</a>
            <a class="dropdown-item" href="/cci">COOPERATION CONTEXT INDEX</a>
            <a class="dropdown-item" href="/science">COOPERACY RESEARCH ASSOCIATION</a>
            <a class="dropdown-item" href="/news">NEWS</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
