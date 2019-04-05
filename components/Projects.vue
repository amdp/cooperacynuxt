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
</template>

<script>
import axios from 'axios'
import Votebars from '~/components/Votebars'

export default {
  data() {
    return {
      projects: [],
      formId: '',
      formName: '',
      formContent: '',
      isEdit: false,
    }
  },
  mounted() {
    this.getProjects()
  },
  components: {
    Votebars: Votebars,
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
