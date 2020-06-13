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
                v-for="place in myplace"
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

          <!-- /////////////// GROUP COOPERATION STATUS /////////////// -->

          <h5 class="text-center mt-5 equivalence">
            {{ $t('cootool.groupcoostatus') }}
          </h5>

          <b-container class="m-0 p-0">
            <p class="diversity it">
              <strong>
                {{ $t('cootool.groupcoointro') }}
              </strong>
            </p>
            <b-form-group
              class="py-3 t16"
              label-for="diversityInput"
              :label="$t('cootool.D')"
              label-align="left"
            >
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
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="understandingInput"
              :label="$t('cootool.U')"
              label-align="left"
            >
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
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="freedomInput"
              :label="$t('cootool.F')"
              label-align="left"
            >
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
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="transparencyInput"
              :label="$t('cootool.I')"
              label-align="left"
            >
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
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="careInput"
              :label="$t('cootool.CB')"
              label-align="left"
            >
              <b-form-input
                id="careInput"
                v-model="formCare"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="trustInput"
              :label="$t('cootool.T')"
              label-align="left"
            >
              <b-form-input
                id="trustInput"
                v-model="formTrust"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="equivalenceInput"
              :label="$t('cootool.E')"
            >
              <b-form-input
                id="equivalenceInput"
                v-model="formEquivalence"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>
          </b-container>

          <!-- /////////////// GROUP AND MYSELF STATUS /////////////// -->

          <b-container class="m-0 p-0" v-if="formGroup != 7">
            <h5 class="text-center mt-5 mb-2 equivalence">
              {{ $t('cootool.groupmyself') }}
            </h5>

            <b-check v-model="groupmecheckbox" class="text-center my-5">
              {{ $t('cootool.apply') }}
            </b-check>
            <b-container class="m-0 p-0" v-if="groupmecheckbox">
              <b-form-group
                class="py-3 t16"
                label-for="diversityMyInput"
                :label="$t('cootool.MD')"
                label-align="left"
              >
                <b-form-input
                  id="diversityMyInput"
                  v-model="formMyDiversity"
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
              </b-form-group>
              <b-form-group
                class="py-3 t16"
                label-for="understandingMyInput"
                :label="$t('cootool.MU')"
                label-align="left"
              >
                <b-form-input
                  id="understandingMyInput"
                  v-model="formMyUnderstanding"
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
              </b-form-group>
              <b-form-group
                class="py-3 t16"
                label-for="freedomMyInput"
                :label="$t('cootool.MF')"
                label-align="left"
              >
                <b-form-input
                  id="freedomMyInput"
                  v-model="formMyFreedom"
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
              </b-form-group>
              <b-form-group
                class="py-3 t16"
                label-for="transparencyMyInput"
                :label="$t('cootool.MI')"
                label-align="left"
              >
                <b-form-input
                  id="transparencyMyInput"
                  v-model="formMyTransparency"
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
              </b-form-group>
              <b-form-group
                class="py-3 t16"
                label-for="careMyInput"
                :label="$t('cootool.MC')"
                label-align="left"
              >
                <b-form-input
                  id="careMyInput"
                  v-model="formMyCare"
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
              </b-form-group>
              <b-form-group
                class="py-3 t16"
                label-for="trustMyInput"
                :label="$t('cootool.MT')"
                label-align="left"
              >
                <b-form-input
                  id="trustMyInput"
                  v-model="formMyTrust"
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
              </b-form-group>
              <b-form-group
                class="py-3 t16"
                label-for="equivalenceMyInput"
                :label="$t('cootool.ME')"
              >
                <b-form-input
                  id="equivalenceMyInput"
                  v-model="formMyEquivalence"
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
              </b-form-group>
            </b-container>
          </b-container>

          <!-- /////////////// GROUP ENVIRONMENT STATUS /////////////// -->

          <h5 class="text-center mt-5 mb-2 equivalence">
            {{ $t('cootool.groupenv') }}
          </h5>

          <b-check v-model="groupenvcheckbox" class="text-center my-5">
            {{ $t('cootool.apply') }}
          </b-check>
          <b-container class="m-0 p-0" v-if="groupenvcheckbox">
            <p class="diversity it">
              <strong>
                {{ $t('cootool.groupenvintro') }}
              </strong>
            </p>
            <b-form-group
              class="py-3 t16"
              label-for="diversityEnvInput"
              :label="$t('cootool.HD')"
              label-align="left"
            >
              <b-form-input
                id="diversityEnvInput"
                v-model="formEnvDiversity"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="understandingEnvInput"
              :label="$t('cootool.HU')"
              label-align="left"
            >
              <b-form-input
                id="understandingEnvInput"
                v-model="formEnvUnderstanding"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="freedomEnvInput"
              :label="$t('cootool.HF')"
              label-align="left"
            >
              <b-form-input
                id="freedomEnvInput"
                v-model="formEnvFreedom"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="transparencyEnvInput"
              :label="$t('cootool.HI')"
              label-align="left"
            >
              <b-form-input
                id="transparencyEnvInput"
                v-model="formEnvTransparency"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="careEnvInput"
              :label="$t('cootool.HC')"
              label-align="left"
            >
              <b-form-input
                id="careEnvInput"
                v-model="formEnvCare"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="trustEnvInput"
              :label="$t('cootool.HT')"
              label-align="left"
            >
              <b-form-input
                id="trustEnvInput"
                v-model="formEnvTrust"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">{{
                  $t('cootool.p1')
                }}</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="equivalenceEnvInput"
              :label="$t('cootool.HE')"
            >
              <b-form-input
                id="equivalenceEnvInput"
                v-model="formEnvEquivalence"
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">{{ $t('cootool.p0') }}</b-col>
                <b-col cols="6" class="text-center"></b-col>
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
            <b-check v-model="pairgroupcheckbox" class="text-center my-5">
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
      <p class="my-4">{{ $t('addplace.newplace') }}</p>
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
      formDiversity: 0.50,
      formUnderstanding: 0.50,
      formFreedom: 0.50,
      formTransparency: 0.50,
      formCare: 0.50,
      formTrust: 0.50,
      formEquivalence: 0.50,
      formEnvDiversity: 0.50,
      formEnvUnderstanding: 0.50,
      formEnvFreedom: 0.50,
      formEnvTransparency: 0.50,
      formEnvCare: 0.50,
      formEnvTrust: 0.50,
      formEnvEquivalence: 0.50,
      formMyDiversity: 0.50,
      formMyUnderstanding: 0.50,
      formMyFreedom: 0.50,
      formMyTransparency: 0.50,
      formMyCare: 0.50,
      formMyTrust: 0.50,
      formMyEquivalence: 0.50,
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
    myplace() {
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
        D: this.formDiversity,
        U: this.formUnderstanding,
        F: this.formFreedom,
        I: this.formTransparency,
        C: this.formCare,
        T: this.formTrust,
        E: this.formEquivalence,
        HD: this.formEnvDiversity,
        HU: this.formEnvUnderstanding,
        HF: this.formEnvFreedom,
        HI: this.formEnvTransparency,
        HC: this.formEnvCare,
        HT: this.formEnvTrust,
        HE: this.formEnvEquivalence,
        MD: this.formMyDiversity,
        MU: this.formMyUnderstanding,
        MF: this.formMyFreedom,
        MI: this.formMyTransparency,
        MC: this.formMyCare,
        MT: this.formMyTrust,
        ME: this.formMyEquivalence,
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
