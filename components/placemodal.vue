<template>
  <b-modal id="placemodal" title="Add a new place" hide-header-close>
    <p class="my-4">Add a new place:</p>
    <b-form @submit.prevent="addplace">
      <b-form-group
        label-for="newcountryInput"
        label="Country:"
        description="Insert a place name after choosing a country"
      >
        <b-form-select id="newcountryInput" v-model="formNewcountry">
          <option
            v-for="country in newcountry"
            :key="country.id"
            :value="country.id"
          >
            {{ country.name }}
          </option>
        </b-form-select>
        <b-form-input id="newplaceInput" v-model="formNewplace"></b-form-input>
      </b-form-group>
    </b-form>
    <template slot="modal-footer" slot-scope="{ ok, cancel }">
      <b-button size="sm" class="bcare" @click="addplace()">ADD</b-button>
      <b-button size="sm" class="btransparency" @click="cancel()">
        CANCEL
      </b-button>
      <b-button size="sm" class="none" @click="ok()">OK</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      formNewcountry: null,
      formNewplace: null,
    }
  },
  computed: {
    newcountry() {
      //avoids showing Cooperacy as possible entry
      return this.$store.state.country.filter((country) => country.id != 1)
    },
  },
  methods: {
    async addplace() {
      let result = await this.$store.dispatch('placeFormAction', {
        country: this.formNewcountry,
        name: this.formNewplace,
      })
      if (result == 'exists') {
        this.$toast.success('This place already exists!', {
          duration: 1000,
          className: 'toastunderstanding',
        })
      } else {
        this.$toast.success(this.formNewplace + ' added!', {
          duration: 1000,
          className: 'toast',
        })
      }
    },
  },
}
</script>
