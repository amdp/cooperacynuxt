<template>
  <b-container class="m-0 p-0 pagecontainer">
    <img
      class="page-header col-md-8"
      src="~/assets/image/page/banners/main/platform.png"
    />

    <p class="subheading transparency center space">IMAGINE</p>
    <p class="base">
      Imagine the effect of one million people collecting one euro each. Imagine
      one million euros to be collected every month. Imagine this capital to
      support your ideas and an innovative economy in which the more people will
      participate, the more the people's ideas will be realized.<br />
    </p>

    <p class="subheading transparency center space">CO-OWNING A PLATFORM</p>
    <p class="base">
      The Cooperacy Platform will create a social ecosystem based on
      co-ownership and redistribution of wealth. Every participants will in fact
      be a co-owner of all the platform achievements and funds.
    </p>

    <p class="subheading center space transparency">VOTING IDEAS</p>
    <p class="base">
      The platform distributes
      <nuxt-link to="/main/integration" class="ae">proportionally</nuxt-link>
      the common money and resources to the ideas according to the participants'
      <nuxt-link to="/main/cooperation#diversity" class="ae"
        >preferences</nuxt-link
      >
      expressed through colorful votes. Keeping it simple: people propose
      <i>ideas</i>, the participants <i>preferences</i> allocate the common
      money.
    </p>

    <p class="subheading center space transparency">REDISTRIBUTING PROFITS</p>
    <p class="base">
      When a cooperation produces wealth, its profits go back to the collected
      money, in order to fund other ideas and to create a virtuous circle that
      slowly generates resources for
      <nuxt-link to="/main/cooperation#equivalence" class="ae"
        >everyone</nuxt-link
      >.
    </p>

    <p class="subheading center space equivalence margin">
      A COOPERATION LEARNING ECOSYSTEM
    </p>
    <p class="base">
      An artificial intelligence will learn from all the
      <nuxt-link to="/main/research" class="au">data</nuxt-link> coming from the
      platform and suggest, in the long run, best practices in order to help the
      people to realise their ideas. Moreover, the participants can communicate
      their happiness, so that the "deep learning ecosystem" will base its
      suggestions not only on data, but also on the most human, irrational and
      personal information of all: mood.
    </p>

    <p class="base">
      <i
        >For more technical information about the platform, see its
        <nuxt-link to="/main/whitepaper" class="au">white paper</nuxt-link>.</i
      >
    </p>

    <p class="base">
      We would be very happy to see you on board. One euro per month is really a
      small effort to see how much can be done when we join our forces.<br /><br />
      Enter the
      <nuxt-link to="/login" class="ae">Cooperacy</nuxt-link> Platform.. let's
      start doing things together!
    </p>
  </b-container>
</template>
<script>
export default {
  head() {
    return {
      title: 'Cooperacy - The Cooperacy Platform'
    }
  }
}
</script>
