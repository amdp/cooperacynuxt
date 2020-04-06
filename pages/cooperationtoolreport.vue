<template>
  <b-container class="m-0 p-0">
    <b-row>
      <b-col cols="2"></b-col>
      <b-col cols="8">
        <h1 class="up text-center" v-html="result.name"></h1>
        <br /><br />
        <p>
          These result have been calculated on 1 survey out of
          {{ result.member }} people in the observed group.
        </p>
        <p v-if="result.project">
          This group is relative to the Cooperacy Project nr.
          {{ result.project }}
        </p>
        <p>
          This group is a
          {{ group }} located in {{ place }}, {{ country }}.
        </p>
        <p v-if="result.desc">Your Description:</p>
        <p v-html="result.desc"></p>
        <h2>Report:</h2>
        <p v-if="result.D <= 25">
          {{ $t('cootoolreport.stagnation') }}
          <br />
          {{ $t('cootoolreport.stagnationrisk') }}
          {{ log4(result.D) }}%
        </p>
        <p v-if="result.D - result.U > 0 && result.U > 25">
          {{ $t('cootoolreport.conflictD') }}
          <br />
          {{ $t('cootoolreport.conflictDrisk') }}
          {{ Math.round(Math.pow((result.D - result.U) / 100, 0.5) * 100) }}%
        </p>
        <p v-if="result.U <= 25">
          {{ $t('cootoolreport.conflict') }}
          <br />
          {{ $t('cootoolreport.conflictrisk') }}
          {{ log4(result.U) }}%
        </p>
        <p>D: {{ result.D }}</p>
        <p>U: {{ result.U }}</p>
        <p>F: {{ result.F }}</p>
        <p>I: {{ result.I }}</p>
        <p>C: {{ result.C }}</p>
        <p>T: {{ result.T }}</p>
        <p>E: {{ result.E }}</p>
        <p>HD: {{ result.HD }}</p>
        <p>HU: {{ result.HU }}</p>
        <p>HF: {{ result.HF }}</p>
        <p>HI: {{ result.HI }}</p>
        <p>HC: {{ result.HC }}</p>
        <p>HT: {{ result.HT }}</p>
        <p>HE: {{ result.HE }}</p>
        <p>MD: {{ result.MD }}</p>
        <p>MU: {{ result.MU }}</p>
        <p>MF: {{ result.MF }}</p>
        <p>MI: {{ result.MI }}</p>
        <p>MC: {{ result.MC }}</p>
        <p>MT: {{ result.MT }}</p>
        <p>ME: {{ result.ME }}</p>
        <p>P: {{ result.P }}</p>
        <p v-if="result.PText">Your comments:</p>
        <p v-html="result.PText" v-if="result.PText"></p>
        <p>PD: {{ result.PD }}</p>
        <p v-if="result.PDText">Your comments:</p>
        <p v-html="result.PDText" v-if="result.PDText"></p>
        <p>PU: {{ result.PU }}</p>
        <p v-if="result.PUText">Your comments:</p>
        <p v-html="result.PUText" v-if="result.PUText"></p>
        <p>PF: {{ result.PF }}</p>
        <p v-if="result.PFText">Your comments:</p>
        <p v-html="result.PFText" v-if="result.PFText"></p>
        <p>PI: {{ result.PI }}</p>
        <p v-if="result.PIText">Your comments:</p>
        <p v-html="result.PIText" v-if="result.PIText"></p>
        <p>PC: {{ result.PC }}</p>
        <p v-if="result.PCText">Your comments:</p>
        <p v-html="result.PCText" v-if="result.PCText"></p>
        <p>PT: {{ result.PT }}</p>
        <p v-if="result.PTText">Your comments:</p>
        <p v-html="result.PTText" v-if="result.PTText"></p>
        <p>PE: {{ result.PE }}</p>
        <p v-if="result.PEText">Your comments:</p>
        <p v-html="result.PEText" v-if="result.PEText"></p>
        <p>PFinal: {{ result.PFinal }}</p>
        <p v-if="result.PFinalText">Your comments:</p>
        <p v-html="result.PFinalText" v-if="result.PFinalText"></p>
      </b-col>
      <b-col cols="2"></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  head() {
    return {
      title: 'Cooperacy - The Cooperation Tool Result Page'
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getPlaceAction')
    await store.dispatch('getCountryAction')
  },
  data() {
    return {
      result: this.$store.state.edit,
      country: this.$store.state.country[this.$store.state.edit.country - 1].name,
      place: this.$store.state.place[this.$store.state.edit.place - 1].name,
      group: this.$store.state.ecosystem[this.$store.state.edit.group - 1].name
    }
  },
  methods: {
    log4(n) {
      let n4 = Math.round((-1 * (Math.log(n / 100) / Math.log(4)) - 1) * 100)
      if (n4 >= 0.99) { n4 = 99 }
      return n4
    },
    delta(n) {
      let nDelta = Math.round(n ^ 0.5)
      if (nDelta >= 0.99) { nDelta = 99 }
      return nDelta
    }
  }
}

</script>
