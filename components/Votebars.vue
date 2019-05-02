<template>
        <div class="row w-100 mt-2" v-if="this.proptype=='user'">
          <div v-for="vote in this.votes" :key="vote.userkey" :class="vote.class" :style="vote.style"></div>
        </div>
        <div class="row mt-2" v-else-if="this.proptype=='project'">
          <div v-for="vote in this.votes" :key="vote.projectcc" :class="vote.class" :style="vote.style" @click="voteswitch(vote.projectcc)"><div class="showme mini">{{vote.vlong}} : {{ vote.v }}</div></div>
        </div>
        <div class="row mt-2" v-else>
            <div v-for="vote in this.votes" :key="vote.commentcc" :class="vote.class" :style="vote.style" @click="voteswitch(vote.commentcc)"><div class="showme minimini">{{vote.vlong}} : {{ vote.v }}</div></div>
        </div>
</template>

<script>
//cc stands for cooperation condition
export default {
  props: {
    votesprop: {required: true},
    proptype: {required: true},
  },
  computed: {
    votes(){
      let votesif = []; for (let i=0;i<7;i++){

        // choosing the style to apply if the user - or someone else - has voted this project specific vote color:
        var votestyle; var uservoted
        this.$store.state.mypvotes ? uservoted = this.$store.state.mypvotes.findIndex(
          x => x.project == this.votesprop.id && x.vote == this.$store.state.shortconditions[i])
          : uservoted = 0
        uservoted != -1 ? votestyle = 'var(--'+this.$store.state.conditions[i]+')'
          : this.votesprop[this.$store.state.shortconditions[i]] != 0 ? 
            votestyle = 'var(--mild'+this.$store.state.conditions[i]+')' 
            : votestyle = 'var(--dark'+this.$store.state.conditions[i]+')'

        // applying the right style to votes:
        votesif.push({ // for all votes:
          v:  this.votesprop[this.$store.state.shortconditions[i]], 
          vlong: this.$store.state.conditions[i],
          style: 'background-color: '+votestyle,
        })} // now we already have a 7 elements array so we just add json keys as needed:
      if (this.proptype == 'user') { for (let i=0;i<7;i++){
        votesif[i].class = 'uservote b'+this.$store.state.conditions[i]+' '+this.$store.state.conditions[i],
        votesif[i].style = 'width: '+this.$auth.user[this.$store.state.shortconditions[i]]/28*100 +'%',
        votesif[i].userkey = this.$store.state.shortconditions[i]
      }}
      if (this.proptype == 'project') { for (let i=0;i<7;i++){
        votesif[i].class = 'vote col b'+this.$store.state.conditions[i]+' '+this.$store.state.conditions[i],
        votesif[i].projectcc = this.$store.state.shortconditions[i]
      }}
      if (this.proptype == 'comment') { for (let i=0;i<7;i++){
        votesif[i].class = 'vote col b'+this.$store.state.conditions[i]+' '+this.$store.state.conditions[i],
        votesif[i].commentcc = this.$store.state.shortconditions[i]
      }}
      return votesif
    }
  },
  methods: {
    voteswitch(cc){
      var uservoted; // sends id, votetype, user and 1/-1 to the project vuex so to update things CLIENT-SIDE
      this.$store.state.mypvotes.findIndex(x => x.project == this.votesprop.id && x.vote == cc) == -1 ? 
        uservoted = 1 : uservoted = -1
      this.$store.commit('votedProject', {id: this.votesprop.id, cc: cc, user: this.$auth.user.id, add: uservoted})

      // prepares and sends async REST call SERVER-SIDE
      var request = {requestBody:{vote: cc, user: this.$auth.user.id, valid: 1}}
      // checks if we are in a single project page:
      if (this.$route.params.id){request.id = this.$route.params.id}
      // checks if the vote comes from a project or a comment:
      if (this.proptype=='project') {request.requestBody.project = this.votesprop.id}
      if (this.proptype=='comment') {request.requestBody.comment = this.votesprop.id}

      this.$store.dispatch('addVoteAction', { body: request.requestBody, id: request.id})
      .catch(err=>{console.log(err)})
    }
  }
}

/* If user voted color goes to 100%, if user didn't but someone else did opacity goes to 50%, if nobody did it opacity goes to 10%
  opacity["div"+i] = xx[i];*/ 
</script>
