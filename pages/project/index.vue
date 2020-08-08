<template>
  <b-form @submit.prevent="projectgo()" class="mt-3 was-validated">
    <b-form-select v-model="projectID" required>
      <option
        v-for="project in $store.state.project"
        :key="project.id"
        :value="project.id"
        v-html="
          project.id +
          ' ' +
          project.name +
          ' ' +
          project.parent +
          ' ' +
          project.category +
          ' ' +
          project.country +
          ' ' +
          project.place
        "
      ></option>
    </b-form-select>
    <b-button
      type="submit"
      class="btn bhequivalence btn-block mt-3 mb-3 gray border-0"
    >
      <p class="m-0 btransparent" v-if="!editing">
        {{ $t('cootool.go') }}
      </p>
      <b-spinner small v-if="editing" class="m-1 btransparent"></b-spinner>
      <p class="m-0 btransparent" v-if="editing">
        {{ $t('cootool.loading') }}
      </p>
    </b-button>
  </b-form>
</template>
<script>
export default {
  head() {
    return {
      title: 'Cooperacy - Projects'
    }
  },
  data() {
    return {
      projectID: null,
      editing: false
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getProjectAction')
  },
  methods: {
    projectgo() {
      this.editing = true,
        this.$router.push({ path: '/project/' + this.projectID })
    }
  }
}
</script>