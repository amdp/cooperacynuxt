<template>
  <b-container fluid class="justify-content-center m-0 p-0">
    <div
      class="justify-content-center m-0 p-0"
      v-for="type in projectTypes"
      :key="type.id"
      fluid
    >
      <h2 class="text-center mb-3 up" v-if="projectlist[type.name].length > 0">
        {{ type.name }}
      </h2>
      <div
        class="p-3 ml-0 mr-0 mb-3 w-100 projectbox"
        v-for="project in projectlist[type.name]"
        :key="project.id"
      >
        <b-row class="m-0 p-0 w-100 p-3">
          <b-col cols="12" class="m-0 p-0 w-100">
            <b-row class="m-0 p-0 w-100">
              <b-col cols="12" md="3">
                <img :src="projectImage(project.id)" class="img-100" />
              </b-col>
              <b-col cols="12 text-center" md="6">
                <span class="space subheading up">
                  <nuxt-link :to="'/project/' + project.id">
                    {{ project.name }}
                  </nuxt-link> </span
                ><br />
                <small class="mb-2 up t12">
                  <i>{{ project.brief }}</i>
                </small>
                <p v-if="$route.params.id">{{ project.content }}</p>
                <p v-if="$route.params.id">
                  TAGS:
                  <span v-for="tag in $store.state.tag" :key="tag.id">
                    {{ tag.name }}
                  </span>
                  <span>
                    - <b-link v-b-modal.addtagmodal class="ac">Add</b-link> or
                    <b-link v-b-modal.removetagmodal class="au">remove</b-link>
                    a tag
                  </span>
                </p>
              </b-col>
              <b-col cols="12" md="3">
                <b-container v-if="$route.params.id">
                  <small>
                    <strong>AFTF: </strong
                    >{{ project.anonymous ? 'ON' : 'OFF' }}
                  </small>
                  <br />
                  <small v-if="project.stage == '5'">
                    <strong>FEE: </strong> {{ Math.round(project.budget) }}
                    <br />
                  </small>
                  <br />
                  <small>
                    <strong>PARENT PROJECT: </strong> {{ project.parent }}
                  </small>
                  <br />
                </b-container>
                <b-container>
                  <small>
                    {{ category(project.category) }}
                    <i>{{ stage(project.stage) }}-project</i> in
                    {{ location(project.place) }}
                  </small>
                </b-container>
                <br />
              </b-col>
            </b-row>
            <!-- BUDGET BAR -->
            <b-row class="m-0 p-0 w-100">
              <b-col cols="12">
                <div
                  v-if="project.stage == 7"
                  class="progress-bar btrust coogray"
                  :class="{
                    'progress-zero': progress(project) == 0
                  }"
                  role="progressbar"
                  :style="{
                    width: progress(project) + '%'
                  }"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  BUDGET: &nbsp;&nbsp;{{ Math.round(collected(project)) }} of
                  €{{ Math.round(project.budget) }}
                </div>
              </b-col>
            </b-row>
            <!-- HUDGET BAR -->
            <b-row class="m-0 p-0 w-100">
              <b-col cols="12">
                <div
                  class="progress-bar bfreedom mt-2"
                  :class="{
                    'progress-zero': progress(project, 'h') == 0
                  }"
                  role="progressbar"
                  :style="{
                    width: progress(project, 'h') + '%'
                  }"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  v-if="project.category != 4 || project.hudget != 0"
                >
                  HUDGET: &nbsp;&nbsp;{{ project.professional }} of
                  {{ project.hudget }}
                </div>
              </b-col>
            </b-row>
            <b-row class="m-0 p-0 w-100">
              <b-col cols="12">
                <b-row class="ml-0 mr-0 p-0 w-100">
                  <b-col cols="12" class="m-0 p-0 w-100 text-center">
                    <b-link v-b-modal.votemodal>
                      VOTE FOR THIS PROJECT (?):
                    </b-link>
                    <br />
                    <votebar
                      :voteprop="project"
                      :proptype="'project'"
                      :voteId="project.id"
                    />
                  </b-col>
                </b-row>
                <div>
                  <div
                    class="col-12 mt-4"
                    v-if="$auth.user && $route.params.id"
                  >
                    <b-link class="au" v-if="project.stage != 1" @click="edit">
                      Edit this project
                    </b-link>
                    <b-link
                      class="ae"
                      v-if="project.stage != 1 && $auth.user.role == 1"
                      @click="archive"
                    >
                      Archive this project
                    </b-link>
                    <b-link
                      class="au"
                      v-if="project.stage == 1 && $auth.user.role == 1"
                      @click="unarchive"
                    >
                      Resume this project
                    </b-link>
                    <b-link class="at" @click="copy">Copy this project</b-link>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <votemodal />
        <tagmodal v-if="$route.params.id" :projectprop="project" />
      </div>
    </div>
  </b-container>
