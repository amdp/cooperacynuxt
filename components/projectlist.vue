<template>
  <b-container fluid class="mb-5">
    <div class="d-flex flex-wrap justify-content-center">
      <h2 class="col-12 text-center mb-3">PROJECTS</h2>
      <div
        class="col-10 col-md-5 mx-2 mb-4 single-project"
        v-for="project in projectlist"
        :key="project.id"
      >
        <img
          :src="projectImage(project.id)"
          class="img-fluid img-responsive img-project"
        />
        <div class="project-content text-center p-2">
          <b>{{ project.name }}</b>
          <p class="text-left text-break">{{ project.content }}</p>
          <p class="text-left">&#128205; Milan, Italy</p>
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
            <b>{{ Math.round(project.collected) }}</b>
            <small>collected</small>
          </div>
          <div>
            <b>{{ Math.round(project.budget) }}</b>
            <small>budget</small>
          </div>
          <div>
            <b>{{ getProjectStage(project.stage) }}</b>
            <small>stage</small>
          </div>
        </div>
        <!-- votebar -->
        <votebar />
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
        <img
          :src="projectImage(archived.id)"
          class="img-fluid img-responsive img-project"
        />
        <div class="project-content text-center p-2">
          <b>{{ archived.name }}</b>
          <p class="text-left text-break">{{ archived.content }}</p>
          <p class="text-left">&#128205; Milan, Italy</p>
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
            <b>{{ Math.round(archived.collected) }}</b>
            <small>collected</small>
          </div>
          <div>
            <b>{{ Math.round(archived.budget) }}</b>
            <small>budget</small>
          </div>
          <div>
            <b>{{ archived.stage }}</b>
            <small>stage</small>
          </div>
        </div>
        <votebar />
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
    }
  }
}
</script>

<style scoped>
.img-project {
  width: 100%;
  height: 170px;
  object-fit: cover;
}
.single-project {
  border: 1px solid var(--freedom);
  padding: 0;
  border-radius: 5px;
  cursor: pointer;
  transition-duration: 0.3s;
  height: fit-content;
}
.single-project:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.single-project > img {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid black;
}
.project-content b {
  font-size: 20px;
  color: black;
}
.progress-zero {
  color: var(--freedom);
  padding-left: 2px;
}
.project-details div {
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem;
}
.project-details b,
.project-details small {
  font-size: 12px;
}
.project-details b {
  font-weight: 700;
}
.project-details small {
  font-weight: light;
}
</style>
