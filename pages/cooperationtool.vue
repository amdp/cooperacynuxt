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
                  survey.participant +
                  ' ' +
                  survey.group +
                  ' ' +
                  survey.country +
                  ' ' +
                  survey.place +
                  ' ' +
                  survey.desc
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
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMBDiversity * 100) }}%
          </p>
          <input
            v-model="formMBDiversity"
            type="range"
            class="mb-4 sliderD"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.BD')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formBDiversity * 100) }}%
          </p>
          <input
            v-model="formBDiversity"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// R DIVERSITY /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRD')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMRDiversity * 100) }}%
          </p>
          <input
            v-model="formMRDiversity"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.RD')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formRDiversity * 100) }}%
          </p>
          <input
            v-model="formRDiversity"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// B UNDERSTANDING /////////////// -->
          <p
            class="hb text-center mt-3 t20 understanding"
            v-html="$t('cootool.U')"
          ></p>

          <p class="m-0" v-html="$t('cootool.MBU')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMBUnderstanding * 100) }}%
          </p>
          <input
            v-model="formMBUnderstanding"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.BU')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formBUnderstanding * 100) }}%
          </p>
          <input
            v-model="formBUnderstanding"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// R UNDERSTANDING /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRU')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMRUnderstanding * 100) }}%
          </p>
          <input
            v-model="formMRUnderstanding"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.RU')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formRUnderstanding * 100) }}%
          </p>
          <input
            v-model="formRUnderstanding"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// B FREEDOM /////////////// -->
          <p
            class="hb text-center mt-3 t20 freedom"
            v-html="$t('cootool.F')"
          ></p>

          <p class="m-0" v-html="$t('cootool.MBF')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMBFreedom * 100) }}%
          </p>
          <input
            v-model="formMBFreedom"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.BF')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formBFreedom * 100) }}%
          </p>
          <input
            v-model="formBFreedom"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// R FREEDOM /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRF')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMRFreedom * 100) }}%
          </p>
          <input
            v-model="formMRFreedom"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.RF')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formRFreedom * 100) }}%
          </p>
          <input
            v-model="formRFreedom"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// B TRANSPARENCY /////////////// -->
          <p
            class="hb text-center mt-3 t20 transparency"
            v-html="$t('cootool.I')"
          ></p>

          <p class="m-0" v-html="$t('cootool.MBI')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMBTransparency * 100) }}%
          </p>
          <input
            v-model="formMBTransparency"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.BI')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formBTransparency * 100) }}%
          </p>
          <input
            v-model="formBTransparency"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// R TRANSPARENCY /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRI')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMRTransparency * 100) }}%
          </p>
          <input
            v-model="formMRTransparency"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.RI')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formRTransparency * 100) }}%
          </p>
          <input
            v-model="formRTransparency"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// B CARE - HABITAT /////////////// -->
          <p class="hb text-center mt-3 t20 care" v-html="$t('cootool.C')"></p>

          <p class="m-0" v-html="$t('cootool.MBH')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMBHabitat * 100) }}%
          </p>
          <input
            v-model="formMBHabitat"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.BH')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formBHabitat * 100) }}%
          </p>
          <input
            v-model="formBHabitat"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// R CARE - HABITAT /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRH')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMRHabitat * 100) }}%
          </p>
          <input
            v-model="formMRHabitat"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.RH')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formRHabitat * 100) }}%
          </p>
          <input
            v-model="formRHabitat"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// B CARE /////////////// -->

          <p class="m-0" v-html="$t('cootool.MBC')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMBCare * 100) }}%
          </p>
          <input
            v-model="formMBCare"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.BC')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formBCare * 100) }}%
          </p>
          <input
            v-model="formBCare"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// R CARE /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRC')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMRCare * 100) }}%
          </p>
          <input
            v-model="formMRCare"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.RC')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formRCare * 100) }}%
          </p>
          <input
            v-model="formRCare"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// B TRUST - XPECTED /////////////// -->
          <p class="hb text-center mt-3 t20 trust" v-html="$t('cootool.T')"></p>

          <p class="m-0" v-html="$t('cootool.MBX')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMBXpected * 100) }}%
          </p>
          <input
            v-model="formMBXpected"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.BX')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formBXpected * 100) }}%
          </p>
          <input
            v-model="formBXpected"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// R TRUST - XPECTED /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRX')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMRXpected * 100) }}%
          </p>
          <input
            v-model="formMRXpected"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.RX')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formRXpected * 100) }}%
          </p>
          <input
            v-model="formRXpected"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// B TRUST /////////////// -->

          <p class="m-0" v-html="$t('cootool.MBT')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMBTrust * 100) }}%
          </p>
          <input
            v-model="formMBTrust"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.BT')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formBTrust * 100) }}%
          </p>
          <input
            v-model="formBTrust"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// R TRUST /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRT')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMRTrust * 100) }}%
          </p>
          <input
            v-model="formMRTrust"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.RT')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formRTrust * 100) }}%
          </p>
          <input
            v-model="formRTrust"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// B EQUIVALENCE /////////////// -->
          <p
            class="hb text-center mt-3 t20 equivalence"
            v-html="$t('cootool.E')"
          ></p>

          <p class="m-0" v-html="$t('cootool.MBE')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMBEquivalence * 100) }}%
          </p>
          <input
            v-model="formMBEquivalence"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.BE')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formBEquivalence * 100) }}%
          </p>
          <input
            v-model="formBEquivalence"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />

          <!-- /////////////// R EQUIVALENCE /////////////// -->

          <p class="m-0" v-html="$t('cootool.MRE')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formMREquivalence * 100) }}%
          </p>
          <input
            v-model="formMREquivalence"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
          />
          <p class="m-0" v-html="$t('cootool.RE')"></p>
          <p class="text-center p-0 m-0 mt-2">
            &nbsp; {{ Math.round(formREquivalence * 100) }}%
          </p>
          <input
            v-model="formREquivalence"
            type="range"
            class="mb-4"
            min="0.01"
            max="0.99"
            step="0.01"
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
              <p class="text-center m-0 p-0">
                &nbsp; {{ Math.round(formPairBase * 100) }}%
              </p>
              <input
                v-model="formPairBase"
                type="range"
                class="mb-4"
                min="0.01"
                max="0.99"
                step="0.01"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea v-model="formPairBaseText"></b-form-textarea>

              <p class="m-0" v-html="$t('cootool.PD')"></p>
              <p class="text-center m-0 p-0">
                &nbsp; {{ Math.round(formPairDiversity * 100) }}%
              </p>
              <input
                v-model="formPairDiversity"
                type="range"
                class="mb-4"
                min="0.01"
                max="0.99"
                step="0.01"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea
                v-model="formPairDiversityText"
              ></b-form-textarea>

              <p class="m-0" v-html="$t('cootool.PU')"></p>
              <p class="text-center m-0 p-0">
                &nbsp; {{ Math.round(formPairUnderstanding * 100) }}%
              </p>
              <input
                v-model="formPairUnderstanding"
                type="range"
                class="mb-4"
                min="0.01"
                max="0.99"
                step="0.01"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea
                v-model="formPairUnderstandingText"
              ></b-form-textarea>

              <p class="m-0" v-html="$t('cootool.PF')"></p>
              <p class="text-center m-0 p-0">
                &nbsp; {{ Math.round(formPairFreedom * 100) }}%
              </p>
              <input
                v-model="formPairFreedom"
                type="range"
                class="mb-4"
                min="0.01"
                max="0.99"
                step="0.01"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea v-model="formPairFreedomText"></b-form-textarea>

              <p class="m-0" v-html="$t('cootool.PI')"></p>
              <p class="text-center m-0 p-0">
                &nbsp; {{ Math.round(formPairTransparency * 100) }}%
              </p>
              <input
                v-model="formPairTransparency"
                type="range"
                class="mb-4"
                min="0.01"
                max="0.99"
                step="0.01"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea
                v-model="formPairTransparencyText"
              ></b-form-textarea>

              <p class="m-0" v-html="$t('cootool.PC')"></p>
              <p class="text-center m-0 p-0">
                &nbsp; {{ Math.round(formPairCare * 100) }}%
              </p>
              <input
                v-model="formPairCare"
                type="range"
                class="mb-4"
                min="0.01"
                max="0.99"
                step="0.01"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea v-model="formPairCareText"></b-form-textarea>

              <p class="m-0" v-html="$t('cootool.PT')"></p>
              <p class="text-center m-0 p-0">
                &nbsp; {{ Math.round(formPairTrust * 100) }}%
              </p>
              <input
                v-model="formPairTrust"
                type="range"
                class="mb-4"
                min="0.01"
                max="0.99"
                step="0.01"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea v-model="formPairTrustText"></b-form-textarea>

              <p class="m-0" v-html="$t('cootool.PE')"></p>
              <p class="text-center m-0 p-0">
                &nbsp; {{ Math.round(formPairEquivalence * 100) }}%
              </p>
              <input
                v-model="formPairEquivalence"
                type="range"
                class="mb-4"
                min="0.01"
                max="0.99"
                step="0.01"
              />
              <br />
              {{ $t('cootool.details') }}
              <b-form-textarea
                v-model="formPairEquivalenceText"
              ></b-form-textarea>

              <p v-html="$t('cootool.AFinalNote')" class="t16"></p>
              <p class="m-0" v-html="$t('cootool.PFinal')"></p>
              <p class="text-center m-0 p-0">
                &nbsp; {{ Math.round(formPairFinal * 100) }}%
              </p>
              <input
                v-model="formPairFinal"
                type="range"
                class="mb-4"
                min="0.01"
                max="0.99"
                step="0.01"
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
export default {
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
      formMBDiversity: 0.50,
      formBDiversity: 0.50,
      formMRDiversity: 0.50,
      formRDiversity: 0.50,
      formMBUnderstanding: 0.50,
      formBUnderstanding: 0.50,
      formMRUnderstanding: 0.50,
      formRUnderstanding: 0.50,
      formMBFreedom: 0.50,
      formBFreedom: 0.50,
      formMRFreedom: 0.50,
      formRFreedom: 0.50,
      formMBTransparency: 0.50,
      formBTransparency: 0.50,
      formMRTransparency: 0.50,
      formRTransparency: 0.50,
      formMBCare: 0.50,
      formBCare: 0.50,
      formMRCare: 0.50,
      formRCare: 0.50,
      formMBXpected: 0.50,
      formBXpected: 0.50,
      formMRXpected: 0.50,
      formRXpected: 0.50,
      formMBHabitat: 0.50,
      formBHabitat: 0.50,
      formMRHabitat: 0.50,
      formRHabitat: 0.50,
      formMBTrust: 0.50,
      formBTrust: 0.50,
      formMRTrust: 0.50,
      formRTrust: 0.50,
      formMBEquivalence: 0.50,
      formMREquivalence: 0.50,
      formBEquivalence: 0.50,
      formREquivalence: 0.50,
      formPairBase: 0.50,
      formPairBaseText: null,
      formPairDiversity: 0.50,
      formPairUnderstanding: 0.50,
      formPairFreedom: 0.50,
      formPairTransparency: 0.50,
      formPairCare: 0.50,
      formPairTrust: 0.50,
      formPairEquivalence: 0.50,
      formPairDiversityText: null,
      formPairUnderstandingText: null,
      formPairFreedomText: null,
      formPairTransparencyText: null,
      formPairCareText: null,
      formPairTrustText: null,
      formPairEquivalenceText: null,
      formPairFinal: 0.50,
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
      if (formNature == 1) {
        //insert data from coo project
      }
      if (formPrevSurvey) {
        this.formProjectID = prevsurvey.project
        this.formGroup = prevsurvey.group
        this.formCountry = prevsurvey.country
        this.formPlace = prevsurvey.place
        this.formParticipant = prevsurvey.participant
        this.formName = prevsurvey.name
        this.formDesc = prevsurvey.desc
        this.formID = prevsurvey.id
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
