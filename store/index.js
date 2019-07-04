import axios from 'axios'

export const state = () => ({
  project:[], comment:[], vote:[], projectuservote:[], commentuservote:[], tag:[], place:[], edit: false, country:[],
  condition:['equivalence', 'trust', 'care', 'transparency', 'freedom', 'understanding', 'diversity'], cc:['E','T','C','I','F','U','D'],
  category:[{"id":0,"name":"Main Cooperacy"},{"id":1,"name":"Wealth - General funded or fee-based projects"},{"id":2,"name":"Community"},{"id":3,"name":"Ecosystem and Wellbeing - Must really be related with the ecosystem care or with human wellbeing"},{"id":4,"name":"Reporting"},{"id":5,"name":"Location-based - For official cities, nations, neighbourhoods"},{"id":6,"name":"Science, Research, Education and Professionals groups and projects"},{"id":7,"name":"Arts Music Games Fun"}], 
  stage:[{"id":1,"name":"historical"},{"id":2,"name":"active"},{"id":3,"name":"approval"},{"id":4,"name":"testing"},{"id":5,"name":"nofunding"},{"id":6,"name":"pairing"},{"id":7,"name":"idea"}],
})
export const getters = { }
export const mutations = { 
  setProject:   (state,payload) => {state.project = payload}, 
  setComment:   (state,payload) => {state.comment = payload},
  setTag:       (state,payload) => {state.tag = payload},     
  setCategory:  (state,payload) => {state.category = payload},
  setPlace:     (state,payload) => {state.place = payload},
  setCountry:   (state,payload) => {state.country = payload},
  setEditSwitch:(state,payload) => {state.edit = payload},
  setUservote:  (state,payload) => {state[payload.proptype + 'uservote'] = payload.body },
  setUserBar:   (state,payload) => {for(let j=0;j<state.cc.length;j++){state.auth.user[state.cc[j]] = payload[state.cc[j]]}},
  commentUpdate:(state,payload) => {let old = state.comment.findIndex(({id})=> id === payload.id)
  if (old===-1) {state.comment.push(payload)} else {state.comment.splice(old,1,payload)} },
  setVoteUpdate:(state,payload) => {//updates the voted proptype (project or comment) state and uservote table
    var votedProptype = state[payload.proptype].find(proptype => proptype.id == payload.id)
    votedProptype[payload.cc] += payload.add //at this point we have updated the proptype, we proceed with the uservote table:
    payload.add == 1 ? state[payload.proptype+'uservote'].push({user: payload.user, [payload.proptype]: payload.id, condition: payload.cc})
    : state[payload.proptype+'uservote'].splice(state[payload.proptype+'uservote'].findIndex(
      uservote =>uservote[payload.proptype]==payload.id && uservote.condition == payload.cc),1)  },
}

export const actions = {
  getProjectAction: async (context,payload) => {
    let {data} = await axios({url:'http://127.0.0.1:3000/db/project', params: payload})
    if (payload.userid) var gouser = {userid: payload.userid, proptype: 'project'}
    if (payload.limit){gouser.projectid = payload.projectid; gouser.limit = payload.limit}
    if (payload.userid) await context.dispatch('getUservoteAction', gouser )
    context.commit('setProject', data)
  },
  getUserProjectAction: async (context,payload) => {
    let {data} = await axios({url:'http://127.0.0.1:3000/db/userproject', params: payload})
    let gouser = {userid: payload.userid, proptype: 'project'}
    if (payload.limit){gouser.projectid = payload.projectid; gouser.limit = payload.limit}
    await context.dispatch('getUservoteAction', gouser )
    context.commit('setProject', data)
  },
  getCommentAction: async (context,payload) => {
    let {data} = await axios({url:'http://127.0.0.1:3000/db/comment', params: payload})
    let gouser = {userid: payload.userid, proptype: 'comment'}
    if (payload.limit){gouser.projectid = payload.projectid; gouser.limit = payload.limit}
    await context.dispatch('getUservoteAction', gouser ); context.commit('setComment', data)
  },
  getUservoteAction: async (context, payload) => {// this action GETS THE USER VOTE,  addVoteAction EDITS THE VOTE
    let {data} = await axios({url:'http://127.0.0.1:3000/db/uservote', params: payload})
    let go = {body: data, proptype: payload.proptype}
    if (payload.where){go.where = payload.where}; context.commit('setUservote', go)
  },
  getTagAction: async (context,payload) => {let {data}=await axios({url:'http://127.0.0.1:3000/db/tag', params: payload})
    context.commit('setTag',data)},
  getCategoryAction: async (context,payload) => {let {data} = await axios.get('http://127.0.0.1:3000/db/category'); context.commit('setCategory',data) },
  addVoteAction:      async (context,payload) => {let {data} = await axios.post('http://127.0.0.1:3000/db/vote',    payload); return data},
  getPlaceAction: async(context,payload)=>{let {data}=await axios.get('http://127.0.0.1:3000/db/place'); context.commit('setPlace',data)},
  getCountryAction: async(context,payload)=>{let {data}=await axios.get('http://127.0.0.1:3000/db/country'); 
  context.commit('setCountry',data)},
  projectFormAction:  async (context,payload) => {let {data} = await axios.post('http://127.0.0.1:3000/db/project', payload)
    if (data.id){return data.id}else{return data} },
  commentFormAction:  async (context,payload) => {let {data} = await axios.post('http://127.0.0.1:3000/db/comment', payload)
    context.commit('commentUpdate', data) },
  placeFormAction:    async (context,payload) => {let {data} = await axios.post('http://127.0.0.1:3000/db/place',   payload)
    context.dispatch('getPlaceAction')},
  newuserAction: async (context, payload) => {let {data} = await axios.post('http://127.0.0.1:3000/db/user', payload)
    let go = {to: payload.email, subject: 'user registration confirmation', body: 'You have been registered.'}
    axios.post('http://127.0.0.1:3000/db/email', go); return data },
  updateUserAction: async (context, payload) => {let {data} = await axios.put('http://127.0.0.1:3000/db/user',  payload); return data},
  tagFormAction: async (context,payload)=>{let {data} = await axios.post('http://127.0.0.1:3000/db/tag',        payload); return data},
  removeTagAction: async (context,payload)=>{let {data} = await axios.post('http://127.0.0.1:3000/db/tag',      payload); return data},
  editSwitchAction: async (context,payload) => {context.commit('setEditSwitch',payload)},
  imageUploadAction: async (context,payload) => { let {data} = await axios.post( 'http://127.0.0.1:3000/db/image', 
  payload.formImageData, payload.headers, payload.proptype); return data.status  },
//Admin stuff here: be careful
  resetcpVotingAction:  async (context,payload)=>{let{data} = await axios.post('http://127.0.0.1:3000/db/resetcpvoting'); return 'OK'},
  resetuVotingAction:   async (context,payload)=>{let{data} = await axios.post('http://127.0.0.1:3000/db/resetuvoting');  return 'OK'},
}
