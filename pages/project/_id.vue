
<template>
  <div class="mx-auto mt-4 mb-5">
    <div class="row mt-5" v-for="project in this.$store.state.project" :key="project.id">
      <div class="col-12">
        <div class="row">
          <div class="col-1"><nuxt-link to="/project/form" >EDIT</nuxt-link></div>
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
  middleware: ['auth'],
  mounted() { return this.$store.dispatch('getProptypeAction', {
    where: '`id` = '+this.$route.params.id+' LIMIT 1', userid: this.$store.state.auth.user.id, proptype: 'project'})},
    //created() {store.dispatch('getProptypeAction', {where: '`id` = '+route.params.id+' LIMIT 1', userid: store.state.auth.user.id, proptype: 'project'})},
    /* We should use fetch to make a single call to the server:         #############
    asyncData ({ store,params }) { 
      if (store.state.project){ return store.state.project.find(project => project.id == route.params.id)}else{ 
        store.dispatch('getProptypeAction', {
        where: '`id` = '+params.id+' LIMIT 1', userid: store.state.auth.user.id, proptype: 'project'})
      return store.state.project[0]
      }
    },*/
  components: { Votebar: Votebar, Comment: Comment,  },
}

</script>