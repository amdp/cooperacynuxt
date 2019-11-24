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
        <b-row class="m-0 p-0 w-100">
          <b-col cols="12" class="m-0 p-0 w-100">
            <!-- project-title -->
            <b-row class="m-0 p-0">
              <b-col cols="3" class="m-0 pt-2 px-1 p-lg-0 text-center">
                <b-img
                  :src="projectImage(project.id)"
                  fluid
                  block
                  class="m-0 m-lg-n5 p-lg-5"
                />
              </b-col>
              <b-col cols="9" lg="6" class="m-0 pl-2 text-center">
                <span class="space subheading up"
                  ><nuxt-link :to="'/project/' + project.id">{{
                    project.name
                  }}</nuxt-link></span
                >
                <br />
                <span>{{ project.brief }}</span>
              </b-col>
              <b-col cols="12" lg="3" class="m-0 pl-2">
                <p class="text-left mt-2">
                  &#127757;
                  <small class="up"
                    >{{ category(project.category) }}
                    {{ stage(project.stage) }}-PROJECT IN
                    {{ location(project.place) }}
                  </small>
                </p>
              </b-col>
            </b-row>
            <!-- details -->
            <b-row class="mt-3 ml-0 mr-0 p-0 w-100">
              <b-col cols="12" class="m-0 p-0 w-100">
                <div v-if="project.stage == 7">
                  <div
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
                    BUDGET: &nbsp;&nbsp;{{ progress(project) }}% of €{{
                      Math.round(project.budget)
                    }}
                  </div>
                </div>
                <div
                  class="progress-bar bfreedom"
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
                >
                  HUDGET: &nbsp;&nbsp;{{ progress(project, 'h') }}% of
                  {{ Math.round(project.hudget) }}
                </div>
              </b-col>
            </b-row>
            <!-- votebar -->
            <b-row class="ml-0 mr-0 p-0 w-100">
              <b-col cols="12" class="m-0 p-0 w-100 text-center">
                <b-link v-b-modal.votemodal>
                  VOTE FOR THIS PROJECT (?):
                </b-link>
                <br />
                <votebar :voteprop="project" :proptype="'project'" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>
    <votemodal />
  </b-container>
</template>

<script>
import votebar from './votebar'
import votemodal from './votemodal'
export default {
  components: { votebar: votebar, votemodal: votemodal },
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
      return {
        projects: this.$store.state.project.filter(
          project => project.stage != 1
        ),
        archived: this.$store.state.project.filter(
          project => project.stage == 1
        )
      }
    }
  },
  methods: {
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
        projectProgress = Math.round(
          (project.participants / project.hudget) * 100
        )
      } else {
        projectProgress = Math.round((project.collected / project.budget) * 100)
      }
      return isNaN(projectProgress) ? 0 : projectProgress //add infinity or remove budget 0 ideas
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
