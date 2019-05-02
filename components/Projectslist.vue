<template>
  <div class="mx-auto mt-4 mb-5">
    <div class="row mt-5" v-for="project in projects" :key="project.id">
      <div class="col-12">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-2">
            <img :src="require('@/assets/images/projects/' + project.id + '.png')" width="100px" />
          </div>
          <div class="col-9">
            <div class="row">
              <div class="col-12 space subheading up" ><a :href="'/project/' + project.id" class="ae">{{ project.name }}</a></div>
            </div>
            <div class="row">
              <div class="col-12 mt-2">{{ project.content }}</div>
            </div>
          </div>
        </div>
        <votebars :votesprop="project" :proptype="'project'" />
      </div>
    </div>


  </div>
</template>

<script>
import Votebars from '@/components/Votebars'
//warning this list can be viewed also by non members so the votes colors should be fixed! #########FIXMEEE
export default {
  mounted() { this.$store.dispatch('getProjectsAction', {userid: this.$auth.user.id}) },
  computed: { projects(){return  this.$store.state.projects}, },
  components: { Votebars: Votebars, },
}
</script>
