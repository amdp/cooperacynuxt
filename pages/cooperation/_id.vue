<template>
  <b-container>
    <cooperationlist />
    <!-- COMMENTS -->
    <div class="comments-container w-100 mt-5">
      <h3 class="font-weight-normal text-center">COMMENTS AND QUESTIONS</h3>
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
    await store.dispatch('getCooperation', {
      cooperationid: params.id,
      userid: store.state.auth.user.id
    })
    await store.dispatch('getFundingvar')
    await store.dispatch('getPlace')
    await store.dispatch('getCountry')
    await store.dispatch('getTag', { cooperation: params.id })
    await store.dispatch('getProfessional', { cooperation: params.id })
    await store.dispatch('getUservote', { //cooperation
      userid: store.state.auth.user.id,
      proptype: 'cooperation'
    })
    await store.dispatch('getComment', {
      cooperationid: params.id,
      userid: store.state.auth.user.id,
      limit: ' LIMIT 1'
    })
    await store.dispatch('getUservote', { // comments
      userid: store.state.auth.user.id,
      proptype: 'comment',
      cooperationid: params.id,
      limit: ' LIMIT 1'
    })
    await store.dispatch('getUserlist', '')
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
