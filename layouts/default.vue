<template>
  <div class="container-fluid">
    <b-row>
      <navbar />
    </b-row>
    <b-row class="navbarrow">
      <b-col cols="2"></b-col>
      <b-col cols="8"><nuxt /></b-col>
      <b-col cols="2"></b-col>
    </b-row>
    <b-row>
      <foot />
    </b-row>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
import foot from '@/components/foot'

export default {
  components: { navbar: navbar, foot: foot }
}
</script>
