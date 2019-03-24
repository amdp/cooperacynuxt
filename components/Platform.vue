<template>
  <div class="mx-auto mt-4">
    <form @submit.prevent="addNewProject">
      <input
        id="projectNameInput"
        v-model="formName"
        class="form-control"
        placeholder="Add New Project"
      />
      <button
        v-if="this.isEdit == false"
        type="submit"
        class="btn btrust btn-block mt-3 gray"
      >
        Submit
      </button>
      <button
        v-else
        type="button"
        class="btn btrust btn-block mt-3 gray"
        @click="updateProject()"
      >
        Update
      </button>
    </form>

    <table class="table">
      <tr
        v-for="projectRow in projectsTable"
        :key="projectRow.id"
        :nameBind="projectRow.name"
        :contentBind="projectRow.content"
      >
        <td class="gray">{{ projectRow.id }}</td>
        <td class="gray">{{ projectRow.name }}</td>
        <td class="gray">{{ projectRow.content }}</td>
        <td class="gray">
          <button
            class="btn btransparency gray"
            @click="editProject(projectRow.name, projectRow.id)"
          >
            Edit
          </button>
          <button class="btn btrust gray" @click="deleteProject(projectRow.id)">
            Delete
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      projectsTable: [],
      formId: '',
      formName: '',
      formContent: '',
      isEdit: false
    }
  },
  mounted() {
    this.getProjects()
  },
  methods: {
    getProjects() {
      axios.get('/cooperacy/projects').then(
        result => {
          console.log(result.data)
          this.projectsTable = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewProject() {
      axios
        .post('/cooperacy/projects', { name: this.formName })
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
        .put(`/cooperacy/projects/${this.formId}`, { name: this.formName })
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
        .delete(`/cooperacy/projects/${id}`)
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
