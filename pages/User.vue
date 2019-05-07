<template>
  <div>
    <a href="/useredit" class="ad">Edit your information</a><br>
    <a href="/project/form" class="af">Add a new Project</a><br>
    <projectlist />
  </div>
</template>

<script>
import Projectlist from '@/components/Projectlist'

export default {
  middleware: ['auth'],
  components: { Projectlist: Projectlist, },
}
</script>
