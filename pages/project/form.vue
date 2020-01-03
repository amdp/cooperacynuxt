<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <h2 class="text-center mb-4 diversity">PROJECT FORM</h2>
      <b-form @submit.prevent="projectForm()" class="mt-3 was-validated">
        <br />
        <h5 class="diversity">DESCRIPTION</h5>
        <b-form-group
          label-for="nameInput"
          label="Name:"
          description="The project idea name"
        >
          <b-form-input
            id="nameInput"
            v-model="formName"
            size="sm"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="countryInput"
          label="Country:"
          description="Insert the country of your project idea, use Cooperacy for international"
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
          description="Insert the city or location of your project idea, use Cooperacy for online or global"
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
          label-for="briefInput"
          label="Brief:"
          description="A one-line description of the project idea"
        >
          <b-form-input
            id="briefInput"
            v-model="formBrief"
            size="sm"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="contentInput"
          label="Content:"
          description="A longer description of the project idea"
        >
          <b-form-textarea
            id="contentInput"
            v-model="formContent"
            size="sm"
          ></b-form-textarea>
        </b-form-group>
        <div class="row">
          <div class="col-10">
            <b-form-group
              label-for="imageInput"
              label="Image:"
              description="The project image"
            >
              <b-form-file
                id="imageInput"
                v-model="formImageFile"
                ref="formImageFile"
                size="sm"
              ></b-form-file>
            </b-form-group>
          </div>
          <div class="col-2">
            <span
              >Current: <br /><img
                class="currentImage"
                :src="
                  '/assets/image/project/' +
                    this.$store.state.project.id +
                    '.png'
                "
            /></span>
          </div>
        </div>
        <b-form-group
          label-for="videoInput"
          label="Video:"
          description="Please insert a YouTube video link for the project idea"
        >
          <b-form-input
            id="videoInput"
            v-model="formVideo"
            size="sm"
          ></b-form-input>
        </b-form-group>

        <h5 class="understanding">TECHNICAL</h5>

        <b-form-group
          label-for="parentInput"
          label="Parent:"
          description="Please insert eventual parent project id, if not sure leave it empty (Cooperacy)"
        >
          <b-form-input
            id="parentInput"
            v-model="formParent"
            size="sm"
            required
          ></b-form-input>
        </b-form-group>
        <!-- FIX : the parent project id owner will be notified, except for the Cooperacy project -->
        <b-form-group
          label-for="categoryInput"
          label="Category:"
          description="Please choose the project idea category"
        >
          <b-form-select id="categoryInput" v-model="formCategory">
            <option
              v-for="category in category"
              :key="category.id"
              :value="category.id"
              >{{ category.name }}</option
            >
          </b-form-select>
        </b-form-group>
        <b-form-group
          label-for="anonymousInput"
          label=""
          description="The AFTF collective-intelligence methodology makes some info and all the comments or votes anonymous until the project is approved"
        >
          <b-form-checkbox
            id="anonymousInput"
            v-model="formAnonymous"
            value="1"
            unchecked-value="0"
            switch
            class="m-3"
          >
            Anonymous First Transparency Forever-after
            methodology.</b-form-checkbox
          >
        </b-form-group>

        <h5 class="trust">BUDGET AND HUDGET</h5>

        <b-form-group
          label-for="stageInput"
          label=""
          description="If you want to propose a free group cooperation, or a course, an event or similar with its own fee, you just leave it unchecked"
        >
          <b-form-checkbox
            id="stageInput"
            v-model="formStageFunding"
            value="7"
            unchecked-value="2"
            switch
            class="m-3"
            @input="
              formBudget = 0
              formFee = 0
            "
          >
            FUNDED: when checked, this project idea asks for Cooperacy
            Funds</b-form-checkbox
          >
        </b-form-group>
        <b-form-group
          label-for="budgetInput"
          label="Budget:"
          description="Insert the amount of budget needed for your project 
          (Automatically calculated in case of fee-based projects)"
        >
          <b-form-input
            id="budgetInput"
            v-model="formBudget"
            :readonly="this.formStageFunding == 2"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="hudgetInput"
          label="Hudget:"
          description="Insert the number of professionals needed that will receive a remuneration from the budget"
        >
          <b-form-input id="hudgetInput" v-model="formHudget"></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="feeInput"
          label="Attending Fee:"
          description="Insert the price of the attending fee, leave 0 for free projects"
          v-if="this.formStageFunding == 2"
        >
          <b-form-input
            id="feeInput"
            v-model="formFee"
            @keyup="totalfreeproject"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="attendeeInput"
          label="Minimum attendees:"
          description="Insert the minimum amount of attendees to this course, event, fee-based service"
          v-if="this.formStageFunding == 2"
        >
          <b-form-input
            id="attendeeInput"
            v-model="formAttendee"
            @keyup="totalfreeproject"
          ></b-form-input>
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
              the
              <nuxt-link to="/main/terms" class="au"
                >terms and conditions</nuxt-link
              >, you are not damaging the ecosystem or infringing anyone’s right
              or copyright with this idea concept, visuals, needed actions,
              financing and personal relations, and mostly important you are
              aware that Cooperacy as a community will become the owner of all
              this project rights and even though you can obtain funds and
              salaries out of this project of mine but you are NOT going to get
              any financial margins because you want them to go back to
              Cooperacy and sustain other comembers ideas
            </i>
          </span>
        </b-check>
        <b-button
          type="submit"
          class="btn bhtrust btn-block mt-3 mb-3 gray border-0"
        >
          <span v-if="!editing">GO!</span>
          <b-spinner small v-if="editing" class="m-1"></b-spinner>
          <span v-if="editing">Reloading the project..</span>
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
            >CANCEL</b-button
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
      terms: false,
      editing: false,
      country: this.$store.state.country,
      category: this.$store.state.category.filter(category => category.id != 0),
      totallabel: 0,
      formAnonymous: 0,
      formNewcountry: null,
      formNewplace: null,
      formName: this.$store.state.edit.id
        ? this.$store.state.project[0].name
        : null,
      formCountry: this.$store.state.edit.id
        ? this.$store.state.project[0].country
        : null,
      formPlace: this.$store.state.edit.id
        ? this.$store.state.project[0].place
        : null,
      formBrief: this.$store.state.edit.id
        ? this.$store.state.project[0].brief
        : null,
      formContent: this.$store.state.edit.id
        ? this.$store.state.project[0].content
        : '',
      formImageFile: null,
      formVideo: this.$store.state.edit.id
        ? this.$store.state.project[0].video
        : '',
      formParent: this.$store.state.edit.id
        ? this.$store.state.project[0].parent
        : '1',
      formCategory: this.$store.state.edit.id
        ? this.$store.state.project[0].category
        : '1',
      formStageFunding: 2,
      formBudget: this.$store.state.edit.id
        ? Math.round(this.$store.state.project[0].budget)
        : 0,
      formHudget: this.$store.state.edit.id
        ? this.$store.state.project[0].hudget
        : 2,
      formFee: this.$store.state.edit.id
        ? Math.round(this.$store.state.project[0].collect)
        : 0,
      formAttendee: this.$store.state.edit.id
        ? Math.round(
          this.$store.state.project[0].budget /
          this.$store.state.project[0].collect
        ) || 0
        : 0
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
    async projectForm() {
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
        brief: this.formBrief,
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
