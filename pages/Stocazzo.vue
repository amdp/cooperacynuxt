<template>
  <div>
    <h1> {{ $store.state.project }}</h1>
  </div>
</template>

<script>

export default {
  async fetch ({ store }) { 
    await store.dispatch('getProptypeAction', {userid: store.state.auth.user.id, proptype: 'project' })
   },
}
</script>
