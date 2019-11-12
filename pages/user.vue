<template>
  <b-container fluid>
    <b-row class="mt-3">
      <b-col cols="6">
        <h5 class="mt-2 d-flex justify-content-center up">
          WELCOME {{ this.$auth.user.name }}
        </h5>
        <nuxt-link to="/useredit" class="ad">
          Edit your information
        </nuxt-link>
        <br />
        <nuxt-link to="/project/form" class="ac">
          Add a new Project
        </nuxt-link>
        <br />
        <nuxt-link to="/project/search" class="af">Project search </nuxt-link>
        <br />
        <nuxt-link to="/userlist" class="ac">
          Members List
        </nuxt-link>
        <br />
        <span class="au" @click="resetvoting" v-if="this.$auth.user.role == 1">
          Admin tool: Reset all Voting and Colorbar
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
        28 points. Every one of them has the same points, but they are
        distributed in the seven dimensions, starting with (E 4, T 4, C 4, I 4,
        F 4, U 4, D 4) and having the opportunity to get as low as 0 and as high
        as 7 according to changes available in the use of the platform and by
        other users feedbacks. So every user will have a personal “color code”
        made of their characteristics according to their behavior.</i
      >
    </p>
    <projectlist />
  </b-container>
</template>

<script>
import projectlist from '@/components/projectlist'
export default {
  middleware: ['auth'],
  head() {
    return {
      title: 'Cooperacy ' + this.$auth.user.name + ' ' + this.$auth.user.surname
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getUserProjectAction', {
      userid: store.state.auth.user.id
    })
    await store.dispatch('getPlaceAction')
    await store.dispatch('getCountryAction')
  },
  components: { projectlist: projectlist },
  mounted() {
    this.rainbowcode()
  },
  methods: {
    async resetvoting() {
      await this.$store.dispatch('resetVotingAction')
    },
    rainbowcode() {
      if (this.$auth.user.rainbowcode) {
        return
      }
      var cc = ['D', 'U', 'F', 'I', 'C', 'T', 'E']
      var sum = 0
      var sum2 = 0
      var sum3 = 0
      var max = 0
      var res = {}
      var res2 = {}
      var res3 = {}
      for (let j = 0; j < cc.length; j++) {
        res[cc[j]] = this.$auth.user[cc[j]]
      }
      for (let j = 0; j < cc.length; j++) {
        sum += res[cc[j]]
      }
      if (sum == 0) {
        for (let j = 0; j < cc.length; j++) {
          res[cc[j]] = 4
        }
      } else {
        for (let j = 0; j < cc.length; j++) {
          res2[cc[j]] = (res[cc[j]] * 21) / sum
        }
        for (let j = 0; j < cc.length; j++) {
          if (max < res2[cc[j]]) {
            max = res2[cc[j]]
          }
        }
        for (let j = 0; j < cc.length; j++) {
          res2[cc[j]] = res2[cc[j]] * (1 - Math.abs((max - 6) / max))
        }
        for (let j = 0; j < cc.length; j++) {
          sum2 += res2[cc[j]]
        }
        for (let j = 0; j < cc.length; j++) {
          res3[cc[j]] = Math.abs(6 - res2[cc[j]]) / 7
        }
        for (let j = 0; j < cc.length; j++) {
          sum3 += res3[cc[j]]
        }
        for (let j = 0; j < cc.length; j++) {
          res[cc[j]] = Math.round(
            (res3[cc[j]] / sum3) * (21 - sum2) + res2[cc[j]] + 1
          )
        }
        let sumcc = 0
        for (let j = 0; j < cc.length; j++) {
          sumcc += res[cc[j]]
        }
        if (sumcc < 28) res[cc[0]]++
        if (sumcc == 29) res[cc[6]]--
      }
      this.$auth.user.rainbowcode = true
      this.$store.commit('setUserBar', res)
    }
  }
}
</script>
