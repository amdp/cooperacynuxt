<template>
  <b-container>
    <b-modal
      id="budgetstepmodal"
      title="Add Budget Step Document"
      hide-header-close
    >
      <p class="base">
        Behind this step there is a delicate passage that your project will
        face: it will wait for 7 days for the project document to be approved.
        If nothing happens, your document is approved and you can go forward to
        the next budget step.
      </p>
      <b-form @submit.prevent="budgetstepdoc()">
        <b-form-group
          label-for="professionalInput"
          description="Add a Budget Step Document to your project, inserting a link to a shared google document."
        >
          <span>{{ projectprop.name }}</span>
          <b-form-input id="docInput" v-model="formDoc"></b-form-input>
        </b-form-group>
      </b-form>
      <template slot="modal-footer">
        <b-button size="sm" class="bcare" @click="budgetstepdoc()">
          ADD
        </b-button>
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
    projectprop: { required: true }
  },
  data() {
    return {
      formDoc: ''
    }
  },

  methods: {
    async budgetstepdoc() {
      this.$store.dispatch('budgetstepdocAction', {
        project: this.projectprop,
        user: this.$auth.user,
        doc: this.formDoc
      })
    },
    close() {
      location.href = process.env.URLHOME + '/project/' + this.projectprop.id
    }
  }
}
</script>
