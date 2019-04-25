import axios from 'axios'

export const state = () => ({
  categories: '',
})

export const getters = {
  categoriesGetter: state => { return state.categories },
}

export const mutations = {
  getCategories: (state, payload) => {
    state.categories = payload
  },
}

// warning: all actions should use {data} as per response payload, don't change the word "data" between the brackets
export const actions = {  
  getCategoriesAction: async (context,payload) => {
    let {data} = await axios.get('/db/categories')
    context.commit('getCategories',data)
  },
}
