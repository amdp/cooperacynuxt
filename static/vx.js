import axios from 'axios'

export const state = () => ({
  projects: '',
  project: '',
  comments: '',
  votes: '',
  mypvotes: '',
  mycvotes: '',
  pedit: false,
  cedit: false,
  tags: '',
  categories: '',
  conditions: [ 'equivalence', 'trust', 'care', 'transparency', 'freedom', 'understanding', 'diversity' ],
  shortconditions: ['E','T','C','I','F','U','D'],
})

export const getters = { 

}

export const mutations = {
  getProjects: (state, payload) => {
    state.projects = payload
  },
  getProject: (state, payload) => {
    state.project = payload
  },
  getComments: (state, payload) => {
    state.comments = payload
  },
  getMypvotes: (state, payload) => {
    state.mypvotes = payload
  },
  getMycvotes: (state, payload) => {
    state.mycvotes = payload
  },
  votedProject: (state,payload) => {
    var projectToUpdate = state.projects.find(project => project.id === payload.id)
    projectToUpdate[payload.votedcc] += payload.add
    payload.add != -1 ? state.mypvotes.push({user: payload.user, project: payload.id, vote: payload.cc})
    : state.mypvotes.splice(state.mypvotes.findIndex(x => x.project == payload.id && x.vote == payload.cc),1)
  },
  getTags: (state, payload) => {
    state.tags = payload
  },
  getCategories: (state, payload) => {
    state.categories = payload
  },
  editSwitch: (state,payload) => {
    payload.type == 'p' ? state.pedit = payload : state.cedit = payload
  },
}

/////////////////////////////////////////////////////////////////////
////////////////////////////// ACTIONS //////////////////////////////
/////////////////////////////////////////////////////////////////////
export const actions = {
// warning: it seems all actions must use {data} as per response payload, 
// don't change the word "data" between the brackets if not tested

////////////////////////////// PROJECTS //////////////////////////////

  getProjectsAction: async (context,payload) => {
    let {data} = await axios({url:'/db/projects', params: payload})
    context.dispatch('myPvotesAction', {id: payload.userid, type: 'p'} )
    context.commit('getProjects',data)
  },
  getProjectAction: async (context,payload) => {
    let {data} = await axios.get('/db/project/' + payload.id)
    context.commit('getProject',data)
  },
  projectFormAction: async (context,payload) => {
    let {data} = await axios.post('/db/project/' + payload.id, payload.body)
    if (data.id){return data.id}
    else{return data}
  },

////////////////////////////// COMMENTS //////////////////////////////

  getCommentsAction: async (context,payload) => {
    let {data} = await axios({url:'/db/comments', params: payload})
    context.commit('getComments',data)
  },
  commentFormAction: async (context,payload) => {
    let {data} = await axios.post('/db/comment/' + payload.id, payload.body)
    if (data.id){return data.id}
    else{return data}
  },

////////////////////////////// USERS //////////////////////////////

newUserAction: async (context, payload) => {
  let {data} = await axios.post('/db/user', payload)
  return data
},
updateUserAction: async (context, payload) => {
  let {data} = await axios.put('/db/user', payload)
  return data
},

////////////////////////////// VOTES //////////////////////////////

  myPvotesAction: async (context, payload) => {
    let {data} = await axios({url:'/db/uservotes', params: payload})
    context.commit('getMypvotes',data)
  },
  myCvotesAction: async (context, payload) => {
    let {data} = await axios({url:'/db/uservotes', params: payload})
    context.commit('getMycvotes',data)
  },
  addVoteAction : async (context,payload) => {
    let { data } = await axios.post('/db/votes', payload.body)
  },

////////////////////////////// TAGS //////////////////////////////

  getTagsAction: async (context,payload) => {
    let {data} = await axios.get('/db/tags')
    context.commit('getTags',data)
  },
  tagFormAction: async (context,payload) => {
    let {data} = await axios.post('/db/tags/' + payload.id, payload.body)
    return data
  },

////////////////////////////// MISC //////////////////////////////

  getCategoriesAction: async (context,payload) => {
    let {data} = await axios.get('/db/categories')
    context.commit('getCategories',data)
  },
  editSwitchAction: async (context,payload) => {
    context.commit('editSwitch',payload)
    return true
  },
  imageUploadAction: async (context,payload) => {
    if (payload.type ==    'user') {var {data} = await axios.post( '/db/userimage',     payload.formImageData, payload.headers)}
    if (payload.type == 'project') {var {data} = await axios.post( '/db/projectimage',  payload.formImageData, payload.headers)}
    if (payload.type == 'comment') {var {data} = await axios.post( '/db/commentimage',  payload.formImageData, payload.headers)}
    return data.status
  },

//Admin stuff here: be careful

  resetVotingAction: async (context,payload) => {
    let {data} = await axios.post('/db/resetvoting')
    return 'OK'
  },
  resetcpVotingAction: async (context,payload) => {
    let {data} = await axios.post('/db/resetcpvoting')
    return 'OK'
  }
}
