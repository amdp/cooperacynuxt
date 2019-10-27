<template>
  <div class="project-page-container py-5 py-md-3 w-100">
    <div
      class="project-details-container d-flex flex-wrap align-items-center justify-content-around w-100"
    >
      <img
        :src="projectImage"
        class="project-details-image img-fluid img-responsive col-8 col-md-2 mb-2 mb-md-0"
      />
      <div
        class="project-details col-12 col-md-8 d-flex flex-column align-items-center justify-content-center text-center"
      >
        <h2 class="font-weight-light">{{ oneproject.name.toUpperCase() }}</h2>
        <small>{{ oneproject.brief }}</small>
        <p>{{ oneproject.content }}</p>
        <p>
          <strong>PROJECT BASED IN:</strong>
          {{ oneproject.place + ', ' + oneproject.country }}
        </p>
        <p>
          TAGS:
          <span v-for="tag in this.$store.state.tag" :key="tag.id">{{
            tag.name
          }}</span>
          <span
            >- <b-link v-b-modal.addtagmodal class="ac">Add</b-link> or
            <b-link v-b-modal.removetagmodal class="au">remove</b-link> a
            tag</span
          >
        </p>
      </div>
      <div class="project-stats d-flex flex-column col-8 col-md-2">
        <small>
          <strong>AFTF: </strong>{{ oneproject.anonymous ? 'ON' : 'OFF' }}
        </small>
        <small>
          <strong>BUDGET: </strong>{{ Math.round(oneproject.collected) }}/{{
            Math.round(oneproject.budget)
          }}
        </small>
        <small>
          <strong>FEE: </strong> {{ Math.round(oneproject.budget) }}
        </small>
        <small>
          <strong>HUDGET: </strong> {{ oneproject.participant }}/{{
            oneproject.hudget
          }}
        </small>
        <small>
          <strong>PARENT PROJECT: </strong> {{ oneproject.parent }}
        </small>
        <small> <strong>CATEGORY: </strong> {{ category.name }} </small>
        <small> <strong>STATE: </strong> {{ stage.name }} </small>
      </div>
      <votebar
        :voteprop="oneproject"
        :proptype="'project'"
        :voteId="oneproject.id"
      />
      <div class="col-12 mt-4">
        <b-link class="au" @click="edit">Edit this project</b-link>
        <b-link class="ae" @click="archive">Archive this project</b-link>
      </div>
    </div>
    <div class="comments-container w-100 mt-5">
      <h3 class="font-weight-normal text-center">COMMENTS AND QUESTIONS</h3>
      <comment />
    </div>

    <!-- ADD TAGS MODAL -->
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
          <span>{{ oneproject.name }}</span>
          <b-form-input id="newTagInput" v-model="formTag"></b-form-input>
        </b-form-group>
      </b-form>
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button size="sm" class="bcare" @click="addtag()">ADD</b-button>
        <b-button size="sm" class="btransparency" @click="cancel()"
          >CLOSE</b-button
        >
      </template>
    </b-modal>
    <!-- REMOVE TAGS MODAL -->
    <b-modal id="removetagmodal" title="Remove a tag" hide-header-close>
      <p class="my-4">Select a tag:</p>
      <b-form @submit.prevent="removetag">
        <b-form-group
          label-for="newtagInput"
          label="Tag:"
          description="Remove tags from your project"
        >
          <span>{{ oneproject.name }}</span>
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
        <b-button size="sm" class="btransparency" @click="cancel()"
          >CLOSE</b-button
        >
      </template>
    </b-modal>
  </div>
</template>

<script>
import votebar from '@/components/votebar'
import comment from '@/components/comment'

export default {
  middleware: ['auth'],
  head() {
    return {
      title: 'Cooperacy - Project: ' + this.oneproject.name
    }
  },
  components: { votebar: votebar, comment: comment },
  async fetch({ store, params }) {
    await store.dispatch('getCommentAction', {
      projectid: params.id,
      userid: store.state.auth.user.id,
      limit: ' LIMIT 1'
    })
    await store.dispatch('getTagAction', { projectid: params.id })
    await store.dispatch('getProjectAction', {
      projectid: params.id,
      userid: store.state.auth.user.id
    })

    //await store.dispatch('getUserprojectAction', { projectid: params.id, limit:' LIMIT 1', userid: store.state.auth.user.id,})
  },
  data() {
    return {
      formTag: '',
      formRemoveTag: ''
    }
  },
  computed: {
    oneproject() {
      while (
        this.$store.state.project.findIndex(
          project => project.id == this.$route.params.id
        ) == -1
      ) {
        this.$store.dispatch('getProjectAction', {
          projectid: this.$route.params.id,
          userid: this.$store.state.auth.user.id
        })
      }
      return this.$store.state.project[
        this.$store.state.project.findIndex(
          project => project.id == this.$route.params.id
        )
      ]
    },
    projectImage() {
      try {
        return require('../../assets/image/project/' +
          this.oneproject.id +
          '.png')
      } catch (e) {
        return require('../../assets/image/project/0.png')
      }
    },
    category() {
      return this.$store.state.category[
        this.$store.state.category.findIndex(
          category => category.id == this.oneproject.category
        )
      ]
    },
    stage() {
      return this.$store.state.stage[
        this.$store.state.stage.findIndex(
          stage => stage.id == this.oneproject.stage
        )
      ]
    }
  },
  methods: {
    edit() {
      this.$store.dispatch('editSwitchAction', this.$route.params.id)
      return this.$router.push({ path: '/project/form' })
    },
    archive() {
      this.$store.dispatch('projectFormAction', {
        stage: 1,
        id: this.oneproject.id,
        name: this.oneproject.name,
        brief: this.oneproject.brief,
        content: this.oneproject.content,
        video: this.oneproject.video,
        anonymous: this.oneproject.anonymous,
        parent: this.oneproject.parent,
        budget: this.oneproject.budget,
        hudget: this.oneproject.hudget
      })
      return this.$router.push({ path: '/project/user' })
    },
    async addtag() {
      if (this.formTag) {
        this.formTag = this.formTag.replace(/^[ ]+/gi, '') //removes spaces at the beginning of tag
        await this.$store
          .dispatch('tagFormAction', {
            project: this.oneproject.id,
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
            project: this.oneproject.id,
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
