<template>
  <b-container fluid class="m-0 p-2 foot" id="foot">
    <b-row>
      <b-container fluid class="d-flex justify-content-center text-center">
        <b-row class="m-0 p-0 text-center">
          <b-col cols="12" class="m-0 p-0 t24">
            <a
              href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=NQAB44A9HNLS4"
              class="at menux"
              >DONATE</a
            >&nbsp;
            <nuxt-link to="/login" class="ae menux">JOIN</nuxt-link>&nbsp;
            <nuxt-link class="ai menux" to="/contact">CONTACT</nuxt-link>
            &nbsp;
          </b-col>
          <b-col cols="12" class="m-0 mb-1 p-0 t18">
            &copy; COOPERACY RESEARCH ASSOCIATION 2015-2020 - VIA DELLA MOSCOVA,
            39 - 20121 MILAN ITALY EU - FISCAL CODE 97725540153 -
            <nuxt-link class="ai" to="/main/terms">POLICY</nuxt-link> -
            <nuxt-link :to="switchLocalePath('it')">
              <b-img src="../assets/icons/italy.svg" class="langflag" />
            </nuxt-link>
            <nuxt-link :to="switchLocalePath('en')">
              <b-img src="../assets/icons/uk.svg" class="langflag" />
            </nuxt-link>
          </b-col>
        </b-row>
      </b-container>
    </b-row>
  </b-container>
</template>
