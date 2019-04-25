import axios from 'axios'

export const state = () => ({
  projects: '',
  project: '',
  edit: false,
})

export const getters = {
  projectsGetter: state => { return state.projects },
  projectGetter: state => { return state.project },
  editGetter: state =>  {return state.edit},
}

export const mutations = {
  getProjects: (state, payload) => {
    state.projects = payload
  },
  getProject: (state, payload) => {
    state.project = payload
  },
  editSwitch: (state,payload) => {
    state.edit = payload
  },
}

// warning: all actions should use {data} as per response payload, don't change the word "data" between the brackets
export const actions = {  
  getProjectsAction: async (context,payload) => {
    let {data} = await axios.get('/db/projects')
    context.commit('getProjects',data)
  },
  getProjectAction: async (context,payload) => {
    let {data} = await axios.get('/db/project/' + payload.id)
    context.commit('getProject',data)
  },
  projectFormAction: async (context,payload) => {
    let {data} = await axios.post('/db/project/' + payload.id, payload.body)
    console.log(' risposta dal server '+JSON.stringify(data))
    if (data.id){return data.id}
    else{return data}
  },
  editSwitchAction: (context,payload) => {
    context.commit('editSwitch',payload)
    return true
  },
}
