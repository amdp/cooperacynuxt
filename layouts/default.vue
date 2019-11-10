<template>
  <b-container fluid class="m-0 p-0">
    <b-row class="m-0 p-0">
      <navbar />
    </b-row>
    <b-row fluid class="main justify-content-center w-100 m-0 pl-0 pr-0">
      <b-col cols="11" lg="8" class="p-0 m-0">
        <nuxt />
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

export default {
  components: { navbar, foot }
}
</script>
