<template>
  <b-container class="m-0 p-0m t16">
    <b-row>
      <b-col cols="1" md="2"></b-col>
      <b-col cols="10" md="8">
        <p class="text-center t32 hb equivalence">COOPERATION TOOL</p>
        <p v-if="$store.state.edit" v-html="$store.state.edit"></p>
        <b-form @submit.prevent="cooperationForm()" class="mt-3 was-validated">
          <p v-html="$t('cootool.intro')"></p>
          <p
            class="text-center mb-4 t24 hb equivalence"
            v-html="$t('cootool.basic')"
          ></p>

          <!-- LANGUAGE -->
          <b-row class="m-0 p-0 mb-3 text-center">
            <b-col cols="12">
              <span v-html="$t('cootool.language')"></span>
              <nuxt-link
                class="au"
                :to="switchLocalePath('en')"
                v-html="$t('cootool.language1')"
              >
              </nuxt-link
              >,
              <nuxt-link
                class="au"
                :to="switchLocalePath('it')"
                v-html="$t('cootool.language2')"
              >
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
          <!-- change this into a option select with list of projects -->
          <input
            v-if="formNature == 1"
            v-model="formProjectID"
            size="sm"
            required
          />

          <p
            class="pt-3 m-1"
            v-html="$t('cootool.prevsurvey')"
            v-if="formNature == 0"
          ></p>
          <b-form-select v-model="formPrevSurvey" v-if="formNature == 0">
            <option value="Null"></option>
            <option
              v-for="survey in $store.state.survey"
              :key="survey.id"
              :value="survey.id"
              v-html="
                survey.id +
                  ' ' +
                  survey.name +
                  ' ' +
                  survey.project +
                  ' ' +
                  survey.group +
                  ' ' +
                  survey.country +
                  ' ' +
                  survey.place +
                  ' ' +
                  survey.participant +
                  ' '
              "
            ></option>
          </b-form-select>

          <p
            class="pt-3 m-1"
            v-html="$t('cootool.group')"
            v-if="formNature == 0 && !formPrevSurvey"
          ></p>
          <b-form-select
            v-model="formGroup"
            v-if="formNature == 0 && !formPrevSurvey"
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
            v-if="formNature == 0 && !formPrevSurvey"
          ></p>
          <b-form-select
            v-model="formCountry"
            v-if="formNature == 0 && !formPrevSurvey"
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
            v-if="formNature == 0 && !formPrevSurvey"
          ></p>
          <b-form-select
            v-model="formPlace"
            v-if="formNature == 0 && !formPrevSurvey"
            required
          >
            <option v-for="place in Mplace" :key="place.id" :value="place.id">{{
              place.name
            }}</option>
          </b-form-select>

          <p class="it" v-if="formNature == 0 && !formPrevSurvey">
            {{ $t('cootool.newplace') }}
            <a v-b-modal.placemodal class="ad finger b">
              {{ $t('cootool.one') }}
            </a>
          </p>

          <p
            class="pt-3 m-1"
            v-html="$t('cootool.participant')"
            v-if="formNature == 0 && !formPrevSurvey"
          ></p>
          <b-form-input
            v-if="formNature == 0 && !formPrevSurvey"
            v-model="formParticipant"
            size="sm"
            required
          ></b-form-input>

          <p
            class="pt-3 m-1"
            v-html="$t('cootool.name')"
            v-if="formNature == 0 && !formPrevSurvey"
          ></p>
          <b-form-input
            v-if="formNature == 0 && !formPrevSurvey"
            v-model="formName"
            size="sm"
            required
          ></b-form-input>

          <p
            class="pt-3 m-1"
            v-html="$t('cootool.desc')"
            v-if="formNature == 0 && !formPrevSurvey"
          ></p>
          <b-form-textarea
            v-if="formNature == 0 && !formPrevSurvey"
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

          <!-- /////////////// PAIRING /////////////// -->
          <!-- /////////////// PAIRING /////////////// -->
          <!-- /////////////// PAIRING /////////////// -->

          <b-container class="m-0 p-0">
            <h5 class="text-center mt-5 mb-2 equivalence">
              {{ $t('cootool.grouppairing') }}
            </h5>
            <b-check v-model="pairgroupcheckbox" class="text-center M-5">
              {{ $t('cootool.apply') }}
            </b-check>
            <p class="mb-5" v-html="$t('cootool.grouppairingintro')"></p>
            <b-container class="m-0 p-0" v-if="pairgroupcheckbox">
              <p class="mb-5" v-html="$t('cootool.grouppairingintro2')"></p>
              <p class="m-0" v-html="$t('cootool.PBase')"></p>
              <p class="text-center m-0 p-0">{{ formPairBase }}%</p>
              <vue-slider
                :tooltip="'none'"
                :height="7"
                :dotSize="21"
                v-model="formPairBase"
                class="mb-4"
                :min="1"
                :process-style="{ backgroundColor: 'var(--equivalence)' }"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea v-model="formPairBaseText"></b-form-textarea>

              <p class="m-0" v-html="$t('cootool.PD')"></p>
              <p class="text-center m-0 p-0">{{ formPairDiversity }}%</p>
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
              <p class="text-center m-0 p-0">{{ formPairUnderstanding }}%</p>
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
              <p class="text-center m-0 p-0">{{ formPairFreedom }}%</p>
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
              <p class="text-center m-0 p-0">{{ formPairTransparency }}%</p>
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
              <p class="text-center m-0 p-0">{{ formPairCare }}%</p>
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
              <p class="text-center m-0 p-0">{{ formPairTrust }}%</p>
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
              <p class="text-center m-0 p-0">{{ formPairEquivalence }}%</p>
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
              <p class="text-center m-0 p-0">{{ formPairFinal }}%</p>
              <vue-slider
                :tooltip="'none'"
                :height="7"
                :dotSize="21"
                v-model="formPairFinal"
                class="mb-4"
                :min="1"
                :process-style="{ backgroundColor: 'var(--equivalence)' }"
              />
              <br />
              {{ $t('cootool.explain') }}
              <b-form-textarea v-model="formPairFinalText"></b-form-textarea>
            </b-container>
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
            <p class="m-0" v-if="!editing">
              {{ $t('cootool.go') }}
            </p>
            <b-spinner small v-if="editing" class="m-1"></b-spinner>
            <p class="m-0" v-if="editing">
              {{ $t('cootool.loading') }}
            </p>
          </b-button>
        </b-form>
      </b-col>
      <b-col cols="1" md="2"></b-col>
    </b-row>

    <!-- MODAL: ADD A NEW PLACE -->

    <b-modal title="Add a new place" hide-header-close>
      <p class="M-4">{{ $t('addplace.newplace') }}</p>
      <b-form @submit.prevent="addplace">
        <p class="m-0" v-html="$t('addplace.insert')"></p>
        <b-form-select v-model="formNewcountry">
          <option
            v-for="country in newcountry"
            :key="country.id"
            :value="country.id"
          >
            {{ country.name }}
          </option>
        </b-form-select>
        <input v-model="formNewplace" />
      </b-form>
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button size="sm" class="bcare" @click="addplace()">{{
          $t('addplace.add')
        }}</b-button>
        <b-button size="sm" class="btransparency" @click="cancel()">{{
          $t('addplace.close')
        }}</b-button>
      </template>
    </b-modal>
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
      title: 'Cooperacy - The Cooperation Tool'
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getPlaceAction')
    await store.dispatch('getCountryAction')
    await store.dispatch('getSurveyAction')
    if (store.state.edit.id) {
    }
  },
  data() {
    return {
      formNature: 0,
      formPrevSurvey: null,
      formProjectID: null,
      formID: null,
      formGroup: 4,
      formCountry: 1,
      formPlace: 1,
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
      formPairBase: 50,
      formPairBaseText: null,
      formPairDiversity: 50,
      formPairUnderstanding: 50,
      formPairFreedom: 50,
      formPairTransparency: 50,
      formPairCare: 50,
      formPairTrust: 50,
      formPairEquivalence: 50,
      formPairDiversityText: null,
      formPairUnderstandingText: null,
      formPairFreedomText: null,
      formPairTransparencyText: null,
      formPairCareText: null,
      formPairTrustText: null,
      formPairEquivalenceText: null,
      formPairFinal: 50,
      formPairFinalText: null,
      terms: null,
      editing: false,
      country: this.$store.state.country,
      formNewcountry: null,
      formNewplace: null,
      pairgroupcheckbox: false,
    }
  },
  computed: {
    nameInputState() {
      return this.name.length > 4 ? true : false
    },
    Mplace() {
      let place = this.$store.state.place.filter(
        place => place.country === this.formCountry
      )
      return place.sort((a, b) => (a.name > b.name ? 1 : -1))
    },
    newcountry() {
      //avoids showing Cooperacy as possible entry
      return this.$store.state.country.filter(country => country.id != 1)
    }
  },
  methods: {
    async addplace() {
      let result = await this.$store.dispatch('placeFormAction', {
        country: this.formNewcountry,
        name: this.formNewplace
      })
      if (result == 'exists') {
        this.$toast.success('This place already exists!', {
          duration: 1000,
          className: 'toastunderstanding'
        })
      } else {
        this.$toast.success(this.formNewplace + ' added!', {
          duration: 1000,
          className: 'toast'
        })
      }
    },
    async cooperationForm() {
      this.editing = true
      if (this.$store.state.edit.id) {
        //left for other future functionalities
      }
      let lastsurveyid
      if (this.$store.state.survey) {
        lastsurveyid = this.$store.state.survey[this.$store.state.survey.length - 1].id
      }
      if (this.formNature == 1) {
        //insert data from coo project
      }
      if (this.formPrevSurvey) {
        this.formProjectID = this.prevsurvey.project
        this.formGroup = this.prevsurvey.group
        this.formCountry = this.prevsurvey.country
        this.formPlace = this.prevsurvey.place
        this.formParticipant = this.prevsurvey.participant
        this.formName = this.prevsurvey.name
        this.formDesc = this.prevsurvey.desc
        this.formID = this.prevsurvey.id
      }
      var formBodyRequest = {
        id: this.formID,
        project: this.formProjectID,
        group: this.formGroup,
        country: this.formCountry,
        place: this.formPlace,
        participant: this.formParticipant,
        name: this.formName,
        desc: this.formDesc,
        MBD: this.formMBDiversity,
        BD: this.formBDiversity,
        MRD: this.formMRDiversity,
        RD: this.formRDiversity,
        MBU: this.formMBUnderstanding,
        BU: this.formBUnderstanding,
        MRU: this.formMRUnderstanding,
        RU: this.formRUnderstanding,
        MBF: this.formMBFreedom,
        BF: this.formBFreedom,
        MRF: this.formMRFreedom,
        RF: this.formRFreedom,
        MBI: this.formMBTransparency,
        BI: this.formBTransparency,
        MRI: this.formMRTransparency,
        RI: this.formRTransparency,
        MBC: this.formMBCare,
        BC: this.formBCare,
        MRC: this.formMRCare,
        RC: this.formRCare,
        MBX: this.formMBXpected,
        BX: this.formBXpected,
        MRX: this.formMRXpected,
        RX: this.formRXpected,
        MBH: this.formMBHabitat,
        BH: this.formBHabitat,
        MRH: this.formMRHabitat,
        RH: this.formRHabitat,
        MBT: this.formMBTrust,
        BT: this.formBTrust,
        MRT: this.formMRTrust,
        RT: this.formRTrust,
        MBE: this.formMBEquivalence,
        BE: this.formBEquivalence,
        MRE: this.formMREquivalence,
        RE: this.formREquivalence,
        P: this.formPairBase,
        PText: this.formPairBaseText,
        PD: this.formPairDiversity,
        PDText: this.formPairDiversityText,
        PU: this.formPairUnderstanding,
        PUText: this.formPairUnderstandingText,
        PF: this.formPairFreedom,
        PFText: this.formPairFreedomText,
        PI: this.formPairTransparency,
        PIText: this.formPairTransparencyText,
        PC: this.formPairCare,
        PCText: this.formPairCareText,
        PT: this.formPairTrust,
        PTText: this.formPairTrustText,
        PE: this.formPairEquivalence,
        PEText: this.formPairEquivalenceText,
        PFinal: this.formPairFinal,
        PFinalText: this.formPairFinalText
      }
      if (this.$auth.user) {
        formBodyRequest.user = this.$auth.user.id
      }
      let res
      try {
        res = await this.$store.dispatch('cooperationToolAction', formBodyRequest)
      } catch (err) {
        console.log(err)
        alert(err)
      }

      if (res) {
        this.$toast.success('Done!', { duration: 1000, className: 'toast' })
        await this.$store.commit('setEditSwitch', res)
        let that = this
        setTimeout(function () {
          that.$router.push({ path: '/cooperationtoolreport' })
        }, 1200)
      } else { alert('Something went wrong, try again') }
    }
  }
}

</script>
