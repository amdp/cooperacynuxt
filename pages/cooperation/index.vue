<template>
  <b-container class="m-0 p-0">
    <b-container class="mb-5 p-0">
      <p class="equivalence text-center t44">PUBLIC COOPERATION SEARCH</p>

      <b-form @submit.prevent="cooperationSearch()" class="mt-4 mb-5 p-0 pt-1">
        <b-row class="m-0 p-0">
          <b-col cols="2" class="m-0 p-0"></b-col>
          <b-col cols="8" class="m-0 p-0">
            <b-form-input
              v-model="formSearch"
              size="sm"
              placeholder="Search through cooperations"
              required
            ></b-form-input>
          </b-col>
          <b-col cols="2" class="m-0 p-0"></b-col>
        </b-row>
        <b-row class="m-0 p-0">
          <b-col cols="2" class="m-0 p-0"></b-col>
          <b-col cols="4" class="m-0 p-0">
            <b-form-select v-model="formSearchCountry" size="sm">
              <b-form-select-option value="">
                Filter Country
              </b-form-select-option>
              <option
                v-for="country in $store.state.country"
                :key="country.id"
                :value="country.id"
              >
                {{ country.name }}
              </option>
            </b-form-select>
          </b-col>
          <b-col cols="4" class="m-0 p-0">
            <b-form-select v-model="formSearchPlace" size="sm">
              <b-form-select-option value="">
                Filter Place
              </b-form-select-option>
              <option v-for="place in place" :key="place.id" :value="place.id">
                {{ place.name }}
              </option>
            </b-form-select>
          </b-col>
          <b-col cols="2" class="m-0 p-0"></b-col>
        </b-row>
        <b-row class="m-0 p-0">
          <b-col cols="2" class="m-0 p-0"></b-col>
          <b-col cols="8" class="m-0 p-0">
            <b-button
              type="submit"
              class="btn bhequivalence btn-block m-0 pt-0 border-0"
            >
              <p class="m-0 pt-2 btransparent white t12" v-if="!searching">
                SEARCH COOPERATIONS
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

    <b-container class="m-0 mb-5 p-0">
      <b-row class="m-0 p-0">
        <b-col
          v-for="cc in this.$store.state.condition"
          :key="cc"
          :class="'b' + cc + ' m-1 p-0 vote col'"
          @click="filtercooperation(cc)"
          @mouseover="info(cc)"
        ></b-col>
      </b-row>
      <b-row>
        <b-col cols="12" class="text-center" v-html="filterinfo"> </b-col>
      </b-row>
    </b-container>
    <cooperationlist />
  </b-container>
</template>
<script>
export default {
  head() {
    return {
      title: 'Cooperacy - Cooperations'
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getPlace')
    await store.dispatch('getCountry')
  },
  data() {
    return {
      searching: false,
      formSearch: null,
      formSearchCountry: '',
      formSearchPlace: '',
      cooperationID: null,
      editing: false,
      filterinfo: null,
    }
  },
  computed: {
    place() {
      let place = this.$store.state.place.filter(
        (place) => place.country == this.formSearchCountry
      )
      return place.sort((a, b) => (a.name > b.name ? 1 : -1))
    },
  },
  methods: {
    async cooperationSearch() {
      this.searching = true
      await this.$store.dispatch('getFundingvar')
      await this.$store.dispatch('getCooperation', {
        search: this.formSearch, limit: 100, country: this.formSearchCountry, place: this.formSearchPlace
      })
      this.searching = false
    },
    info(cc) {
      if (cc == 'equivalence') {
        return this.filterinfo = 'SORT COOPERATIONS BY MOST EQUIVALENCE-VOTED (MONEY OR TICKET RELATED)'
      } else if (cc == 'trust') {
        return this.filterinfo = 'SORT COOPERATIONS BY MOST TRUST-VOTED (GOOD HUMAN RESOURCES)'
      } else if (cc == 'care') {
        return this.filterinfo = 'SORT COOPERATIONS BY MOST CARE-VOTED (DEFAULT, MOST LIKED ONE)'
      } else if (cc == 'transparency') {
        return this.filterinfo = 'SORT COOPERATIONS BY NON-TRANSPARENT ONES'
      } else if (cc == 'freedom') {
        return this.filterinfo = 'SORT COOPERATIONS BY MOST FOLLOWED OR DESIRED TO WORK FOR'
      } else if (cc == 'understanding') {
        return this.filterinfo = 'SORT COOPERATIONS BY MOST COMPREHENSIBLE'
      } else if (cc == 'diversity') {
        return this.filterinfo = 'SORT COOPERATIONS BY MOST BIZARRE OR ALTERNATIVE'
      }
    },
    filtercooperation(cc) {
      if (cc == 'equivalence') {
        return this.$store.commit('cooperationSort', 'E')
      } else if (cc == 'trust') {
        return this.$store.commit('cooperationSort', 'T')
      } else if (cc == 'care') {
        return this.$store.commit('cooperationSort', 'C')
      } else if (cc == 'transparency') {
        return this.$store.commit('cooperationSort', 'I')
      } else if (cc == 'freedom') {
        return this.$store.commit('cooperationSort', 'F')
      } else if (cc == 'understanding') {
        return this.$store.commit('cooperationSort', 'U')
      } else if (cc == 'diversity') {
        return this.$store.commit('cooperationSort', 'D')
      }
    }
  }
}
</script>