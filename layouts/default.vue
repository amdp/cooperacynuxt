<template>
  <div>
    <div class="row">
      <Navbar />
    </div>
    <div class="row navbarrow">
      <div class="col-2">
      </div>
      <div class="col-8">
        <nuxt />
      </div>
      <div class="col-2">
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'


export default {
  components: {
    Navbar: Navbar,
  }
}
</script>
