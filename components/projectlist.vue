<template>
  <div class="mx-auto mt-4 mb-5">
    <div
      class="row mt-5"
      v-for="project in projectlist"
      :key="project.id"
    >
      <div class="col-12">
        <div class="row">
          <div class="col-10">
            <div class="row">
              <div class="col-12 space subheading up"><a :href="'/project/' + project.id">{{ project.name }}</a></div>
            </div>
            <div class="row">
              <div class="col-12 mt-2">{{ project.content }}</div>
            </div>
          </div>
          <div class="col-2 pl-5"><img
              :src="projectImage(project.id)"
              width="80px"
            /></div>
        </div>
        <votebar
          :voteprop="project"
          :proptype="'project'"
        />
      </div>
    </div> <!-- archived projects here -->
    <h5 class="mt-5 d-flex justify-content-center">ARCHIVED PROJECTS</h5>
    <div
      class="row mt-5"
      v-for="archived in archivedlist"
      :key="archived.id"
    >
      <div class="col-12">
        <div class="row">
          <div class="col-10">
            <div class="row">
              <div class="col-12 space subheading up"><a :href="'/project/' + archived.id">{{ archived.name }}</a></div>
            </div>
            <div class="row">
              <div class="col-12 mt-2">{{ archived.content }}</div>
            </div>
          </div>
          <div class="col-2 pl-5"><img
              :src="projectImage(archived.id)"
              width="80px"
            /></div>
        </div>
        <votebar
          :voteprop="archived"
          :proptype="'project'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import votebar from "./votebar";

export default {
  components: { votebar: votebar },
  computed: {
    projectlist() {
      return this.$store.state.project.filter(project => {
        return project.stage != 1;
      });
    },
    archivedlist() {
      return this.$store.state.project.filter(project => {
        return project.stage == 1;
      });
    }
  },
  methods: {
    projectImage(id) {
      try {
        return require("../assets/image/project/" + id + ".png");
      } catch (e) {
        return require("../assets/image/project/0.png");
      }
    }
  }
};
</script>