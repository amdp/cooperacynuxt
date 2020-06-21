<template>
  <b-container class="m-0 p-0">
    <b-row>
      <b-col cols="2"></b-col>
      <b-col cols="8">
        <h2 class="text-center mb-4 equivalence">COOPERATION TOOL</h2>
        <p v-if="$store.state.edit" v-html="$store.state.edit"></p>
        <b-form @submit.prevent="cooperationForm()" class="mt-3 was-validated">
          <br />
          <h5
            class="text-center mb-4 equivalence"
            v-html="$t('cootool.basic')"
          ></h5>
          <b-form-group label-for="natureInput" :label="$t('cootool.nature')">
            <b-form-select id="natureInput" v-model="formNature" required>
              <option value="0" v-html="$t('cootool.group0')"></option>
              <option value="1" v-html="$t('cootool.group1')"></option>
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
            <b-form-select id="groupInput" v-model="formGroup">
              <option
                v-for="ecosystem in $store.state.ecosystem"
                :key="ecosystem.id"
                :value="ecosystem.id"
                >{{ ecosystem.name }}</option
              >
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
                <a v-b-modal.placemodal class="ad finger">
                  {{ $t('cootool.one') }}
                </a>
              </strong>
            </i>
          </p>
          <b-form-group label-for="memberInput" :label="$t('cootool.member')">
            <b-form-input
              id="memberInput"
              v-model="formMember"
              size="sm"
              required
            ></b-form-input>
            <b-form-group label-for="nameInput" :label="$t('cootool.name')">
              <b-form-input
                id="nameInput"
                v-model="formName"
                size="sm"
                required
              ></b-form-input>
            </b-form-group>
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

            <!-- /////////////// DIVERSITY /////////////// -->
            
            <b-form-group
              class="py-3 t16"
              label-for="MDdiversityInput"
              :label="$t('cootool.D')"
              label-align="left"
            >
              <b-form-input
                id="MDdiversityInput"
                v-model="formMDiversity"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row class="mb-3">
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">YOU</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
              <b-form-input
                id="diversityInput"
                v-model="formDiversity"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">THE PARTICIPANTS</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>

            <!-- /////////////// UNDERSTANDING /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MunderstandingInput"
              :label="$t('cootool.U')"
              label-align="left"
            >
              <b-form-input
                id="MunderstandingInput"
                v-model="formMUnderstanding"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">YOU</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
              <b-form-input
                id="understandingInput"
                v-model="formUnderstanding"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">THE PARTICIPANTS</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>

            <!-- /////////////// FREEDOM /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MfreedomInput"
              :label="$t('cootool.F')"
              label-align="left"
            >
              <b-form-input
                id="MfreedomInput"
                v-model="formMFreedom"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">YOU</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
              <b-form-input
                id="freedomInput"
                v-model="formFreedom"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">THE PARTICIPANTS</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>

            <!-- /////////////// TRANSPARENCY /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MtransparencyInput"
              :label="$t('cootool.I')"
              label-align="left"
            >
              <b-form-input
                id="MtransparencyInput"
                v-model="formMTransparency"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">YOU</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
              <b-form-input
                id="transparencyInput"
                v-model="formTransparency"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">THE PARTICIPANTS</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>

            <!-- /////////////// CARE AND TRUST EXPECTED /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="BcareInput"
              :label="$t('cootool.BC')"
              label-align="left"
            >
              <b-form-input
                id="MBcareInput"
                v-model="formMBCare"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">YOU</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
              <b-form-input
                id="BcareInput"
                v-model="formBCare"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">THE PARTICIPANTS</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              class="py-3 t16"
              label-for="MBXtrustInput"
              :label="$t('cootool.BXT')"
              label-align="left"
            >
              <b-form-input
                id="MBXtrustInput"
                v-model="formMBXTrust"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">YOU</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
              <b-form-input
                id="BXtrustInput"
                v-model="formBXTrust"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">THE PARTICIPANTS</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              class="py-3 t16"
              label-for="MRcareInput"
              :label="$t('cootool.RC')"
              label-align="left"
            >
              <b-form-input
                id="MRcareInput"
                v-model="formMRCare"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">YOU</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
              <b-form-input
                id="RcareInput"
                v-model="formRCare"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">THE PARTICIPANTS</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              class="py-3 t16"
              label-for="MRXtrustInput"
              :label="$t('cootool.RXT')"
              label-align="left"
            >
              <b-form-input
                id="MRXtrustInput"
                v-model="formMRXTrust"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">YOU</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
              <b-form-input
                id="RXtrustInput"
                v-model="formRXTrust"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">THE PARTICIPANTS</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              class="py-3 t16"
              label-for="MHcareInput"
              :label="$t('cootool.HC')"
              label-align="left"
            >
              <b-form-input
                id="MHcareInput"
                v-model="formMHCare"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">YOU</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
                            <b-form-input
                id="HcareInput"
                v-model="formHCare"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">THE PARTICIPANTS</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>

            <!-- /////////////// TRUST /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MBtrustInput"
              :label="$t('cootool.BT')"
              label-align="left"
            >
              <b-form-input
                id="MBtrustInput"
                v-model="formMBTrust"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">YOU</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
              <b-form-input
                id="BtrustInput"
                v-model="formBTrust"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">THE PARTICIPANTS</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              class="py-3 t16"
              label-for="MRtrustInput"
              :label="$t('cootool.RT')"
              label-align="left"
            >
              <b-form-input
                id="MRtrustInput"
                v-model="formMRTrust"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">YOU</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
              <b-form-input
                id="RtrustInput"
                v-model="formRTrust"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">THE PARTICIPANTS</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>

            <!-- /////////////// EQUIVALENCE /////////////// -->

            <b-form-group
              class="py-3 t16"
              label-for="MBequivalenceInput"
              :label="$t('cootool.BE')"
            >
              <b-form-input
                id="MBequivalenceInput"
                v-model="formMBEquivalence"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">YOU</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
              <b-form-input
                id="BequivalenceInput"
                v-model="formBEquivalence"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">THE PARTICIPANTS</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>

            <b-form-group
              class="py-3 t16"
              label-for="MRequivalenceInput"
              :label="$t('cootool.RE')"
            >
              <b-form-input
                id="MRequivalenceInput"
                v-model="formMREquivalence"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">YOU</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
              <b-form-input
                id="RequivalenceInput"
                v-model="formREquivalence"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center">THE PARTICIPANTS</b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
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
                <b-form-input
                  id="basePairInput"
                  v-model="formPairBase"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value="value"
                ></b-form-input>
                <b-row>
                  <b-col cols="3" class="text-left">{{
                    $t('cootool.p0')
                  }}</b-col>
                  <b-col cols="6" class="text-center"></b-col>
                  <b-col cols="3" class="text-right">{{
                    $t('cootool.p1')
                  }}</b-col>
                </b-row>
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
                <b-form-input
                  id="diversityPairInput"
                  v-model="formPairDiversity"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value="value"
                ></b-form-input>
                <b-row>
                  <b-col cols="3" class="text-left">{{
                    $t('cootool.p0')
                  }}</b-col>
                  <b-col cols="6" class="text-center"></b-col>
                  <b-col cols="3" class="text-right">{{
                    $t('cootool.p1')
                  }}</b-col>
                </b-row>
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
                <b-form-input
                  id="understandingPairInput"
                  v-model="formPairUnderstanding"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value="value"
                ></b-form-input>
                <b-row>
                  <b-col cols="3" class="text-left">{{
                    $t('cootool.p0')
                  }}</b-col>
                  <b-col cols="6" class="text-center"></b-col>
                  <b-col cols="3" class="text-right">{{
                    $t('cootool.p1')
                  }}</b-col>
                </b-row>
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
                <b-form-input
                  id="freedomPairInput"
                  v-model="formPairFreedom"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value="value"
                ></b-form-input>
                <b-row>
                  <b-col cols="3" class="text-left">{{
                    $t('cootool.p0')
                  }}</b-col>
                  <b-col cols="6" class="text-center"></b-col>
                  <b-col cols="3" class="text-right">{{
                    $t('cootool.p1')
                  }}</b-col>
                </b-row>
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
                <b-form-input
                  id="transparencyPairInput"
                  v-model="formPairTransparency"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value="value"
                ></b-form-input>
                <b-row>
                  <b-col cols="3" class="text-left">{{
                    $t('cootool.p0')
                  }}</b-col>
                  <b-col cols="6" class="text-center"></b-col>
                  <b-col cols="3" class="text-right">{{
                    $t('cootool.p1')
                  }}</b-col>
                </b-row>
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
                <b-form-input
                  id="carePairInput"
                  v-model="formPairCare"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value="value"
                ></b-form-input>
                <b-row>
                  <b-col cols="3" class="text-left">{{
                    $t('cootool.p0')
                  }}</b-col>
                  <b-col cols="6" class="text-center"></b-col>
                  <b-col cols="3" class="text-right">{{
                    $t('cootool.p1')
                  }}</b-col>
                </b-row>
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
                <b-form-input
                  id="trustPairInput"
                  v-model="formPairTrust"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value="value"
                ></b-form-input>
                <b-row>
                  <b-col cols="3" class="text-left">{{
                    $t('cootool.p0')
                  }}</b-col>
                  <b-col cols="6" class="text-center"></b-col>
                  <b-col cols="3" class="text-right">{{
                    $t('cootool.p1')
                  }}</b-col>
                </b-row>
                <br />
                {{ $t('cootool.details') }}
                <b-form-textarea v-model="formPairTrustText"></b-form-textarea>
              </b-form-group>
              <b-form-group
                class="py-3 t16"
                label-for="equivalencePairInput"
                :label="$t('cootool.PE')"
              >
                <b-form-input
                  id="equivalencePairInput"
                  v-model="formPairEquivalence"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value="value"
                ></b-form-input>
                <b-row>
                  <b-col cols="3" class="text-left">{{
                    $t('cootool.p0')
                  }}</b-col>
                  <b-col cols="6" class="text-center"></b-col>
                  <b-col cols="3" class="text-right">{{
                    $t('cootool.p1')
                  }}</b-col>
                </b-row>
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
                <b-form-input
                  id="finalPairInput"
                  v-model="formPairFinal"
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value="value"
                ></b-form-input>
                <b-row>
                  <b-col cols="3" class="text-left">{{
                    $t('cootool.p0')
                  }}</b-col>
                  <b-col cols="6" class="text-center"></b-col>
                  <b-col cols="3" class="text-right">{{
                    $t('cootool.p1')
                  }}</b-col>
                </b-row>
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
      <b-col cols="2"></b-col>
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
      formMember: 3,
      formName: null,
      formDesc: null,
      formMDiversity: 0.50,
      formDiversity: 0.50,
      formMHDiversity: 0.50,
      formHDiversity: 0.50,
      formMUnderstanding: 0.50,
      formOUnderstanding: 0.50,
      formUnderstanding: 0.50,
      formMHUnderstanding: 0.50,
      formHUnderstanding: 0.50,
      formMFreedom: 0.50,
      formFreedom: 0.50,
      formMHFreedom: 0.50,
      formHFreedom: 0.50,
      formMTransparency: 0.50,
      formOTransparency: 0.50,
      formTransparency: 0.50,
      formMHTransparency: 0.50,
      formHTransparency: 0.50,
      formMBCare: 0.50,
      formMRCare: 0.50,
      formBCare: 0.50,
      formRCare: 0.50,
      formMHCare: 0.50,
      formHCare: 0.50,
      formMBTrust: 0.50,
      formOBTrust: 0.50,
      formMRTrust: 0.50,
      formORTrust: 0.50,
      formBTrust: 0.50,
      formRTrust: 0.50,
      formMBXTrust: 0.50,
      formMRXTrust: 0.50,
      formBXTrust: 0.50,
      formRXTrust: 0.50,
      formMHTrust: 0.50,
      formHTrust: 0.50,
      formMBEquivalence: 0.50,
      formMREquivalence: 0.50,
      formBEquivalence: 0.50,
      formREquivalence: 0.50,
      formMHEquivalence: 0.50,
      formHEquivalence: 0.50,
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
        member: this.formMember,
        name: this.formName,
        desc: this.formDesc,
        MD: this.formMDiversity,
        D: this.formDiversity,
        MHD: this.formMHDiversity,
        HD: this.formHDiversity,
        MU: this.formMUnderstanding,
        OU: this.formOUnderstanding,
        U: this.formUnderstanding,
        MHU: this.formMHUnderstanding,
        HU: this.formHUnderstanding,
        MF: this.formMFreedom,
        F: this.formFreedom,
        MHF: this.formMHFreedom,
        HF: this.formHFreedom,
        MI: this.formMTransparency,
        OI: this.formOTransparency,
        I: this.formTransparency,
        MHI: this.formMHTransparency,
        HI: this.formHTransparency,
        MBC: this.formMBCare,
        MRC: this.formMRCare,
        BC: this.formBCare,
        RC: this.formRCare,
        MHC: this.formMHCare,
        HC: this.formHCare,
        MBT: this.formMBTrust,
        OBT: this.formOBTrust,
        MRT: this.formMRTrust,
        ORT: this.formORTrust,
        BT: this.formBTrust,
        RT: this.formRTrust,
        MBXT: this.formMBXTrust,
        MRXT: this.formMRXTrust,
        BXT: this.formBXTrust,
        RXT: this.formRXTrust,
        MHT: this.formMHTrust,
        HT: this.formHTrust,
        MBE: this.formMBEquivalence,
        MRE: this.formMREquivalence,
        BE: this.formBEquivalence,
        RE: this.formREquivalence,
        MHE: this.formMHEquivalence,
        HE: this.formHEquivalence,
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
