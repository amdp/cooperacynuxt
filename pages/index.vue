<template>
  <div id="cooperacy">
    <navbar></navbar>
    <div class="row">
      <div class="col-2">
        <sidebar></sidebar>
      </div>
      <div class="col-8">
        <platform></platform>
      </div>
      <div class="col-2">
        <!-- <user></user> -->
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Platform from '@/components/Platform'
// import User from '@/components/User'
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar: Navbar,
    // User: User,
    Platform: Platform,
    Sidebar: Sidebar
  }
}
</script>