</template>

<script>
import votebar from './votebar'
import votemodal from './votemodal'
import tagmodal from './tagmodal'
export default {
  components: { votebar: votebar, votemodal: votemodal, tagmodal: tagmodal },
  data() {
    return {
      isHover: null,
      projectTypes: [
        { id: 1, name: 'projects' },
        { id: 2, name: 'archived' }
      ]
    }
  },
  computed: {
    projectlist() {
      if (this.$route.params.id) {
        return {
          projects: this.$store.state.project.filter(
            project => project.id == this.$route.params.id
          ),
          archived: []
        }
      } else {
        return {
          projects: this.$store.state.project.filter(
            project => project.stage != 1
          ),
          archived: this.$store.state.project.filter(
            project => project.stage == 1
          )
        }
      }
    }
  },
  methods: {
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
        hudget: this.oneproject.hudget,
        country: this.oneproject.country,
        place: this.oneproject.place,
        category: this.oneproject.category
      })
      this.$store.dispatch('getUserProjectAction', {
        userid: this.$auth.user.id
      })
      return this.$router.push({ path: '/user' })
    },
    edit() {
      this.$store.dispatch('editSwitchAction', { id: this.$route.params.id })
      return this.$router.push({ path: '/project/form' })
    },
    unarchive() {
      this.$store.dispatch('editSwitchAction', { id: this.$route.params.id })
      return this.$router.push({ path: '/project/form' })
    },
    copy() {
      this.$store.dispatch('editSwitchAction', {
        id: this.$route.params.id,
        copy: true
      })
      this.$store.dispatch('getUserProjectAction', {
        userid: this.$auth.user.id
      })
      return this.$router.push({ path: '/project/form' })
    },
    projectImage(id) {
      try {
        return require('../assets/image/project/' + id + '.png')
      } catch (e) {
        return require('../assets/image/project/0.png')
      }
    },
    progress(project, hudget) {
      let projectProgress
      if (hudget) {
        projectProgress = Math.round((project.F / project.hudget) * 100)
      } else {
        projectProgress = Math.round((project.collect / project.budget) * 100)
      }
      return isNaN(projectProgress) ? 0 : projectProgress //add infinity or remove budget 0 ideas
    },
    collected(project) {
      if (project.stage == 5) {
        return project.E * project.collect
      } else {
        return project.collect
      }
    },
    stage(id) {
      return this.$store.state.stage.find(stage => stage.id == id).name
    },
    category(id) {
      return this.$store.state.category.find(category => category.id == id).name
    },
    location(id) {
      let projectPlace = this.$store.state.place.find(place => place.id == id)
      if (projectPlace) {
        let projectCountry = this.$store.state.country.find(
          country => country.id == projectPlace.country
        )
        if (projectCountry) {
          return projectPlace.name + ', ' + projectCountry.name
        }
      } else {
        return 'Unknown'
      }
    }
  }
}
</script>
