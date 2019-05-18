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
          <b-form-checkbox id="anonymousInput" v-model="formAnonymous" switch class="m-3">AFTF: this project idea needs collective-intelligence-based Anonymous First Transparency Forever-after methodology.</b-form-checkbox>
        <b-form-group label-for="parentInput" label="Parent:" description="Please insert eventual parent project id, if not sure leave it 1 (Cooperacy).">
          <b-form-input id="parentInput" v-model="formParent" size="sm" ></b-form-input></b-form-group>
        <!-- the parent project id owner will be notified, except for the Cooperacy project -->
        <b-form-group label-for="categoryInput" label="Category:" description="Please choose the project idea category">
          <b-form-select id="categoryInput" v-model="formCategory" >
            <option v-for="category in category" :key="category.id" :value="category.id">{{category.name}}</option>
          </b-form-select></b-form-group>
        
        <h5 class="trust">BUDGET AND HUDGET</h5>
        <b-form-checkbox id="stageInput" v-model="formStageNofunding" switch class="m-3" @change="funded">FUNDED: this project idea needs Cooperacy Funds</b-form-checkbox>
        <b-form-group label-for="budgetInput" :label="budgetlabel" :description="budgetdesc">
          <b-form-input id="budgetInput" v-model="formBudget" @keypress="totalnonfunded" ></b-form-input></b-form-group>
        <b-form-group label-for="hudgetInput" :label="hudgetlabel" :description="hudgetdesc">
          <b-form-input id="hudgetInput" v-model="formHudget" @keypress="totalnonfunded"></b-form-input></b-form-group>
        <h6 class="trust" v-if="this.totallabel != -1">TOTAL NON-FUNDED BUDGET: {{totallabel}}</h6>
        <b-button type="submit" class="btn btrust btn-block mt-3 gray border-0">GO!</b-button>
      </b-form>
    </div>
    <div class="col-2"></div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  mounted() {   this.$store.dispatch('getCategoryAction') },
  data() {
    return {
      budgetlabel:  'Fee:',
      hudgetlabel:  'Minimum participants:',
      budgetdesc:   'Insert the amount the project participants should pay to participate',
      hudgetdesc:   'Insert the minimum number of paying participants so that the project is sustainable',
      totallabel: 0,
      formName: this.$store.state.project.name,
      formBrief: this.$store.state.project.brief,
      formContent: this.$store.state.project.content,
      formImageFile: '', // to be chosen by the user, current image is shown on the side
      formVideo: this.$store.state.project.video,
      formAnonymous: this.$store.state.project.anonymous,
      formParent: this.$store.state.project.parent,
      formCategory: this.$store.state.project.category,
      formStageNofunding: this.$store.state.project.stage,
      formBudget: this.$store.state.project.budget ? this.$store.state.project.budget : 0,
      formHudget: this.$store.state.project.hudget ? this.$store.state.project.hudget : 0,
      formTag: '', // ######################################################### FIX NEEDED
    }
  },
  computed: { 
    nameInputState() { return this.name.length > 4 ? true : false },
    budgetInputState() { return this.bodget.length >= 1000 ? true : false },
    category(){return  this.$store.state.category},
    projectImage: function () { if (this.$store.state.project.image) { return require('@/assets/image/project/' + this.$store.state.project.id + '.png')}}
  },
  methods: {
    projectForm() { 
      // This function triggers both project creation and updating
      if (!this.formAnonymous) {this.formAnonymous = 0}
      if (this.formStageNofunding) {this.formStageNofunding = 5
      }else{ this.$store.state.project.stage ? this.$store.state.project.stage : this.formStageNofunding = 7}
      //'new' is set for a new project, if not the param.id is taken from url to update old ones
      var dispatchId; this.$route.params.id ? dispatchId = this.$route.params.id : dispatchId = 'new'
      //database request body
      var formBodyRequest = { 
        id: dispatchId,
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
    totalnonfunded(){
      this.totallabel = this.formBudget*this.formHudget
    }
  }
}
</script>
