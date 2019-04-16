import axios from 'axios'

export const state = () => ({
  user: null
})

export const getters = {
  user: state => {
    return state.user
  }
}

export const mutations = {
  getUser : (state, payload) => {
    state.user = payload
  },
  saveUser : (state,payload) => {
    state.user.push(payload)
  },
}

export const actions = {  
  loginUser : async (context,payload) => {
    let {data} = await axios.get('/db/user')
    context.commit('getuser',data)
  },
  getuser : async (context,payload) => {
    let {data} = await axios.get('/db/user')
    context.commit('getuser',data)
  },
  saveUser : async (context,payload) => {
    let { data } = await axios.post('/db/user')
    context.commit('saveUser',data)
  }
}
