<template>
  <div>
    <b-button @click="resetcpvoting">RE-SETUP COMMENT AND PROJECT VOTING</b-button>
    <b-button @click="resetvoting">RE-SETUP USER COLORBARS</b-button>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  methods: {
    resetvoting(){this.$store.dispatch('resetVotingAction')
    .then(res=>{alert('did it: ' + res)})},
    resetcpvoting(){this.$store.dispatch('resetcpVotingAction')
    .then(res=>{alert('did it: ' + res)})}
    
  }
}
</script>