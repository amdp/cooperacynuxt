<template>
  <div>
    <navbar />
    <platform />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import User from '@/components/User'
import Platform from '@/components/Platform'

export default {
  components: {
    Navbar: Navbar,
    User: User,
    Platform: Platform
  }
}
</script>
