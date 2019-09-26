<template>
  <b-container fluid>
    <b-row>
      <navbar />
    </b-row>
    <b-row class="main d-flex justify-content-center">
      <b-col cols="11" lg="8">
        <nuxt />
        <votebarModal />
      </b-col>
    </b-row>
    <b-row>
      <foot />
    </b-row>
  </b-container>
</template>

<script>
import navbar from '@/components/navbar'
import foot from '@/components/foot'
import votebarModal from '@/components/votebarModal'

export default {
  components: { navbar, foot, votebarModal }
}
</script>
