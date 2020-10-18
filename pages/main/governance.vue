<template>
  <b-container class="m-0 p-0 pagecontainer">
    <br /><img
      class="page-header"
      src="~/assets/image/page/banners/main/governance.png"
    />

    <br /><br />
    <p class="base">
      The Cooperacy governance is the way
      <nuxt-link to="/main/participate" class="ae">participants</nuxt-link> take
      decisions in Cooperacy, according to cooperation science insights.
    </p>
    <br /><br />

    <p class="subheading freedom center space">COOPERATIONS</p>
    <br />
    <p class="base">
      The Cooperacy governance is made of cooperations, that can also be
      containers. The main cooperation container is Cooperacy itself. Every
      cooperation is based on the most simple form of
      <nuxt-link to="/main/cooperation" class="ae">cooperation</nuxt-link>: two
      or more people doing something together. <br />
      It is advised every cooperation should have two coordinators and a maximum
      of 150 people. They may also decide to elect everyone as coordinator to
      experiment diffuse governance.<br />
      Anytime, coordinators may resign, can be substituted upon the cooperation
      participants’ will or candidates may propose themselves to become
      coordinators.<br />
    </p>
    <br />
    <p class="subheading freedom center space">DECISIONS</p>
    <br />
    <p class="base" style="width: 100%">
      Coordinators may take direct decisions in their cooperation. Only when
      their decision is publicly communicated it becomes effective. When they
      are in contrast or unsure about what decision to take, coordinators can
      ask advice to the participants or start a voting phase, remembering voting
      is never subject to majority but represents an official evaluation that
      needs to be
      <nuxt-link to="/main/cooperation" class="ae">integrated</nuxt-link
      >.<br /><br />

      Participants can propose decisions as well through voting evaluation or
      asking the coordinators for direct approval.<br />
      Participants may also oppose the coordinators decisions. If the opposing
      participants are at least two<SUP>1</SUP>, the coordinators should
      proportionally and creatively
      <nuxt-link to="/main/integration" class="ad">integrate</nuxt-link> the
      opposition according to the seven
      <nuxt-link to="/main/integration#solutions" class="ae"
        >solutions</nuxt-link
      >
      or alternatively start a voting evaluation.<br /><br />

      If just a single participant proposes or opposes, but nobody secondes, the
      single instance is recorded or, when possible, but not always,
      proportionally and creatively
      <nuxt-link to="/main/integration" class="ad">integrated</nuxt-link>.<br />

      <br /><img
        style="width: 100%"
        class="page-header"
        src="~/assets/image/page/governance/decisions.png"
      />
    </p>
    <br />
    <p class="subheading freedom center space">VOTING EVALUATIONS</p>
    <br />
    <p class="base">
      Cooperacy is a design democracy: we vote cooperation ideas first, people
      afterwards. Decisions are voted independently from the people who will
      enact them, as they will be chosen <i>on a second step</i>.<br /><br />
      The voting can be anonymous during the voting phase, but becomes
      transparent once the results are shown. All voting evaluation results are
      transparent.<br /><br />
      The decision making is based on approval voting, that is, everyone may
      vote with a single vote all the cooperation ideas or alternative decisions
      they want. If there is not a clear orientation<SUP>2</SUP> after the
      voting evaluation, the participants may want to leave their choice to the
      coordinators. They may also choose with the coordinators which one of the
      seven possible
      <nuxt-link to="/main/integration#solutions" class="af"
        >solutions</nuxt-link
      >
      to apply for the realization of the cooperation’s will.<br /><br />
    </p>

    <br /><br />

    <p class="t16 just">
      1: DUAL COORDINATION The idea of a coordinating pair came up in order to
      avoid power to be concentrated in just one person, that receives huge
      responsibilities and is alone in facing them, or in more than two people,
      that may generate internal conflictual groups or collusions. Collective
      coordination is also possible, although roles could emerge anyways.<br />
      2: VOTING IS INFORMATIVE The voting results are indicators of the
      participants will, they do not explicitly determine a final decision,
      because winning and losing the voting process is substituted by evaluation
      and
      <nuxt-link to="/main/integration" class="af"
        >proportional creative integration</nuxt-link
      >.
    </p>
  </b-container>
</template>
<script>
export default {
  head() {
    return {
      title: 'Cooperacy - Governance'
    }
  }
}
</script>
