<template>
  <div>
    <projectlist />
  </div>
</template>

<script>
import Projectlist from '@/components/Projectlist'
export default { middleware: ['auth'], components: { Projectlist: Projectlist, }, 
  async fetch ({ store, params }) {await store.dispatch('getProjectAction', {userid: store.state.auth.user.id}) }, }
</script>
