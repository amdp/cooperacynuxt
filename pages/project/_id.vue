
<template>
  <div class="mx-auto mt-4 mb-5">
    <div class="row mt-5 d-block" v-for="project in this.$store.state.project" :key="project.id">
      <div class="col-12">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-2">
            <img :src="require('@/assets/image/project/' + project.id + '.png')" width="100px" />
          </div>
          <div class="col-9">
            <div class="row">
              <div class="col-12 space subheading up" >{{ project.name }}</div>
            </div>
            <div class="row">
              <div class="col-12 mt-2">{{ project.content }}</div>
            </div>
          </div>
        </div>
        <votebar :voteprop="project" :proptype="'project'" />
      </div>
      <b-row class="mt-5 d-block">
        <b-link class="au" @click="edit">Edit this project</b-link>
        <b-link class="ae" @click="archive">Archive this project</b-link>
      </b-row>
      <b-row class="mt-5"><b-col cols="12" class="subheading space up d-flex justify-content-center">COMMENTS AND QUESTIONS</b-col></b-row>
    </div>
    <comment />
  </div>
</template>

<script>
import Votebar from '@/components/Votebar'
import Comment from '@/components/Comment'

export default {
  middleware: ['auth'], components: { Votebar: Votebar, Comment: Comment, },
  methods: {edit(){this.$store.dispatch('editSwitchAction', this.$route.params.id); return this.$router.push({path: '/project/form'})},
            archive(){this.$store.dispatch('projectFormAction',{
              stage: 1, id: this.$store.state.project[0].id, name: this.$store.state.project[0].name, 
              brief: this.$store.state.project[0].brief, content: this.$store.state.project[0].content, 
              video: this.$store.state.project[0].video, anonymous: this.$store.state.project[0].anonymous, 
              parent: this.$store.state.project[0].parent, budget: this.$store.state.project[0].budget,
              hudget: this.$store.state.project[0].hudget}); return this.$router.push({path: '/project/user'})}
            },
  async fetch ({store, params}){ 
    await store.dispatch('getProjectAction', { projectid: params.id, limit:' LIMIT 1', userid: store.state.auth.user.id,}) 
    await store.dispatch('getCommentAction', { projectid: params.id,                   userid: store.state.auth.user.id,})},
}
</script>