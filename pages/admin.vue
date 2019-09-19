<template>
  <div>
    <b-button @click="resetcpvoting"
      >RE-SETUP COMMENT AND PROJECT VOTING</b-button
    >
    <b-button @click="resetuvoting">RE-SETUP USER COLORBARS</b-button>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  methods: {
    resetcpvoting() {
      this.$store.dispatch('resetcpVotingAction')
    },
    resetuvoting() {
      this.$store.dispatch('resetuVotingAction')
    }
  }
}
</script>
