<template>
  <div>
    <a href="/useredit" class="ad">Edit your information</a><br>
    <a href="/projects/new" class="af">Add a new Project</a><br>
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
