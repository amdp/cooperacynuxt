<template>
  <b-container>
    <b-modal :id="pmodal" hide-footer title="Are you sure?" hide-header-close>
      <p class="my-4">
        Warning! This is a downvote to declare hidden information, corruption,
        cheating or spamming. After 90 days of discussion, if nothing happens
        the idea may be split or removed and in case part of the budget is
        turned back to the money pool. Transparency voters are never anonymous.
        <br /><br />
        Are you sure you want to report a transparency infringement for the
        cooperation "{{ cooperationprop.title }}"?
      </p>
      <b-form @submit.prevent="voteswitchmodal('I')">
        <b-form-group
          label-for="imessage"
          description="Insert a message about what you think it's not transparent"
        >
          <b-form-input
            id="imessage"
            v-model="formImessage"
            required
          ></b-form-input>
        </b-form-group>
        <br />
        <b-button type="submit" size="sm" class="bunderstanding">
          APPLY VOTE AND SEND INFORMATION
        </b-button>
        <b-button size="sm" class="btransparency" @click="close()">
          CLOSE
        </b-button>
      </b-form>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  props: {
    cooperationprop: { required: true }
  },
  data() {
    return {
      formImessage: '',
      pmodal: 'votebarmodal' + this.cooperationprop.id,
    }
  },
  methods: {
    close() {
      console.log(this.$parent)
      return this.$root.$emit('bv::hide::modal', 'votebarmodal' + this.cooperationprop.id, '#btnShow')
    },
    voteswitchmodal(cc) {
      let payload = {
        formName: this.$auth.user.name + ' ' + this.$auth.user.surname,
        formEmail: this.$auth.user.email,
        formSubject: 'Transparency Infringement Notification from Cooperation #' + this.cooperationprop.id + ' ' + this.cooperationprop.title,
        formBody: 'In the Cooperation #' + this.cooperationprop.id + ' ' + this.cooperationprop.title + ' comember ' + this.$auth.user.name + ' ' + this.$auth.user.surname + ' has described this Transparency Infringement: "' + this.formTmessage + '".'
      }
      this.$store.dispatch('contactEmail', payload)

      // CLIENT SIDE: sets the vote on frontend
      this.$store.commit('setVoteUpdate', {
        id: this.cooperationprop.id,
        cc: cc,
        user: this.$auth.user.id,
        add: 1,
        proptype: 'cooperation'
      })

      // SERVER-SIDE: prepares and sends async REST call (either comment or cooperation)
      let request = {
        id: this.cooperationprop.id,
        condition: cc,
        user: this.$auth.user.id,
        proptype: 'cooperation',
        category: this.cooperationprop.category,
        mode: this.cooperationprop.mode
      }
      this.$store.dispatch('addVote', request).catch(err => {
        console.error(err)
      })
      this.$root.$emit('bv::hide::modal', 'votebarmodal' + this.cooperationprop.id, '#btnShow')
    }
  }
}
</script>
