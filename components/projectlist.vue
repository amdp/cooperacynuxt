<template>
  <b-container fluid class="justify-content-center m-0 p-0">
    <div
      v-for="type in projectTypes"
      :key="type.id"
      class="justify-content-center m-0 p-0"
      fluid
    >
      <h2 v-if="projectlist[type.name].length > 0" class="text-center mb-3 up">
        {{ type.name }}
      </h2>
      <div
        v-for="project in projectlist[type.name]"
        :key="project.id"
        class="p-3 ml-0 mr-0 mb-3 w-100 projectbox"
      >
        <b-row class="m-0 p-0 w-100 p-3">
          <b-col cols="12" class="m-0 p-0 w-100">
            <b-row class="m-0 p-0 w-100">
              <b-col cols="12" md="3">
                <img
                  :src="'/assets/image/project/' + project.id + '.png'"
                  class="img-100"
                />
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
                <p v-if="$route.params.id">
                  {{ project.content }}
                </p>
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
                  <small v-if="project.stage == '2'">
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
                    <i>{{ stage(project.stage) }} project</i> in
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
                    width: progress(project) + '%',
                    maxWidth: '100%'
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
                  v-if="project.category != 4 || project.hudget != 0"
                  class="progress-bar bfreedom mt-2"
                  :class="{
                    'progress-zero': progress(project, 'h') == 0
                  }"
                  role="progressbar"
                  :style="{
                    width: progress(project, 'h') + '%',
                    maxWidth: '100%'
                  }"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
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
                      :vote-id="project.id"
                    />
                  </b-col>
                </b-row>
                <div>
                  <div
                    v-if="$auth.user && $route.params.id"
                    class="col-12 mt-4"
                  >
                    <span v-if="project.stage != 1 && $auth.user.role == 1">
                      <b-link class="ae" @click="archive(project)"
                        >Archive this project</b-link
                      >&nbsp;</span
                    >
                    <span v-if="project.stage == 1 && $auth.user.role == 1"
                      ><b-link class="ae" @click="unarchive()"
                        >Resume this project</b-link
                      >&nbsp;</span
                    >

                    <span
                      v-if="
                        (project.stage == 5 && improfessional) ||
                          $auth.user.role == 1
                      "
                    >
                      <b-link v-b-modal.budgetstepmodal class="at"
                        >Upload Budget Step Document</b-link
                      >&nbsp;</span
                    >

                    <span
                      ><b-link class="ai" @click="copy()"
                        >Copy this project</b-link
                      >&nbsp;</span
                    >

                    <span
                      v-if="
                        (project.stage != 1 && improfessional) ||
                          $auth.user.role == 1
                      "
                    >
                      <b-link v-b-modal.professionalmodal class="af"
                        >Add/Remove professionals</b-link
                      >&nbsp;</span
                    >

                    <span
                      v-if="
                        (project.stage != 1 && improfessional) ||
                          $auth.user.role == 1
                      "
                    >
                      <b-link class="au" @click="edit()"
                        >Edit this project</b-link
                      >&nbsp;</span
                    >
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <tagmodal
          v-if="$route.params.id && $auth.user"
          :projectprop="project"
        />
        <professionalmodal
          v-if="$route.params.id && $auth.user"
          :projectprop="project"
          :userlistprop="$store.state.userlist"
        />
        <budgetstepmodal
          v-if="$route.params.id && $auth.user"
          :projectprop="project"
        />
        <votebarmodal :projectprop="project" />
      </div>
    </div>
    <votemodal />
  </b-container>
</template>

<script>
import votebar from './votebar'
import votemodal from './votemodal'
import votebarmodal from '@/components/votebarmodal'
import tagmodal from './tagmodal'
import professionalmodal from './professionalmodal'
export default {
  components: {
    votebar: votebar,
    votemodal: votemodal,
    votebarmodal: votebarmodal,
    tagmodal: tagmodal,
    professionalmodal: professionalmodal
  },
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
    improfessional() {
      let mypro = this.$store.state.professional.filter(
        pro =>
          pro.user == this.$auth.user && pro.project == this.$route.params.id
      )
      if (mypro.length > 0) return true
      else return false
    },
    archive(project) {
      this.$store.dispatch('projectFormAction', {
        id: project.id,
        stage: 1,
        name: project.name,
        country: project.country,
        place: project.place,
        brief: project.brief,
        content: project.content,
        video: project.video,
        anonymous: project.anonymous,
        parent: project.parent,
        category: project.category,
        collect: project.collect,
        budget: project.budget,
        budgetstep: project.budgetstep,
        budgetstepdoc: project.budgetstepdoc,
        fundingstep: project.fundingstep,
        professional: project.professional,
        hudget: project.hudget,
        E: project.E,
        T: project.T,
        C: project.C,
        I: project.I,
        F: project.F,
        U: project.U,
        D: project.D,
        created: project.created
      })
      this.$store.dispatch('getUserProjectAction', {
        userid: this.$auth.user.id
      })
      return this.$router.push({ path: '/user' })
    },
    professional() {
      this.store.dispatch('addprofessional', { id: this.formProfessional })
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
    progress(project, hudget) {
      let projectProgress
      if (hudget) {
        projectProgress = Math.round(
          (project.professional / project.hudget) * 100
        )
      } else {
        projectProgress = Math.round((project.collect / project.budget) * 100)
      }
      return isNaN(projectProgress) ? 0 : projectProgress //add infinity or remove budget 0 ideas
    },
    collected(project) {
      if (project.stage == 2) {
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
