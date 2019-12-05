<template>
  <b-container>
    <projectlist />
    <!-- COMMENTS -->
    <div class="comments-container w-100 mt-5">
      <h3 class="font-weight-normal text-center">COMMENTS AND QUESTIONS</h3>
      <comment />
    </div>
  </b-container>
</template>

<script>
import projectlist from '@/components/projectlist'
import votebar from '@/components/votebar'
import votemodal from '@/components/votemodal'
import comment from '@/components/comment'

export default {
  middleware: ['auth'],
  components: {
    votebar: votebar,
    comment: comment,
    votemodal: votemodal,
    projectlist: projectlist
  },
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  head() {
    return {
      title:
        'Cooperacy - Project: ' +
        this.$store.state.project.filter(
          project => project.id == this.$route.params.id
        )[0].name
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getProjectAction', {
      projectid: params.id,
      userid: store.state.auth.user.id
    })
    await store.dispatch('getPlaceAction')
    await store.dispatch('getCountryAction')
    await store.dispatch('getTagAction', { projectid: params.id })
    await store.dispatch('getUservoteAction', {
      userid: store.state.auth.user.id,
      proptype: 'project'
    })
    await store.dispatch('getCommentAction', {
      projectid: params.id,
      userid: store.state.auth.user.id,
      limit: ' LIMIT 1'
    })
    await store.dispatch('getUservoteAction', {
      userid: store.state.auth.user.id,
      proptype: 'comment',
      projectid: params.id,
      limit: ' LIMIT 1'
    })
    console.log(' ' + JSON.stringify('ho'))
    await store.dispatch('getUserlistAction', '')
  }
}
</script>
