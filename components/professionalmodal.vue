<template>
  <b-container>
    <b-modal
      id="professionalmodal"
      title="Add/remvoe a professional from the hudget"
      hide-header-close
    >
      <b-form @submit.prevent="professional()">
        <b-form-group
          label-for="professionalInput"
          description="Add or remove a professional to your project"
        >
          <span>{{ projectprop.name }}</span>
          <b-form-select id="professionalInput" v-model="formProfessional">
            <option
              v-for="user in userlistprop.filter(user => user.active == 1)"
              :key="user.id"
              :value="user.id"
            >
              {{ user.name }} {{ user.surname }}
            </option>
          </b-form-select>
        </b-form-group>
      </b-form>
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button size="sm" class="bcare" @click="professional()">
          ADD
        </b-button>
        <b-button size="sm" class="btransparency" @click="cancel()">
          CLOSE
        </b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      formTag: '',
      formRemoveTag: ''
    }
  },
  props: {
    projectprop: { required: true },
    userlistprop: { required: true }
  },
  methods: {
    async addtag() {
      if (this.formTag) {
        this.formTag = this.formTag.replace(/^[ ]+/gi, '') //removes spaces at the beginning of tag
        await this.$store
          .dispatch('tagFormAction', {
            project: this.projectprop.id,
            name: this.formTag,
            tag: 'add'
          })
          .catch(err => {
            console.error(err)
          })
        this.formTag = ''
        this.$toast.success('Added!', { duration: 1000, className: 'toasts' })
      }
    },
    async removetag() {
      if (this.formRemoveTag) {
        alert(this.formRemoveTag)
        await this.$store
          .dispatch('removeTagAction', {
            project: this.projectprop.id,
            name: this.formRemoveTag
          })
          .catch(err => {
            console.error(err)
          })
      }
      this.formRemoveTag = ''
      this.$toast.success('Removed!', { duration: 1000, className: 'toasts' })
    }
  }
}
</script>
