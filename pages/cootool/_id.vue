<template>
  <b-container class="m-0 p-0">
    <b-row>
      <b-col cols="1"></b-col>
      <b-col cols="10">
        <h1
          class="up text-center"
          v-html="this.$store.state.survey.main[0].name"
        ></h1>
        <p>
          These result have been calculated on
          {{ $store.state.survey.parallel[0].surveynum }} anonymous surveys out
          of {{ $store.state.survey.main[0].participant }} people in the
          observed group.
        </p>
        <p>
          This group is a
          {{ group }} located in {{ place }}, {{ country }}.
          <span v-if="$store.state.survey.main[0].project">
            ID:
            {{ $store.state.survey.main[0].project }}
          </span>
        </p>
        <p v-if="this.$store.state.survey.main[0].desc">
          Your Description:
          <span v-html="this.$store.state.survey.main[0].desc"> </span>
        </p>
        <!-- REPORT STARTS HERE -->
        <!-- MAIN -->
        <b-container v-for="type in resultType" :key="type.id" class="m-0 p-0">
          <b-container
            v-for="result in $store.state.survey[type.name]"
            :key="result.id"
            class="m-0 p-0"
          >
            <b-container
              v-if="
                type.name == 'main' ||
                $store.state.survey.parallel[0].surveynum > 1
              "
              class="m-0 p-0"
            >
              <p
                v-if="type.name == 'main'"
                class="t20 hb diversity text-center"
              >
                YOUR SURVEY
              </p>
              <p
                v-if="
                  type.name == 'parallel' &&
                  $store.state.survey.parallel[0].surveynum > 1
                "
                class="t20 hb equivalence text-center"
              >
                {{ $store.state.survey.parallel[0].surveynum - 1 }} PARALLEL
                GROUP SURVEYS
              </p>
              <reportsvg :result="result" />
              <p class="trust hb t20 text-center">CURRENT PAIRING RESULTS</p>
              <reportsvgpairing :result="result" />
              <p v-if="result.PText">Your comments on pairing:</p>
              <p v-html="result.PText" v-if="result.PText"></p>
              <p v-html="result.PDText" v-if="result.PDText"></p>
              <p v-html="result.PUText" v-if="result.PUText"></p>
              <p v-html="result.PFText" v-if="result.PFText"></p>
              <p v-html="result.PIText" v-if="result.PIText"></p>
              <p v-html="result.PCText" v-if="result.PCText"></p>
              <p v-html="result.PTText" v-if="result.PTText"></p>
              <p v-html="result.PEText" v-if="result.PEText"></p>
              <p v-html="result.PFinalText" v-if="result.PFinalText"></p>

              <p
                v-if="
                  (result.MBD + result.MRD + result.BD + result.RD) / 4 <= 0.25
                "
              >
                {{ $t('cootoolreport.stagnation') }}
                <br />
                {{ $t('cootoolreport.stagnationrisk') }}
                {{
                  log4((result.MBD + result.MRD + result.BD + result.RD) / 4) *
                  100
                }}%
              </p>
              <p
                v-if="
                  (result.MBD + result.MRD + result.BD + result.RD) / 4 -
                    (result.MBU + result.MRU + result.BU + result.RU) / 4 >
                    0 &&
                  (result.MBU + result.MRU + result.BU + result.RU) / 4 > 0.25
                "
              >
                {{ $t('cootoolreport.conflictD') }}
                <br />
                {{ $t('cootoolreport.conflictDrisk') }}
                {{
                  Math.round(
                    Math.pow(
                      (result.MBD + result.MRD + result.BD + result.RD) / 4 -
                        (result.MBU + result.MRU + result.BU + result.RU) / 4,
                      0.5
                    ) * 100
                  )
                }}%
              </p>
              <p v-if="result.U <= 25">
                {{ $t('cootoolreport.conflict') }}
                <br />
                {{ $t('cootoolreport.conflictrisk') }}
                {{
                  log4((result.MBU + result.MRU + result.BU + result.RU) / 4)
                }}%
              </p>
            </b-container>
          </b-container>
        </b-container>
        <b-container>
          <b-form
            @submit.prevent="cooperationForm()"
            class="mt-3 was-validated"
          >
            <!-- /////////////// PAIRING ///////////////  /////////////////////////////////////// -->

            <!-- /////////////// PAIRING ///////////////  /////////////////////////////////////// -->

            <!-- /////////////// PAIRING ///////////////  /////////////////////////////////////// -->

            <b-container class="m-0 p-0 t16 justify">
              <h5 class="text-center mt-5 mb-2 trust">
                {{ $t('cootool.grouppairing') }}
              </h5>
              <p
                class="mb-5"
                v-html="
                  $t('cootool.grouppairingintro') +
                  $t('cootool.grouppairingintro2')
                "
              ></p>
              <p class="m-0" v-html="$t('cootool.PBase')"></p>
              <p class="text-center m-0 p-0 mt-2">{{ formPairBase }}%</p>
              <vue-slider
                :tooltip="'none'"
                :height="7"
                :dotSize="21"
                v-model="formPairBase"
                class="mb-4"
                :min="1"
                :process-style="{ backgroundColor: 'var(--trust)' }"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea v-model="formPairBaseText"></b-form-textarea>

              <p class="m-0" v-html="$t('cootool.PD')"></p>
              <p class="text-center m-0 p-0 mt-2">{{ formPairDiversity }}%</p>
              <vue-slider
                :tooltip="'none'"
                :height="7"
                :dotSize="21"
                v-model="formPairDiversity"
                class="mb-4"
                :min="1"
                :process-style="{ backgroundColor: 'var(--diversity)' }"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea
                v-model="formPairDiversityText"
              ></b-form-textarea>

              <p class="m-0" v-html="$t('cootool.PU')"></p>
              <p class="text-center m-0 p-0 mt-2">
                {{ formPairUnderstanding }}%
              </p>
              <vue-slider
                :tooltip="'none'"
                :height="7"
                :dotSize="21"
                v-model="formPairUnderstanding"
                class="mb-4"
                :min="1"
                :process-style="{ backgroundColor: 'var(--understanding)' }"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea
                v-model="formPairUnderstandingText"
              ></b-form-textarea>

              <p class="m-0" v-html="$t('cootool.PF')"></p>
              <p class="text-center m-0 p-0 mt-2">{{ formPairFreedom }}%</p>
              <vue-slider
                :tooltip="'none'"
                :height="7"
                :dotSize="21"
                v-model="formPairFreedom"
                class="mb-4"
                :min="1"
                :process-style="{ backgroundColor: 'var(--freedom)' }"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea v-model="formPairFreedomText"></b-form-textarea>

              <p class="m-0" v-html="$t('cootool.PI')"></p>
              <p class="text-center m-0 p-0 mt-2">
                {{ formPairTransparency }}%
              </p>
              <vue-slider
                :tooltip="'none'"
                :height="7"
                :dotSize="21"
                v-model="formPairTransparency"
                class="mb-4"
                :min="1"
                :process-style="{ backgroundColor: 'var(--transparency)' }"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea
                v-model="formPairTransparencyText"
              ></b-form-textarea>

              <p class="m-0" v-html="$t('cootool.PC')"></p>
              <p class="text-center m-0 p-0 mt-2">{{ formPairCare }}%</p>
              <vue-slider
                :tooltip="'none'"
                :height="7"
                :dotSize="21"
                v-model="formPairCare"
                class="mb-4"
                :min="1"
                :process-style="{ backgroundColor: 'var(--care)' }"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea v-model="formPairCareText"></b-form-textarea>

              <p class="m-0" v-html="$t('cootool.PT')"></p>
              <p class="text-center m-0 p-0 mt-2">{{ formPairTrust }}%</p>
              <vue-slider
                :tooltip="'none'"
                :height="7"
                :dotSize="21"
                v-model="formPairTrust"
                class="mb-4"
                :min="1"
                :process-style="{ backgroundColor: 'var(--trust)' }"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea v-model="formPairTrustText"></b-form-textarea>

              <p class="m-0" v-html="$t('cootool.PE')"></p>
              <p class="text-center m-0 p-0 mt-2">{{ formPairEquivalence }}%</p>
              <vue-slider
                :tooltip="'none'"
                :height="7"
                :dotSize="21"
                v-model="formPairEquivalence"
                class="mb-4"
                :min="1"
                :process-style="{ backgroundColor: 'var(--equivalence)' }"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea
                v-model="formPairEquivalenceText"
              ></b-form-textarea>

              <p v-html="$t('cootool.AFinalNote')" class="t16"></p>
              <p class="m-0" v-html="$t('cootool.PFinal')"></p>
              <p class="text-center m-0 p-0 mt-2">{{ formPairFinal }}%</p>
              <vue-slider
                :tooltip="'none'"
                :height="7"
                :dotSize="21"
                v-model="formPairFinal"
                class="mb-4"
                :min="1"
                :process-style="{ backgroundColor: 'var(--diversity)' }"
              />
              <br />
              {{ $t('cootool.explain') }}
              <b-form-textarea v-model="formPairFinalText"></b-form-textarea>
            </b-container>

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
        </b-container>
      </b-col>
      <b-col cols="1"></b-col>
    </b-row>
  </b-container>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'
