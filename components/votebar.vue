<template>
  <b-container fluid class="p-0 m-0" v-if="this.proptype == 'user'">
    <b-row class="p-0 w-100 m-0">
      <b-col cols="12" class="p-0 m-0 d-flex">
        <b-container
          v-for="vote in this.vote"
          :key="vote.userkey"
          :class="vote.class"
          :style="vote.style"
          ><!-- :style needed for rainbow color condition width --></b-container
        >
      </b-col>
    </b-row>
  </b-container>
  <b-row
    class="w-100 mt-2 mb-2 ml-0 mr-0 p-0 up position-relative"
    v-else-if="this.proptype == 'project'"
  >
    <b-container
      v-for="vote in this.vote"
      :key="vote.projectcc"
      :class="vote.class"
      @click="checkprojectvote(vote.projectcc)"
    >
      <b-container class="showme showmeon t12 mt-1 mb-0 ml-0 mr-0 p-0">
        {{ vote.vlong }}: {{ vote.v }} {{ votevotes(vote.v) }}
      </b-container>
    </b-container>
  </b-row>
  <b-row
    class="w-100 mt-2 mb-2 ml-0 mr-0 p-0 up"
    v-else-if="this.proptype == 'comment'"
  >
    <b-container
      v-for="vote in this.vote"
      :key="vote.commentcc"
      :class="vote.class"
      @click="voteswitch(vote.commentcc)"
    >
      <b-container class="showme showmeon t12 mt-3 mb-0 ml-0 mr-0 p-0">
        {{ vote.vlong }}: {{ vote.v }} {{ votevotes(vote.v) }}
      </b-container>
    </b-container>
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
      let voteif = []
      for (let i = 0; i < 7; i++) {
        // choosing the style to apply if the user voted this project/comment specific vote color:
        var votestyle
        var uservoted
        // this if checks if there are votes in projects or comments, avoids rainbowbar
        if (this.$store.state[this.proptype + 'uservote']) {
          uservoted = this.$store.state[this.proptype + 'uservote'].findIndex(
            v =>
              v[this.proptype] == this.voteprop.id &&
              v.condition == this.$store.state.cc[i]
          )
          //here, if there is no vote in that condition, the result is -1
        } else {
          // this happens if there is no projectuservote nor commentuservote, remember no votes => -1
          uservoted = 0
        }
        // now, if the uservote is different than -1, it means the user voted for it, so it should be turned ON
        if (uservoted != -1) {
          votestyle = 'on' + this.$store.state.condition[i]
        } else {
          // in case it is -1, we should check if there are ANY OTHER VOTES in that condition, which means others voted for it
          if (this.voteprop[this.$store.state.cc[i]] != 0) {
            votestyle = 'they' + this.$store.state.condition[i]
          } else {
            // in case it is -1 and NO OTHER VOTES have been cast, it should be turned OFF
            votestyle = 'off' + this.$store.state.condition[i]
          }
        }
        // applying the right style to vote:
        voteif.push({
          // for all votes:
          v: this.voteprop[this.$store.state.cc[i]],
          vlong: this.$store.state.condition[i],
          style: votestyle
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
            'p-0 vote col ' +
            voteif[i].style +
            ' ' +
            this.$store.state.condition[i]),
            (voteif[i].projectcc = this.$store.state.cc[i])
        }
      }
      if (this.proptype == 'comment') {
        for (let i = 0; i < 7; i++) {
          ; (voteif[i].class =
            'p-0 vote col ' +
            voteif[i].style +
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
    checkprojectvote(cc) {
      if (!this.$auth.user) {
        return this.$router.push({ path: '/login' })
      }
      let exists = this.$store.state['projectuservote'].findIndex(
        // checks if the vote exists
        x => x[this.proptype] == this.voteprop.id && x.condition == cc
      )
      let modal = 'votebarmodal' + this.voteprop.id
      if (cc == 'I' && exists == -1) {
        return this.$root.$emit('bv::show::modal', modal, '#btnShow')
      }
      if (cc == 'E' && exists != -1 && this.voteprop.stage == 6) {
        let Icheck = this.$store.state['projectuservote'].findIndex(
          // checks if there is a I vote
          x => x[this.proptype] == this.voteprop.id && x.condition == 'I'
        )
        // if there is a I vote, we should remove it together with the Evote
        if (Icheck != -1) {
          this.voteswitch('I')
          return this.voteswitch('E')
        }
        else return this.vosteswitch('E')
      }
      // keep the following budgetstep alert AFTER the this.voteprop.stage == 6 (pairing) check
      if (cc == 'E' && exists != -1) {
        if (this.voteprop.budgetstep > 0) {
          alert('With your unvoting, you release part of the project budget to the Cooperacy general pool. This project will go back into the idea stage, until the full budget is collected again, then start back from the last budget step it is now.')
        }
        return this.voteswitch(cc)
      }
      else return this.voteswitch(cc)
    },
    voteswitch(cc) {
      if (!this.$auth.user) {
        return this.$router.push({ path: '/login' })
      }
      // CLIENT-SIDE: sends id, votetype, user and adds 1/-1 to the vuex store variable
      // just to "turn the vote on"
      let add
      let exists = this.$store.state[this.proptype + 'uservote'].findIndex(
        // checks if the vote exists
        x => x[this.proptype] == this.voteprop.id && x.condition == cc
      )
      if (exists == -1) add = 1 //adds the vote if it does not exist
      else add = -1 // removes the vote if exists
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
