<template><div class="m-0 p-0"><home /><projectlist /></div></template>

<script>
import home from '@/components/home'
import projectlist from '@/components/projectlist'

export default { components: {'home': home, 'projectlist': projectlist,},
  async fetch ({ store, params }) {await store.dispatch('getProjectAction', '') },
}
</script>
