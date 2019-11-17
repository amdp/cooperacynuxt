<template>
  <b-container fluid class="justify-content-center m-0 p-0">
    <div
      fluid
      class="justify-content-center m-0 p-0"
      v-for="type in projectTypes"
      :key="type"
    >
      <h2 class="text-center mb-3 up" v-if="projectlist(type).length > 0">
        {{ type }}
      </h2>
      <div
        class="p-3 ml-0 mr-0 mb-3 w-100 projectbox"
        v-for="project in projectlist(type)"
        :key="project.id"
      >
        <b-row class="m-0 p-0 w-100">
          <b-col cols="12" class="m-0 p-0 w-100">
            <!-- project-title -->
            <b-row class="m-0 p-0">
              <b-col cols="3" lg="2" class="m-0 pt-2 pl-1 pr-1 text-center">
                <img :src="projectImage(project.id)" class="m-0 p-0 img-100" />
              </b-col>
              <b-col cols="9" lg="10" class="m-0 pl-2">
                <b-row class="m-0 p-0 space subheading up finger">
                  <nuxt-link :to="'/project/' + project.id">{{
                    project.name
                  }}</nuxt-link>
                </b-row>
                <b-row class="m-0 p-0">
                  {{ project.brief }}
                </b-row>
              </b-col>
            </b-row>
            <!-- details -->
            <b-row class="mt-3 ml-0 mr-0 p-0 w-100">
              <b-col cols="12" class="m-0 p-0 w-100">
                <p class="text-left mt-2">
                  &#127757;
                  <small class="up"
                    >{{ category(project.category) }}
                    {{ stage(project.stage) }}-PROJECT IN
                    {{ location(project.place) }}
                  </small>
                </p>
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
              </b-col>
            </b-row>
            <!-- votebar -->
            <b-row class="ml-0 mr-0 p-0 w-100">
              <b-col cols="12" class="m-0 p-0 w-100">
                <p>VOTE FOR THIS PROJECT:</p>
                <votebar :voteprop="project" :proptype="'project'" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>
  </b-container>
</template>

<script>
import votebar from './votebar'
export default {
  components: { votebar: votebar },
  data() {
    return {
      isHover: null,
      projectTypes: ['projects', 'archived']
    }
  },
  methods: {
    projectlist(type) {
      if (type == 'projects') {
        return this.$store.state.project.filter(project => project.stage != 1)
      } else {
        return this.$store.state.project.filter(project => project.stage == 1)
      }
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
