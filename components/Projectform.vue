<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <h2 class="text-center mb-4 diversity">PROJECT FORM</h2>
      <b-form @submit.prevent="projectForm" class="mt-3 was-validated">
        <br /><h5 class="diversity">DESCRIPTION</h5>
        <b-form-group label-for="nameInput" label="Name:" description="The project idea name">
          <b-form-input id="nameInput" v-model="formName" size="sm" required></b-form-input></b-form-group>
        <b-form-group label-for="briefInput" label="Brief:" description="A one-line description of the project idea">
          <b-form-input id="briefInput" v-model="formBrief" size="sm" required></b-form-input></b-form-group>
        <b-form-group label-for="contentInput" label="Content:" description="A longer description of the project idea">
          <b-form-textarea id="contentInput" v-model="formContent" size="sm" ></b-form-textarea></b-form-group>
        <b-form-group label-for="tagsInput" label="Tags:" description="Tags. Separated, by, comma, :)">
          <b-form-input id="tagsInput" v-model="formTags" size="sm" ></b-form-input></b-form-group>
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
          <b-form-checkbox id="anonymousInput" v-model="formAnonymous" switch class="m-3">AFTF: this project idea needs collective-intelligence-based Anonymous First Transparency Forever-after methodology.</b-form-checkbox>
        <b-form-group label-for="parentInput" label="Parent:" description="Please insert eventual parent project id, if not sure leave it 1 (Cooperacy).">
          <b-form-input id="parentInput" v-model="formParent" size="sm" ></b-form-input></b-form-group>
        <!-- the parent project id owner will be notified, except for the Cooperacy project -->
        <b-form-group label-for="categoryInput" label="Category:" description="Please choose the project idea category">
          <b-form-select id="categoryInput" v-model="formCategory" >
            <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
          </b-form-select></b-form-group>
        
        <h5 class="trust">BUDGET AND HUDGET</h5>
        <b-form-checkbox id="stageInput" v-model="formStageNofunding" switch class="m-3">FUNDED: this project idea needs Cooperacy Funds </b-form-checkbox>
        <!--<b-form-group label-for="collectedInput" label="Collected:" description="insert the project Collected">
        <b-form-input id="collectedInput" v-model="formCollected" ></b-form-input></b-form-group>-->
        <b-form-group label-for="budgetInput" label="Budget:" description="insert the project Budget">
          <b-form-input id="budgetInput" v-model="formBudget" ></b-form-input></b-form-group>
        <b-form-group label-for="hudgetInput" label="Hudget:" description="insert the project Hudget">
          <b-form-input id="hudgetInput" v-model="formHudget" ></b-form-input></b-form-group>
      
        <b-button type="submit" class="btn btrust btn-block mt-3 gray border-0">GO!</b-button>
      </b-form>
    </div>
    <div class="col-2"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  middleware: ['auth'],
  mounted() {   this.$store.dispatch('categoriesvx/getCategoriesAction') },
  data() {
    return {
      projects: [],
      formName: this.$store.state.projectsvx.project.name,
      formBrief: this.$store.state.projectsvx.project.brief,
      formContent: this.$store.state.projectsvx.project.content,
      formImageFile: '', // to be chosen by the user, current image is shown on the side
      formVideo: this.$store.state.projectsvx.project.video,
      formAnonymous: this.$store.state.projectsvx.project.anonymous,
      formParent: this.$store.state.projectsvx.project.parent,
      formCategory: this.$store.state.projectsvx.project.category,
      formStageNofunding: this.$store.state.projectsvx.project.stage,
      formBudget: this.$store.state.projectsvx.project.budget,
      formHudget: this.$store.state.projectsvx.project.hudget,
      formTags: '', // TOBEFIXED #########################################################
    }
  },
  computed: { 
    nameInputState() { return this.name.length > 4 ? true : false },
    budgetInputState() { return this.bodget.length >= 1000 ? true : false },
    categories(){return  this.$store.state.categoriesvx.categories},
    projectImage: function () { if (this.$store.state.projectsvx.project.image) { return require('../assets/images/projects/' + this.$store.state.projectsvx.project.id + '.png')}}
  },
  methods: {
    projectForm() { 
      // This function triggers both project creation and updating
      if (!this.formAnonymous) {this.formAnonymous = 0}
      if (this.formStageNofunding) {this.formStageNofunding = 5
      }else{ this.$store.state.projectsvx.project.stage ? this.$store.state.projectsvx.project.stage : this.formStageNofunding = 7}
      //database request body
      var formBodyRequest = { 
        name: this.formName,
        brief: this.formBrief,
        content: this.formContent,
        image: this.formImageFile.name,
        video: this.formVideo,
        anonymous: this.formAnonymous,
        parent: this.formParent,
        stage: this.formStageNofunding,
        budget: this.formBudget,
        hudget: this.formHudget, }
      //vuex id, 'new' for new projects, taken from url for updates
      var dispatchId; this.$route.params.id ? dispatchId = this.$route.params.id : dispatchId = 'new'
      //vuex action to the database, the 'res'[ponse] variable brings the recently created or edited project >id< from the server..
      this.$store.dispatch('projectsvx/projectFormAction', {id: dispatchId, body: formBodyRequest}) 
      //in order to use it in the tags table and in the image creation:
      .then(res => {
        if (res=='exists'){ return this.$toast.show('Project already exists!', {duration: 1000, className: 'toasts'})}
        if (this.formTags){
          var splittedTags = this.formTags.split(",")
          for (let i=0; i<splittedTags.length; i++) {
            if (splittedTags[i]==''){continue}
            splittedTags[i] = splittedTags[i].replace(/^[ ]+/gi,'') //removes spaces at the beginning of tags
            axios.post('/db/tags', {
              project: res,
              tagName: splittedTags[i]
            })
            .catch(err => { console.log(err) })
          }
        }
        if (this.formImageFile) {
          this.imageUpload(res)
        }else if(dispatchId=='new'){/*if new and without image, Cooperacy project image is added as standard TOBEDONE #########################################################*/}
      })  
    },
    imageUpload(id) {
      let formImageData = new FormData()
      formImageData.append('file', this.formImageFile)
      formImageData.append('id', id)
      axios.post( '/db/projectimage', formImageData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(res => {this.doneToast()})
      .catch(err => {console.log(err)})
    },
    doneToast(){
      this.$toast.success('Done!', {duration: 1000, className: 'toasts'})
      this.$store.dispatch('projectsvx/editSwitchAction',false)
      // how to effectively reload the page here before vue gets the state change?
      setTimeout(function(){location.href = location.href},1200)
    },
  }
}
</script>
