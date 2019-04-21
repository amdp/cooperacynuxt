import axios from 'axios'

export const state = () => ({
  tags: '',
})

export const getters = {
  tagsGetter: state => { return state.tags },
}

export const mutations = {
  getTags: (state, payload) => {
    state.tags = payload
  },
}

// warning: all actions should use {data} as per response payload, don't change the word "data" between the brackets
export const actions = {  
  getTagsAction: async (context,payload) => {
    let {data} = await axios.get('/db/tags')
    context.commit('getTags',data)
  },
  tagFormAction: async (context,payload) => {
    let {data} = await axios.post('/db/tags/' + payload.id, payload.body)
    return data
  },
}
