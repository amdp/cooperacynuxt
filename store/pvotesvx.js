import axios from 'axios'

export const state = () => ({
  pvotes: null
})

export const getters = {
  projects: state => {
    return state.projects
  }
}

export const mutations = {
  getProjects : (state, payload) => {
    state.projects = payload
  },
  saveProject : (state,payload) => {
    state.projects.push(payload)
  },
}

export const actions = {  
  getProjects : async (context,payload) => {
    let {data} = await axios.get('/db/projects')
    context.commit('getProjects',data)
  },
  saveProject : async (context,payload) => {
    let { data } = await axios.post('/db/projects')
    context.commit('saveProject',data)
  }
}
