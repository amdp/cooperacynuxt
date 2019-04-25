
<template>
  <div class="mx-auto mt-4 mb-5">
    <div v-if="this.$store.state.projectsvx.edit">
      <projectform />
    </div>
    <div class="row mt-5" v-if="this.$store.state.projectsvx.project.name && !this.$store.state.projectsvx.edit" >
      <div class="col-12">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-2" v-if="project.image">
            <img :src="require('@/assets/images/projects/' + project.id + '.png')" width="100px" />
          </div>
          <div class="col-2" v-else> </div>
          <div class="col-9">
            <div class="row">
              <div class="col-10 space subheading up equivalence" >{{ project.name }}</div>
              <div class="col-2 space subheading up" ><a class="ae mini" href="#" @click="editSwitch">EDIT</a></div>
            </div>
            <div class="row">
              <div class="col-12">{{ project.content }}</div>
            </div>
          </div>
        </div>
        <votebars :votesprop="project" :proptype="'project'" />
      </div>
      <b-row class="text-center mt-5"><b-col cols="12" class="subheading space up">COMMENTS AND QUESTIONS</b-col></b-row>
      <comments :commentprop="project"/>
    </div>
  </div>
</template>

<script>
import Projectform from '@/components/Projectform'
import Votebars from '@/components/Votebars'
import Comments from '@/components/Comments'

export default {
  middleware: ['auth'],
  computed: {
      project(){return  this.$store.state.projectsvx.project},
      edit(){ return  this.$store.state.projectsvx.edit},
  },
  mounted() { return this.$store.dispatch('projectsvx/getProjectAction', {id: this.$route.params.id})},
  methods: { editSwitch(){this.$store.dispatch('projectsvx/editSwitchAction',true)} },
  components: {
    Votebars: Votebars,
    Projectform: Projectform,
    Comments: Comments,
  },
}

</script>
