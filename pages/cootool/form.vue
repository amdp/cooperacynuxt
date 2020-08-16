<template>
  <b-container class="m-0 p-0m t16 justify">
    <b-row>
      <b-col cols="1" md="2"></b-col>
      <b-col cols="10" md="8">
        <p class="text-center t32 hb equivalence">COOPERATION TOOL FORM</p>
        <b-form @submit.prevent="cooperationForm()" class="mt-3 was-validated">
          <p v-html="$t('cootool.introform')"></p>
          <p
            class="text-center mb-4 t24 hb equivalence"
            v-html="$t('cootool.basic')"
          ></p>

          <!-- LANGUAGE -->
          <b-row class="m-0 p-0 mb-3 text-center">
            <b-col cols="12">
              <span v-html="$t('cootool.language')"></span>
              <nuxt-link class="au" to="#foot" v-html="$t('cootool.foot')">
              </nuxt-link>
            </b-col>
          </b-row>

          <!-- BASIC INFO FORM -->

          <p class="pt-3 m-1" v-html="$t('cootool.nature')"></p>
          <b-form-select v-model="formNature" required>
            <option value="0" v-html="$t('cootool.bgroup0')"></option>
            <option value="1" v-html="$t('cootool.bgroup1')"></option>
          </b-form-select>

          <p
            class="pt-3 m-1"
            v-html="$t('cootool.project')"
            v-if="formNature == 1"
          ></p>
          <!-- PROJECTS -->
          <b-form-select
            v-model="formPrevProjectID"
            v-if="formNature == 1"
            required
          >
            <option :value="nihil"></option>
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
          <!-- SURVEYS -->
          <p
            class="pt-3 m-1"
            v-html="$t('cootool.prevsurvey')"
            v-if="formNature == 0"
          ></p>
          <b-form-select v-model="formPrevSurveyID" v-if="formNature == 0">
            <option :value="nihil"></option>
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

          <p
            class="pt-3 m-1"
            v-html="$t('cootool.group')"
            v-if="formNature == 0 && !formPrevSurveyID"
          ></p>
          <b-form-select
            v-model="formGroup"
            v-if="formNature == 0 && !formPrevSurveyID"
            required
          >
            <option value="1" v-html="$t('cootool.group1')"></option>
            <option value="2" v-html="$t('cootool.group2')"></option>
            <option value="3" v-html="$t('cootool.group3')"></option>
            <option value="4" v-html="$t('cootool.group4')"></option>
            <option value="5" v-html="$t('cootool.group5')"></option>
            <option value="6" v-html="$t('cootool.group6')"></option>
            <option value="7" v-html="$t('cootool.group7')"></option>
          </b-form-select>

          <p
            class="pt-3 m-1"
            v-html="$t('cootool.country')"
            v-if="formNature == 0 && !formPrevSurveyID"
          ></p>
          <b-form-select
            v-model="formCountry"
            v-if="formNature == 0 && !formPrevSurveyID"
          >
            <option
              v-for="country in country"
              :key="country.id"
              :value="country.id"
              >{{ country.name }}</option
            >
          </b-form-select>

          <p
            class="pt-3 m-1"
            v-html="$t('cootool.place')"
            v-if="formNature == 0 && !formPrevSurveyID"
          ></p>
          <b-form-select
            v-model="formPlace"
            v-if="formNature == 0 && !formPrevSurveyID"
            required
          >
            <option
              v-for="place in selectPlace"
              :key="place.id"
              :value="place.id"
              >{{ place.name }}</option
            >
          </b-form-select>

          <p class="it diversity" v-if="formNature == 0 && !formPrevSurveyID">
            {{ $t('main.newplace') }}
            <a v-b-modal.placemodal class="ad finger b">
              {{ $t('main.one') }}
            </a>
          </p>

          <p class="pt-3 m-1" v-html="$t('cootool.month')"></p>
          <b-form-input v-model="formMonth" size="sm" required></b-form-input>

          <p
            class="pt-3 m-1"
            v-html="$t('cootool.participant')"
            v-if="formNature == 0 && !formPrevSurveyID"
          ></p>
          <b-form-input
            v-if="formNature == 0 && !formPrevSurveyID"
            v-model="formParticipant"
            size="sm"
            required
          ></b-form-input>

          <p
            class="pt-3 m-1"
            v-html="$t('cootool.name')"
            v-if="formNature == 0 && !formPrevSurveyID"
          ></p>
          <b-form-input
            v-if="formNature == 0 && !formPrevSurveyID"
            v-model="formName"
            size="sm"
            required
          ></b-form-input>

          <p
            class="pt-3 m-1"
            v-html="$t('cootool.desc')"
            v-if="formNature == 0 && !formPrevSurveyID"
          ></p>
          <b-form-textarea
            v-if="formNature == 0 && !formPrevSurveyID"
            v-model="formDesc"
            size="sm"
          ></b-form-textarea>

          <!-- /////// GROUP COOPERATION STATUS /////// -->
          <!-- /////// GROUP COOPERATION STATUS /////// -->
          <!-- /////// GROUP COOPERATION STATUS /////// -->

          <p class="text-center mt-5 equivalence t28 hb">
            {{ $t('cootool.groupcoostatus') }}
          </p>
          <p class="diversity it hb" v-if="formGroup == 7">
            {{ $t('cootool.groupcoointromyself') }}
          </p>

          <!-- /////////////// B DIVERSITY /////////////// -->
          <p
            class="hb text-center mt-3 t20 diversity"
            v-html="$t('cootool.D')"
          ></p>
          <p class="m-0" v-html="$t('cootool.MBD')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMBDiversity }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMBDiversity"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--diversity)' }"
          />
          <p class="m-0" v-html="$t('cootool.BD')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formBDiversity }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formBDiversity"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--diversity)' }"
          />

          <!-- /////////////// R DIVERSITY /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRD')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMRDiversity }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMRDiversity"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--diversity)' }"
          />
          <p class="m-0" v-html="$t('cootool.RD')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formRDiversity }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formRDiversity"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--diversity)' }"
          />

          <!-- /////////////// B UNDERSTANDING /////////////// -->
          <p
            class="hb text-center mt-3 t20 understanding"
            v-html="$t('cootool.U')"
          ></p>

          <p class="m-0" v-html="$t('cootool.MBU')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMBUnderstanding }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMBUnderstanding"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--understanding)' }"
          />
          <p class="m-0" v-html="$t('cootool.BU')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formBUnderstanding }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formBUnderstanding"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--understanding)' }"
          />

          <!-- /////////////// R UNDERSTANDING /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRU')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMRUnderstanding }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMRUnderstanding"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--understanding)' }"
          />
          <p class="m-0" v-html="$t('cootool.RU')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formRUnderstanding }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formRUnderstanding"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--understanding)' }"
          />

          <!-- /////////////// B FREEDOM /////////////// -->
          <p
            class="hb text-center mt-3 t20 freedom"
            v-html="$t('cootool.F')"
          ></p>

          <p class="m-0" v-html="$t('cootool.MBF')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMBFreedom }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMBFreedom"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--freedom)' }"
          />
          <p class="m-0" v-html="$t('cootool.BF')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formBFreedom }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formBFreedom"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--freedom)' }"
          />

          <!-- /////////////// R FREEDOM /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRF')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMRFreedom }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMRFreedom"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--freedom)' }"
          />
          <p class="m-0" v-html="$t('cootool.RF')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formRFreedom }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formRFreedom"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--freedom)' }"
          />

          <!-- /////////////// B TRANSPARENCY /////////////// -->
          <p
            class="hb text-center mt-3 t20 transparency"
            v-html="$t('cootool.I')"
          ></p>

          <p class="m-0" v-html="$t('cootool.MBI')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMBTransparency }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMBTransparency"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--transparency)' }"
          />
          <p class="m-0" v-html="$t('cootool.BI')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formBTransparency }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formBTransparency"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--transparency)' }"
          />

          <!-- /////////////// R TRANSPARENCY /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRI')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMRTransparency }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMRTransparency"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--transparency)' }"
          />
          <p class="m-0" v-html="$t('cootool.RI')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formRTransparency }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formRTransparency"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--transparency)' }"
          />

          <!-- /////////////// B CARE - HABITAT /////////////// -->
          <p class="hb text-center mt-3 t20 care" v-html="$t('cootool.C')"></p>

          <p class="m-0" v-html="$t('cootool.MBH')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMBHabitat }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMBHabitat"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--care)' }"
          />
          <p class="m-0" v-html="$t('cootool.BH')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formBHabitat }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formBHabitat"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--care)' }"
          />

          <!-- /////////////// R CARE - HABITAT /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRH')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMRHabitat }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMRHabitat"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--care)' }"
          />
          <p class="m-0" v-html="$t('cootool.RH')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formRHabitat }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formRHabitat"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--care)' }"
          />

          <!-- /////////////// B CARE /////////////// -->

          <p class="m-0" v-html="$t('cootool.MBC')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMBCare }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMBCare"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--care)' }"
          />
          <p class="m-0" v-html="$t('cootool.BC')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formBCare }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formBCare"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--care)' }"
          />

          <!-- /////////////// R CARE /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRC')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMRCare }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMRCare"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--care)' }"
          />
          <p class="m-0" v-html="$t('cootool.RC')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formRCare }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formRCare"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--care)' }"
          />

          <!-- /////////////// B TRUST - XPECTED /////////////// -->
          <p class="hb text-center mt-3 t20 trust" v-html="$t('cootool.T')"></p>

          <p class="m-0" v-html="$t('cootool.MBX')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMBXpected }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMBXpected"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--trust)' }"
          />
          <p class="m-0" v-html="$t('cootool.BX')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formBXpected }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formBXpected"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--trust)' }"
          />

          <!-- /////////////// R TRUST - XPECTED /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRX')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMRXpected }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMRXpected"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--trust)' }"
          />
          <p class="m-0" v-html="$t('cootool.RX')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formRXpected }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formRXpected"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--trust)' }"
          />

          <!-- /////////////// B TRUST /////////////// -->

          <p class="m-0" v-html="$t('cootool.MBT')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMBTrust }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMBTrust"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--trust)' }"
          />
          <p class="m-0" v-html="$t('cootool.BT')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formBTrust }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formBTrust"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--trust)' }"
          />

          <!-- /////////////// R TRUST /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRT')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMRTrust }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMRTrust"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--trust)' }"
          />
          <p class="m-0" v-html="$t('cootool.RT')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formRTrust }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formRTrust"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--trust)' }"
          />

          <!-- /////////////// B EQUIVALENCE /////////////// -->
          <p
            class="hb text-center mt-3 t20 equivalence"
            v-html="$t('cootool.E')"
          ></p>

          <p class="m-0" v-html="$t('cootool.MBE')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMBEquivalence }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMBEquivalence"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--equivalence)' }"
          />
          <p class="m-0" v-html="$t('cootool.BE')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formBEquivalence }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formBEquivalence"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--equivalence)' }"
          />

          <!-- /////////////// R EQUIVALENCE /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRE')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formMREquivalence }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formMREquivalence"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--equivalence)' }"
          />
          <p class="m-0" v-html="$t('cootool.RE')"></p>
          <p class="text-center p-0 m-0 mt-2">{{ formREquivalence }}%</p>
          <vue-slider
            :tooltip="'none'"
            :height="7"
            :dotSize="21"
            v-model="formREquivalence"
            class="mb-4"
            :min="1"
            :process-style="{ backgroundColor: 'var(--equivalence)' }"
          />

          <b-check name="termscheckbox" required>
            <span class="diversity it"> {{ $t('cootool.checkbox') }}</span>
            <nuxt-link to="/main/terms" class="au">
              {{ $t('cootool.checkboxlink') }}
            </nuxt-link>
            <span class="diversity it">{{ $t('cootool.checkboxend') }}</span>
          </b-check>
          <b-button
            type="submit"
            class="btn bhtrust btn-block mt-3 mb-3 gray border-0"
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
    <placemodal />
  </b-container>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'
