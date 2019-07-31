import axios from 'axios'

export const state = () => ({
  project:[], comment:[], vote:[], projectuservote:[], commentuservote:[], tag:[], place:[], country:[], news:[], edit: false,
  condition:['equivalence', 'trust', 'care', 'transparency', 'freedom', 'understanding', 'diversity'], 
  cc:['E','T','C','I','F','U','D'],
  category:[
    {"id":0,"name":"Main Cooperacy"},
    {"id":1,"name":"Wealth - General funded or fee-based projects"},
    {"id":2,"name":"Community"},
    {"id":3,"name":"Ecosystem and Wellbeing - Must really be related with the ecosystem care or with human wellbeing"},
    {"id":4,"name":"Reporting"},
    {"id":5,"name":"Location-based - For official cities, nations, neighbourhoods"},
    {"id":6,"name":"Science, Research, Education and Professionals groups and projects"},
    {"id":7,"name":"Arts Music Games Fun"}], 
  stage:[
    {"id":1,"name":"historical"},
    {"id":2,"name":"active"},
    {"id":3,"name":"approval"},
    {"id":4,"name":"testing"},
    {"id":5,"name":"nofunding"},
    {"id":6,"name":"pairing"},
    {"id":7,"name":"idea"}],
})

export const getters = { }

export const mutations = { 
  setProject:   (state,payload) => {state.project = payload}, 
  setComment:   (state,payload) => {state.comment = payload},
  setTag:       (state,payload) => {state.tag = payload},     
  setCategory:  (state,payload) => {state.category = payload},
  setPlace:     (state,payload) => {state.place = payload},
  setCountry:   (state,payload) => {state.country = payload},
  setNews:      (state,payload) => {state.news = payload},
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
    let {data} = await axios.get(process.env.DBURL+'/project', {params: payload})
    if (payload.userid) var gouser = {userid: payload.userid, proptype: 'project'}
    if (payload.limit){gouser.projectid = payload.projectid; gouser.limit = payload.limit}
    if (payload.userid) await context.dispatch('getUservoteAction', gouser )
    context.commit('setProject', data)
  },
  getUserProjectAction: async (context,payload) => {
    let {data} = await axios.get(process.env.DBURL+'/userproject', {params: payload})
    let gouser = {userid: payload.userid, proptype: 'project'}
    if (payload.limit){gouser.projectid = payload.projectid; gouser.limit = payload.limit}
    await context.dispatch('getUservoteAction', gouser )
    context.commit('setProject', data)
  },
  getCommentAction: async (context,payload) => {
    let {data} = await axios.get(process.env.DBURL+'/comment', {params: payload})
    let gouser = {userid: payload.userid, proptype: 'comment'}
    if (payload.limit){gouser.projectid = payload.projectid; gouser.limit = payload.limit}
    await context.dispatch('getUservoteAction', gouser ); context.commit('setComment', data)
  },
  getUservoteAction: async (context, payload) => {// this action GETS THE USER VOTE,  addVoteAction EDITS THE VOTE
    let {data} = await axios.get(process.env.DBURL+'/uservote', {params: payload})
    let go = {body: data, proptype: payload.proptype}
    if (payload.where){go.where = payload.where}; context.commit('setUservote', go)
  },
  getTagAction: async (context,payload) => {let {data}=await axios.get(process.env.DBURL+'/tag', {params: payload})
    context.commit('setTag',data)},
  getCategoryAction: async (context,payload) => {let {data} = await axios.get(process.env.DBURL+'/category'); context.commit('setCategory',data) },
  addVoteAction: async (context,payload) => {let {data} = await axios.post(process.env.DBURL+'/vote', payload); return data},
  getNewsAction: async (context,payload) => {let {data} = await axios.get(process.env.DBURL+'/news'); context.commit('setNews', data)},
  getPlaceAction: async(context,payload)=>{let {data}=await axios.get(process.env.DBURL+'/place'); context.commit('setPlace',data)},
  getCountryAction: async(context,payload)=>{let {data}=await axios.get(process.env.DBURL+'/country'); 
  context.commit('setCountry',data)},
  projectFormAction:  async (context,payload) => {let {data} = await axios.post(process.env.DBURL+'/project', payload)
    if (data.id){return data.id}else{return data} },
  commentFormAction:  async (context,payload) => {let {data} = await axios.post(process.env.DBURL+'/comment', payload)
    context.commit('commentUpdate', data) },
  placeFormAction:    async (context,payload) => {let {data} = await axios.post(process.env.DBURL+'/place', payload)
    context.dispatch('getPlaceAction')},
  newuserAction: async (context, payload) => {let {data} = await axios.post(process.env.DBURL+'/user', payload)
    let go = {to: payload.email, subject: 'user registration confirmation', body: 'You have been registered.'}
    axios.post(process.env.DBURL+'/email', go); return data },
  updateUserAction: async (context, payload) => {let {data} = await axios.put(process.env.DBURL+'/user', payload); return data},
  tagFormAction: async (context,payload)=>{let {data} = await axios.post(process.env.DBURL+'/tag', payload); return data},
  removeTagAction: async (context,payload)=>{let {data} = await axios.post(process.env.DBURL+'/tag', payload); return data},
  editSwitchAction: async (context,payload) => {context.commit('setEditSwitch',payload)},
  imageUploadAction: async (context,payload) => { console.log(' '+JSON.stringify(payload));
    let {data} = await axios.post( process.env.DBURL+'/image', 
  payload.formImageData, payload.headers, payload.proptype); return data.status },
//Admin stuff here: be careful
  resetcpVotingAction:  async (context,payload)=>{let{data} = await axios.post(process.env.DBURL+'/resetcpvoting'); return 'OK'},
  resetuVotingAction:   async (context,payload)=>{let{data} = await axios.post(process.env.DBURL+'/resetuvoting');  return 'OK'},
}

