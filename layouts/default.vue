<template>
  <div class="container-fluid">
    <b-row>
      <newNavbar />
    </b-row>
    <b-row class="navbarrow d-flex justify-content-center">
      <b-col cols="11" lg="8"><nuxt /></b-col>
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
