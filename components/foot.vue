<template>
  <div>
    <div class="foot row d-flex justify-content-center mini mt-5">
      <p class="base space my-2">
        <a to="/login" class="ae" style="background-image:none">JOIN</a> -
        <a class="af" style="background-image:none" href="https://m.me/cooperacy.org">CHAT</a> -
        <a
          href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=YS7MHXBSVDDEU"
          class="at"
          style="background-image:none"
        >DONATE</a>
      </p>
      <p
        class="mini space m-0"
      >&copy; COOPERACY RESEARCH ASSOCIATION 2015-2018 - VIA DELLA MOSCOVA, 39 - 20121 MILAN ITALY EU - FISCAL CODE 97725540153</p>
      <p class="mini space mb-2">
        <a class="ai" href="https://www.iubenda.com/privacy-policy/8141188">PRIVACY POLICY</a>
        <nuxt-link class="ai" to="/terms">AGREEMENTS</nuxt-link>
        <nuxt-link class="ai" to="/contact">CONTACT</nuxt-link>
      </p>
    </div>
  </div>
</template>

<!-- <script>
  export default {
    head () {
     var _iub = _iub || [];
        _iub.csConfiguration = { cookiePolicyId: 8141188, siteId: 832114, lang: "it",
         banner: { slideDown: false, applyStyles: false, fontSize: "10px", content: "&nbsp;We use cookies. Check our %{cookie_policy_link}." }
       }
     script: [ { src: 'https://cdn.iubenda.com/cookie_solution/safemode/iubenda_cs.js'}  ]
    }
  }
</script>
