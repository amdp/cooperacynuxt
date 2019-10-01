<template>
  <b-container fluid class="mb-5">
    <div class="d-flex flex-wrap justify-content-center">
      <h2 class="col-12 text-center mb-3">PROJECTS</h2>
      <div
        class="col-10 col-md-5 mx-2 mb-4 single-project"
        v-for="project in projectlist"
        :key="project.id"
      >
        <nuxt-link :to="'/project/' + project.id">
          <img
            :src="projectImage(project.id)"
            class="img-fluid img-responsive img-project"
          />
          <div class="project-content text-center p-2">
            <b>{{ project.name }}</b>
            <p class="text-left text-break">{{ project.content }}</p>
            <p class="text-left">
              &#128205; {{ getProjectLocation(project.place) }}
            </p>
            <div class="progress">
              <div
                class="progress-bar"
                :class="{
                  'progress-zero': calculateProjectProgress(project) == 0
                }"
                role="progressbar"
                :style="{ width: calculateProjectProgress(project) + '%' }"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {{ calculateProjectProgress(project) }}%
              </div>
            </div>
          </div>
          <div class="project-details p-2 d-flex">
            <div>
              <b>{{ Math.round(project.collected) }}€</b>
              <small>collected</small>
            </div>
            <div>
              <b>{{ Math.round(project.budget) }}€</b>
              <small>budget</small>
            </div>
            <div>
              <b>{{ getProjectStage(project.stage) }}</b>
              <small>stage</small>
            </div>
          </div>
        </nuxt-link>
        <!-- votebar -->
        <votebar
          :voteId="project.id"
          :voteprop="project"
          :proptype="'project'"
        />
      </div>
    </div>
    <!-- archived projects here -->
    <h2 class="col-12 text-center mb-3 mt-5" v-if="archivedlist[0]">
      ARCHIVED PROJECTS
    </h2>
    <div class="d-flex justify-content-center flex-wrap">
      <div
        class="col-10 col-md-5 mx-2 mb-4 single-project"
        v-for="archived in archivedlist"
        :key="archived.id"
      >
        <nuxt-link :to="'/project/' + archived.id">
          <img
            :src="projectImage(archived.id)"
            class="img-fluid img-responsive img-project"
          />
          <div class="project-content text-center p-2">
            <b>{{ archived.name }}</b>
            <p class="text-left text-break">{{ archived.content }}</p>
            <p class="text-left">
              &#128205; {{ getProjectLocation(archived.place) }}
            </p>
            <div class="progress">
              <div
                class="progress-bar"
                :class="{
                  'progress-zero': calculateProjectProgress(archived) == 0
                }"
                role="progressbar"
                :style="{ width: calculateProjectProgress(archived) + '%' }"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {{ calculateProjectProgress(archived) }}%
              </div>
            </div>
          </div>
          <div class="project-details p-2 d-flex">
            <div>
              <b>{{ Math.round(archived.collected) }}€</b>
              <small>collected</small>
            </div>
            <div>
              <b>{{ Math.round(archived.budget) }}€</b>
              <small>budget</small>
            </div>
            <div>
              <b>{{ archived.stage }}</b>
              <small>stage</small>
            </div>
          </div>
        </nuxt-link>
        <votebar
          :voteId="archived.id"
          :voteprop="archived"
          proptype="project"
        />
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
      isHover: null
    }
  },
  computed: {
    projectlist() {
      return this.$store.state.project.filter(project => {
        return project.stage != 1
      })
    },
    archivedlist() {
      return this.$store.state.project.filter(project => {
        return project.stage == 1
      })
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
    calculateProjectProgress(project) {
      let projectProgress = Math.round(
        (project.collected / project.budget) * 100
      )
      return isNaN(projectProgress) ? 0 : projectProgress
    },
    getProjectStage(id) {
      return this.$store.state.stage.find(stage => stage.id == id).name
    },
    getProjectLocation(id) {
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

