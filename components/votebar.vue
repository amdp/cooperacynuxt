<template>
  <b-container fluid class="p-0 m-0" v-if="this.proptype == 'user'">
    <b-row class="p-0 w-100 m-0">
      <b-col cols="12" class="p-0 m-0 d-flex">
        <b-container
          v-for="vote in this.vote"
          :key="vote.userkey"
          :class="vote.class"
          :style="vote.style"
          ><!-- :style needed for rainbow color condition width, do not remove --></b-container
        >
      </b-col>
    </b-row>
  </b-container>
  <b-container class="m-0 p-0 up" v-else-if="this.proptype == 'cooperation'">
    <b-row class="m-0 p-0">
      <b-col cols="12" class="t9">
        <b-link v-b-modal.voteinfomodal v-html="voteinfocontent"> </b-link>
      </b-col>
      <b-col
        v-for="vote in this.vote"
        :key="vote.cooperationcc"
        :class="vote.class + ' p-0 mvote'"
        @mouseover="
          voteinfo('cooperation', vote.vlong, vote.cooperationcc, vote.v)
        "
        @click="checkcooperationvote(vote.cooperationcc)"
      >
      </b-col>
    </b-row>
  </b-container>
  <b-container class="m-0 p-0 up" v-else-if="this.proptype == 'comment'">
    <b-row class="m-0 p-0">
      <b-col
        v-for="vote in this.vote"
        :key="vote.commentcc"
        :class="vote.class + ' p-0 mvote'"
        @mouseover="voteinfo('comment', vote.vlong, vote.commentcc, vote.v)"
        @click="voteswitch(vote.commentcc)"
      >
      </b-col>
      <b-col cols="12" v-html="voteinfocontent" class="text-center t9"></b-col>
    </b-row>
  </b-container>
</template>

