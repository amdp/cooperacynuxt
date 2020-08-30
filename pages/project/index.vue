<template>
  <b-container class="m-0 p-0">
    <b-container class="mb-5 p-0">
      <p class="equivalence text-center t44">PUBLIC PROJECT SEARCH</p>
      <b-container class="m-0 p-0">
        <b-row class="m-0 p-0">
          <b-col
            v-for="cc in this.$store.state.condition"
            :key="cc"
            :class="'b' + cc + ' m-1 p-0 vote col'"
            @click="filterprojects(cc)"
            @mouseover="info(cc)"
          ></b-col>
        </b-row>
        <b-row>
          <b-col cols="12" class="text-center" v-html="filterinfo"> </b-col>
        </b-row>
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
              class="btn bhequivalence btn-block m-0 pt-0 bSORT PROJECTS-0"
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
      editing: false,
      filterinfo: null,
    }
  },
  methods: {
    async projectSearch() {
      this.searching = true
      await this.$store.dispatch('getFundingvar')
      await this.$store.dispatch('getProjectAction', { search: this.formSearch })
      this.searching = false
    },
    info(cc) {
      if (cc == 'equivalence') {
        return this.filterinfo = 'SORT PROJECTS BY MOST EQUIVALENCE-VOTED (MONEY OR TICKET RELATED)'
      } else if (cc == 'trust') {
        return this.filterinfo = 'SORT PROJECTS BY MOST TRUST-VOTED (GOOD HUMAN RESOURCES)'
      } else if (cc == 'care') {
        return this.filterinfo = 'SORT PROJECTS BY MOST CARE-VOTED (DEFAULT, MOST LIKED ONE)'
      } else if (cc == 'transparency') {
        return this.filterinfo = 'SORT PROJECTS BY NON-TRANSPARENT ONES'
      } else if (cc == 'freedom') {
        return this.filterinfo = 'SORT PROJECTS BY MOST FOLLOWED OR DESIRED TO WORK FOR'
      } else if (cc == 'understanding') {
        return this.filterinfo = 'SORT PROJECTS BY MOST COMPREHENSIBLE'
      } else if (cc == 'diversity') {
        return this.filterinfo = 'SORT PROJECTS BY MOST BIZARRE OR ALTERNATIVE'
      }
    },
    filterprojects(cc) {
      if (cc == 'equivalence') {
        return this.$store.commit('projectSort', 'E')
      } else if (cc == 'trust') {
        return this.$store.commit('projectSort', 'T')
      } else if (cc == 'care') {
        return this.$store.commit('projectSort', 'C')
      } else if (cc == 'transparency') {
        return this.$store.commit('projectSort', 'I')
      } else if (cc == 'freedom') {
        return this.$store.commit('projectSort', 'F')
      } else if (cc == 'understanding') {
        return this.$store.commit('projectSort', 'U')
      } else if (cc == 'diversity') {
        return this.$store.commit('projectSort', 'D')
      }
    }
  }
}
</script>