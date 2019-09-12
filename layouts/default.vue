<template>
  <div class="container-fluid">
    <b-row>
      <newNavbar />
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
import newNavbar from '@/components/newNavbar'
import foot from '@/components/foot'

export default {
  components: { newNavbar, foot }
}
</script>