import * as d3 from 'd3'
export default {
  components: { VueSlider },
  head() {
    return {
      title: 'Cooperacy - The Cooperation Tool Result Page',
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getPlaceAction')
    await store.dispatch('getCountryAction')
    await store.dispatch('getSurveyAction', { id: params.id })
  },
  //use params.id to update survey, also with pairing tool
  data() {
    return {
      resultType: [
        { id: 1, name: 'main' },
        { id: 2, name: 'parallel' },
      ],
      nihil: null,
      formPairBase: Math.round(this.$store.state.survey.main[0].P * 100),
      formPairDiversity: Math.round(this.$store.state.survey.main[0].PD * 100),
      formPairUnderstanding: Math.round(
        this.$store.state.survey.main[0].PU * 100
      ),
      formPairFreedom: Math.round(this.$store.state.survey.main[0].PF * 100),
      formPairTransparency: Math.round(
        this.$store.state.survey.main[0].PI * 100
      ),
      formPairCare: Math.round(this.$store.state.survey.main[0].PC * 100),
      formPairTrust: Math.round(this.$store.state.survey.main[0].PT * 100),
      formPairEquivalence: Math.round(
        this.$store.state.survey.main[0].PE * 100
      ),
      formPairFinal: Math.round(this.$store.state.survey.main[0].PFinal * 100),
      formPairBaseText: this.$store.state.survey.main[0].PText,
      formPairDiversityText: this.$store.state.survey.main[0].PDText,
      formPairUnderstandingText: this.$store.state.survey.main[0].PUText,
      formPairFreedomText: this.$store.state.survey.main[0].PFText,
      formPairTransparencyText: this.$store.state.survey.main[0].PIText,
      formPairCareText: this.$store.state.survey.main[0].PCText,
      formPairTrustText: this.$store.state.survey.main[0].PTText,
      formPairEquivalenceText: this.$store.state.survey.main[0].PEText,
      formPairFinalText: this.$store.state.survey.main[0].PFinalText,
      terms: null,
      editing: false,
    }
  },
  mounted() {},
  computed: {
    country() {
      let [country] = this.$store.state.country.filter(
        (country) => country.id == this.$store.state.survey.main[0].country
      )
      return country.name
    },
    place() {
      let [place] = this.$store.state.place.filter(
        (place) => place.id == this.$store.state.survey.main[0].place
      )
      return place.name
    },
    group() {
      return this.$t('cootool.group' + this.$store.state.survey.main[0].group)
    },
  },
  methods: {
    //other functions
    log4(n) {
      let n4 = Math.round((-1 * (Math.log(n / 100) / Math.log(4)) - 1) * 100)
      if (n4 >= 0.99) {
        n4 = 99
      }
      return n4
    },
    delta(n) {
      let nDelta = Math.round(n ^ 0.5)
      if (nDelta >= 0.99) {
        nDelta = 99
      }
      return nDelta
    },
    async cooperationForm() {
      this.editing = true
      var formBodyRequest = {
        pairing: true,
        id: this.$store.state.survey.main[0].id,
        user: this.$store.state.survey.main[0].user,
        surveyid: this.$store.state.survey.main[0].surveyid,
        project: this.$store.state.survey.main[0].project,
        group: this.$store.state.survey.main[0].group,
        country: this.$store.state.survey.main[0].country,
        place: this.$store.state.survey.main[0].place,
        month: this.$store.state.survey.main[0].month,
        participant: this.$store.state.survey.main[0].participant,
        name: this.$store.state.survey.main[0].name,
        desc: this.$store.state.survey.main[0].desc,
        MBD: this.$store.state.survey.main[0].MBD,
        BD: this.$store.state.survey.main[0].BD,
        MRD: this.$store.state.survey.main[0].MRD,
        RD: this.$store.state.survey.main[0].RD,
        MBU: this.$store.state.survey.main[0].MBU,
        BU: this.$store.state.survey.main[0].BU,
        MRU: this.$store.state.survey.main[0].MRU,
        RU: this.$store.state.survey.main[0].RU,
        MBF: this.$store.state.survey.main[0].MBF,
        BF: this.$store.state.survey.main[0].BF,
        MRF: this.$store.state.survey.main[0].MRF,
        RF: this.$store.state.survey.main[0].RF,
        MBI: this.$store.state.survey.main[0].MBT,
        BI: this.$store.state.survey.main[0].BT,
        MRI: this.$store.state.survey.main[0].MRT,
        RI: this.$store.state.survey.main[0].RT,
        MBC: this.$store.state.survey.main[0].MBC,
        BC: this.$store.state.survey.main[0].BC,
        MRC: this.$store.state.survey.main[0].MRC,
        RC: this.$store.state.survey.main[0].RC,
        MBX: this.$store.state.survey.main[0].MBX,
        BX: this.$store.state.survey.main[0].BX,
        MRX: this.$store.state.survey.main[0].MRX,
        RX: this.$store.state.survey.main[0].RX,
        MBH: this.$store.state.survey.main[0].MBH,
        BH: this.$store.state.survey.main[0].BH,
        MRH: this.$store.state.survey.main[0].MRH,
        RH: this.$store.state.survey.main[0].RH,
        MBT: this.$store.state.survey.main[0].MBT,
        BT: this.$store.state.survey.main[0].BT,
        MRT: this.$store.state.survey.main[0].MRT,
        RT: this.$store.state.survey.main[0].RT,
        MBE: this.$store.state.survey.main[0].MBE,
        BE: this.$store.state.survey.main[0].BE,
        MRE: this.$store.state.survey.main[0].MRE,
        RE: this.$store.state.survey.main[0].RE,
        P: this.formPairBase / 100,
        PText: this.formPairBaseText,
        PD: this.formPairDiversity / 100,
        PDText: this.formPairDiversityText,
        PU: this.formPairUnderstanding / 100,
        PUText: this.formPairUnderstandingText,
        PF: this.formPairFreedom / 100,
        PFText: this.formPairFreedomText,
        PI: this.formPairTransparency / 100,
        PIText: this.formPairTransparencyText,
        PC: this.formPairCare / 100,
        PCText: this.formPairCareText,
        PT: this.formPairTrust / 100,
        PTText: this.formPairTrustText,
        PE: this.formPairEquivalence / 100,
        PEText: this.formPairEquivalenceText,
        PFinal: this.formPairFinal / 100,
        PFinalText: this.formPairFinalText,
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
          that.$router.go(0)
        }, 1200)
      } else {
        alert('Something went wrong, try again')
      }
    },
  },
}
</script>
