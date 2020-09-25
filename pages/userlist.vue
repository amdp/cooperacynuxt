<template>
  <b-container fluid class="mb-5">
    <div v-if="this.$auth.user.role == 0">
      <h2 class="col-12 text-center mb-3">COMEMBERS LIST</h2>
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
            <b-tr v-for="user in userlist" :key="user.id">
              <b-td>
                <img
                  :src="'/assets/image/user/' + user.id + '.png'"
                  width="50px"
                />
              </b-td>
              <b-td>{{ user.id }}</b-td>
              <b-td>{{ user.name }}</b-td>
              <b-td>{{ user.surname }}</b-td>
              <b-td>{{ user.E }}</b-td>
              <b-td>{{ user.T }}</b-td>
              <b-td>{{ user.C }}</b-td>
              <b-td>{{ user.I }}</b-td>
              <b-td>{{ user.F }}</b-td>
              <b-td>{{ user.U }}</b-td>
              <b-td>{{ user.D }}</b-td>
            </b-tr>
          </b-tbody></b-table-simple
        >
      </div>
    </div>
    <div v-if="this.$auth.user.role == 1">
      <h2 class="col-12 text-center mb-3">COMEMBERS LIST (ADMIN LIST)</h2>
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
            <b-tr v-for="user in userlist" :key="user.id">
              <b-td><img :src="userImage(user.id)" width="50px" /></b-td>
              <b-td>{{ user.id }}</b-td>
              <b-td>{{ user.name }}</b-td>
              <b-td>{{ user.surname }}</b-td>
              <b-td>{{ user.E }}</b-td>
              <b-td>{{ user.T }}</b-td>
              <b-td>{{ user.C }}</b-td>
              <b-td>{{ user.I }}</b-td>
              <b-td>{{ user.F }}</b-td>
              <b-td>{{ user.U }}</b-td>
              <b-td>{{ user.D }}</b-td>
              <b-td>{{ user.email }}</b-td>
              <b-td>{{ user.role }}</b-td>
              <b-td>{{ user.paymentdeadline }}</b-td>
              <b-td>{{ user.paypalagreementid }}</b-td>
              <b-td>{{ user.created }}</b-td>
              <b-td>{{ user.updated }}</b-td>
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
  head() {
    return {
      title: 'Cooperacy - Users List'
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getUserlist', '')
  },
  computed: {
    userlist() {
      return this.$store.state.userlist.filter(userlist => userlist.active == 1)
    },
    olduserlist() {
      return this.$store.state.userlist.filter(userlist => userlist.active == 0)
    }
  }
}
</script>
