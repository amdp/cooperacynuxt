<!-- src="@/assets/image/main/coo.png" :src="require('@/assets/image/project/' + project.image)" 

var cci = get.from the database.the array
console.log(JSON.stringify(cci))


<template>
  <div class="mx-auto mt-4 mb-5">
    <div class="row mt-5" v-for="project in project" :key="project.id">
      <div class="col-12">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-2" v-if="project.image">
            <img :src="require('@/assets/image/project/' + project.image)" width="100px" />
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
        <votebar />
      </div>
    </div>


  </div>
</template>

<script>
import votebar from '~/components/votebar'

export default {
  computed: {
      project(){return  this.$store.state.project}
  },
  mounted() {
    this.$store.dispatch('get')
  },
  components: {
    votebar: votebar,
  },
}
</script> -->