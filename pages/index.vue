<template>
  <div class="m-0 p-0">
    <home />
    <projectslist />
  </div>
</template>

<script>
import Home from '@/components/Home'
import Projectslist from '@/components/Projectslist'


export default {
  components: {
    Home: Home,
    Projectslist: Projectslist,
  }
}
</script>
