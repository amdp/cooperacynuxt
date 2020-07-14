<template>
  <div>
    <projectlist />
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  head() {
    return {
      title: 'Cooperacy - Project Search'
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getProjectAction', '')
  }
}
</script>
