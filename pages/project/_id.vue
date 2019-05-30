
<template>
  <div class="mx-auto mt-4 mb-5">
    <div class="row mt-5" v-for="project in this.$store.state.project" :key="project.id">
      <div class="col-12">
        <div class="row">
          <div class="col-1"><button @click="edit">EDIT</button></div>
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
      <b-row class="mt-5"><b-col cols="12" class="subheading space up text-center">COMMENTS AND QUESTIONS</b-col></b-row>
    </div>
    <comment />
  </div>
</template>

<script>
import Votebar from '@/components/Votebar'
import Comment from '@/components/Comment'

export default {
  middleware: ['auth'], components: { Votebar: Votebar, Comment: Comment, },
  methods: {edit(){this.$store.dispatch('editSwitchAction', this.$route.params.id); return this.$router.push({path: '/project/form'})}},
  async fetch ({store, params}){ 
    await store.dispatch('getProjectAction', { projectid: params.id, limit:' LIMIT 1', userid: store.state.auth.user.id,}) 
    await store.dispatch('getCommentAction', { projectid: params.id, limit:' ',        userid: store.state.auth.user.id,})},
}
</script>