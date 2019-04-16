<!-- src="@/assets/images/main/coo.png" :src="require('@/assets/images/projects/' + project.image)" 

var cci = get.from the database.the array
console.log(JSON.stringify(cci))


<template>
  <div class="mx-auto mt-4 mb-5">
    <div class="row mt-5" v-for="project in projects" :key="project.id">
      <div class="col-12">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-2" v-if="project.image">
            <img :src="require('@/assets/images/projects/' + project.image)" width="100px" />
          </div>
          <div class="col-2" v-else> </div>
          <div class="col-9">
            <div class="row">
              <div class="col-12 space subheading up" >{{ project.name }}</div>
            </div>
            <div class="row">
              <div class="col-12">{{ project.content }}</div>
            </div>
          </div>
        </div>
        <votebars />
      </div>
    </div>


  </div>
</template>

<script>
import Votebars from '@/components/Votebars'

export default {
  computed: {
      projects(){return  this.$store.state.projectsvx.projects}
  },
  mounted() {
    this.$store.dispatch('projectsvx/getProjects')
  },
  components: {
    Votebars: Votebars,
  },
}
</script> -->