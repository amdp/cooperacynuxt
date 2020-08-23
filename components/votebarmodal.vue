<template>
  <b-container>
    <b-modal :id="pmodal" hide-footer title="Are you sure?" hide-header-close>
      <p class="my-4">
        Warning! This is a downvote to declare hidden information, corruption,
        cheating or spamming. The project may go into a "pairing" state where
        the participants discuss. After 90 days of pairing, if nothing happens
        the idea may be split or removed and in case part of the budget is
        turned back to the money pool. Transparency voters are never anonymous.
        <br /><br />
        Are you sure you want to report a transparency infringement for the
        project "{{ projectprop.name }}"?
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
    projectprop: { required: true }
  },
  data() {
    return {
      formImessage: '',
      pmodal: 'votebarmodal' + this.projectprop.id,
    }
  },
  methods: {
    close() {
      console.log(this.$parent)
      return this.$root.$emit('bv::hide::modal', 'votebarmodal' + this.projectprop.id, '#btnShow')
    },
    voteswitchmodal(cc) {
      let payload = {
        formName: this.$auth.user.name + ' ' + this.$auth.user.surname,
        formEmail: this.$auth.user.email,
        formSubject: 'Transparency Infringement Notification from Project #' + this.projectprop.id + ' ' + this.projectprop.name,
        formBody: 'In Project #' + this.projectprop.id + ' ' + this.projectprop.name + ' comember ' + this.$auth.user.name + ' ' + this.$auth.user.surname + ' has described this Transparency Infringement: "' + this.formTmessage + '".'
      }
      this.$store.dispatch('contactEmailAction', payload)

      // CLIENT SIDE: sets the vote on frontend
      this.$store.commit('setVoteUpdate', {
        id: this.projectprop.id,
        cc: cc,
        user: this.$auth.user.id,
        add: 1,
        proptype: 'project'
      })

      // SERVER-SIDE: prepares and sends async REST call (either comment or project)
      let request = {
        id: this.projectprop.id,
        condition: cc,
        user: this.$auth.user.id,
        proptype: 'project',
        category: this.projectprop.category,
        stage: this.projectprop.stage
      }
      this.$store.dispatch('addVoteAction', request).catch(err => {
        console.error(err)
      })
      this.$root.$emit('bv::hide::modal', 'votebarmodal' + this.projectprop.id, '#btnShow')
    }
  }
}
</script>
