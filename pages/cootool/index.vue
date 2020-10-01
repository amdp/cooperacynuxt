<template>
  <b-container class="t16 justify">
    <b-row>
      <b-col cols="1" md="2"></b-col>
      <b-col cols="10" md="8">
        <p class="text-center t32 hb equivalence">COOPERATION TOOL</p>
        <p>
          <span v-html="$t('cootool.intro1')"></span>
          <nuxt-link to="/cootool/form" class="ae">
            Cooperation Tool Form
          </nuxt-link>
          <span v-html="$t('cootool.intro2')"></span>
        </p>

        <b-form @submit.prevent="surveygo()" class="mt-4 was-validated">
          <p class="m-0 p-0 text-center t16 hb equivalence">SEARCH TOOL</p>
          <p class="mb-1" v-html="$t('cootool.choice')"></p>
          <b-form-select v-model="choice" required>
            <option value="0" v-html="$t('cootool.choicesurvey')"></option>
            <option value="1" v-html="$t('cootool.choicecooperation')"></option>
          </b-form-select>
          <b-form-select v-model="surveyID" v-if="choice == 0">
            <option
              v-for="survey in $store.state.survey"
              :key="survey.id"
              :value="survey.surveyid"
              v-html="
                survey.name +
                ' ' +
                survey.surveyid +
                ' ' +
                survey.group +
                ' ' +
                survey.country +
                ' ' +
                survey.place +
                ' ' +
                survey.participant
              "
            ></option>
          </b-form-select>
          <b-form-select v-model="cooperationID" required v-if="choice == 1">
            <option
              v-for="cooperation in $store.state.cooperation"
              :key="cooperation.id"
              :value="cooperation.coosurveyid"
              v-html="
                cooperation.id +
                ' ' +
                cooperation.name +
                ' ' +
                cooperation.parent +
                ' ' +
                cooperation.category +
                ' ' +
                cooperation.country +
                ' ' +
                cooperation.place
              "
            ></option>
          </b-form-select>
          <b-button
            type="submit"
            class="btn bhequivalence btn-block mt-3 mb-5 gray border-0"
          >
            <p class="m-0 btransparent" v-if="!editing">
              {{ $t('cootool.go') }}
            </p>
            <b-spinner
              small
              v-if="editing"
              class="m-1 btransparent"
            ></b-spinner>
            <p class="m-0 btransparent" v-if="editing">
              {{ $t('cootool.loading') }}
            </p>
          </b-button>
        </b-form>
      </b-col>
      <b-col cols="1" md="2"></b-col>
    </b-row>
  </b-container>
</template>



<script>
export default {
  head() {
    return {
      title: 'Cooperacy - Cooperation Tool Surveys'
    }
  },
  data() {
    return {
      choice: null,
      cooperationID: null,
      surveyID: null,
      editing: false
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getCooperation', { cooperationtool: true })
    await store.dispatch('getSurvey')
  },
  methods: {
    surveygo() {
      this.editing = false
      let id = this.surveyID ? this.surveyID : this.cooperationID
      this.$router.push({ path: '/cootool/' + id })
    }
  }
}
</script>