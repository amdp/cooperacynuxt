<template>
  <b-container fluid class="mb-5">
    <div v-if="this.$auth.user.role == 0">
      <h2 class="col-12 text-center mb-3">MEMBERS LIST</h2>
      <div class="mb-3">
        <b-table-simple hover small responsive>
          <b-thead>
            <b-th>IMG</b-th>
            <b-th>ID</b-th>
            <b-th>NAME</b-th>
            <b-th>SURNAME</b-th>
            <b-th>E</b-th>
            <b-th>C</b-th>
            <b-th>T</b-th>
            <b-th>I</b-th>
            <b-th>F</b-th>
            <b-th>U</b-th>
            <b-th>D</b-th>
          </b-thead>
          <b-tbody>
            <b-tr v-for="member in memberlist" :key="member.id">
              <b-td>
                <img :src="userImage(member.id)" width="50px" />
              </b-td>
              <b-td>{{ member.id }}</b-td>
              <b-td>{{ member.name }}</b-td>
              <b-td>{{ member.surname }}</b-td>
              <b-td>{{ member.E }}</b-td>
              <b-td>{{ member.T }}</b-td>
              <b-td>{{ member.C }}</b-td>
              <b-td>{{ member.I }}</b-td>
              <b-td>{{ member.F }}</b-td>
              <b-td>{{ member.U }}</b-td>
              <b-td>{{ member.D }}</b-td>
            </b-tr>
          </b-tbody></b-table-simple
        >
      </div>
    </div>
    <div v-if="this.$auth.user.role == 1">
      <h2 class="col-12 text-center mb-3">MEMBERS LIST (ADMIN LIST)</h2>
      <div class="mb-3">
        <b-table-simple hover small responsive>
          <b-thead>
            <b-th>IMG</b-th>
            <b-th>ID</b-th>
            <b-th>NAME</b-th>
            <b-th>SURNAME</b-th>
            <b-th>E</b-th>
            <b-th>C</b-th>
            <b-th>T</b-th>
            <b-th>I</b-th>
            <b-th>F</b-th>
            <b-th>U</b-th>
            <b-th>D</b-th>
            <b-th>EMAIL</b-th>
            <b-th>ROLE</b-th>
            <b-th>DEADLINE</b-th>
            <b-th>PAYPAL</b-th>
            <b-th>CREATED</b-th>
            <b-th>UPDATED</b-th>
          </b-thead>
          <b-tbody>
            <b-tr v-for="member in memberlist" :key="member.id">
              <b-td><img :src="userImage(member.id)" width="50px"/></b-td>
              <b-td>{{ member.id }}</b-td>
              <b-td>{{ member.name }}</b-td>
              <b-td>{{ member.surname }}</b-td>
              <b-td>{{ member.E }}</b-td>
              <b-td>{{ member.T }}</b-td>
              <b-td>{{ member.C }}</b-td>
              <b-td>{{ member.I }}</b-td>
              <b-td>{{ member.F }}</b-td>
              <b-td>{{ member.U }}</b-td>
              <b-td>{{ member.D }}</b-td>
              <b-td>{{ member.email }}</b-td>
              <b-td>{{ member.role }}</b-td>
              <b-td>{{ member.paymentdeadline }}</b-td>
              <b-td>{{ member.paypalagreementid }}</b-td>
              <b-td>{{ member.created }}</b-td>
              <b-td>{{ member.updated }}</b-td>
            </b-tr>
          </b-tbody></b-table-simple
        >
      </div>
      <h2 class="col-12 text-center mb-3">INACTIVE USERS (ADMIN LIST)</h2>
      <div class="mb-3">
        <b-table-simple hover small responsive>
          <b-thead>
            <b-th>IMG</b-th>
            <b-th>ID</b-th>
            <b-th>NAME</b-th>
            <b-th>SURNAME</b-th>
            <b-th>E</b-th>
            <b-th>C</b-th>
            <b-th>T</b-th>
            <b-th>I</b-th>
            <b-th>F</b-th>
            <b-th>U</b-th>
            <b-th>D</b-th>
            <b-th>EMAIL</b-th>
            <b-th>ROLE</b-th>
            <b-th>DEADLINE</b-th>
            <b-th>PAYPAL</b-th>
            <b-th>CREATED</b-th>
            <b-th>UPDATED</b-th>
          </b-thead>
          <b-tbody>
            <b-tr v-for="olduser in olduserlist" :key="olduser.id">
              <b-td>
                <img :src="userImage(olduser.id)" width="50px" />
              </b-td>
              <b-td>{{ olduser.id }}</b-td>
              <b-td>{{ olduser.name }}</b-td>
              <b-td>{{ olduser.surname }}</b-td>
              <b-td>{{ olduser.E }}</b-td>
              <b-td>{{ olduser.T }}</b-td>
              <b-td>{{ olduser.C }}</b-td>
              <b-td>{{ olduser.I }}</b-td>
              <b-td>{{ olduser.F }}</b-td>
              <b-td>{{ olduser.U }}</b-td>
              <b-td>{{ olduser.D }}</b-td>
              <b-td>{{ olduser.email }}</b-td>
              <b-td>{{ olduser.role }}</b-td>
              <b-td>{{ olduser.paymentdeadline }}</b-td>
              <b-td>{{ olduser.paypalagreementid }}</b-td>
              <b-td>{{ olduser.created }}</b-td>
              <b-td>{{ olduser.updated }}</b-td>
            </b-tr>
          </b-tbody></b-table-simple
        >
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
