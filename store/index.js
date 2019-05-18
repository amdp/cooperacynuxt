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
  setUservote:  (state,payload) => {state[payload.proptype + 'uservote'] = payload.body },
  setTag:       (state,payload) => {state.tag = payload},
  setCategory:  (state,payload) => {state.category = payload},
  editSwitch:   (state,payload) => {state.edit = payload},
  commentUpdate:(state,payload) => {state.comment.push(payload)},
  voteUpdate:   (state,payload) => {//updates the voted proptype (project or comment) state and uservote table
    var votedProptype = state[payload.proptype].find(proptype => proptype.id == payload.id)
    votedProptype[payload.cc] += payload.add //at this point we have updated the proptype, we proceed with the uservote table:
    payload.add == 1 ? state[payload.proptype+'uservote'].push({user: payload.user, [payload.proptype]: payload.id, condition: payload.cc})
    : state[payload.proptype+'uservote'].splice(state[payload.proptype+'uservote'].findIndex(
      uservote =>uservote[payload.proptype]==payload.id && uservote.condition == payload.cc),1)
  },
}

////////////////////////////// ACTIONS //////////////////////////////
// warning: don't change the word "data" between curly braces if not tested

export const actions = {
  getProptypeAction: async (context,payload) => {
    let {data} = await axios({url:'http://127.0.0.1:3000/db/proptype', params: payload})
    let go = {body: data, proptype: payload.proptype}
    let gouser = {userid: payload.userid, proptype: payload.proptype}
    if (payload.limit){gouser.projectid = payload.projectid; gouser.limit = payload.limit}
    await context.dispatch('getUservoteAction', gouser )
    context.commit('setProptype', go)
  },

  // this action GETS THE USER VOTE
  getUservoteAction: async (context, payload) => {
    let {data} = await axios({url:'http://127.0.0.1:3000/db/uservote', params: payload})
    let go = {body: data, proptype: payload.proptype}
    if (payload.where){go.where = payload.where}
    context.commit('setUservote', go)
    return
  },

  // this action EDITS THE VOTE
  addVoteAction : async (context,payload) => {let {data} = await axios.post('http://127.0.0.1:3000/db/vote', payload); return data },

  projectFormAction: async (context,payload) => {let {data} = await axios.post('http://127.0.0.1:3000/db/project', payload)
    if (data.id){return data.id}else{return data} },

  commentFormAction: async (context,payload) => {let {data} = await axios.post('http://127.0.0.1:3000/db/comment', payload)
  console.log('data to be commited: '+JSON.stringify(data));
    context.commit('commentUpdate', data) },

////////////////////////////// USER //////////////////////////////

newuserAction: async (context, payload) => {
  let {data} = await axios.post('http://127.0.0.1:3000/db/user', payload)
  let go = {to: payload.email, subject: 'user registration confirmation', body: 'You have been registered.'}
  axios.post('http://127.0.0.1:3000/db/email', go)
  return data
},
updateuserAction: async (context, payload) => {let {data} = await axios.put('http://127.0.0.1:3000/db/user', payload); return data},

////////////////////////////// MISC //////////////////////////////

  getTagAction: async (context,payload) => {let {data}=await axios.get('http://127.0.0.1:3000/db/tag') 
    context.commit('setTag',data) },
  getCategoryAction: async (context,payload) => {let {data} = await axios.get('http://127.0.0.1:3000/db/category')
    context.commit('setCategory',data) },
  tagFormAction: async (context,payload)=>{let {data} = await axios.post('http://127.0.0.1:3000/db/tag/',payload.body); return data},
  editSwitchAction: async (context,payload) => {context.commit('editSwitch',payload)},
  imageUploadAction: async (context,payload) => { 
    let {data} = await axios.post( 'http://127.0.0.1:3000/db/image', payload.formImageData, payload.headers, payload.proptype)
    return data.status
  },
//Admin stuff here: be careful
  resetVotingAction: async (context,payload) => {let{data} = await axios.post('http://127.0.0.1:3000/db/resetvoting'); return 'OK' },
  resetcpVotingAction: async (context,payload)=>{let{data} = await axios.post('http://127.0.0.1:3000/db/resetcpvoting');return 'OK'},
}
