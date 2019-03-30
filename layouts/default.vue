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
        <User v-if="this.$auth.getToken('local')" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import User from '@/components/User'


export default {
  components: {
    Sidebar: Sidebar,
    Navbar: Navbar,
    User: User
  }
}
</script>
