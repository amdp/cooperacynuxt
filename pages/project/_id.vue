<template>
  <div class="mx-auto mt-4 mb-5">
    <div class="row mt-5 d-block" v-if="oneproject">
      <div class="col-12">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-2">
            <img :src="projectImage" width="100px" />
          </div>
          <div class="col-7">
            <div class="row">
              <div class="col-12 space subheading up">
                {{ oneproject.name }}
              </div>
            </div>
            <div class="row">
              <div class="col-12 space t10 up">{{ oneproject.brief }}</div>
            </div>
            <div class="row">
              <div class="col-12 mt-2">{{ oneproject.content }}</div>
            </div>
            <div class="row">
              <div class="col-12 mt-2">
                PROJECT BASED IN: {{ oneproject.place }},
                {{ oneproject.country }}.
              </div>
            </div>
            <div class="row">
              <div class="col-12 mt-2 t10 up">
                TAGS:
                <span v-for="tag in this.$store.state.tag" :key="tag.id">{{
                  tag.name
                }}</span>
                <span
                  >- <b-link v-b-modal.addtagmodal class="ac">Add</b-link> or
                  <b-link v-b-modal.removetagmodal class="au">remove</b-link> a
                  tag</span
                >
              </div>
            </div>
          </div>
          <div class="col-2">
            <div class="row">
              <div class="col-12 t10 mt-2" v-if="oneproject.anonymous">
                AFTF ON
              </div>
              <div class="col-12 t10 mt-2" v-if="!oneproject.anonymous">
                AFTF OFF
              </div>
            </div>
            <div class="row">
              <div class="col-12 mt-2 t10" v-if="oneproject.stage != 5">
                BUDGET: {{ Math.round(oneproject.collected) }}/{{
                  Math.round(oneproject.budget)
                }}
              </div>
              <div class="col-12 mt-2 t10" v-else>
                FEE: {{ Math.round(oneproject.budget) }}
              </div>
            </div>
            <div class="row">
              <div class="col-12 mt-2 t10">
                HUDGET: {{ oneproject.participant }}/{{ oneproject.hudget }}
              </div>
            </div>
            <div class="row">
              <div class="col-12 mt-2 t10">
                PARENT PROJECT: {{ oneproject.parent }}
              </div>
            </div>
            <div class="row">
              <div class="col-12 mt-2 t10">CATEGORY: {{ category.name }}</div>
            </div>
            <div class="row">
              <div class="col-12 mt-2 t10">STAGE: {{ stage.name }}</div>
            </div>
          </div>
        </div>
        <votebar :voteprop="oneproject" :proptype="'project'" />
      </div>
      <b-row class="mt-5 d-block">
        <b-link class="au" @click="edit">Edit this project</b-link>
        <b-link class="ae" @click="archive">Archive this project</b-link>
      </b-row>
      <b-row class="mt-5">
        <b-col
          cols="12"
          class="subheading space up d-flex justify-content-center"
          >COMMENTS AND QUESTIONS</b-col
        >
      </b-row>

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
          <b-button size="sm" class="bcare" @click="removetag()"
            >REMOVE</b-button
          >
          <b-button size="sm" class="btransparency" @click="cancel()"
            >CLOSE</b-button
          >
        </template>
      </b-modal>
    </div>
    <comment />
  </div>
</template>

<script>
import votebar from '@/components/votebar'
import comment from '@/components/comment'

export default {
  middleware: ['auth'],
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
        console.log(
          ' ' +
            JSON.stringify(
              this.$store.state.project.findIndex(
                project => project.id == this.$route.params.id
              )
            )
        )
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
