<template>
  <b-container>
    <b-modal
      id="professionalmodal"
      title="Add/remove a professional from the hudget"
      hide-header-close
    >
      <b-form @submit.prevent="professional()">
        <b-form-group
          label-for="professionalInput"
          description="Add or remove a professional to your cooperation"
        >
          <span>{{ cooperationprop.name }}</span>
          <b-form-select id="professionalInput" v-model="formProfessional">
            <option
              v-for="user in userlistprop.filter((user) => user.active == 1)"
              :key="user.id"
              :value="user.id"
            >
              {{ user.name }} {{ user.surname }}
            </option>
          </b-form-select>
        </b-form-group>
        <p class="understanding">
          The following are already in the cooperation and will be removed if
          selected:
        </p>
        <span
          v-for="pro in this.$store.state.professional"
          :key="pro.id"
          class="freedom"
        >
          {{ pro.name }} {{ pro.surname }}<br />
        </span>
      </b-form>
      <template slot="modal-footer">
        <b-button size="sm" class="bcare" @click="professional()">
          ADD/REMOVE
        </b-button>
        <b-button size="sm" class="btransparency" @click="close()">
          CLOSE
        </b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  props: {
    cooperationprop: { required: true },
    userlistprop: { required: true }
  },
  data() {
    return {
      formProfessional: ''
    }
  },

  methods: {
    async professional() {
      this.$store.dispatch('professionalAction', {
        cooperation: this.cooperationprop.id,
        user: this.formProfessional
      })
      this.$store.dispatch('getProfessionalAction', {
        cooperation: this.cooperationprop.id
      })
    },
    close() {
      location.href = process.env.URLHOME + '/cooperation/' + this.cooperationprop.id
    }
  }
}
</script>
