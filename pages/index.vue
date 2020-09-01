<template>
  <div class="m-0 p-0">
    <home />
    <projectlist />
    <entermodal />
  </div>
</template>

<script>
export default {
  async fetch({ store, params }) {
    await store.dispatch('getProjectAction', { limit: 7 })
    await store.dispatch('getPlaceAction')
    await store.dispatch('getCountryAction')
    await store.dispatch('getFundingvar')
    await store.dispatch('getUserlistAction', '')
    if (store.state.auth.loggedIn) {
      await store.dispatch('getUservoteAction', {
        userid: store.state.auth.user.id,
        proptype: 'project',
      })
    } else
      await store.dispatch('getUservoteAction', {
        reset: true,
      })
  },
}
</script>
