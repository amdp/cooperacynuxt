<template>
  <b-row class="m-0 p-0">
    <b-col cols="1" md="2" class="m-0 p-0"></b-col>
    <b-col cols="10" md="8" class="m-0 p-0">
      <h2 class="text-center mb-4 diversity">COOPERATION FORM</h2>
      <b-form @submit.prevent="cooperationForm()" class="mt-3 was-validated">
        <br />
        <h5 class="diversity">DESCRIPTION</h5>
        <b-form-group
          label-for="titleInput"
          label="Title:"
          description="The cooperation idea title"
        >
          <b-form-input
            id="titleInput"
            v-model="formTitle"
            size="sm"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="countryInput"
          label="Country:"
          description="Insert the country of your cooperation idea, use Cooperacy for international"
        >
          <b-form-select id="countryInput" v-model="formCountry">
            <option
              v-for="country in country"
              :key="country.id"
              :value="country.id"
            >
              {{ country.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          label-for="placeInput"
          label="Place:"
          description="Insert the city or location of your cooperation idea, use Cooperacy for online or global"
        >
          <b-form-select id="placeInput" v-model="formPlace" required>
            <option v-for="place in place" :key="place.id" :value="place.id">
              {{ place.name }}
            </option>
          </b-form-select>
        </b-form-group>

        <p class="it diversity">
          {{ $t('main.newplace') }}
          <a v-b-modal.placemodal class="ad finger b">
            {{ $t('main.one') }}
          </a>
        </p>

        <b-form-group
          label-for="briefInput"
          label="Brief:"
          description="A one-line description of the cooperation idea"
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
          description="A longer description of the cooperation idea"
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
              description="The cooperation image"
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
            <span v-if="this.$store.state.edit.id">
              Current: <br /><img class="currentImage" :src="currentImage"
            /></span>
          </div>
        </div>
        <b-form-group
          label-for="videoInput"
          label="Video:"
          description="Please, feel free to insert a video link for the cooperation idea"
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
          description="Please insert eventual parent cooperation id, if not sure leave it empty (Cooperacy)"
        >
          <b-form-input
            id="parentInput"
            v-model="formParent"
            size="sm"
            required
          ></b-form-input>
        </b-form-group>
        <!-- FIX : the parent cooperation id owner will be notified, except for the Cooperacy cooperation -->
        <b-form-group
          label-for="categoryInput"
          label="Category:"
          description="Please choose the cooperation idea category"
        >
          <b-form-select
            id="categoryInput"
            v-model="formCategory"
            @input="setMode(formCategory)"
          >
            <option
              v-for="category in category"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          label-for="anonymousInput"
          label=""
          description="The AFTF collective-intelligence methodology makes some info and all the comments or votes anonymous until the cooperation is approved"
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
        <b-form-select
          id="modeInput"
          v-model="formMode"
          class="my-3"
          @input="setMode(formMode)"
        >
          <option value="9">
            FREE: this cooperation idea does NOT need Cooperacy funds
          </option>
          <option value="20">
            PARTICIPATION: this cooperation idea asks for a participation fee
          </option>
          <option value="101">
            FUNDING: this cooperation idea asks for Cooperacy funds
          </option>
          <option value="4" disabled>
            VOTING: automatically selected via the voting category
          </option>
          <option value="1" disabled>
            EVALUATION: automatically selected via the evaluation category
          </option>
        </b-form-select>
        <b-form-group
          label-for="budgetInput"
          label="Budget:"
          description="The budget needed for your cooperation"
          v-show="this.formCategory > 0"
        >
          <b-form-input
            id="budgetInput"
            v-model="formBudget"
            :readonly="this.formMode <= 20"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="feeInput"
          label="Attending Fee:"
          description="Insert the price of the attending fee, leave 0 for free cooperations"
          v-show="this.formMode == 20"
        >
          <b-form-input
            id="feeInput"
            v-model="formFee"
            @keyup="totalfreecooperation"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="attendeeInput"
          label="Minimum attendees:"
          description="Insert the minimum amount of attendees to this course, event, fee-based service"
          v-show="this.formMode == 20"
        >
          <b-form-input
            id="attendeeInput"
            v-model="formAttendee"
            @keyup="totalfreecooperation"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="hudgetInput"
          label="Hudget:"
          description="Insert the number of professionals needed that will receive a remuneration"
          v-show="this.formCategory > 0"
        >
          <b-form-input id="hudgetInput" v-model="formHudget"></b-form-input>
        </b-form-group>
        <b-check id="termscheckbox" name="termscheckbox" required>
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
              this cooperation rights and even though you can obtain funds and
              salaries out of this cooperation of mine but you are NOT going to
              get any financial margins because you want them to go back to
              Cooperacy and sustain other comembers ideas
            </i>
          </span>
        </b-check>
        <b-button
          type="submit"
          class="btn bhtrust btn-block mt-3 mb-3 gray border-0"
        >
          <span v-if="!editing" class="btransparent">GO!</span>
          <b-spinner small v-if="editing" class="m-1 btransparent"></b-spinner>
          <span v-if="editing" class="btransparent"
            >Reloading the cooperation..</span
          >
        </b-button>
      </b-form>
      <!-- MODAL: ADD A NEW PLACE -->
      <placemodal />
    </b-col>
    <b-col cols="1" md="2" class="m-0 p-0"></b-col>
  </b-row>
</template>

<script>
export default {
  middleware: ['auth'],
  head() {
    return {
      title: 'Cooperacy - Cooperation Form',
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getPlace')
    await store.dispatch('getCountry')
    if (store.state.edit.id) {
      await store.dispatch('getCooperation', {
        cooperationid: store.state.edit.id,
        limit: 1,
        userid: store.state.auth.user.id,
      })
    }
    if (!store.state.edit.id) {//will retrieve only funded cooperations to limit the author
      await store.dispatch('getCooperation', {
        limitauth: 1, //change this and next limitauth to set FUNDED author limit
        author: store.state.auth.user.id,
      })
    }
  },
  data() {
    return {
      limitauth: 1, //change this and previous limitauth to set FUNDED author limit
      terms: false,
      editing: false,
      country: this.$store.state.country,
      category: [
        { id: 1, name: 'Wealth', desc: 'A generic term to indicate all the activities that may generate wealth for the cooperation participants and for Cooperacy as a whole' },
        { id: 2, name: 'Coordination', desc: 'A governative cooperation, available only to admins or after a voting has been issued to create one' },
        { id: 3, name: 'Ecosystem', desc: 'A green border will surround all ecosystem-caring projects!' },
        { id: 4, name: 'Informative', desc: 'A governative cooperation, for informative support, available only to admins or after a voting has been issued to create one' },
        { id: 5, name: 'Location', desc: 'A governative cooperation, available to everyone who wants to represent a location like a city or similar' },
        { id: 6, name: 'Science', desc: 'A cooperation related to Research, Science, Health that may be subject to scientific verification' },
        { id: 7, name: 'Creativity', desc: 'A cooperation related to Art, Music, Games, Fun, Sports, Entertainment and the like' },
        { id: -1, name: 'Evaluation Mode', desc: 'A cooperation just to experiment evaluations with the seven dimensions, available also to non-coo-members' },
        { id: -4, name: 'Voting Mode', desc: 'A governative cooperation, available to everyone to issue a voting evaluation. Remember to choose the right "parent" above if you want your vote to be relative to a specific cooperation' }
      ],
      totallabel: 0,
      formAnonymous: this.$store.state.edit.id &&
        this.$store.state.cooperation[0].anonymous == 1 ? 1 : 0,
      formNewcountry: null,
      formNewplace: null,
      formTitle: this.$store.state.edit.id
        ? this.$store.state.cooperation[0].title
        : null,
      formCountry: this.$store.state.edit.id
        ? this.$store.state.cooperation[0].country
        : 1,
      formPlace: this.$store.state.edit.id
        ? this.$store.state.cooperation[0].place
        : 1,
      formBrief: this.$store.state.edit.id
        ? this.$store.state.cooperation[0].brief
        : null,
      formContent: this.$store.state.edit.id
        ? this.$store.state.cooperation[0].content
        : '',
      formImageFile: null,
      formVideo: this.$store.state.edit.id
        ? this.$store.state.cooperation[0].video
        : '',
      formParent: this.$store.state.edit.id
        ? this.$store.state.cooperation[0].parent
        : '1',
      formCategory: this.$store.state.edit.id
        ? this.$store.state.cooperation[0].category
        : '1',
      formMode: this.$store.state.edit.id
        ? this.$store.state.cooperation[0].mode
        : 9,
      formBudget: this.$store.state.edit.id
        ? Math.round(Math.abs(this.$store.state.cooperation[0].budget))
        : 0,
      formHudget: this.$store.state.edit.id
        ? this.$store.state.cooperation[0].hudget
        : 2,
      formFee: this.$store.state.edit.id
        ? Math.round(this.$store.state.cooperation[0].collect)
        : 0,
      formAttendee: this.$store.state.edit.id
        ? Math.round(
          Math.abs(this.$store.state.cooperation[0].budget) /
          this.$store.state.cooperation[0].collect
        ) || 0
        : 0,
    }
  },
  computed: {
    titleInputState() {
      return this.name.length > 4 ? true : false
    },
    cooperationImage() {
      if (this.$store.state.cooperation.id) {
        return '/assets/image/cooperation/' + this.$store.state.cooperation.id + '.png'
      }
    },
    currentImage() {
      return '/assets/image/cooperation/' +
        this.$store.state.edit.id +
        '.png'
    },
    place() {
      let place = this.$store.state.place.filter(
        (place) => place.country == this.formCountry
      )
      return place.sort((a, b) => (a.name > b.name ? 1 : -1))
    },
  },
  mounted() {
    if (this.$store.state.edit.id && this.$store.state.cooperation[0].mode == 20) {
      this.totalfreecooperation()
    }
  },
  methods: {
    totalfreecooperation() {
      if (this.formMode == 20) {
        this.formBudget = this.formFee * this.formAttendee
      }
    },
    setMode(category) {
      this.formBudget = 0
      this.formFee = 0
      this.formHudget = 0
      if (category < 0) {
        this.formMode = category * -1
      }//following if happens only with formMode, categories are all < 9
      if (category > 9) {
        if (this.formCategory < 0) this.formCategory = 1
      }
    },
    async cooperationForm() {
      this.editing = true //animates the click

      //first we check if it is a funding mode and if the author has already one funding request
      if (this.$store.state.cooperation.length > this.limitauth && this.formMode > 100) {
        return alert('Sorry, Cooperacy allows only ' + this.limitauth + ' funded cooperation per user at this moment.')
      }

      // This function creates and sends database request body both for cooperation creation, copy, edit and reactivation
      //'new' is set for a new cooperations, both completely new and copies of other cooperations
      let cooperationid = 'new'

      // if this is an edit instead, the param.id is taken from url to update the cooperation with new data
      if (this.$store.state.edit.id && !this.$store.state.edit.copy) {
        cooperationid = this.$store.state.edit.id
      }

      // here we prepare the data, if it is an edit we shouldn't insert the author
      var formBodyRequest = {
        id: cooperationid,
        mode: this.$store.state.cooperation[0].mode < 0 ? this.formMode *= -1 : this.formMode,
        title: this.formTitle,
        country: this.formCountry,
        place: this.formPlace,
        brief: this.formBrief,
        content: '' + this.formContent, //leave '' here
        video: '' + this.formVideo, //leave '' here
        anonymous: this.formAnonymous,
        parent: this.formParent,
        author: this.$store.state.edit.id ? this.$store.state.cooperation[0].author : this.$auth.user.id,
        category: this.formCategory,
        collect: this.formFee,
        budget: this.formMode == 20 ? this.formBudget *= -1 : this.formBudget,
        hudget: this.formHudget,
      }
      let res
      try {
        //vuex action to the database, the 'res'[ponse] variable brings the recently created or edited cooperation >id< from the server..
        res = await this.$store.dispatch('cooperationForm', formBodyRequest)

        //..in order to use it in the image creation and to make the user a participant of its cooperation:
        if (res == 'exists') {
          return this.$toast.show('Cooperation already exists!', {
            duration: 1000,
            className: 'toast',
          })
        }
        if (cooperationid == 'new') {
          let freedomvote = {
            id: res,
            condition: 'F',
            user: this.$auth.user.id,
            proptype: 'cooperation',
          }
          this.$store.dispatch('addVote', freedomvote)
          this.$store.dispatch('professional', {
            cooperation: res,
            user: this.$auth.user.id,
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
      formImageData.append('proptype', 'cooperation')
      if (this.$store.state.edit) formImageData.append('current', id)
      // for (var key of formImageData.entries()) {
      //   console.log(key[0] + ', ' + key[1])
      // }
      let res
      try {
        res = await this.$store.dispatch('imageUpload', {
          formImageData: formImageData,
          headers: { headers: { 'Content-Type': 'multipart/form-data' } },
          proptype: 'cooperation',
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
      this.$store.dispatch('editSwitch', false)
      setTimeout(function () {
        if (res == 'OK') {
          location.href = process.env.URLHOME + '/cooperation/' + res.id
        } else {
          location.href = process.env.URLHOME + '/cooperation/' + res
        }
      }, 1200)
    },
  },
}
</script>
