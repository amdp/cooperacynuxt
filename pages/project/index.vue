<template>
  <b-container class="m-0 p-0">
    <b-container class="mb-5 p-0">
      <p class="equivalence text-center t44">PUBLIC PROJECT SEARCH</p>
      <b-container v-for="vote in this.vote" :key="vote.cc" :class="vote.class">
        <b-container class="showme showmeon t12 mt-1 mb-0 ml-0 mr-0 p-0">
          {{ vote.vlong }}VOTES: {{ vote.v }} -
          {{ infovote(vote.cc) }}
        </b-container>
      </b-container>
      <b-form @submit.prevent="projectSearch()" class="mt-4 mb-5 p-0 pt-1">
        <b-row class="w-100 mt-2 mb-2 ml-0 mr-0 p-0 up"> </b-row>
        <b-row class="m-0 p-0">
          <b-col cols="2" class="m-0 p-0"></b-col>
          <b-col cols="6" class="m-0 p-0">
            <b-form-input
              v-model="formSearch"
              size="sm"
              placeholder="What do you want to do together?"
              required
            ></b-form-input>
          </b-col>
          <b-col cols="2" class="m-0 p-0">
            <b-button
              type="submit"
              class="btn bhequivalence btn-block m-0 pt-0 border-0"
            >
              <p class="m-0 pt-2 btransparent white t12" v-if="!searching">
                SEARCH
              </p>
              <b-spinner
                small
                v-if="searching"
                class="m-0 p-0 btransparent"
              ></b-spinner>
            </b-button>
          </b-col>
          <b-col cols="2" class="m-0 p-0"></b-col>
        </b-row>
      </b-form>
    </b-container>
    <projectlist />
  </b-container>
</template>
<script>
export default {
  head() {
    return {
      title: 'Cooperacy - Projects'
    }
  },
  data() {
    return {
      searching: false,
      formSearch: null,
      projectID: null,
      editing: false
    }
  },
  computed: {
    vote() {
      let voteif = []
      for (let i = 0; i < 7; i++) {
        // choosing the style to apply if the user voted this project/comment specific vote color:
        var votestyle
        votestyle = 'on' + this.$store.state.condition[i]
        voteif.push({
          // for all votes:
          cc: this.$store.state.cc[i],
          vlong: this.$store.state.condition[i],
          style: votestyle
        })
      } // now we already have a 7 elements array so we just add json keys as needed:
      if (this.proptype == 'project') {
        for (let i = 0; i < 7; i++) {
          ; (voteif[i].class =
            'p-0 vote col ' +
            voteif[i].style +
            ' ' +
            this.$store.state.condition[i])
        }
      }
      return voteif
    }
  },
  methods: {
    async projectSearch() {
      this.searching = true
      await this.$store.dispatch('getFundingvar')
      await this.$store.dispatch('getProjectAction', { search: this.formSearch })
      this.searching = false
    },
    infovote(cc) {
      if (cc == 'E') {
        return 'ORDER BY MOST EQUIVALENCE-VOTED (MONEY OR TICKET RELATED)'
      } else if (cc == 'T') {
        return 'ORDER BY MOST TRUST-VOTED (GOOD HUMAN RESOURCES)'
      } else if (cc == 'C') {
        return 'ORDER BY MOST CARE-VOTED (DEFAULT, MOST LIKED ONE)'
      } else if (cc == 'I') {
        return 'ORDER BY NON-TRANSPARENT ONES'
      } else if (cc == 'F') {
        return 'ORDER BY MOST FOLLOWED OR DESIRED TO WORK FOR'
      } else if (cc == 'U') {
        return 'ORDER BY MOST COMPREHENSIBLE'
      } else if (cc == 'D') {
        return 'ORDER BY MOST BIZARRE OR ALTERNATIVE'
      }
    }
  }
}
</script>