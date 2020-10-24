<template>
  <div class="m-0 p-0">
    <home />
    <cooperationlist />
    <entermodal />
  </div>
</template>

<script>
export default {
  async fetch({ store, params }) {
    await store.dispatch('getPlace')
    await store.dispatch('getCountry')
    await store.dispatch('getFundingvar')
    await store.dispatch('getUserlist', '')
    if (store.state.auth.loggedIn) {
      await store.dispatch('getUservote', {
        userid: store.state.auth.user.id,
        proptype: 'cooperation',
      })
    } else
      await store.dispatch('getUservote', {
        reset: true,
      })
  },
  created() {
    this.$store.dispatch('getCooperation', { limit: 21 })
  }
}
</script>
