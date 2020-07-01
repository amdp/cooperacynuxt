<template>
  <b-container class="m-0 p-0">
    <b-row>
      <b-col cols="1" md="2"></b-col>
      <b-col cols="10" md="8">
        <h2 class="text-center my-3 equivalence">COOPERATION TOOL</h2>
        <p v-if="$store.state.edit" v-html="$store.state.edit"></p>
        <b-form @submit.prevent="cooperationForm()" class="mt-3 was-validated">
          <br />
          <p v-html="$t('cootool.intro')"></p>
          <h5
            class="text-center mb-4 equivalence"
            v-html="$t('cootool.basic')"
          ></h5>
          <b-row class="m-0 p-0 mb-3 text-center">
            <b-col cols="12" v-html="$t('cootool.language')"></b-col>
            <b-col cols="6">
              <nuxt-link
                :to="switchLocalePath('en')"
                v-html="$t('cootool.language1')"
              >
              </nuxt-link>
            </b-col>
            <b-col cols="6">
              <nuxt-link
                :to="switchLocalePath('it')"
                v-html="$t('cootool.language2')"
              >
              </nuxt-link>
            </b-col>
          </b-row>
          <b-form-group label-for="natureInput" :label="$t('cootool.nature')">
            <b-form-select id="natureInput" v-model="formNature" required>
              <option value="0" v-html="$t('cootool.bgroup0')"></option>
              <option value="1" v-html="$t('cootool.bgroup1')"></option>
            </b-form-select>
          </b-form-group>

          <b-form-group
            label-for="projectIDInput"
            :label="$t('cootool.project')"
            v-if="formNature == 1"
          >
            <b-form-input
              id="projectIDInput"
              v-model="formProjectID"
              size="sm"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            label-for="prevSurveyInput"
            :label="$t('cootool.prevsurvey')"
          >
            <b-form-input
              id="prevSurveyInput"
              v-model="formPrevSurvey"
              size="sm"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            label-for="groupInput"
            :label="$t('cootool.group')"
            v-if="formNature == 0"
          >
            <b-form-select id="groupInput" v-model="formGroup" required>
              <option value="1" v-html="$t('cootool.group1')"></option>
              <option value="2" v-html="$t('cootool.group2')"></option>
              <option value="3" v-html="$t('cootool.group3')"></option>
              <option value="4" v-html="$t('cootool.group4')"></option>
              <option value="5" v-html="$t('cootool.group5')"></option>
              <option value="6" v-html="$t('cootool.group6')"></option>
              <option value="7" v-html="$t('cootool.group7')"></option>
            </b-form-select>
          </b-form-group>

          <b-form-group
            label-for="countryInput"
            :label="$t('cootool.country')"
            v-if="formNature == 0"
          >
            <b-form-select id="countryInput" v-model="formCountry">
              <option
                v-for="country in country"
                :key="country.id"
                :value="country.id"
                >{{ country.name }}</option
              >
            </b-form-select>
          </b-form-group>

          <b-form-group
            label-for="placeInput"
            :label="$t('cootool.place')"
            v-if="formNature == 0"
          >
            <b-form-select id="placeInput" v-model="formPlace" required>
              <option
                v-for="place in Mplace"
                :key="place.id"
                :value="place.id"
                >{{ place.name }}</option
              >
            </b-form-select>
          </b-form-group>

          <p class="diversity">
            <i>
              <strong>
                {{ $t('cootool.newplace') }}
                <a v-b-modal.placemodal class="ad finger b">
                  {{ $t('cootool.one') }}
                </a>
              </strong>
            </i>
          </p>

          <b-form-group
            label-for="participantInput"
            :label="$t('cootool.participant')"
          >
            <b-form-input
              id="participantInput"
              v-model="formParticipant"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label-for="nameInput" :label="$t('cootool.name')">
            <b-form-input
              id="nameInput"
              v-model="formName"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label-for="descInput" :label="$t('cootool.desc')">
            <b-form-textarea
              id="descInput"
              v-model="formDesc"
              size="sm"
            ></b-form-textarea>
          </b-form-group>

          <!-- /////// GROUP COOPERATION STATUS /////// -->
          <!-- /////// GROUP COOPERATION STATUS /////// -->
          <!-- /////// GROUP COOPERATION STATUS /////// -->

          <h5 class="text-center mt-5 equivalence">
            {{ $t('cootool.groupcoostatus') }}
          </h5>

          <b-container class="m-0 p-0">
            <p class="diversity it">
              <strong>
                {{ $t('cootool.groupcoointro') }}
              </strong>
            </p>
            <p class="diversity it" v-if="formGroup == 7">
              <strong>
                {{ $t('cootool.groupcoointromyself') }}
              </strong>
            </p>

            <!-- /////////////// B DIVERSITY /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MBDdiversityInput"
              :label="$t('cootool.BD')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMBDiversity * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MBDdiversityInput"
                v-model="formMBDiversity"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formBDiversity * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="BDiversityInput"
                v-model="formBDiversity"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// R DIVERSITY /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MRDdiversityInput"
              :label="$t('cootool.RD')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMRDiversity * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MRDdiversityInput"
                v-model="formMRDiversity"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formRDiversity * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="RDiversityInput"
                v-model="formRDiversity"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// B UNDERSTANDING /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MBUnderstandingInput"
              :label="$t('cootool.BU')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMBUnderstanding * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MBUnderstandingInput"
                v-model="formMBUnderstanding"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formBUnderstanding * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="BUnderstandingInput"
                v-model="formBUnderstanding"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// R UNDERSTANDING /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MRUnderstandingInput"
              :label="$t('cootool.RU')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMRUnderstanding * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MRUnderstandingInput"
                v-model="formMRUnderstanding"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formRUnderstanding * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="RUnderstandingInput"
                v-model="formRUnderstanding"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// B FREEDOM /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MBFreedomInput"
              :label="$t('cootool.BF')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMBFreedom * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MBFreedomInput"
                v-model="formMBFreedom"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formBFreedom * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="BFreedomInput"
                v-model="formBFreedom"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// R FREEDOM /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MRFreedomInput"
              :label="$t('cootool.RF')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMRFreedom * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MRFreedomInput"
                v-model="formMRFreedom"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formRFreedom * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="RFreedomInput"
                v-model="formRFreedom"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// B TRANSPARENCY /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MBTransparencyInput"
              :label="$t('cootool.BI')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMBTransparency * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MBTransparencyInput"
                v-model="formMBTransparency"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formBTransparency * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="BTransparencyInput"
                v-model="formBTransparency"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// R TRANSPARENCY /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MRTransparencyInput"
              :label="$t('cootool.RI')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMRTransparency * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MRTransparencyInput"
                v-model="formMRTransparency"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formRTransparency * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="RTransparencyInput"
                v-model="formRTransparency"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// B CARE /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MBCareInput"
              :label="$t('cootool.BC')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMBCare * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MBCareInput"
                v-model="formMBCare"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formBCare * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="BCareInput"
                v-model="formBCare"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// R CARE /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MRCareInput"
              :label="$t('cootool.RC')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMRCare * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MRCareInput"
                v-model="formMRCare"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formRCare * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="RCareInput"
                v-model="formRCare"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// B XPECTED /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MBXpectedInput"
              :label="$t('cootool.BX')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMBXpected * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MBXpectedInput"
                v-model="formMBXpected"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formBXpected * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="BXpectedInput"
                v-model="formBXpected"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// R XPECTED /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MRXpectedInput"
              :label="$t('cootool.RX')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMRXpected * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MRXpectedInput"
                v-model="formMRXpected"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formRXpected * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="RXpectedInput"
                v-model="formRXpected"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// B HABITAT /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MBHabitatInput"
              :label="$t('cootool.BH')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMBHabitat * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MBHabitatInput"
                v-model="formMBHabitat"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formBHabitat * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="BHabitatInput"
                v-model="formBHabitat"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// R HABITAT /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MRHabitatInput"
              :label="$t('cootool.RH')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMRHabitat * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MRHabitatInput"
                v-model="formMRHabitat"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formRHabitat * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="RHabitatInput"
                v-model="formRHabitat"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// B TRUST /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MBTrustInput"
              :label="$t('cootool.BT')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMBTrust * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MBTrustInput"
                v-model="formMBTrust"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formBTrust * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="BTrustInput"
                v-model="formBTrust"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// R TRUST /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MRTrustInput"
              :label="$t('cootool.RT')"
              label-align="left"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMRTrust * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MRTrustInput"
                v-model="formMRTrust"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formRTrust * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="RTrustInput"
                v-model="formRTrust"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// B EQUIVALENCE /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MBEquivalenceInput"
              :label="$t('cootool.BE')"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMBEquivalence * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MBEquivalenceInput"
                v-model="formMBEquivalence"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formBEquivalence * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="BEquivalenceInput"
                v-model="formBEquivalence"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>

            <!-- /////////////// R EQUIVALENCE /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MREquivalenceInput"
              :label="$t('cootool.RE')"
            >
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p1')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formMREquivalence * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="MREquivalenceInput"
                v-model="formMREquivalence"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
              <b-row>
                <b-col cols="6" class="text-left pr-0">{{
                  $t('cootool.p0')
                }}</b-col>
                <b-col cols="2" class="text-center p-0"></b-col>
                <b-col cols="4" class="text-right pl-0"
                  >{{ Math.round(formREquivalence * 100) }}%</b-col
                >
              </b-row>
              <b-form-input
                id="REquivalenceInput"
                v-model="formREquivalence"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
              ></b-form-input>
            </b-form-group>
          </b-container>

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
              <b-form-group
                class="py-3 t16"
                label-for="basePairInput"
                :label="$t('cootool.PBase')"
                label-align="left"
              >
                <b-row>
                  <b-col cols="4" class="text-left"></b-col>
                  <b-col cols="4" class="text-center"
                    >{{ Math.round(formPairBase * 100) }}%</b-col
                  >

                  <b-col cols="4" class="text-right pl-0"></b-col>
                </b-row>
                <b-form-input
                  id="basePairInput"
                  v-model="formPairBase"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                ></b-form-input>
                <br />
                {{ $t('cootool.details') }}
                <b-form-textarea v-model="formPairBaseText"></b-form-textarea>
              </b-form-group>
              <b-form-group
                class="py-3 t16"
                label-for="diversityPairInput"
                :label="$t('cootool.PD')"
                label-align="left"
              >
                <b-row>
                  <b-col cols="4" class="text-left"></b-col>
                  <b-col cols="4" class="text-center"
                    >{{ Math.round(formPairDiversity * 100) }}%</b-col
                  >

                  <b-col cols="4" class="text-right pl-0"></b-col>
                </b-row>
                <b-form-input
                  id="diversityPairInput"
                  v-model="formPairDiversity"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                ></b-form-input>
                <br />
                {{ $t('cootool.details') }}
                <b-form-textarea
                  v-model="formPairDiversityText"
                ></b-form-textarea>
              </b-form-group>
              <b-form-group
                class="py-3 t16"
                label-for="understandingPairInput"
                :label="$t('cootool.PU')"
                label-align="left"
              >
                <b-row>
                  <b-col cols="4" class="text-left"></b-col>
                  <b-col cols="4" class="text-center"
                    >{{ Math.round(formPairUnderstanding * 100) }}%</b-col
                  >

                  <b-col cols="4" class="text-right pl-0"></b-col>
                </b-row>
                <b-form-input
                  id="understandingPairInput"
                  v-model="formPairUnderstanding"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                ></b-form-input>
                <br />
                {{ $t('cootool.details') }}
                <b-form-textarea
                  v-model="formPairUnderstandingText"
                ></b-form-textarea>
              </b-form-group>
              <b-form-group
                class="py-3 t16"
                label-for="freedomPairInput"
                :label="$t('cootool.PF')"
                label-align="left"
              >
                <b-row>
                  <b-col cols="4" class="text-left"></b-col>
                  <b-col cols="4" class="text-center"
                    >{{ Math.round(formPairFreedom * 100) }}%</b-col
                  >

                  <b-col cols="4" class="text-right pl-0"></b-col>
                </b-row>
                <b-form-input
                  id="freedomPairInput"
                  v-model="formPairFreedom"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                ></b-form-input>
                <br />
                {{ $t('cootool.details') }}
                <b-form-textarea
                  v-model="formPairFreedomText"
                ></b-form-textarea>
              </b-form-group>
              <b-form-group
                class="py-3 t16"
                label-for="transparencyPairInput"
                :label="$t('cootool.PI')"
                label-align="left"
              >
                <b-row>
                  <b-col cols="4" class="text-left"></b-col>
                  <b-col cols="4" class="text-center"
                    >{{ Math.round(formPairTransparency * 100) }}%</b-col
                  >

                  <b-col cols="4" class="text-right pl-0"></b-col>
                </b-row>
                <b-form-input
                  id="transparencyPairInput"
                  v-model="formPairTransparency"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                ></b-form-input>
                <br />
                {{ $t('cootool.details') }}
                <b-form-textarea
                  v-model="formPairTransparencyText"
                ></b-form-textarea>
              </b-form-group>
              <b-form-group
                class="py-3 t16"
                label-for="carePairInput"
                :label="$t('cootool.PC')"
                label-align="left"
              >
                <b-row>
                  <b-col cols="4" class="text-left"></b-col>
                  <b-col cols="4" class="text-center"
                    >{{ Math.round(formPairCare * 100) }}%</b-col
                  >

                  <b-col cols="4" class="text-right pl-0"></b-col>
                </b-row>
                <b-form-input
                  id="carePairInput"
                  v-model="formPairCare"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                ></b-form-input>
                <br />
                {{ $t('cootool.details') }}
                <b-form-textarea v-model="formPairCareText"></b-form-textarea>
              </b-form-group>
              <b-form-group
                class="py-3 t16"
                label-for="trustPairInput"
                :label="$t('cootool.PT')"
                label-align="left"
              >
                <b-row>
                  <b-col cols="4" class="text-left"></b-col>
                  <b-col cols="4" class="text-center"
                    >{{ Math.round(formPairTrust * 100) }}%</b-col
                  >

                  <b-col cols="4" class="text-right pl-0"></b-col>
                </b-row>
                <b-form-input
                  id="trustPairInput"
                  v-model="formPairTrust"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                ></b-form-input>
                <br />
                {{ $t('cootool.details') }}
                <b-form-textarea v-model="formPairTrustText"></b-form-textarea>
              </b-form-group>
              <b-form-group
                class="py-3 t16"
                label-for="equivalencePairInput"
                :label="$t('cootool.PE')"
              >
                <b-row>
                  <b-col cols="4" class="text-left"></b-col>
                  <b-col cols="4" class="text-center"
                    >{{ Math.round(formPairEquivalence * 100) }}%</b-col
                  >

                  <b-col cols="4" class="text-right pl-0"></b-col>
                </b-row>
                <b-form-input
                  id="equivalencePairInput"
                  v-model="formPairEquivalence"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                ></b-form-input>
                <br />
                {{ $t('cootool.details') }}
                <b-form-textarea
                  v-model="formPairEquivalenceText"
                ></b-form-textarea>
              </b-form-group>
              <p v-html="$t('cootool.AFinalNote')" class="t16"></p>
              <b-form-group
                class="py-3 t16"
                label-for="finalPairInput"
                :label="$t('cootool.PFinal')"
                label-align="left"
              >
                <b-row>
                  <b-col cols="4" class="text-left"></b-col>
                  <b-col cols="4" class="text-center"
                    >{{ Math.round(formPairFinal * 100) }}%</b-col
                  >

                  <b-col cols="4" class="text-right pl-0"></b-col>
                </b-row>
                <b-form-input
                  id="finalPairInput"
                  v-model="formPairFinal"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                ></b-form-input>
                <br />
                {{ $t('cootool.explain') }}
                <b-form-textarea v-model="formPairFinalText"></b-form-textarea>
              </b-form-group>
            </b-container>
          </b-container>

          <b-check id="termscheckbox" name="termscheckbox" required>
            <span class="diversity">
              <i>
                {{ $t('cootool.checkbox') }}
                <nuxt-link to="/main/terms" class="au">
                  {{ $t('cootool.checkboxlink') }}
                </nuxt-link>
                {{ $t('cootool.checkboxend') }}
              </i>
            </span>
          </b-check>
          <b-button
            type="submit"
            class="btn bhtrust btn-block mt-3 mb-3 gray border-0"
          >
            <span v-if="!editing">
              {{ $t('cootool.go') }}
            </span>
            <b-spinner small v-if="editing" class="m-1"></b-spinner>
            <span v-if="editing">
              {{ $t('cootool.loading') }}
            </span>
          </b-button>
        </b-form>
      </b-col>
      <b-col cols="1" md="2"></b-col>
    </b-row>

    <!-- MODAL: ADD A NEW PLACE -->

    <b-modal id="placemodal" title="Add a new place" hide-header-close>
      <p class="M-4">{{ $t('addplace.newplace') }}</p>
      <b-form @submit.prevent="addplace">
        <b-form-group
          label-for="newcountryInput"
          :label="$t('addplace.insert')"
        >
          <b-form-select id="newcountryInput" v-model="formNewcountry">
            <option
              v-for="country in newcountry"
              :key="country.id"
              :value="country.id"
            >
              {{ country.name }}
            </option>
          </b-form-select>
          <b-form-input
            id="newplaceInput"
            v-model="formNewplace"
          ></b-form-input>
        </b-form-group>
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
    if (store.state.edit.id) {
    }
  },
  data() {
    return {
      formNature: 0,
      formPrevSurvey: null,
      formProjectID: null,
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
      if (this.$store.state.edit.id) { }
      var formBodyRequest = {
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
