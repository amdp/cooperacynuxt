<template>
  <div>
        <div class="row mt-2" v-if="this.proptype=='user'">
            <b-table><tr><td v-for="vote in this.votes" :key="vote.userkey" :class="vote.class" :colspan="vote.cols">{{vote.v}}</td></tr>
            <tr> <!--28 cells-columns to make the votes as long as many columns they span-->
              <td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td>
              <td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td>
              <td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td>
              <td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td>
              <td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td>
              <td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td>
              <td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td>
            </tr></b-table>
          <!--   <div v-for="vote in this.votes" :key="vote.userkey" :class="vote.class" :style="vote.style"></div> -->
        </div>
        <div class="row mt-2" v-else-if="this.proptype=='project'">
          <div v-for="vote in this.votes" :key="vote.projectkey" :class="vote.class" @click="voteswitch(vote.projectkey)">{{ vote.v }}</div>
        </div>
        <div class="row mt-2" v-else>
            <div v-for="vote in this.votes" :key="vote.commentkey" :class="vote.class" @click="voteswitch(vote.commentkey)">{{ vote.v }}</div>
        </div>
  </div>
</template>

<script>
export default {
  props: {
    votesprop: {required: true},
    proptype: {required: true}
  },
  computed: {
    opacity(){
      var opacities = {}
      for (let i=0;i<7;i++){
        opacities[this.$store.state.conditionsvx.shortconditions[i]] = this.$auth.user[this.$store.state.conditionsvx.shortconditions[i]]/5
      }
      return opacities
    },
    votes(){
      let votesif = []; for (let i=0;i<7;i++){
        votesif.push({ // for all votes:
          class: 'vote col b'+this.$store.state.conditionsvx.conditions[i]+' '+this.$store.state.conditionsvx.conditions[i],
          v:  this.votesprop[this.$store.state.conditionsvx.shortconditions[i]],
        })} // now we already have a 7 elements array so we just add json keys as needed:
      if (this.proptype == 'user') { for (let i=0;i<7;i++){ 
       votesif[i].userkey = this.$store.state.conditionsvx.shortconditions[i],
       votesif[i].style = 'opacity:' + this.opacity[this.$store.state.conditionsvx.shortconditions[i]],
       votesif[i].cols = this.$auth.user[this.$store.state.conditionsvx.shortconditions[i]] 
      }}
      if (this.proptype == 'project') { for (let i=0;i<7;i++){
        votesif[i].projectkey = this.$store.state.conditionsvx.shortconditions[i]
      }}
      if (this.proptype == 'comment') { for (let i=0;i<7;i++){
        votesif[i].commentkey = this.$store.state.conditionsvx.shortconditions[i]
      }}
      return votesif
    }
  },
  methods: {
    voteswitch(voteclick){
      voteclick = {requestBody:{vote: voteclick, user: this.$auth.user.id, valid: 1}}
      if (this.$route.params.id){voteclick.id = this.$route.params.id}
      if (this.proptype=='project') {voteclick.requestBody.project = this.votesprop.id}
      if (this.proptype=='comment') {voteclick.requestBody.comment = this.votesprop.id}
      this.$store.dispatch('votesvx/addVoteAction', { body: voteclick.requestBody, id: voteclick.id})
      .catch(err=>{console.log(err)})
    }
  }
}

/* If user voted color goes to 100%, if user didn't but someone else did opacity goes to 50%, if nobody did it opacity goes to 10%
  opacity["div"+i] = xx[i];*/ 
</script>
