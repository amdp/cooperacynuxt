<template>
  <div class="m-0 p-0">
    <home />
    <projects />
  </div>
</template>

<script>
import Home from '@/components/Home'
import Projects from '@/components/Projects'


export default {
  components: {
    Home: Home,
    Projects: Projects,
  }
}
</script>
