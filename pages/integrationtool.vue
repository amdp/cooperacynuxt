<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <h2 class="text-center mb-4 equivalence">INTEGRATION TOOL</h2>
      <b-form @submit.prevent="integrationForm()" class="mt-3 was-validated">
        <br />
        <h5 class="text-center mb-4 diversity">
          1. NATURE OF THE RELATIONAL CONTEXT
        </h5>
        <b-form-group
          label-for="natureInput"
          label="Nature:"
          description="Do you want to integrate a Cooperacy Project or a Social Ecosystem, like companies, communities, couples or friends?"
        >
          <b-form-select id="natureInput" v-model="formNature" required>
            <option>A Cooperacy Project</option>
            <option>A Social Ecosystem</option>
          </b-form-select>
        </b-form-group>

        <b-form-group
          label-for="projectIDInput"
          label="Project ID:"
          description="What is the project ID?"
          v-if="formNature == 'A Cooperacy Project'"
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
          label-for="ecosystemInput"
          label="Social Ecosystem:"
          description="From You with Yourself, till Companies or Institutions like Nations, choose the ecosystem in which you would like to apply the Proportional Creative Integration."
          v-if="formNature == 'A Social Ecosystem'"
        >
          <b-form-select id="ecosystemInput" v-model="formEcosystem">
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
          description="Insert the country of your Ecosystem, even if it is the nation itself."
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
          description="Insert the place or location of your Social Ecosystem, like a city or a location."
        >
          <b-form-select id="placeInput" v-model="formPlace" required>
            <option v-for="place in place" :key="place.id" :value="place.id">{{
              place.name
            }}</option>
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
          label-for="titleInput"
          label="Title:"
          description="A title representative of the situation"
        >
          <b-form-input
            id="titleInput"
            v-model="formTitle"
            size="sm"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="descInput"
          label="Description:"
          description="A description of the current contrast"
        >
          <b-form-textarea
            id="descInput"
            v-model="formDesc"
            size="sm"
          ></b-form-textarea>
        </b-form-group>
        <h5 class="text-center mb-4 understanding">
          2. NATURE OF THE GROUP RELATION
        </h5>

        <p class="understanding it">
          Feel free to slide in the next questions without caring too much about
          the value, keeping in mind 0-25 is a little, 25-75 is on average and
          75-100 is a lot. Note: if you are evaluating the relation with
          yourself, think about the relation you have with the world.
        </p>
        In the Social Ecosystem context...
        <b-form-group
          label-for="diversityInput"
          label="Do you find the participants are different one another?"
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
          <em>Your answer: they are {{ formDiversity }}% different</em>
        </b-form-group>
        <b-form-group
          label-for="understandingInput"
          label="Do you find the participants understand each other?"
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
          <em>
            Your answer: they understand each other {{ formUnderstanding }}% of
            the time
          </em>
        </b-form-group>
        <b-form-group
          label-for="freedomInput"
          label="Do you find the participants feel free?"
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
          <em> Your answer: they feel {{ formFreedom }}% free on average </em>
        </b-form-group>
        <b-form-group
          label-for="transparencyInput"
          label="Do you find the participants hide what they think or feel?"
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
          <em>
            Your answer: they hide {{ formTransparency }}% of what they think
            and feel on average
          </em>
        </b-form-group>
        <b-form-group
          label-for="careInput"
          label="Do the participants like the Social Ecosystem?"
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
          <em>
            Your answer: {{ formCare }}% of them like the Social Ecosystem
          </em>
        </b-form-group>
        <b-form-group
          label-for="trustInput"
          label="Do the participants trust each other?"
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
          <em> Your answer: they trust each other at {{ formTrust }}% </em>
        </b-form-group>
        <b-form-group
          label-for="equivalenceInput"
          label="Do the participants receive similar/comparable rewards (money, goods, services, relational benefits) for their efforts, or someone gets more and someone gets less?"
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
          <em>
            Your answer: they receive rewards that are {{ formEquivalence }}%
            equivalent
          </em>
        </b-form-group>

        <b-check
          v-if="formCategory != 4"
          id="termscheckbox"
          name="termscheckbox"
          required
        >
          <span class="gray">
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
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  head() {
    return {
      title: 'Cooperacy - Project Form'
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
      formNature: 'Social Ecosystem',
      terms: null,
      formDiversity: 50,
      formUnderstanding: 50,
      formFreedom: 50,
      formTransparency: 50,
      formCare: 50,
      formTrust: 50,
      formEquivalence: 50,
      editing: false,
      country: this.$store.state.country,
      formEcosystem: null,
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
    place() {
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
    async integrationForm() {
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
