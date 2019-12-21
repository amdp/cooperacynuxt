<template>
  <b-container>
    <b-modal
      id="professionalmodal"
      title="Add/remvoe a professional from the hudget"
      hide-header-close
    >
      <b-form @submit.prevent="professional()">
        <b-form-group
          label-for="professionalInput"
          description="Add or remove a professional to your project"
        >
          <span>{{ projectprop.name }}</span>
          <b-form-select id="professionalInput" v-model="formProfessional">
            <option
              v-for="user in userlistprop.filter(user => user.active == 1)"
              :key="user.id"
              :value="user.id"
            >
              {{ user.name }} {{ user.surname }}
            </option>
          </b-form-select>
        </b-form-group>
        <p class="understanding">
          The following are already in the project and will be removed if
          selected:
        </p>
        <span
          v-for="professional in this.$store.state.professional"
          :key="professional.id"
          class="freedom"
        >
          {{ professional.name }} {{ professional.surname }}<br />
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
  data() {
    return {
      formProfessional: ''
    }
  },
  props: {
    projectprop: { required: true },
    userlistprop: { required: true }
  },
  methods: {
    async professional() {
      this.$store.dispatch('professionalAction', {
        project: this.projectprop.id,
        user: this.formProfessional
      })
      this.$store.dispatch('getProfessionalAction', {
        project: this.projectprop.id
      })
    },
    close() {
      location.href = process.env.URLHOME + '/project/' + this.projectprop.id
    }
  }
}
</script>
