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

export const getters = { }
export const mutations = { 
  setProptype:  (state,payload) => {state[payload.proptype] = payload.body},
  setUservote:  (state,payload) => {state[payload.proptype + 'uservote'] = payload.body},
  setTag:       (state,payload) => {state.tag = payload},
  setCategory:  (state,payload) => {state.category = payload},
  editSwitch:   (state,payload) => {state.edit = payload},
  commentUpdate:(state,payload) => {state.comment.push({
    id:payload.id, parent:payload.parent, project:payload.project, content:payload.content, E:0,T:0,C:0,I:0,F:0,U:0,D:0})},
  voteUpdate:   (state,payload) => {//updates the voted proptype (project or comment) state and uservote table
    var votedProptype = state[payload.proptype].find(proptype => proptype.id == payload.id)
    votedProptype[payload.cc] += payload.add //at this point we have updated the proptype, we proceed with the uservote table:
    payload.add == 1 ? state[payload.proptype+'uservote'].push({user: payload.user, [payload.proptype]: payload.id, condition: payload.cc})
    : state[payload.proptype+'uservote'].splice(
      state[payload.proptype+'uservote'].findIndex(uservote => uservote[payload.proptype] == payload.id && uservote.condition == payload.cc),1)
  },
}

////////////////////////////// ACTIONS //////////////////////////////
// warning: don't change the word "data" between curly braces if not tested

export const actions = {
  getProptypeAction: async (context,payload) => {console.log(' '+JSON.stringify(payload));
    let {data} = await axios({url:'/db/proptype', params: payload})
    let go = {body: data, proptype: payload.proptype}
    let gouser = {id: payload.userid, proptype: payload.proptype}
    if (payload.where){gouser.where = payload.where}
    context.dispatch('getUservoteAction', gouser )
    context.commit('setProptype', go)
  },

  projectFormAction: async (context,payload) => {let {data} = await axios.post('/db/project', payload)
    if (data.id){return data.id}else{return data} },

  commentFormAction: async (context,payload) => {let {data} = await axios.post('/db/comment', payload)
    payload.id=data.id; context.commit('commentUpdate', payload) },

////////////////////////////// VOTE //////////////////////////////

  // this action GETS THE VOTE
  getUservoteAction: async (context, payload) => {
    let {data} = await axios({url:'/db/uservote', params: payload})
    let go = {body: data, proptype: payload.proptype}
    if (payload.where){go.where = payload.where}
    context.commit('setUservote', go)
  },
  // this action EDITS THE VOTE
  addVoteAction : async (context,payload) => {let {data} = await axios.post('/db/vote', payload); return data },

////////////////////////////// USER //////////////////////////////

newuserAction: async (context, payload) => {
  let {data} = await axios.post('/db/user', payload)
  let go = {to: payload.email, subject: 'user registration confirmation', body: 'You have been registered.'}
  axios.post('/db/email', go)
  return data
},
updateuserAction: async (context, payload) => {let {data} = await axios.put('/db/user', payload); return data},

////////////////////////////// MISC //////////////////////////////

  getTagAction: async (context,payload) => {let {data}=await axios.get('/db/tag') 
    context.commit('setTag',data) },
  getCategoryAction: async (context,payload) => {let {data} = await axios.get('/db/category')
    context.commit('setCategory',data) },
  tagFormAction: async (context,payload)=>{let {data} = await axios.post('/db/tag/',payload.body); return data},
  editSwitchAction: async (context,payload) => {context.commit('editSwitch',payload)},
  imageUploadAction: async (context,payload) => { 
    let {data} = await axios.post( '/db/image', payload.formImageData, payload.headers, payload.proptype)
    return data.status
  },
//Admin stuff here: be careful
  resetVotingAction: async (context,payload) => {let{data} = await axios.post('/db/resetvoting'); return 'OK' },
  resetcpVotingAction: async (context,payload)=>{let{data} = await axios.post('/db/resetcpvoting');return 'OK'},
}
