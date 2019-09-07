<template>
  <b-container fluid>
    <b-row>
      <navbar />
    </b-row>
    <b-row class="main">
      <b-col cols="1" md="2" class="p-0"></b-col>
      <b-col cols="11" md="8" class="mt-5"><nuxt /></b-col>
      <b-col cols="1" md="2" class="p-0"></b-col>
    </b-row>
    <b-row>
      <foot />
    </b-row>
  </b-container>
</template>

<script>
import navbar from '@/components/navbar'
import foot from '@/components/foot'

export default {
  components: { navbar: navbar, foot: foot }
}
</script>
