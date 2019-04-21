<template>
  <div>
    <a href="/projects/new" class="ad">Add a new Project</a>
    <projectslist />
  </div>
</template>

<script>
import Projectslist from '@/components/Projectslist'

export default {
  middleware: ['auth'],
  components: {
    Projectslist: Projectslist,
  },
}
</script>
