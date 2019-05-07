import axios from 'axios'

export const state = () => ({
  project: [],
  comment: [],
  vote: [],
  projectuservote: [],
  commentuservote: [],
  edit: false,
  tag: [],
  category: [],
  condition: [ 'equivalence', 'trust', 'care', 'transparency', 'freedom', 'understanding', 'diversity' ],
  shortcondition: ['E','T','C','I','F','U','D'],
})

export const getters = { 

}

export const mutations = {
  getProptype: (state, payload) => {
    state[payload.proptype] = payload.body
  },
  getUservote: (state, payload) => {
    state[payload.proptype + 'uservote'] = payload.body
  },
  voteUpdate: (state,payload) => {//updates the voted proptype (project or comment) state and uservote table
    var votedProptype = state[payload.proptype].find(proptype => proptype.id == payload.id)
    votedProptype[payload.cc] += payload.add //at this point we have updated the proptype, we proceed with the uservote table:
    payload.add == 1 ? state[payload.proptype+'uservote'].push({user: payload.user, [payload.proptype]: payload.id, condition: payload.cc})
    : state[payload.proptype+'uservote'].splice(
      state[payload.proptype+'uservote'].findIndex(uservote => uservote[payload.proptype] == payload.id && uservote.condition == payload.cc),1)
  },
  getTag: (state, payload) => {
    state.tag = payload
  },
  getCategory: (state, payload) => {
    state.category = payload
  },
  editSwitch: (state,payload) => {
    state.edit = payload
  },
}

/////////////////////////////////////////////////////////////////////
////////////////////////////// ACTIONS //////////////////////////////
/////////////////////////////////////////////////////////////////////
export const actions = {
// warning: it seems all actions must use {data} as per response payload, 
// don't change the word "data" between the brackets if not tested

  getProptypeAction: async (context,payload) => {
    let {data} = await axios({url:'/db/proptype', params: payload})
    let go = {body: data, proptype: payload.proptype}
    let gouser = {id: payload.userid, proptype: payload.proptype}
    if (payload.where){gouser.where = payload.where}
    context.dispatch('getUservoteAction', gouser )
    context.commit('getProptype', go)
  },

  projectFormAction: async (context,payload) => {
    let {data} = await axios.post('/db/project/' + payload.id, payload.body)
    if (data.id){return data.id}
    else{return data}
  },

  commentFormAction: async (context,payload) => {
    let {data} = await axios.post('/db/comment/' + payload.id, payload.body)
    if (data.id){return data.id}
    else{return data}
  },

////////////////////////////// VOTE //////////////////////////////

  // this is the action that GETS THE VOTE
  getUservoteAction: async (context, payload) => {
    let {data} = await axios({url:'/db/uservote', params: payload})
    let go = {body: data, proptype: payload.proptype}
    if (payload.where){go.where = payload.where}
    context.commit('getUservote', go)
  },
  // this is the action that EDITS THE VOTE
  addVoteAction : async (context,payload) => {
    let { data } = await axios.post('/db/vote', payload)
  },

////////////////////////////// USER //////////////////////////////

newuserAction: async (context, payload) => {
  let {data} = await axios.post('/db/user', payload)
  return data
},
updateuserAction: async (context, payload) => {
  let {data} = await axios.put('/db/user', payload)
  return data
},

////////////////////////////// MISC //////////////////////////////

  getTagAction: async (context,payload) => {
    let {data} = await axios.get('/db/tag')
    context.commit('getTag',data)
  },
  tagFormAction: async (context,payload) => {
    let {data} = await axios.post('/db/tag/', payload.body)
    return data
  },

  editSwitchAction: async (context,payload) => {
    context.commit('editSwitch',payload)
  },

  getCategoryAction: async (context,payload) => {
    let {data} = await axios.get('/db/category')
    context.commit('getCategory',data)
  },

  imageUploadAction: async (context,payload) => {
    var {data} = await axios.post( '/db/image', payload.formImageData, payload.headers, payload.proptype)
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
