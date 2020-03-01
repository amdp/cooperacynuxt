<template>
  <b-container class="m-0 p-0">
    <b-row>
      <b-col cols="2"></b-col>
      <b-col cols="8">
        <h2 class="text-center mb-4 equivalence">THE COOPERATION TOOL</h2>
        <b-form @submit.prevent="cooperationForm()" class="mt-3 was-validated">
          <br />
          <h5 class="text-center mb-4 equivalence">
            BASIC INFORMATION
          </h5>
          <b-form-group
            label-for="natureInput"
            label="Nature:"
            description="Do you want to evaluate a generic group, like companies, communities, friends or a Cooperacy project one?"
          >
            <b-form-select id="natureInput" v-model="formNature" required>
              <option value="0">A Group</option>
              <option value="1">A Cooperacy Project Group</option>
            </b-form-select>
          </b-form-group>

          <b-form-group
            label-for="projectIDInput"
            label="Project ID:"
            description="What is the project ID?"
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
            label-for="pairingInput"
            label="Pairing:"
            description="Is there any specific contrast you are having in your group?"
          >
            <b-form-select id="pairingInput" v-model="formPairing" required>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </b-form-select>
          </b-form-group>

          <b-form-group
            label-for="groupInput"
            label="Group:"
            description="Choose the kind of group you want to evaluate"
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
            label="Country:"
            description="Please insert the country of your group"
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
            label="Place:"
            description="Please insert the place of your group, for example the location of their headquarters or the capital city for nations"
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
            <i
              ><strong>
                If you do not find your place, please feel free to add a new
                <b-link v-b-modal.placemodal class="ad">one</b-link></strong
              ></i
            >
          </p>
          <b-form-group
            label-for="nameInput"
            label="Name:"
            description="Please insert your group name"
          >
            <b-form-input
              id="nameInput"
              v-model="formName"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label-for="descInput"
            label="Description:"
            description="Please insert a description of the group and eventual current difficulties"
          >
            <b-form-textarea
              id="descInput"
              v-model="formDesc"
              size="sm"
            ></b-form-textarea>
          </b-form-group>

          <!-- /////////////// GROUP COOPERATION STATUS /////////////// -->

          <h5 class="text-center my-5 equivalence">
            GROUP COOPERATION STATUS
          </h5>

          <p class="diversity it">
            <strong>
              Tell us something about the participants of the group. Note: if
              you are evaluating yourself, "the participants" are two: what you
              are now and what you would like to be.
            </strong>
          </p>
          <b-form-group
            class="py-3 t16"
            label-for="diversityInput"
            label="Do you find the participants are different one another in their beliefs, age, language, wealth, and so on?"
            label-align="left"
          >
            <b-form-input
              id="diversityInput"
              v-model="formDiversity"
              type="range"
              min="0"
              max="100"
              step="1"
              value="value"
            ></b-form-input>
            <b-row>
              <b-col cols="3" class="text-left">NO</b-col>
              <b-col cols="6" class="text-center"></b-col>
              <b-col cols="3" class="text-right">YES</b-col>
            </b-row>
          </b-form-group>
          <b-form-group
            class="py-3 t16"
            label-for="understandingInput"
            label="Do you find the participants understand each other?"
            label-align="left"
          >
            <b-form-input
              id="understandingInput"
              v-model="formUnderstanding"
              type="range"
              min="0"
              max="100"
              step="1"
              value="value"
            ></b-form-input>
            <b-row>
              <b-col cols="3" class="text-left">NO</b-col>
              <b-col cols="6" class="text-center"></b-col>
              <b-col cols="3" class="text-right">YES</b-col>
            </b-row>
          </b-form-group>
          <b-form-group
            class="py-3 t16"
            label-for="freedomInput"
            label="Do you think the participants have the same degree of freedom?"
            label-align="left"
          >
            <b-form-input
              id="freedomInput"
              v-model="formFreedom"
              type="range"
              min="0"
              max="100"
              step="1"
              value="value"
            ></b-form-input>
            <b-row>
              <b-col cols="3" class="text-left">NO</b-col>
              <b-col cols="6" class="text-center"></b-col>
              <b-col cols="3" class="text-right">YES</b-col>
            </b-row>
          </b-form-group>
          <b-form-group
            class="py-3 t16"
            label-for="transparencyInput"
            label="Do you find the participants show what they think or feel?"
            label-align="left"
          >
            <b-form-input
              id="transparencyInput"
              v-model="formTransparency"
              type="range"
              min="0"
              max="100"
              step="1"
              value="value"
            ></b-form-input>
            <b-row>
              <b-col cols="3" class="text-left">NO</b-col>
              <b-col cols="6" class="text-center"></b-col>
              <b-col cols="3" class="text-right">YES</b-col>
            </b-row>
          </b-form-group>
          <b-form-group
            class="py-3 t16"
            label-for="careInput"
            label="Are the participants satisfied with the money, goods, services, personal achievement, respect and care they receive from the group interaction?"
            label-align="left"
          >
            <b-form-input
              id="careInput"
              v-model="formCare"
              type="range"
              min="0"
              max="100"
              step="1"
              value="value"
            ></b-form-input>
            <b-row>
              <b-col cols="3" class="text-left">NO</b-col>
              <b-col cols="6" class="text-center"></b-col>
              <b-col cols="3" class="text-right">YES</b-col>
            </b-row>
          </b-form-group>
          <b-form-group
            class="py-3 t16"
            label-for="trustInput"
            label="Do the participants trust each other?"
            label-align="left"
          >
            <b-form-input
              id="trustInput"
              v-model="formTrust"
              type="range"
              min="0"
              max="100"
              step="1"
              value="value"
            ></b-form-input>
            <b-row>
              <b-col cols="3" class="text-left">NO</b-col>
              <b-col cols="6" class="text-center"></b-col>
              <b-col cols="3" class="text-right">YES</b-col>
            </b-row>
          </b-form-group>
          <b-form-group
            class="py-3 t16"
            label-for="equivalenceInput"
            label="Are money, goods, services, personal achievement, respect and care the participants receive equivalent or proportional to their roles and efforts?"
          >
            <b-form-input
              id="equivalenceInput"
              v-model="formEquivalence"
              type="range"
              min="0"
              max="100"
              step="1"
              value="value"
            ></b-form-input>
            <b-row>
              <b-col cols="3" class="text-left">NO</b-col>
              <b-col cols="6" class="text-center"></b-col>
              <b-col cols="3" class="text-right">YES</b-col>
            </b-row>
          </b-form-group>

          <!-- /////////////// GROUP AND MYSELF STATUS /////////////// -->
          <b-container class="m-0 p-0" v-if="formGroup != 7">
            <h5 class="text-center my-5 equivalence">
              THE GROUP AND MYSELF
            </h5>

            <b-form-group
              class="py-3 t16"
              label-for="diversityMyInput"
              label="Do you consider yourself different than the other participants?"
              label-align="left"
            >
              <b-form-input
                id="diversityMyInput"
                v-model="formMyDiversity"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="understandingMyInput"
              label="Do you and the other participants understand each other?"
              label-align="left"
            >
              <b-form-input
                id="understandingMyInput"
                v-model="formMyUnderstanding"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="freedomMyInput"
              label="Do you feel you have the same degree of freedom as the other participants?"
              label-align="left"
            >
              <b-form-input
                id="freedomMyInput"
                v-model="formMyFreedom"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="transparencyMyInput"
              label="Do you feel you are free to show how you feel and think?"
              label-align="left"
            >
              <b-form-input
                id="transparencyMyInput"
                v-model="formMyTransparency"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="careMyInput"
              label="Are you satisfied with the money, goods, services, personal achievement, respect and care you receive from the interaction with the group? "
              label-align="left"
            >
              <b-form-input
                id="careMyInput"
                v-model="formMyCare"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="trustMyInput"
              label="Do you trust the other participants?"
              label-align="left"
            >
              <b-form-input
                id="trustMyInput"
                v-model="formMyTrust"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="equivalenceMyInput"
              label="Compared to others, do you think money, goods, services, personal achievement, respect and care you receive are equivalent or proportional to your role and efforts?"
            >
              <b-form-input
                id="equivalenceMyInput"
                v-model="formMyEquivalence"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
            </b-form-group>
          </b-container>

          <!-- /////////////// GROUP ENVIRONMENT STATUS /////////////// -->

          <h5 class="text-center my-5 equivalence">
            THE GROUP ENVIRONMENT
          </h5>

          <p class="diversity it">
            <strong>
              The environment is a very important part of a group, it is like if
              there were one more participant in the interaction. Please
              consider "environment" both the natural aspect and the physical
              place, like a building or a house, where the participants actions
              take place.
            </strong>
          </p>
          <b-form-group
            class="py-3 t16"
            label-for="diversityEnvInput"
            label="Is the space different than the culture, the beliefs and the needs of the participants?"
            label-align="left"
          >
            <b-form-input
              id="diversityEnvInput"
              v-model="formEnvDiversity"
              type="range"
              min="0"
              max="100"
              step="1"
              value="value"
            ></b-form-input>
            <b-row>
              <b-col cols="3" class="text-left">NO</b-col>
              <b-col cols="6" class="text-center"></b-col>
              <b-col cols="3" class="text-right">YES</b-col>
            </b-row>
          </b-form-group>
          <b-form-group
            class="py-3 t16"
            label-for="understandingEnvInput"
            label="Do the participants know their environment in detail?"
            label-align="left"
          >
            <b-form-input
              id="understandingEnvInput"
              v-model="formEnvUnderstanding"
              type="range"
              min="0"
              max="100"
              step="1"
              value="value"
            ></b-form-input>
            <b-row>
              <b-col cols="3" class="text-left">NO</b-col>
              <b-col cols="6" class="text-center"></b-col>
              <b-col cols="3" class="text-right">YES</b-col>
            </b-row>
          </b-form-group>
          <b-form-group
            class="py-3 t16"
            label-for="freedomEnvInput"
            label="Do the participants feel free to move around in the environment, to come and go from it, and have enough space for themselves?"
            label-align="left"
          >
            <b-form-input
              id="freedomEnvInput"
              v-model="formEnvFreedom"
              type="range"
              min="0"
              max="100"
              step="1"
              value="value"
            ></b-form-input>
            <b-row>
              <b-col cols="3" class="text-left">NO</b-col>
              <b-col cols="6" class="text-center"></b-col>
              <b-col cols="3" class="text-right">YES</b-col>
            </b-row>
          </b-form-group>
          <b-form-group
            class="py-3 t16"
            label-for="transparencyEnvInput"
            label="Can the participants easily obtain the right informations about the environment details and functionalities?"
            label-align="left"
          >
            <b-form-input
              id="transparencyEnvInput"
              v-model="formEnvTransparency"
              type="range"
              min="0"
              max="100"
              step="1"
              value="value"
            ></b-form-input>
            <b-row>
              <b-col cols="3" class="text-left">NO</b-col>
              <b-col cols="6" class="text-center"></b-col>
              <b-col cols="3" class="text-right">YES</b-col>
            </b-row>
          </b-form-group>
          <b-form-group
            class="py-3 t16"
            label-for="careEnvInput"
            label="Do the participants like their environment?"
            label-align="left"
          >
            <b-form-input
              id="careEnvInput"
              v-model="formEnvCare"
              type="range"
              min="0"
              max="100"
              step="1"
              value="value"
            ></b-form-input>
            <b-row>
              <b-col cols="3" class="text-left">NO</b-col>
              <b-col cols="6" class="text-center"></b-col>
              <b-col cols="3" class="text-right">YES</b-col>
            </b-row>
          </b-form-group>
          <b-form-group
            class="py-3 t16"
            label-for="trustEnvInput"
            label="Do the participants feel their environment is safe and reliable?"
            label-align="left"
          >
            <b-form-input
              id="trustEnvInput"
              v-model="formEnvTrust"
              type="range"
              min="0"
              max="100"
              step="1"
              value="value"
            ></b-form-input>
            <b-row>
              <b-col cols="3" class="text-left">NO</b-col>
              <b-col cols="6" class="text-center"></b-col>
              <b-col cols="3" class="text-right">YES</b-col>
            </b-row>
          </b-form-group>
          <b-form-group
            class="py-3 t16"
            label-for="equivalenceEnvInput"
            label="Are the environment spaces and their advantages distributed amongst the participants evenly or proportionally to their roles and efforts?"
          >
            <b-form-input
              id="equivalenceEnvInput"
              v-model="formEnvEquivalence"
              type="range"
              min="0"
              max="100"
              step="1"
              value="value"
            ></b-form-input>
            <b-row>
              <b-col cols="3" class="text-left">NO</b-col>
              <b-col cols="6" class="text-center"></b-col>
              <b-col cols="3" class="text-right">YES</b-col>
            </b-row>
          </b-form-group>

          <!-- /////////////// PAIRING /////////////// -->
          <!-- /////////////// PAIRING /////////////// -->
          <!-- /////////////// PAIRING /////////////// -->

          <b-container class="m-0 p-0" v-if="formPairing == 1">
            <h5 class="text-center my-5 equivalence">
              PAIRING
            </h5>
            <b-form-group
              class="py-3 t16"
              label-for="basePairInput"
              label="How do we decide together? This question is fundamental for the group: it doesn't ask what to do, but how to decide what to do. Do you have any methodology to follow in order to take collective decisions?"
              label-align="left"
            >
              <b-form-input
                id="basePairInput"
                v-model="formPairBase"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
              <br />
              If you want, add some details:
              <b-form-textarea v-model="formPairBaseText"></b-form-textarea>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="diversityPairInput"
              label="Sometimes contrasting ideas or people can be useful together, if the group defines specific roles for them. For example, in a contrast between someone wanting more innovation and someone wanting more security, you may give them specific roles in the group for it to be innovative in a safe way. Try this approach. Is it useful?"
              label-align="left"
            >
              <b-form-input
                id="diversityPairInput"
                v-model="formPairDiversity"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
              <br />
              If you want, add some details:
              <b-form-textarea
                v-model="formPairDiversityText"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="understandingPairInput"
              label="List or discuss what are your participants most important principles and filter the ones in common. For example, even two opponent soldiers in a war may have their family safety in common. Use your common principles to evaluate your decisions. Try this approach. Is it useful?"
              label-align="left"
            >
              <b-form-input
                id="understandingPairInput"
                v-model="formPairUnderstanding"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
              <br />
              If you want, add some details:
              <b-form-textarea
                v-model="formPairUnderstandingText"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="freedomPairInput"
              label="Check that all the participants have some personal space, both physical one and space for personal action. If it is not so, the group may need to separate. Separation is not 'bad', sometimes is a good natural step. Try this approach. Is it useful?"
              label-align="left"
            >
              <b-form-input
                id="freedomPairInput"
                v-model="formPairFreedom"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
              <br />
              If you want, add some details:
              <b-form-textarea v-model="formPairFreedomText"></b-form-textarea>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="transparencyPairInput"
              label="It is important that any information that is not shared or any point of view that is not expressed should come up and overall be accepted by the group, no matter how bad it is. When truths are difficult to say or hear, give as much precise information as possible to understand how that truth come up and the principles that made up the choice behind the truth itself. Try this approach. Is it useful?"
              label-align="left"
            >
              <b-form-input
                id="transparencyPairInput"
                v-model="formPairTransparency"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
              <br />
              If you want, add some details:
              <b-form-textarea
                v-model="formPairTransparencyText"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="carePairInput"
              label="When taking decisions or discussing delicate topics, the participants need a good environment and the right level of respect or care about their basic and intellectual needs. Try this approach. Is it useful?"
              label-align="left"
            >
              <b-form-input
                id="carePairInput"
                v-model="formPairCare"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
              <br />
              If you want, add some details:
              <b-form-textarea v-model="formPairCareText"></b-form-textarea>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="trustPairInput"
              label="Sometimes the group needs to wait and meanwhile find measurements tool to evaluate the situation giving it a little more time. Trust your previous decisions while you evaluate them. Try this approach. Is it useful?"
              label-align="left"
            >
              <b-form-input
                id="trustPairInput"
                v-model="formPairTrust"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
              <br />
              If you want, add some details:
              <b-form-textarea v-model="formPairTrustText"></b-form-textarea>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="equivalencePairInput"
              label="If the group doesn't know which solution to take or if there is a contrast between different approaches, it could be very useful to experiment the different solutions giving them turns. Try this approach. Is it useful?"
            >
              <b-form-input
                id="equivalencePairInput"
                v-model="formPairEquivalence"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
              <br />
              If you want, add some details:
              <b-form-textarea
                v-model="formPairEquivalenceText"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group
              class="py-3 t16"
              label-for="finalPairInput"
              label="Again, how do we decide together? This is the fundamental question. If nothing worked so far, go back to the oldest way: vote. But this time, list the possible options, let everyone give maximum one vote to any solutions, even all of them. Then be careful: do NOT choose the highest voted solution, but proportionally dedicate your efforts, budgets and time to develop or test them, or eventually start from the first to the last all together. Try this approach. Is it useful?"
              label-align="left"
            >
              <b-form-input
                id="finalPairInput"
                v-model="formPairFinal"
                type="range"
                min="0"
                max="100"
                step="1"
                value="value"
              ></b-form-input>
              <b-row>
                <b-col cols="3" class="text-left">NO</b-col>
                <b-col cols="6" class="text-center"></b-col>
                <b-col cols="3" class="text-right">YES</b-col>
              </b-row>
              <br />
              Please explain why so we can learn from your experience!
              <b-form-textarea v-model="formPairFinalText"></b-form-textarea>
            </b-form-group>
          </b-container>

          <b-check id="termscheckbox" name="termscheckbox" required>
            <span class="diversity">
              <i>
                By clicking the GO! button you declare you read and are aware of
                the Cooperacy
                <nuxt-link to="/main/terms" class="au"
                  >terms and conditions</nuxt-link
                >, and that you acknowledge that this is an experimental tool
                based on scientific research but that has no liability nor gives
                you any warranty about your personal choices and future action
                that you will bring forward after fulfilling this questionnaire
                and reading its result.
              </i>
            </span>
          </b-check>
          <b-button
            type="submit"
            class="btn bhtrust btn-block mt-3 mb-3 gray border-0"
          >
            <span v-if="!editing">GO!</span>
            <b-spinner small v-if="editing" class="m-1"></b-spinner>
            <span v-if="editing">Loading your form..</span>
          </b-button>
        </b-form>
      </b-col>
      <b-col cols="2"></b-col>
    </b-row>
    <!-- MODAL: ADD A NEW PLACE -->
    <b-modal id="placemodal" title="Add a new place" hide-header-close>
      <p class="my-4">Add a new place:</p>
      <b-form @submit.prevent="addplace">
        <b-form-group
          label-for="newcountryInput"
          label="Country:"
          description="Insert a place name after choosing a country"
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
        <b-button size="sm" class="bcare" @click="addplace()">ADD</b-button>
        <b-button size="sm" class="btransparency" @click="cancel()"
          >CLOSE</b-button
        >
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
      await store.dispatch('getProjectAction', {
        projectid: store.state.edit.id,
        limit: ' LIMIT 1',
        userid: store.state.auth.user.id
      })
    }
  },
  data() {
    return {
      formNature: 0,
      formPairing: 1,
      formProjectID: null,
      formGroup: null,
      formCountry: 1,
      formPlace: null,
      formName: null,
      formDesc: null,
      formDiversity: 50,
      formUnderstanding: 50,
      formFreedom: 50,
      formTransparency: 50,
      formCare: 50,
      formTrust: 50,
      formEquivalence: 50,
      formEnvDiversity: 50,
      formEnvUnderstanding: 50,
      formEnvFreedom: 50,
      formEnvTransparency: 50,
      formEnvCare: 50,
      formEnvTrust: 50,
      formEnvEquivalence: 50,
      formMyDiversity: 50,
      formMyUnderstanding: 50,
      formMyFreedom: 50,
      formMyTransparency: 50,
      formMyCare: 50,
      formMyTrust: 50,
      formMyEquivalence: 50,
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
    }
  },
  computed: {
    nameInputState() {
      return this.name.length > 4 ? true : false
    },
    projectImage() {
      if (this.$store.state.project.id) {
        return '/assets/image/project/' + this.$store.state.project.id + '.png'
      }
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
  mounted() {
    if (
      this.$store.state.edit.id &&
      this.$store.state.project[0].anonymous == 1
    ) {
      return (this.formAnonymous = 1)
    }
    if (this.$store.state.edit.id && this.$store.state.project[0].stage != 2) {
      return (this.formStageFunding = 7)
    }
    if (this.$store.state.edit.id && this.$store.state.project[0].place) {
      return (this.formPlace = this.$store.state.project[0].place)
    }
    if (this.$store.state.edit.id && this.$store.state.project[0].stage == 2) {
      totalfreeproject()
    }
    this.formCountry = 1
    this.formPlace = 1
  },
  methods: {
    totalfreeproject() {
      if (this.formStageFunding == 2) {
        this.formBudget = this.formFee * this.formAttendee
      }
    },
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
      return null
      this.editing = true
      // This function creates and sends database request body both for project creation and updating
      //'new' is set for a new project, if not the param.id is taken from url to update or copy old ones
      let projectid = 'new'
      if (this.$store.state.edit.id && !this.$store.state.edit.copy) {
        projectid = this.$store.state.edit.id
      }
      var formBodyRequest = {
        id: projectid,
        stage: this.formStageFunding,
        name: this.formName,
        country: this.formCountry,
        place: this.formPlace,
        brief: this.formTitle,
        content: '' + this.formContent, //leave '' here
        video: '' + this.formVideo, //leave '' here
        anonymous: this.formAnonymous,
        parent: this.formParent,
        category: this.formCategory,
        collect: this.formFee,
        budget: this.formBudget,
        hudget: this.formHudget,
      }
      let res
      try {
        //vuex action to the database, the 'res'[ponse] variable brings the recently created or edited project >id< from the server..
        res = await this.$store.dispatch('projectFormAction', formBodyRequest)

        //..in order to use it in the image creation and to make the user a participant of its project:
        if (res == 'exists') {
          return this.$toast.show('Project already exists!', {
            duration: 1000,
            className: 'toast'
          })
        }
        if (projectid == 'new') {
          let freedomvote = {
            id: res,
            condition: 'F',
            user: this.$auth.user.id,
            proptype: 'project'
          }
          this.$store.dispatch('addVoteAction', freedomvote)
          this.$store.dispatch('professionalAction', {
            project: res,
            user: this.$auth.user.id
          })
        }
        this.imageUpload(res)
      } catch (err) {
        console.log(' ' + JSON.stringify(err))
        alert(err)
      }
    },
    async imageUpload(id) {
      let formImageData = new FormData()
      formImageData.append('file', this.formImageFile)
      formImageData.append('id', id)
      formImageData.append('proptype', 'project')
      // for (var key of formImageData.entries()) {
      //   console.log(key[0] + ', ' + key[1])
      // }
      let res
      try {
        res = await this.$store.dispatch('imageUploadAction', {
          formImageData: formImageData,
          headers: { headers: { 'Content-Type': 'multipart/form-data' } },
          proptype: 'project'
        })
      } catch (err) {
        console.log(err)
        alert(err)
      }
      if (res) {
        this.doneToast(res)
      }
    },
    doneToast(res) {
      this.$toast.success('Done!', { duration: 1000, className: 'toast' })
      this.$store.dispatch('editSwitchAction', false)
      setTimeout(function () {
        if (res == 'OK') {
          location.href = process.env.URLHOME + '/project/' + res.id
        } else {
          location.href = process.env.URLHOME + '/project/' + res
        }
      }, 1200)
    }
  }
}
</script>
