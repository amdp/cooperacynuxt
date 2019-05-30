<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <h2 class="text-center mb-4 diversity">PROJECT FORM</h2>
      <b-form @submit.prevent="projectForm" class="mt-3 was-validated">
        <br /><h5 class="diversity">DESCRIPTION</h5>
        <b-form-group label-for="nameInput" label="Name:" description="The project idea name">
          <b-form-input id="nameInput" v-model="formName" size="sm" required></b-form-input></b-form-group>
        <b-form-group label-for="countryInput" label="Place:" :description="placedesc">
          <b-form-select id="countryInput" v-model="formCountry" >
            <option v-for="country in country" :key="country.id" :value="country.id">{{country.name}}</option>
          </b-form-select>
          <b-form-select id="placeInput" v-model="formPlace" required>
            <option v-for="place in place" :key="place.id" :value="place.id">{{place.name}}</option>
          </b-form-select>
        </b-form-group>
        <p>If you do not find your place, please feel free to add a new <b-link v-b-modal.placemodal class="ac">one</b-link></p>
        <b-form-group label-for="briefInput" label="Brief:" description="A one-line description of the project idea">
          <b-form-input id="briefInput" v-model="formBrief" size="sm" required></b-form-input></b-form-group>
        <b-form-group label-for="contentInput" label="Content:" description="A longer description of the project idea">
          <b-form-textarea id="contentInput" v-model="formContent" size="sm" ></b-form-textarea></b-form-group>
        <b-form-group label-for="tagInput" label="Tags:" description="Tags. Separated, by, comma, :)">
          <b-form-input id="tagInput" v-model="formTag" size="sm" ></b-form-input></b-form-group>
        <div v-if="projectImage" class="row"><div class="col-10">
                    <b-form-group label-for="imageInput" label="Image:" description="The project image">
                      <b-form-file id="imageInput" v-model="formImageFile" ref="formImageFile" size="sm"></b-form-file>
                    </b-form-group></div>
                    <div class="col-2"> Current: <br><img class="currentImage" :src="projectImage" /></div>
        </div>
        <div v-if="!projectImage">
                    <b-form-group label-for="imageInput" label="Image:" description="The project image">
                      <b-form-file id="imageInput" v-model="formImageFile" ref="formImageFile" size="sm"></b-form-file>
                    </b-form-group>
        </div>
        <b-form-group label-for="videoInput" label="Video:" description="Please insert a YouTube video link for the project idea">
          <b-form-input id="videoInput" v-model="formVideo" size="sm" ></b-form-input></b-form-group>
        
        <h5 class="understanding">TECHNICAL</h5>
        
        <b-form-group label-for="parentInput" label="Parent:" description="Please insert eventual parent project id, if not sure leave it empty (Cooperacy)."><b-form-input id="parentInput" v-model="formParent" size="sm" ></b-form-input>
        </b-form-group>
        <!-- the parent project id owner will be notified, except for the Cooperacy project -->
        <b-form-group label-for="categoryInput" label="Category:" description="Please choose the project idea category">
          <b-form-select id="categoryInput" v-model="formCategory" >
            <option v-for="category in category" :key="category.id" :value="category.id">{{category.name}}</option>
          </b-form-select>
        </b-form-group>
        <b-form-group label-for="anonymousInput" label="" description="The AFTF collective-intelligence methodology makes some info and all the comments or votes anonymous until the project is approved.">
          <b-form-checkbox id="anonymousInput" v-model="formAnonymous" switch class="m-3">Anonymous First Transparency Forever-after methodology.</b-form-checkbox>
        </b-form-group>
        
        <h5 class="trust">BUDGET AND HUDGET</h5>
        <b-form-group label-for="stageInput" label="" description="If you want to propose a free group cooperation, or a course, an event or similar with its own fee, you just leave it unchecked.">
          <b-form-checkbox id="stageInput" v-model="formStageFunding" switch class="m-3" @change="funded">FUNDED: this project idea needs Cooperacy Funds</b-form-checkbox>
        </b-form-group>
        <b-form-group label-for="budgetInput" :label="budgetlabel" :description="budgetdesc">
          <b-form-input id="budgetInput" v-model="formBudget" @keypress="totalnonfunded" ></b-form-input></b-form-group>
        <b-form-group label-for="hudgetInput" :label="hudgetlabel" :description="hudgetdesc">
          <b-form-input id="hudgetInput" v-model="formHudget" @keypress="totalnonfunded"></b-form-input></b-form-group>
        <h6 class="trust" v-if="this.totallabel != -1">TOTAL NON-FUNDED BUDGET: {{totallabel}}</h6>
        <b-button type="submit" class="btn btrust btn-block mt-3 gray border-0">GO!</b-button>
      </b-form>
      <b-modal id="placemodal" title="Add a new place" hide-header-close><p class="my-4">Add a new place:</p>
            <b-form @submit.prevent="addplace">
              <b-form-group label-for="newcountryInput" label="Country:" description="Insert a place name after choosing a country">
                <b-form-select id="newcountryInput" v-model="formNewcountry" >
                  <option v-for="country in country" :key="country.id" :value="country.id">{{country.name}}</option>
                </b-form-select>
                <b-form-input id="newplaceInput" v-model="formNewplace"></b-form-input>
              </b-form-group>
            </b-form>
              <template slot="modal-footer" slot-scope="{ok,cancel}">
              <b-button size="sm" class="bcare" @click="addplace()">ADD</b-button>
              <b-button size="sm" class="btransparency" @click="cancel()">CANCEL</b-button>
              </template>
        </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  async fetch ({ store, params }) {await store.dispatch('getCategoryAction'); await store.dispatch('getPlaceAction') 
    await store.dispatch('getProjectAction', { projectid: store.state.edit, limit:' LIMIT 1', userid: store.state.auth.user.id,}) },
  computed: { 
    nameInputState() { return this.name.length > 4 ? true : false },
    budgetInputState() { return this.bodget.length >= 1000 ? true : false },
    category(){return  this.$store.state.category},
    projectImage:function(){if(this.$store.state.project.id)return require('@/assets/image/project/' +this.$store.state.project.id+'.png')},
    place(){return this.$store.state.place.filter(place => { return place.parent === this.formCountry })},
    country(){let country=this.$store.state.place.filter(place => { return (place.parent < 10 && place.parent > 1) })
    return country.sort((a, b) => (a.name>b.name) ? 1 : -1)},
  },
  data() {
    return {
      formNewcountry: 40,
      formNewplace: '',
      budgetlabel:  'Fee:',
      hudgetlabel:  'Minimum participants:',
      budgetdesc:   'Insert the amount the project participants should pay to participate',
      hudgetdesc:   'Insert the minimum number of paying participants so that the project is sustainable',
      placedesc:    'Insert the country and location of your project idea',
      totallabel: 0,
      formName: this.$store.state.project[0]? this.$store.state.project[0].name : '',
      formCountry: this.$store.state.project[0]? this.$store.state.project[0].name : '',
      formPlace: this.$store.state.project[0]? this.$store.state.project[0].place : '',
      formBrief: this.$store.state.project[0]? this.$store.state.project[0].brief : '',
      formContent: this.$store.state.project[0]? this.$store.state.project[0].content : '',
      formImageFile: '', // to be chosen by the user, current image is shown on the side
      formVideo: this.$store.state.project[0]? this.$store.state.project[0].video : '',
      formAnonymous: this.$store.state.project[0]? this.$store.state.project[0].anonymous : 0,
      formParent: this.$store.state.project[0]? this.$store.state.project[0].parent : '',
      formCategory: this.$store.state.project[0]? this.$store.state.project[0].category : '',
      formStageFunding: this.$store.state.project[0]? this.$store.state.project[0].stage==5? 0 : 1 : 0,
      formBudget: this.$store.state.project[0]? Math.round(this.$store.state.project[0].budget)  : '',
      formHudget: this.$store.state.project[0]? this.$store.state.project[0].hudget  : '',
      formTag: '', // ######################################################### FIX NEEDED
    }
  },
  methods: {
    projectForm() { 
      // This function triggers both project creation and updating
      if (!this.formAnonymous) {this.formAnonymous = 0}
      if (!this.formStageFunding) {this.formStageFunding = 5
      }else{ this.$store.state.project.stage ? this.$store.state.project.stage : this.formStageFunding = 7}
      //'new' is set for a new project, if not the param.id is taken from url to update old ones
      var dispatchId; this.$route.params.id ? dispatchId = this.$route.params.id : dispatchId = 'new'
      this.formParent ? this.formParent : this.formParent = 1
      //database request body
      var formBodyRequest = { 
        id: dispatchId,
        name: this.formName,
        place: this.formPlace,
        brief: this.formBrief,
        content: ' '+this.formContent,
        video: ' '+this.formVideo,
        anonymous: this.formAnonymous,
        parent: this.formParent,
        stage: this.formStageFunding,
        budget: this.formBudget,
        hudget: this.formHudget, }
      //vuex action to the database, the 'res'[ponse] variable brings the recently created or edited project >id< from the server..
      this.$store.dispatch('projectFormAction', formBodyRequest) 
      //in order to use it in the tag table and in the image creation:
      .then(async res => {
        if (res=='exists'){ return this.$toast.show('Project already exists!', {duration: 1000, className: 'toasts'})}
        if (this.formTag){
          var splittedTag = this.formTag.split(",")
          for (let i=0; i<splittedTag.length; i++) {
            if (splittedTag[i]==''){continue}
            splittedTag[i] = splittedTag[i].replace(/^[ ]+/gi,'') //removes spaces at the beginning of tag
            let res = await this.$store.dispatch('tagFormAction', {
              project: res,
              name: splittedTag[i]
            })
            .catch(err => { console.error(err) })
          }
        }
        if (this.formImageFile) {
          this.imageUpload(res)
        }else if(dispatchId=='new'){this.imageUpload(res, 'empty')}
      })  
    },
    async imageUpload(id, empty) {
      let formImageData = new FormData()
      formImageData.append('file', this.formImageFile)
      formImageData.append('id', id)
      if(empty){formImageData.append('empty', true); formImageData.append('proptype','project')}
      let res = await this.$store.dispatch('imageUploadAction', {
          formImageData: formImageData, 
          headers: {headers: { 'Content-Type': 'multipart/form-data' }},
          proptype: 'project',
        })
        .catch(err => {console.error(err)})
        if (res) {this.doneToast()}
    },
    doneToast(){
      this.$toast.success('Done!', {duration: 1000, className: 'toasts'})
      this.$store.dispatch('editSwitchAction',false)
      // how to effectively reload the page here before vue gets the state change?
      // ######################################################### FIX NEEDED
      setTimeout(function(){location.href = location.href},1200)
    },
    funded(){
      this.budgetlabel=='Fee:' ? this.budgetlabel='Budget:' : this.budgetlabel='Fee:'
      this.hudgetlabel=='Minimum participants:' ? this.hudgetlabel='Hudget:' : this.hudgetlabel='Minimum participants:'
      this.budgetdesc=='Insert the amount the project participants should pay to participate' ? 
      this.budgetdesc= 'Insert the project Budget' : 
      this.budgetdesc= 'Insert the amount the project participants should pay to participate'
      this.hudgetdesc=='Insert the minimum number of paying participants so that the project is sustainable' ? 
      this.hudgetdesc= 'Insert the project Hudget' : 
      this.hudgetdesc= 'Insert the minimum number of paying participants so that the project is sustainable'
      this.budgetlabel=='Fee:' ? this.totallabel = this.formBudget*this.formHudget : this.totallabel = -1
    },
    totalnonfunded(){this.totallabel = this.formBudget*this.formHudget},
    addplace(){let result = this.$store.dispatch('placeFormAction', {parent: this.formNewcountry, name: this.formNewplace}) 
    this.$toast.success(this.formNewplace+' added!', {duration: 1000, className: 'toasts'})},
  }
}
</script>
