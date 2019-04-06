<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <h2 class="text-center mb-4 diversity">NEW PROJECT IDEA</h2>
      <b-form @submit.prevent="addNewProject" class="mt-3">
        <br /><h5 class="diversity">DESCRIPTION</h5>
        <b-form-group label-for="nameInput" label="Name:" description="Please insert the project idea name">
          <b-form-input id="nameInput" v-model="formName" size="sm" ></b-form-input></b-form-group>
        <b-form-group label-for="briefInput" label="Brief:" description="Please insert a one-line description of the project idea">
          <b-form-input id="briefInput" v-model="formBrief" size="sm" ></b-form-input></b-form-group>
        <b-form-group label-for="contentInput" label="Content:" description="Please insert a longer description of the project idea">
          <b-form-textarea id="contentInput" v-model="formContent" size="sm" ></b-form-textarea></b-form-group>
        <b-form-group label-for="imageInput" label="Image:" :description="imageUploadDesc"> 
          <b-form-file id="imageInput" v-model="formImageFile" ref="formImageFile" size="sm" accept="image/*"></b-form-file>
        </b-form-group>
        <b-button class="btn bhdiversity btn-block mb-3 white border-0 btn-outline-light" size="sm" @click="imageUpload()">Upload the image first!</b-button>
        <b-form-group label-for="videoInput" label="Video:" description="Please insert a YouTube video link for the project idea">
          <b-form-input id="videoInput" v-model="formVideo" size="sm" ></b-form-input></b-form-group>
        
        <h5 class="understanding">TECHNICAL</h5>
          <b-form-checkbox id="anonymousInput" v-model="formAnonymous" switch class="m-3">AFTF: this project idea needs collective-intelligence-based Anonymous First Transparency Forever-after methodology.</b-form-checkbox>
        <b-form-group label-for="parentInput" label="Parent:" description="Please insert eventual parent project id, if not sure leave it 1 (Cooperacy).">
          <b-form-input id="parentInput" v-model="formParent" size="sm" ></b-form-input></b-form-group>
        <!-- the parent project id owner will be notified, except for the Cooperacy project -->
        <b-form-group label-for="categoryInput" label="Category:" description="Please choose the project idea category">
          <b-form-select id="categoryInput" v-model="formCategory" >
            <option v-for="category in categoriesOptions" :key="category.id" :value="category.id">{{category.name}}</option>
          </b-form-select></b-form-group>
        
        <h5 class="trust">BUDGET AND HUDGET</h5>
        <b-form-checkbox id="stageInput" v-model="formStageNofunding" switch class="m-3">FUNDED: this project idea needs Cooperacy Funds </b-form-checkbox>
        <!--<b-form-group label-for="collectedInput" label="Collected:" description="insert the project Collected">
        <b-form-input id="collectedInput" v-model="formCollected" ></b-form-input></b-form-group>-->
        <b-form-group label-for="budgetInput" label="Budget:" description="insert the project Budget">
          <b-form-input id="budgetInput" v-model="formBudget" ></b-form-input></b-form-group>
        <b-form-group label-for="hudgetInput" label="Hudget:" description="insert the project Hudget">
          <b-form-input id="hudgetInput" v-model="formHudget" ></b-form-input></b-form-group>
      
        <b-button type="submit" class="btn btrust btn-block mt-3 gray border-0">ADD A NEW PROJECT IDEA</b-button>
      </b-form>
    </div>
    <div class="col-2"></div>
  </div>
</template>

<script>
import axios from 'axios'
import Votebars from '~/components/Votebars'


export default {
  components: {
    Votebars: Votebars,
  },
  computed: { 
    nameInputState() { return this.name.length > 4 ? true : false },
    budgetInputState() { return this.bodget.length >= 1000 ? true : false },
    categoriesOptions: function () { return this.categories.filter(function (category) {return category.id != 0}) } 
  },
  data() {
    return {
      categories: [],
      projects: [],
      formName: '',
      formBrief: '',
      formContent: '',
      formImageFile: '',
      formVideo: '',
      formAnonymous: '',
      formParent: '1',
      formCategory: '1',
      formStageNofunding: '',
      formBudget: '',
      formHudget: '',
      imageUploadDesc: 'Please choose an image for the project idea and click "Upload".',
    }
  },
  head () {
    return {
      title: 'New Project',
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    getCategories() { axios.get('/serverDB/categories').then(
        result => { this.categories = result.data },
        error => { console.error(error) }
      )
    },
    addNewProject() { 
      if (this.formStageNofunding) {this.formStageNofunding = 5} else {this.formStageNofunding = 7}
      axios.post('/serverDB/projects', { 
        name: this.formName,
        brief: this.formBrief,
        content: this.formContent,
        image: this.formImageFile.name,
        video: this.formVideo,
        anonymous: this.formAnonymous,
        parent: this.formParent,
        stage: this.formStageNofunding,
        budget: this.formBudget,
        hudget: this.formHudget, })
        .then(res => { this.formName = ''; console.log(res) })
        .catch(err => { console.log(err) })
    },
    imageUpload() {
      let formImageData = new FormData()
      formImageData.append('file', this.formImageFile)
      axios.post('/serverDB/imageupload',
        formImageData,
         { 
        headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
          this.imageUploadDesc = 'Image uploaded. Please keep the image name in the textbox above as it is now.'
          console.log('SUCCESS!!');
        })
        .catch(err => {
          this.imageUploadDesc = 'Image failed to upload. Please retry.'
          console.log('FAILURE :(');
        });
    },
  }
}
</script>
