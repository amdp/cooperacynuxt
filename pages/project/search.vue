<template>
  <div>
    <projectlist />
  </div>
</template>

<script>
import projectlist from '@/components/projectlist'
export default {
  middleware: ['auth'],
  head() {
    return {
      title: 'Cooperacy - Project Search'
    }
  },
  components: { projectlist: projectlist },
  async fetch({ store, params }) {
    await store.dispatch('getProjectAction', '')
  }
}
</script>
