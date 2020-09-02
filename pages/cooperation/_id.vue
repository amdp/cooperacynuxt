<template>
  <b-container>
    <cooperationlist />
    <!-- COMMENTS -->
    <div class="comments-container w-100 mt-5">
      <h3 class="font-weight-normal text-center">
        COMMENTS AND QUESTIONS
      </h3>
      <comment />
    </div>
  </b-container>
</template>

<script>
export default {
  middleware: ['auth'],
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  async fetch({ store, params }) {
    await store.dispatch('getCooperationAction', {
      cooperationid: params.id,
      userid: store.state.auth.user.id
    })
    await store.dispatch('getFundingvar')
    await store.dispatch('getPlaceAction')
    await store.dispatch('getCountryAction')
    await store.dispatch('getTagAction', { cooperation: params.id })
    await store.dispatch('getProfessionalAction', { cooperation: params.id })
    await store.dispatch('getUservoteAction', { //cooperation
      userid: store.state.auth.user.id,
      proptype: 'cooperation'
    })
    await store.dispatch('getCommentAction', {
      cooperationid: params.id,
      userid: store.state.auth.user.id,
      limit: ' LIMIT 1'
    })
    await store.dispatch('getUservoteAction', { // comments
      userid: store.state.auth.user.id,
      proptype: 'comment',
      cooperationid: params.id,
      limit: ' LIMIT 1'
    })
    await store.dispatch('getUserlistAction', '')
  },
  head() {
    return {
      title:
        'Cooperacy - Cooperation: ' +
        this.$store.state.cooperation.filter(
          cooperation => cooperation.id == this.$route.params.id
        )[0].name
    }
  }
}
</script>
