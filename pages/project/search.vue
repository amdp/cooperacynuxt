<template>
  <div>
    <projectlist />
  </div>
</template>

<script>
import projectlist from '@@/components/projectlist'
export default { middleware: ['auth'], components: { projectlist: projectlist, }, 
  async fetch ({ store, params }) {await store.dispatch('getProjectAction', {userid: store.state.auth.user.id}) }, }
</script>
