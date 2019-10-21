<template>
  <b-container fluid class="mb-5">
    <div v-if="this.$auth.user.role == 0">
      <h2 class="col-12 text-center mb-3">MEMBERS LIST</h2>
      <div class="mb-3" v-for="member in memberlist" :key="member.id">
        <img :src="userImage(member.id)" width="50px" />
        {{ member.id }} {{ member.name }} {{ member.surname }} {{ member.E }}
        {{ member.T }} {{ member.C }} {{ member.I }} {{ member.F }}
        {{ member.U }} {{ member.D }}
      </div>
    </div>
    <div v-if="this.$auth.user.role == 1">
      <h2 class="col-12 text-center mb-3">MEMBERS LIST (ADMIN LIST)</h2>
      <div class="mb-3" v-for="member in memberlist" :key="member.id">
        <img :src="userImage(member.id)" width="50px" />
        {{ member.id }} {{ member.name }} {{ member.surname }} {{ member.E }}
        {{ member.T }} {{ member.C }} {{ member.I }} {{ member.F }}
        {{ member.U }} {{ member.D }} {{ member.email }} {{ member.role }}
        {{ member.remember_token }} {{ member.paymentdeadline }}
        {{ member.paypalagreementid }} {{ member.created }}
        {{ member.updated }}
      </div>
      <h2 class="col-12 text-center mb-3">INACTIVE USERS (ADMIN LIST)</h2>
      <div class="mb-3" v-for="olduser in olduserlist" :key="olduser.id">
        <img :src="userImage(olduser.id)" width="50px" />
        {{ olduser.id }} {{ olduser.name }} {{ olduser.surname }}
        {{ olduser.E }} {{ olduser.T }} {{ olduser.C }} {{ olduser.I }}
        {{ olduser.F }} {{ olduser.U }} {{ olduser.D }} {{ olduser.email }}
        {{ olduser.role }} {{ olduser.reolduser_token }}
        {{ olduser.paymentdeadline }} {{ olduser.paypalagreementid }}
        {{ olduser.created }} {{ olduser.updated }}
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  middleware: ['auth'],
  async fetch({ store, params }) {
    await store.dispatch('getUserlistAction', '')
  },
  computed: {
    memberlist() {
      return this.$store.state.userlist.filter(userlist => userlist.active == 1)
    },
    olduserlist() {
      return this.$store.state.userlist.filter(userlist => userlist.active == 0)
    }
  },
  methods: {
    userImage(id) {
      try {
        return require('../assets/image/user/' + id + '.png')
      } catch (e) {
        return require('../assets/image/user/0.png')
      }
    }
  }
}
</script>