export default {
  components: { VueSlider },
  head() {
    return {
      title: 'Cooperacy - The Cooperation Tool',
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getPlaceAction')
    await store.dispatch('getCountryAction')
    await store.dispatch('getSurveyAction')
    await store.dispatch('getProjectAction')
  },
  data() {
    return {
      nihil: null,
      formNature: 0,
      formPrevSurveyID: null,
      formPrevProjectID: null,
      formID: null,
      formGroup: 4,
      formCountry: 1,
      formPlace: 1,
      formMonth: 1,
      formParticipant: 3,
      formName: null,
      formDesc: null,
      formMBDiversity: 50,
      formBDiversity: 50,
      formMRDiversity: 50,
      formRDiversity: 50,
      formMBUnderstanding: 50,
      formBUnderstanding: 50,
      formMRUnderstanding: 50,
      formRUnderstanding: 50,
      formMBFreedom: 50,
      formBFreedom: 50,
      formMRFreedom: 50,
      formRFreedom: 50,
      formMBTransparency: 50,
      formBTransparency: 50,
      formMRTransparency: 50,
      formRTransparency: 50,
      formMBCare: 50,
      formBCare: 50,
      formMRCare: 50,
      formRCare: 50,
      formMBXpected: 50,
      formBXpected: 50,
      formMRXpected: 50,
      formRXpected: 50,
      formMBHabitat: 50,
      formBHabitat: 50,
      formMRHabitat: 50,
      formRHabitat: 50,
      formMBTrust: 50,
      formBTrust: 50,
      formMRTrust: 50,
      formRTrust: 50,
      formMBEquivalence: 50,
      formMREquivalence: 50,
      formBEquivalence: 50,
      formREquivalence: 50,
      terms: null,
      editing: false,
      country: this.$store.state.country,
      formNewcountry: null,
      formNewplace: null,
    }
  },
  computed: {
    nameInputState() {
      return this.name.length > 3 ? true : false
    },
    // return this.formMonth > 0 ? true : false
    // return this.formParticipant > 0 ? true : false
    selectPlace() {
      let place = this.$store.state.place.filter(
        (place) => place.country === this.formCountry
      )
      return place.sort((a, b) => (a.name > b.name ? 1 : -1))
    },
    newcountry() {
      //avoids showing Cooperacy as possible entry
      return this.$store.state.country.filter((country) => country.id != 1)
    },
  },
  methods: {
    async addplace() {
      let result = await this.$store.dispatch('placeFormAction', {
        country: this.formNewcountry,
        name: this.formNewplace,
      })
      if (result == 'exists') {
        this.$toast.success('This place already exists!', {
          duration: 1000,
          className: 'toastunderstanding',
        })
      } else {
        this.$toast.success(this.formNewplace + ' added!', {
          duration: 1000,
          className: 'toast',
        })
      }
    },
    async cooperationForm() {
      this.editing = true
      if (this.formPrevProjectID) {
        let [projectChosen] = this.$store.state.project.filter(
          (project) => project.id == this.formPrevProjectID
        )
        this.formGroup = 0
        this.formCountry = projectChosen.country
        this.formPlace = projectChosen.place
        this.formParticipant = projectChosen.professional
        this.formName = projectChosen.name
        this.formDesc = projectChosen.brief
      }
      let prevsurvey = null
      if (this.formPrevSurveyID) {
        ;[prevsurvey] = this.$store.state.survey.filter(
          (survey) => survey.surveyid == this.formPrevSurveyID
        )
        this.formGroup = prevsurvey.group
        this.formCountry = prevsurvey.country
        this.formPlace = prevsurvey.place
        this.formParticipant = prevsurvey.participant
        this.formName = prevsurvey.name
        this.formDesc = prevsurvey.desc
      }
      var formBodyRequest = {
        id: null,
        user: this.$auth.user ? this.$auth.user.id : null,
        surveyid: prevsurvey ? prevsurvey.surveyid : null,
        project: this.formPrevProjectID,
        group: this.formGroup,
        country: this.formCountry,
        place: this.formPlace,
        month: this.formMonth,
        participant: this.formParticipant,
        name: this.formName,
        desc: this.formDesc,
        MBD: this.formMBDiversity / 100,
        BD: this.formBDiversity / 100,
        MRD: this.formMRDiversity / 100,
        RD: this.formRDiversity / 100,
        MBU: this.formMBUnderstanding / 100,
        BU: this.formBUnderstanding / 100,
        MRU: this.formMRUnderstanding / 100,
        RU: this.formRUnderstanding / 100,
        MBF: this.formMBFreedom / 100,
        BF: this.formBFreedom / 100,
        MRF: this.formMRFreedom / 100,
        RF: this.formRFreedom / 100,
        MBI: this.formMBTransparency / 100,
        BI: this.formBTransparency / 100,
        MRI: this.formMRTransparency / 100,
        RI: this.formRTransparency / 100,
        MBC: this.formMBCare / 100,
        BC: this.formBCare / 100,
        MRC: this.formMRCare / 100,
        RC: this.formRCare / 100,
        MBX: this.formMBXpected / 100,
        BX: this.formBXpected / 100,
        MRX: this.formMRXpected / 100,
        RX: this.formRXpected / 100,
        MBH: this.formMBHabitat / 100,
        BH: this.formBHabitat / 100,
        MRH: this.formMRHabitat / 100,
        RH: this.formRHabitat / 100,
        MBT: this.formMBTrust / 100,
        BT: this.formBTrust / 100,
        MRT: this.formMRTrust / 100,
        RT: this.formRTrust / 100,
        MBE: this.formMBEquivalence / 100,
        BE: this.formBEquivalence / 100,
        MRE: this.formMREquivalence / 100,
        RE: this.formREquivalence / 100,
        P: 0.5,
        PText: null,
        PD: 0.5,
        PDText: null,
        PU: 0.5,
        PUText: null,
        PF: 0.5,
        PFText: null,
        PI: 0.5,
        PIText: null,
        PC: 0.5,
        PCText: null,
        PT: 0.5,
        PTText: null,
        PE: 0.5,
        PEText: null,
        PFinal: 0.5,
        PFinalText: null,
      }
      let res
      try {
        res = await this.$store.dispatch(
          'cooperationToolAction',
          formBodyRequest
        )
      } catch (err) {
        console.log(err)
        alert(err)
      }
      if (res) {
        this.$toast.success('Done!', { duration: 10000, className: 'toast' })
        let that = this
        setTimeout(function () {
          that.$router.push({ path: '/cootool/' + res.id })
        }, 1200)
      } else {
        alert('Something went wrong, try again')
      }
    },
  },
}
</script>
