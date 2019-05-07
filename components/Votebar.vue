<template>
        <div class="row w-100 mt-2" v-if="this.proptype=='user'">
          <div v-for="vote in this.vote" :key="vote.userkey" :class="vote.class" :style="vote.style"></div>
        </div>
        <div class="row mt-2" v-else-if="this.proptype=='project'">
          <div v-for="vote in this.vote" :key="vote.projectcc" :class="vote.class" :style="vote.style" @click="voteswitch(vote.projectcc)"><div class="showme mini">{{vote.vlong}} : {{ vote.v }}</div></div>
        </div>
        <div class="row mt-2" v-else-if="this.proptype=='comment'">
            <div v-for="vote in this.vote" :key="vote.commentcc" :class="vote.class" :style="vote.style" @click="voteswitch(vote.commentcc)"><div class="showme minimini">{{vote.vlong}} : {{ vote.v }}</div></div>
        </div>
</template>

<script>
//cc stands for cooperation condition
export default {
  props: {
    voteprop: {required: true},
    proptype: {required: true},
  },
  computed: {
    vote(){
      let voteif = []; for (let i=0;i<7;i++){

        // choosing the style to apply if the user voted this project/comment specific vote color:
        var votetyle; var uservoted
        this.$store.state[this.proptype + 'uservote'] ? uservoted = this.$store.state[this.proptype + 'uservote'].findIndex(
          x => x[this.proptype] == this.voteprop.id && x.condition == this.$store.state.shortcondition[i])
          : uservoted = 0
        uservoted != -1 ? votetyle = 'var(--'+this.$store.state.condition[i]+')'
          : this.voteprop[this.$store.state.shortcondition[i]] != 0 ? 
            votetyle = 'var(--mild'+this.$store.state.condition[i]+')' 
            : votetyle = 'var(--dark'+this.$store.state.condition[i]+')'

        // applying the right style to vote:
        voteif.push({ // for all vote:
          v:  this.voteprop[this.$store.state.shortcondition[i]], 
          vlong: this.$store.state.condition[i],
          style: 'background-color: '+votetyle,
        })} // now we already have a 7 elements array so we just add json keys as needed:
      if (this.proptype == 'user') { for (let i=0;i<7;i++){
        voteif[i].class = 'uservote b'+this.$store.state.condition[i]+' '+this.$store.state.condition[i],
        voteif[i].style = 'width: '+this.$auth.user[this.$store.state.shortcondition[i]]/28*100 +'%',
        voteif[i].userkey = this.$store.state.shortcondition[i]
      }}
      if (this.proptype == 'project') { for (let i=0;i<7;i++){
        voteif[i].class = 'vote col b'+this.$store.state.condition[i]+' '+this.$store.state.condition[i],
        voteif[i].projectcc = this.$store.state.shortcondition[i]
      }}
      if (this.proptype == 'comment') { for (let i=0;i<7;i++){
        voteif[i].class = 'vote col b'+this.$store.state.condition[i]+' '+this.$store.state.condition[i],
        voteif[i].commentcc = this.$store.state.shortcondition[i]
      }}
      return voteif
    }
  },
  methods: {
    voteswitch(cc){ // CLIENT-SIDE: sends id, votetype, user and adds 1/-1 to the vuex store variable 
      var add;  this.$store.state[this.proptype+'uservote'].findIndex( // checks if the vote exists, adds accordingly
        x => x[this.proptype] == this.voteprop.id && x.condition == cc) == -1 ? add = 1 : add = -1
      this.$store.commit('voteUpdate', {id: this.voteprop.id, cc: cc, user: this.$auth.user.id, add: add, proptype: this.proptype})

      // SERVER-SIDE: prepares and sends async REST call (either comment or project)
      var request = {id: this.voteprop.id, condition: cc, user: this.$auth.user.id, proptype: this.proptype}
      if (this.proptype == 'comment'){request.projectid = this.$route.params.id}
      this.$store.dispatch('addVoteAction', request)
      .catch(err=>{console.log(err)})
    }
  }
}

</script>
