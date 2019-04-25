import axios from 'axios'

export const state = () => ({
  comments: [],
  edit: false,
})

export const getters = {
  commentsGetter: state => { return state.comments },
  editGetter: state =>  {return state.edit},
}

export const mutations = {
  getComments: (state, payload) => {
    state.comments = payload
  },
  editSwitch: (state,payload) => {
    state.edit = payload
  },
}

// warning: all actions should use {data} as per response payload, don't change the word "data" between the brackets
export const actions = {  
  getCommentsAction: async (context,payload) => {
    let {data} = await axios({url:'/db/comments', params: payload})
    context.commit('getComments',data)
  },
  commentFormAction: async (context,payload) => {
    let {data} = await axios.post('/db/comment/' + payload.id, payload.body)
    if (data.id){return data.id}
    else{return data}
  },
  editSwitchAction: (context,payload) => {
    context.commit('editSwitch',payload)
    return true
  },
}