<script>
//cc stands for cooperation condition, proptype could be user, cooperation or comment
export default {
  props: {
    voteprop: { required: true },
    proptype: { required: true }
  },
  data() {
    return {
      voteinfocontent: '<span v-if="voteprop.mode <= 9">' + this.$t('vote.feedback') + '(<span class="underline">INFO</span>): </span>',
      intervalinfo: null,
      condition: [
        'equivalence',
        'trust',
        'care',
        'transparency',
        'freedom',
        'understanding',
        'diversity'
      ],
      cc: ['E', 'T', 'C', 'I', 'F', 'U', 'D'],
    }
  },
  computed: {
    vote() {
      let voteif = []
      for (let i = 0; i < 7; i++) {
        // choosing the style to apply if the user voted this cooperation/comment specific vote color:
        var votestyle
        var uservoted
        // this if checks if there are votes in cooperations or comments, avoids rainbowbar
        if (this.$store.state[this.proptype + 'uservote']) {
          uservoted = this.$store.state[this.proptype + 'uservote'].findIndex(
            v =>
              v[this.proptype] == this.voteprop.id &&
              v.condition == this.cc[i]
          )
          //here, if there is no vote in that condition, the result is -1
        } else {
          // this happens if there is no cooperationuservote nor commentuservote, remember no votes => -1
          uservoted = 0
        }
        // now, if the uservote is different than -1, it means the user voted for it, so it should be turned ON
        if (uservoted != -1) {
          votestyle = 'on' + this.condition[i]
        } else {
          // in case it is -1, we should check if there are ANY OTHER VOTES in that condition, which means others voted for it
          if (this.voteprop[this.cc[i]] != 0) {
            votestyle = 'they' + this.condition[i]
          } else {
            // in case it is -1 and NO OTHER VOTES have been cast, it should be turned OFF
            votestyle = 'off' + this.condition[i]
          }
        }
        // applying the right style to vote:
        voteif.push({
          // for all votes:
          v: this.voteprop[this.cc[i]],
          vlong: this.$t('condition.' + this.condition[i]),
          style: votestyle
        })
      } // now we already have a 7 elements array so we just add json keys as needed:
      if (this.proptype == 'user') {
        for (let i = 0; i < 7; i++) {
          ; (voteif[i].class =
            'p-0 rainbowcode b' +
            this.condition[i] +
            ' ' +
            this.condition[i]),
            (voteif[i].style =
              'width: ' +
              (this.$auth.user[this.cc[i]] / 28) * 100 +
              '%'),
            (voteif[i].userkey = this.cc[i])
        }
      }
      if (this.proptype == 'cooperation') {
        for (let i = 0; i < 7; i++) {
          ; (voteif[i].class =
            'vote ' +
            voteif[i].style +
            ' ' +
            this.condition[i]),
            (voteif[i].cooperationcc = this.cc[i])
        }
      }
      if (this.proptype == 'comment') {
        for (let i = 0; i < 7; i++) {
          ; (voteif[i].class =
            'vote ' +
            voteif[i].style +
            ' ' +
            this.condition[i]),
            (voteif[i].commentcc = this.cc[i])
        }
      }
      return voteif
    }
  },
  methods: {
    voteinfo(proptype, vlong, cc, v) {
      this.voteinfocontent = vlong + ': ' + v + ' - '
      if (proptype == 'cooperation') {
        if (cc == 'E') {
          return this.voteinfocontent += this.$t('vote.einfo')
        } else if (cc == 'T') {
          return this.voteinfocontent += this.$t('vote.tinfo')
        } else if (cc == 'C') {
          return this.voteinfocontent += this.$t('vote.cinfo')
        } else if (cc == 'I') {
          return this.voteinfocontent += this.$t('vote.iinfo')
        } else if (cc == 'F') {
          return this.voteinfocontent += this.$t('vote.finfo')
        } else if (cc == 'U') {
          return this.voteinfocontent += this.$t('vote.uinfo')
        } else if (cc == 'D') {
          return this.voteinfocontent += this.$t('vote.dinfo')
        }
      }
      if (proptype == 'comment') {
        if (cc == 'E') {
          return this.voteinfocontent += this.$t('vote.ceinfo')
        } else if (cc == 'T') {
          return this.voteinfocontent += this.$t('vote.ctinfo')
        } else if (cc == 'C') {
          return this.voteinfocontent += this.$t('vote.ccinfo')
        } else if (cc == 'I') {
          return this.voteinfocontent += this.$t('vote.ciinfo')
        } else if (cc == 'F') {
          return this.voteinfocontent += this.$t('vote.cfinfo')
        } else if (cc == 'U') {
          return this.voteinfocontent += this.$t('vote.cuinfo')
        } else if (cc == 'D') {
          return this.voteinfocontent += this.$t('vote.cdinfo')
        }
      }
    },
    checkcooperationvote(cc) {
      if (!this.$auth.user) {
        return this.$router.push({ path: '/login' })
      }
      let exists = this.$store.state['cooperationuservote'].findIndex(
        // checks if the vote exists
        x => x[this.proptype] == this.voteprop.id && x.condition == cc
      )
      let modal = 'votebarmodal' + this.voteprop.id
      if (cc == 'I' && exists == -1) {
        return this.$root.$emit('bv::show::modal', modal, '#btnShow')
      }
      if (cc == 'E' && exists != -1 && this.voteprop.collect > this.voteprop.budget) {
        let Icheck = this.$store.state['cooperationuservote'].findIndex(
          // checks if there is a I vote
          x => x[this.proptype] == this.voteprop.id && x.condition == 'I'
        )
        // if there is a I vote, we should remove it together with the Evote
        if (Icheck != -1) {
          this.voteswitch('I')
          return this.voteswitch('E')
        }
        else return this.voteswitch('E')
      }
      // keep the following budgetstep alert for budgetstep phases
      if (cc == 'E' && exists != -1) {
        if (this.voteprop.collect > this.voteprop.budget) {
          alert(this.$t('vote.unvoting'))
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

      // SERVER-SIDE: prepares and sends async REST call (either comment or cooperation)
      let request = {
        id: this.voteprop.id,
        condition: cc,
        user: this.$auth.user.id,
        proptype: this.proptype
      }
      if (this.proptype == 'comment') {
        request.cooperationid = this.$route.params.id
        request.author = this.voteprop.user
      }
      if (this.proptype == 'cooperation') {
        request.category = this.voteprop.category
        request.mode = this.voteprop.mode
      }
      this.$store.dispatch('addVote', request).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>
