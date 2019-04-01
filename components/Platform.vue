<template>
  <div class="mx-auto mt-4 mb-5">
    <form @submit.prevent="addNewProject">
      <input id="projectNameInput" v-model="formName" class="form-control" placeholder="Add New Project" />
      <button v-if="this.isEdit == false" type="submit" class="btn btrust btn-block mt-3 gray">Submit</button>
      <button v-else type="button" class="btn btrust btn-block mt-3 gray" @click="updateProject()">Update</button>
    </form>

    <div class="row mt-5" v-for="project in projects" :key="project.id">
      <div class="col-12">
        <div class="row">
          <div class="col-2">
            <img :src="'~@/assets/images/projects/' + project.image" width="100px" />
          </div>
          <div class="col-8">
            <div class="row">
              <div class="col-12 space subheading up">{{ project.name }}</div>
            </div>
            <div class="row">
              <div class="col-12">{{ project.content }}</div>
            </div>
          </div>
          <div class="col-2">
            <div><button @click="editProject(project.name, project.id)" class="btn-sm border-0 gray">Edit</button></div>
            <div><button @click="deleteProject(project.id)" class="btn-sm border-0 gray">Delete</button></div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col" v-for="votebar in votebars" :id="votebar.name" :key="votebar.name" :style="{height: '5px', 'background-color': votebar.color, opacity: votebar.opacity}"></div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      projects: [],
      formId: '',
      formName: '',
      formContent: '',
      isEdit: false,
      votebars: [
        {name: 'evotebar', color: '#FF9000', opacity: '1'},
        {name: 'tvotebar', color: '#FFDD00', opacity: '1'},
        {name: 'cvotebar', color: '#88DD33', opacity: '1'},
        {name: 'ivotebar', color: '#22DDEE', opacity: '1'},
        {name: 'fvotebar', color: '#4488EE', opacity: '1'},
        {name: 'uvotebar', color: '#AA66DD', opacity: '1'},
        {name: 'dvotebar', color: '#FF77CC', opacity: '1'},
      ],
    }
  },
  mounted() {
    this.getProjects()
  },
  methods: {
    getProjects() {
      axios.get('/serverDB/projects').then(
        result => {
          this.projects = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewProject() {
      axios
        .post('/serverDB/projects', { name: this.formName })
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
        .put(`/serverDB/projects/${this.formId}`, { name: this.formName })
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
        .delete(`/serverDB/projects/${id}`)
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
