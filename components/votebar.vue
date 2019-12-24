<template>
  <b-container fluid class="p-0 m-0" v-if="this.proptype == 'user'">
    <b-row class="p-0 w-100 m-0">
      <b-col cols="12" class="p-0 m-0 d-flex">
        <div
          v-for="vote in this.vote"
          :key="vote.userkey"
          :class="vote.class"
          :style="vote.style"
        ></div>
      </b-col>
    </b-row>
  </b-container>
  <b-row
    class="w-100 mt-2 mb-2 ml-0 mr-0 p-0 up position-relative"
    v-else-if="this.proptype == 'project'"
  >
    <div
      v-for="vote in this.vote"
      :key="vote.projectcc"
      :class="vote.class"
      :style="vote.style"
      @click="checkvote(vote.projectcc)"
    >
      <div class="showme showmeon t12 mt-1 mb-0 ml-0 mr-0 p-0">
        {{ vote.vlong }}: {{ vote.v }} {{ votevotes(vote.v) }}
      </div>
    </div>
  </b-row>
  <b-row
    class="w-100 mt-2 mb-2 ml-0 mr-0 p-0 up"
    v-else-if="this.proptype == 'comment'"
  >
    <div
      v-for="vote in this.vote"
      :key="vote.commentcc"
      :class="vote.class"
      :style="vote.style"
      @click="voteswitch(vote.commentcc)"
    >
      <div class="showme showmeon t12 mt-3 mb-0 ml-0 mr-0 p-0">
        {{ vote.vlong }}: {{ vote.v }} {{ votevotes(vote.v) }}
      </div>
    </div>
  </b-row>
</template>

<script>
//cc stands for cooperation condition, proptype could be user, project or comment
export default {
  props: {
    voteprop: { required: true },
    proptype: { required: true }
  },
  computed: {
    vote() {
      //need to avoid this to cycle through user votebar, which have always the same color
      let voteif = []
      for (let i = 0; i < 7; i++) {
        // choosing the style to apply if the user voted this project/comment specific vote color:
        var votestyle
        var uservoted
        if (this.$store.state[this.proptype + 'uservote']) {
          uservoted = this.$store.state[this.proptype + 'uservote'].findIndex(
            v =>
              v[this.proptype] == this.voteprop.id &&
              v.condition == this.$store.state.cc[i]
          )
        } else {
          uservoted = 0
        }
        if (uservoted != -1) {
          votestyle = 'var(--on' + this.$store.state.condition[i] + ')'
        } else {
          if (this.voteprop[this.$store.state.cc[i]] != 0) {
            votestyle = 'var(--they' + this.$store.state.condition[i] + ')'
          } else {
            votestyle = 'var(--off' + this.$store.state.condition[i] + ')'
          }
        }
        // applying the right style to vote:
        voteif.push({
          // for all vote:
          v: this.voteprop[this.$store.state.cc[i]],
          vlong: this.$store.state.condition[i],
          style: 'background-color: ' + votestyle
        })
      } // now we already have a 7 elements array so we just add json keys as needed:
      if (this.proptype == 'user') {
        for (let i = 0; i < 7; i++) {
          ; (voteif[i].class =
            'p-0 rainbowcode b' +
            this.$store.state.condition[i] +
            ' ' +
            this.$store.state.condition[i]),
            (voteif[i].style =
              'width: ' +
              (this.$auth.user[this.$store.state.cc[i]] / 28) * 100 +
              '%'),
            (voteif[i].userkey = this.$store.state.cc[i])
        }
      }
      if (this.proptype == 'project') {
        for (let i = 0; i < 7; i++) {
          ; (voteif[i].class =
            'p-0 vote col b' +
            this.$store.state.condition[i] +
            ' ' +
            this.$store.state.condition[i]),
            (voteif[i].projectcc = this.$store.state.cc[i])
        }
      }
      if (this.proptype == 'comment') {
        for (let i = 0; i < 7; i++) {
          ; (voteif[i].class =
            'p-0 vote col b' +
            this.$store.state.condition[i] +
            ' ' +
            this.$store.state.condition[i]),
            (voteif[i].commentcc = this.$store.state.cc[i])
        }
      }
      return voteif
    }
  },
  methods: {
    votevotes(v) {
      if (v == 1) {
        return 'vote'
      } else {
        return 'votes'
      }
    },
    checkvote(cc) {
      if (!this.$auth.user) {
        return this.$router.push({ path: '/login' })
      }
      let add = this.$store.state['projectuservote'].findIndex(
        // checks if the vote exists, adds accordingly
        x => x[this.proptype] == this.voteprop.id && x.condition == cc
      )
      if (cc == 'I' && add == -1) {
        let modal = 'votebarmodal' + this.voteprop.id
        this.$root.$emit('bv::show::modal', modal, '#btnShow')
      }
      else this.voteswitch(cc)
    },
    voteswitch(cc) {
      if (!this.$auth.user) {
        return this.$router.push({ path: '/login' })
      }
      // CLIENT-SIDE: sends id, votetype, user and adds 1/-1 to the vuex store variable
      // just to "turn the vote on"
      let add = this.$store.state[this.proptype + 'uservote'].findIndex(
        // checks if the vote exists, adds accordingly
        x => x[this.proptype] == this.voteprop.id && x.condition == cc
      )
      if (add == -1) add = 1
      else add = -1
      this.$store.commit('setVoteUpdate', {
        id: this.voteprop.id,
        cc: cc,
        user: this.$auth.user.id,
        add: add,
        proptype: this.proptype
      })

      // SERVER-SIDE: prepares and sends async REST call (either comment or project)
      let request = {
        id: this.voteprop.id,
        condition: cc,
        user: this.$auth.user.id,
        proptype: this.proptype
      }
      if (this.proptype == 'comment') {
        request.projectid = this.$route.params.id
        request.author = this.voteprop.user
      }
      if (this.proptype == 'project') {
        request.category = this.voteprop.category
        request.stage = this.voteprop.stage
      }
      this.$store.dispatch('addVoteAction', request).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>
