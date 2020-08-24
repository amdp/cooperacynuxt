<template>
  <b-container>
    <b-modal id="addtagmodal" title="Add a new tag" hide-header-close>
      <p class="my-4">
        (CURRENT TAGS:
        <span v-for="tag in this.$store.state.tag" :key="tag.id">{{
          tag.name
        }}</span
        >)
      </p>
      <b-form @submit.prevent="addtag">
        <b-form-group
          label-for="newtagInput"
          description="Insert a new tag for your project"
        >
          <span>{{ projectprop.name }}</span>
          <b-form-input id="newTagInput" v-model="formTag"></b-form-input>
        </b-form-group>
      </b-form>
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button size="sm" class="bcare" @click="addtag()">
          ADD
        </b-button>
        <b-button size="sm" class="btransparency" @click="cancel()">
          CLOSE
        </b-button>
        <b-button size="sm" class="none" @click="ok()">OK</b-button>
      </template>
    </b-modal>
    <b-modal id="removetagmodal" title="Remove a tag" hide-header-close>
      <p class="my-4">Select a tag:</p>
      <b-form @submit.prevent="removetag">
        <b-form-group
          label-for="newtagInput"
          label="Tag:"
          description="Remove tags from your project"
        >
          <span>{{ projectprop.name }}</span>
          <b-form-select id="removeTagInput" v-model="formRemoveTag">
            <option
              v-for="tag in this.$store.state.tag"
              :key="tag.id"
              :value="tag.name"
              >{{ tag.name }}</option
            >
          </b-form-select>
        </b-form-group>
      </b-form>
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button size="sm" class="bcare" @click="removetag()">REMOVE</b-button>
        <b-button size="sm" class="btransparency" @click="cancel()">
          CLOSE
        </b-button>
        <b-button size="sm" class="none" @click="ok()">OK</b-button>
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
    projectprop: { required: true }
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
