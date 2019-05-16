<template>
  <div class="mx-auto mt-4 mb-5">
    <div class="row mt-5" v-for="project in this.$store.state.project" :key="project.id">
      <div class="col-12">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-2">
            <img :src="require('@/assets/image/project/' + project.id + '.png')" width="100px" />
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
        <votebar :voteprop="project" :proptype="'project'" />
      </div>
    </div>


  </div>
</template>

<script>
import Votebar from '@/components/Votebar'
export default {
  mounted(){ this.$store.dispatch('getProptypeAction', {userid: this.$auth.user.id, proptype: 'project'}) },
  components: { Votebar: Votebar, },
}
</script>
