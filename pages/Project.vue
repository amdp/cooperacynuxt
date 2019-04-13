<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <h2 class="text-center mb-4 diversity">PROJECT NAME HERE</h2>
            <div class="col-2">
              <div><button @click="editProject(project.name, project.id)" class="btn-sm border-0 gray">Edit</button></div>
              <div><button @click="deleteProject(project.id)" class="btn-sm border-0 gray">Delete</button></div>
            </div>
      <b-form @submit.prevent="addNewProject" class="mt-3">
        <br /><h5 class="diversity">DESCRIPTION</h5>
        <b-form-group label-for="nameInput" label="Name:" description="Please insert the project idea name">
        <b-form-input id="nameInput" v-model="formName" size="sm" ></b-form-input></b-form-group>
        <b-form-group label-for="briefInput" label="Brief:" description="Please insert a one-line description of the project idea">
        <b-form-input id="briefInput" v-model="formBrief" size="sm" ></b-form-input></b-form-group>
        <b-form-group label-for="contentInput" label="Content:" description="Please insert a longer description of the project idea">
        <b-form-textarea id="contentInput" v-model="formContent" size="sm" ></b-form-textarea></b-form-group>
        <b-form-group label-for="imageInput" label="Image:" description="Please insert an image for the project idea">
        <b-form-file id="imageInput" v-model="formImage" size="sm" ></b-form-file></b-form-group>
        <b-form-group label-for="videoInput" label="Video:" description="Please insert a video link for the project idea">
        <b-form-file id="videoInput" v-model="formVideo" size="sm" ></b-form-file></b-form-group>
        <h5 class="understanding">TECHNICAL</h5>
        <b-form-checkbox id="anonymousInput" v-model="formAnonymous" switch class="m-3">AFTF: this project idea needs collective-intelligence-based Anonymous First Transparency Forever-after methodology.</b-form-checkbox>
        <b-form-group label-for="parentInput" label="Parent:" description="Please pay attention and choose the parent of the project idea - or leave it blank">
        <b-form-select id="parentInput" v-model="formParent" ></b-form-select></b-form-group> <!-- change into inserting project id -->
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
      
        <button v-if="this.isEdit == false" type="submit" class="btn btrust btn-block mt-3 gray">Submit</button>
        <button v-else type="button" class="btn btrust btn-block mt-3 gray" @click="updateProject()">Update</button>
      </b-form>

      <div class="row mt-5" v-for="project in projects" :key="project.id">
        <div class="col-12">
          <div class="row">
            <div class="col-1"></div>
            <div class="col-2">
              <img :src="require('@/assets/images/projects/' + project.image)" width="100px" />
            </div>
            <div class="col-9">
              <div class="row">
                <div class="col-12 space subheading up">{{ project.name }}</div>
              </div>
              <div class="row">
                <div class="col-12">{{ project.content }}</div>
              </div>
            </div>
          </div>
          <votebars />
        </div>
      </div>
    </div>
    <div class="col-2"></div>
  </div>
</template>

<script>
import axios from 'axios'
import Votebars from '@/components/Votebars'


export default {
  components: {
    Votebars: Votebars,
  },
  computed: { 
    nameInputState() { return this.name.length > 4 ? true : false },
    categoriesOptions: function () { return this.categories.filter(function (category) {return category.id != 0}) } 
  },
  data() {
    return {
      categories: [],
      projects: [],
      formName: '',
      formBrief: '',
      formContent: '',
      formImage: '',
      formVideo: '',
      formAnonymous: '',
      formParent: '',
      formCategory: '1',
      formStageNofunding: '',
      formCollected: '',
      formBudget: '',
      formHudget: '',
      isEdit: false,
    }
  },
  mounted() {
    this.getProjects()
    this.getCategories()
  },
  methods: {
    getProjects() {
      axios.get('/db/projects').then(
        result => {
          this.projects = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    getCategories() {
      axios.get('/db/categories').then(
        result => {
          this.categories = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewProject() {
      axios
        .post('/db/projects', { name: this.formName })
        .then(res => {
          this.formName = ''
          this.getProjects()
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },

    editProject(name, id) {
      this.formId = id
      this.formName = name
      this.isEdit = true
    },

    updateProject() {
      axios
        .put(`/db/projects/${this.formId}`, { name: this.formName })
        .then(res => {
          this.formName = ''
          this.isEdit = false
          this.getProjects()
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteProject(id) {
      axios
        .delete(`/db/projects/${id}`)
        .then(res => {
          this.formName = ''
          this.getProjects()
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
