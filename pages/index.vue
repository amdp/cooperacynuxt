<template>
  <div class="m-0 p-0">
    <home />
    <projectlist />
    <entermodal />
  </div>
</template>

<script>
import home from '@/components/home'
import projectlist from '@/components/projectlist'
import entermodal from '@/components/entermodal'

export default {
  components: { home: home, projectlist: projectlist, entermodal: entermodal },
  async fetch({ store, params }) {
    await store.dispatch('getProjectAction', '')
    await store.dispatch('getPlaceAction')
    await store.dispatch('getCountryAction')
    if (store.state.auth.user) {
      store.dispatch('getUserProjectAction', {
        userid: store.state.auth.user.id
      })
      store.dispatch('getUservoteAction', {
        userid: store.state.auth.user.id
      })
    }
  }
}
</script>
