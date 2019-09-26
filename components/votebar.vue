<template>
  <div>
    <div class="votebar d-flex justify-content-center px-3 pt-2 pb-4">
      <div
        v-for="(singleVote, i) in vote"
        :key="i"
        class="single-vote-button"
        :id="singleVote.vlong"
        @mouseenter="setVisibleVoteCount(voteId, singleVote.vlong)"
        @mouseleave="resetVisibleVoteCount"
        @click="voteswitch(vote.projectcc)"
      >
        <b
          v-if="
            visibleVoteCount.index == voteId &&
              visibleVoteCount.voteType == singleVote.vlong
          "
        >
          {{ singleVote.v }}</b
        >
        <img
          v-else
          :src="getVoteIconSrc(singleVote.vlong)"
          class="img-fluid img-responsive"
        />
      </div>
    </div>

    <!-- vote bar modal button -->
    <b class="votebar-modal-btn" @click="showVotesModal">?</b>
  </div>
</template>

<script>
//cc stands for cooperation condition, proptype could be user, project or comment
export default {
  props: {
    voteprop: { required: true },
    proptype: { required: true },
    voteId: { required: true }
  },
  data() {
    return {
      visibleVoteCount: {
        index: null,
        voteType: null
      }
    }
  },
  computed: {
    vote() {
      //need to avoid this to cycle through user votebar, which have always the same color
      let voteif = []
      for (let i = 0; i < 7; i++) {
        // choosing the style to apply if the user voted this project/comment specific vote color:
        var votestyle
        var uservoted
        this.$store.state[this.proptype + 'uservote']
          ? (uservoted = this.$store.state[
              this.proptype + 'uservote'
            ].findIndex(
              x =>
                x[this.proptype] == this.voteprop.id &&
                x.condition == this.$store.state.cc[i]
            ))
          : (uservoted = 0)
        uservoted != -1
          ? (votestyle = 'var(--my' + this.$store.state.condition[i] + ')')
          : this.voteprop[this.$store.state.cc[i]] != 0
          ? (votestyle = 'var(--they' + this.$store.state.condition[i] + ')')
          : (votestyle = 'var(--no' + this.$store.state.condition[i] + ')')
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
          ;(voteif[i].class =
            'p-0 uservote b' +
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
          ;(voteif[i].class =
            'p-0 vote col b' +
            this.$store.state.condition[i] +
            ' ' +
            this.$store.state.condition[i]),
            (voteif[i].projectcc = this.$store.state.cc[i])
        }
      }
      if (this.proptype == 'comment') {
        for (let i = 0; i < 7; i++) {
          ;(voteif[i].class =
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
    voteswitch(cc) {
      if (!this.$auth.user) {
        return this.$router.push({ path: '/login' })
      }
      // CLIENT-SIDE: sends id, votetype, user and adds 1/-1 to the vuex store variable
      var add
      this.$store.state[this.proptype + 'uservote'].findIndex(
        // checks if the vote exists, adds accordingly
        x => x[this.proptype] == this.voteprop.id && x.condition == cc
      ) == -1
        ? (add = 1)
        : (add = -1)
      this.$store.commit('setVoteUpdate', {
        id: this.voteprop.id,
        cc: cc,
        user: this.$auth.user.id,
        add: add,
        proptype: this.proptype
      })

      // SERVER-SIDE: prepares and sends async REST call (either comment or project)
      var request = {
        id: this.voteprop.id,
        condition: cc,
        user: this.$auth.user.id,
        proptype: this.proptype
      }
      if (this.proptype == 'comment') {
        request.projectid = this.$route.params.id
        request.author = this.voteprop.user
      }
      this.$store.dispatch('addVoteAction', request).catch(err => {
        console.error(err)
      })
    },

    // makes vote count visible on hover
    setVisibleVoteCount: function(index, voteType) {
      this.visibleVoteCount.index = index
      this.visibleVoteCount.voteType = voteType
    },
    resetVisibleVoteCount: function() {
      this.visibleVoteCount.index = null
      this.visibleVoteCount.voteType = null
    },
    // feeds the vote icon img src
    getVoteIconSrc: function(voteType) {
      return require('../assets/icons/' + voteType + '.svg')
    },
    showVotesModal: function() {
      this.$bvModal.show('votes-modal')
    }
  }
}
</script>
