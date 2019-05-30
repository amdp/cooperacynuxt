<template><div class="m-0 p-0"><home /><projectlist /></div></template>

<script>
import Home from '@/components/Home'
import Projectlist from '@/components/Projectlist'

export default { components: {Home: Home, Projectlist: Projectlist,},
  async fetch ({ store, params }) {await store.dispatch('getProjectAction', '') },
}
</script>
