<template>
  <b-container fluid>
    <b-row class="mt-3">
      <b-col cols="6">
        <h5 class="mt-2 d-flex justify-content-center up">
          {{ this.$auth.user.name }} {{ this.$auth.user.surname }}
        </h5>
        <img
          class="usercomment rounded-circle img-responsive"
          v-if="this.$auth.user.id"
          :src="'/assets/image/user/' + this.$auth.user.id + '.png'"
        /><br />
        <nuxt-link to="/useredit" class="ad"> Edit your information </nuxt-link>
        <br />
        <nuxt-link to="/cooperation/form" class="ac">
          Add a new Cooperation
        </nuxt-link>
        <br />
        <nuxt-link to="/cooperation" class="af">Cooperation search </nuxt-link>
        <br />
        <nuxt-link to="/userlist" class="ac"> Members List </nuxt-link>
        <br />
        <nuxt-link to="/cootool/" class="au"> Cooperation Tool </nuxt-link>
        <br />
        <span
          class="au"
          @click="resetvoting()"
          v-if="this.$auth.user.role == 1"
        >
          <br />Admin tool: Reset all Voting and Colorbar
        </span>
        <br /><br />
        <span class="au" @click="$auth.logout()">LOGOUT</span>
      </b-col>
      <b-col cols="6">
        <div class="container text-right">
          <h5 class="mt-2 d-flex justify-content-center">YOUR RAINBOW CODE:</h5>
          <span class="diversity">DIVERSITY: </span>
          <span>{{ this.$auth.user.D }}</span>
          <br />
          <span class="understanding">UNDERSTANDING: </span>
          <span>{{ this.$auth.user.U }}</span>
          <br />
          <span class="freedom">FREEDOM: </span>
          <span>{{ this.$auth.user.F }}</span>
          <br />
          <span class="transparency">TRANSPARENCY: </span>
          <span>{{ this.$auth.user.I }}</span>
          <br />
          <span class="care">CARE: </span>
          <span>{{ this.$auth.user.C }}</span>
          <br />
          <span class="trust">TRUST: </span>
          <span>{{ this.$auth.user.T }}</span>
          <br />
          <span class="equivalence">EQUIVALENCE: </span>
          <span>{{ this.$auth.user.E }}</span>
          <br />
        </div>
      </b-col>
    </b-row>
    <p class="t12 mt-3 mb-3">
      <i
        >Your rainbow code is a way to discover yourself. Every user has always
        the same 28 points, but they are distributed in the seven dimensions,
        starting with (E 4, T 4, C 4, I 4, F 4, U 4, D 4) and having the
        opportunity to get as low as 1 and as high as 7 according to changes
        available in the use of the platform and by other users feedbacks. So
        every user will have a personal “rainbow code” made of their
        characteristics according to their behavior.</i
      >
    </p>
    <cooperationlist />
  </b-container>
</template>

<script>
export default {
  middleware: ['auth'],
  head() {
    return {
      title: 'Cooperacy ' + this.$auth.user.name + ' ' + this.$auth.user.surname
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getCountry')
    await store.dispatch('getPlace')
    await store.dispatch('getFundingvar')
    await store.dispatch('getUserCooperation', {
      userid: store.state.auth.user.id
    })
    await store.dispatch('getUservote', {
      userid: store.state.auth.user.id,
      proptype: 'cooperation'
    })
  },
  mounted() {
    this.rainbowcode()
    this.budgetcheck()
  },
  methods: {
    async resetvoting() {
      await this.$store.dispatch('resetVoting')
    },
    async budgetcheck() {
      this.$store.dispatch('budgetcheck')
    },
    rainbowcode() {
      if (this.$auth.user.rainbowcode) {
        return
      }
      let cc = ['D', 'U', 'F', 'I', 'C', 'T', 'E']
      let sum = 0
      let sum2 = 0
      let sum3 = 0
      let sumcc = 0
      let max = 0
      let res = {}
      let res2 = {}
      let res3 = {}
      for (let j = 0; j < cc.length; j++) {
        res[cc[j]] = this.$auth.user[cc[j]]
      } // assigns to res current user cc values
      for (let j = 0; j < cc.length; j++) {
        sum += res[cc[j]]
      } // sums them as 'sum'
      res['I'] = Math.round(sum / 7 - res['I']) // special formula keeps I high
      if (sum == 0) {
        for (let j = 0; j < cc.length; j++) {
          res[cc[j]] = 4
        } // if sum is 0, the user has basic values (all 4)
      } else {
        for (let j = 0; j < cc.length; j++) {
          res2[cc[j]] = (res[cc[j]] * 21) / sum
        } // if not, every value is standardized (*21/sum) in res2
        for (let j = 0; j < cc.length; j++) {
          if (max < res2[cc[j]]) {
            max = res2[cc[j]]
          }
        } // max of res2 is found
        for (let j = 0; j < cc.length; j++) {
          res2[cc[j]] = res2[cc[j]] * (1 - Math.abs((max - 6) / max))
        } // algo that starts to flattening values
        for (let j = 0; j < cc.length; j++) {
          sum2 += res2[cc[j]]
        } // sum of res2 is made
        for (let j = 0; j < cc.length; j++) {
          res3[cc[j]] = Math.abs(6 - res2[cc[j]]) / 7
        } // another flattening here in res3
        for (let j = 0; j < cc.length; j++) {
          sum3 += res3[cc[j]]
        } // summing res3
        for (let j = 0; j < cc.length; j++) {
          res[cc[j]] = Math.round(
            (res3[cc[j]] / sum3) * (21 - sum2) + res2[cc[j]] + 1
          )
        } // standardizing res3 values thanks to res2 ones
        for (let j = 0; j < cc.length; j++) {
          sumcc += res[cc[j]]
        } // final sum check
        if (sumcc < 28) res[cc[0]]++
        if (sumcc == 29) res[cc[6]]--
      }
      this.$auth.user.rainbowcode = true
      this.$store.commit('setUserBar', res)
    }
  }
}
</script>
