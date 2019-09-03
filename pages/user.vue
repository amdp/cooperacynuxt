<template>
  <div>
    <b-row>
      <b-col cols="6">
        <h5 class="mt-2 d-flex justify-content-center up">
          WELCOME {{ this.$auth.user.name }}
        </h5>
        <nuxt-link to="/useredit" class="ad">Edit your information</nuxt-link
        ><br />
        <nuxt-link to="/project/form" class="ac">Add a new Project</nuxt-link
        ><br />
        <nuxt-link to="/project/search" class="af">Project search</nuxt-link
        ><br />
        <span class="au" @click="$auth.logout()">Logout</span><br />
        <span class="au" @click="resetuvoting">
          Admin tool: Reset User Voting (HIGH RISK FUNCTION!)
        </span>
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
    <h5 class="mt-5 d-flex justify-content-center">YOUR PROJECTS</h5>
    <projectlist />
  </div>
</template>

<script>
import projectlist from '@/components/projectlist'
export default {
  middleware: ['auth'],
  components: { projectlist: projectlist },
  mounted() {
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
      let sumcc
      for (let j = 0; j < cc.length; j++) {
        sumcc += res[cc[j]]
      }
      if (sumcc < 28) res[cc[6]]++
      console.log(' ' + JSON.stringify(sumcc))
    }
    this.$store.commit('setUserBar', res)
  },
  methods: {
    async resetuvoting() {
      await this.$store.dispatch('resetuVotingAction')
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getUserProjectAction', {
      userid: store.state.auth.user.id
    })
  }
}
</script>
