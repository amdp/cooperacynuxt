<template>
  <b-container>
    <b-modal
      id="budgetstepmodal"
      title="Add Budget Step Document"
      hide-header-close
    >
      <p class="base">
        Warning: if you do not know what you're doing, please read the
        <nuxt-link to="/main/whitepaper" class="au">white paper</nuxt-link>
      </p>
      <b-form @submit.prevent="budgetstep()">
        <b-form-group
          label-for="professionalInput"
          description="Add a Budget Step Document to your cooperation, inserting a link to a shared document."
        >
          <span>{{ cooperationprop.title }}</span>
          <b-form-input id="docInput" v-model="formDoc"></b-form-input>
        </b-form-group>
      </b-form>
      <template slot="modal-footer">
        <b-button size="sm" class="bcare" @click="budgetstep()"> ADD </b-button>
        <b-button size="sm" class="btransparency" @click="close()">
          CLOSE
        </b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  props: {
    cooperationprop: { required: true }
  },
  data() {
    return {
      formDoc: ''
    }
  },

  methods: {
    async budgetstep() {
      this.$store.dispatch('budgetstep', {
        cooperation: this.cooperationprop,
        user: this.$auth.user,
        doc: this.formDoc
      })
    },
    close() {
      location.href = process.env.URLHOME + '/cooperation/' + this.cooperationprop.id
    }
  }
}
</script>
