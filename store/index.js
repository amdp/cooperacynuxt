export const state = () => ({
  project: [],
  comment: [],
  vote: [],
  userlist: [],
  projectuservote: [],
  commentuservote: [],
  tag: [],
  place: [],
  country: [],
  news: [],
  edit: false,
  CCI2017: [],
  CCI2016: [],
  CCI2015: [],
  condition: [
    'equivalence',
    'trust',
    'care',
    'transparency',
    'freedom',
    'understanding',
    'diversity'
  ],
  cc: ['E', 'T', 'C', 'I', 'F', 'U', 'D'],
  category: [
    { id: 0, name: 'Main Cooperacy' },
    { id: 1, name: 'Wealth - General funded or fee-based projects' },
    { id: 2, name: 'Community' },
    {
      id: 3,
      name: 'Ecosystem and Wellbeing - Ecosystem care, human wellbeing'
    },
    { id: 4, name: 'Reporting' },
    {
      id: 5,
      name: 'Location-based - For official cities, nations, places'
    },
    {
      id: 6,
      name: 'Science, Research, Education and Professionals'
    },
    { id: 7, name: 'Arts Music Games Fun' }
  ],
  stage: [
    { id: 1, name: 'historical' },
    { id: 2, name: 'active' },
    { id: 3, name: 'approval' },
    { id: 4, name: 'testing' },
    { id: 5, name: 'nofunding' },
    { id: 6, name: 'pairing' },
    { id: 7, name: 'idea' }
  ]
})

export const getters = {}

export const mutations = {
  setProject: (state, payload) => {
    state.project = payload
  },
  setComment: (state, payload) => {
    state.comment = payload
  },
  setTag: (state, payload) => {
    state.tag = payload
  },
  setCategory: (state, payload) => {
    state.category = payload
  },
  setPlace: (state, payload) => {
    state.place = payload
  },
  setCountry: (state, payload) => {
    state.country = payload
  },
  setNews: (state, payload) => {
    state.news = payload
  },
  setEditSwitch: (state, payload) => {
    state.edit = payload
  },
  setCCI: (state, payload) => {
    state['CCI' + payload.goyear] = payload.godata
  },
  setUserlist: (state, payload) => {
    state.userlist = payload
  },
  setUservote: (state, payload) => {
    state[payload.proptype + 'uservote'] = payload.body
  },
  setUserBar: (state, payload) => {
    for (let j = 0; j < state.cc.length; j++) {
      state.auth.user[state.cc[j]] = payload[state.cc[j]]
    }
  },
  commentUpdate: (state, payload) => {
    let old = state.comment.findIndex(({ id }) => id === payload.id)
    if (old === -1) {
      state.comment.unshift(payload)
    } else {
      state.comment.splice(old, 1, payload)
    }
  },
  setVoteUpdate: (state, payload) => {
    //updates the voted proptype (project or comment) state and uservote table
    var votedProptype = state[payload.proptype].find(
      proptype => proptype.id == payload.id
    )
    votedProptype[payload.cc] += payload.add //at this point we have updated the proptype, we proceed with the uservote table:
    payload.add == 1
      ? state[payload.proptype + 'uservote'].push({
          user: payload.user,
          [payload.proptype]: payload.id,
          condition: payload.cc
        })
      : state[payload.proptype + 'uservote'].splice(
          state[payload.proptype + 'uservote'].findIndex(
            uservote =>
              uservote[payload.proptype] == payload.id &&
              uservote.condition == payload.cc
          ),
          1
        )
  }
}

export const actions = {
  getProjectAction: async function(context, payload) {
    let { data } = await this.$axios.get(process.env.DBURL + '/project', {
      params: payload
    })
    if (payload.userid)
      var gouser = { userid: payload.userid, proptype: 'project' }
    if (payload.limit) {
      gouser.projectid = payload.projectid
      gouser.limit = payload.limit
    }
    if (payload.userid) await context.dispatch('getUservoteAction', gouser)
    context.commit('setProject', data)
  },
  getUserProjectAction: async function(context, payload) {
    let { data } = await this.$axios.get(process.env.DBURL + '/userproject', {
      params: payload
    })
    let gouser = { userid: payload.userid, proptype: 'project' }
    if (payload.limit) {
      gouser.projectid = payload.projectid
      gouser.limit = payload.limit
    }
    await context.dispatch('getUservoteAction', gouser)
    context.commit('setProject', data)
  },
  getCommentAction: async function(context, payload) {
    let { data } = await this.$axios.get(process.env.DBURL + '/comment', {
      params: payload
    })
    let gouser = { userid: payload.userid, proptype: 'comment' }
    if (payload.limit) {
      gouser.projectid = payload.projectid
      gouser.limit = payload.limit
    }
    await context.dispatch('getUservoteAction', gouser)
    context.commit('setComment', data)
  },
  getUservoteAction: async function(context, payload) {
    // this action GETS THE USER VOTE,  addVoteAction EDITS THE VOTE
    let { data } = await this.$axios.get(process.env.DBURL + '/uservote', {
      params: payload
    })
    let go = { body: data, proptype: payload.proptype }
    if (payload.where) {
      go.where = payload.where
    }
    context.commit('setUservote', go)
  },
  getTagAction: async function(context, payload) {
    let { data } = await this.$axios.get(process.env.DBURL + '/tag', {
      params: payload
    })
    context.commit('setTag', data)
  },
  getCategoryAction: async function(context) {
    let { data } = await this.$axios.get(process.env.DBURL + '/category')
    context.commit('setCategory', data)
  },
  addVoteAction: async function(context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/vote', payload)
    return data
  },
  getNewsAction: async function(context) {
    let { data } = await this.$axios.get(process.env.DBURL + '/news')
    context.commit('setNews', data)
  },
  getPlaceAction: async function(context) {
    let { data } = await this.$axios.get(process.env.DBURL + '/place')
    context.commit('setPlace', data)
  },
  getCountryAction: async function(context) {
    let { data } = await this.$axios.get(process.env.DBURL + '/country')
    context.commit('setCountry', data)
  },
  getUserlistAction: async function(context) {
    let { data } = await this.$axios.get(process.env.DBURL + '/userlist')
    context.commit('setUserlist', data)
  },
  getCCIAction: async function(context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/CCI', payload)
    let go = { godata: data, goyear: payload.cciyear }
    context.commit('setCCI', go)
  },
  projectFormAction: async function(context, payload) {
    let { data } = await this.$axios.post(
      process.env.DBURL + '/project',
      payload
    )
    if (data.id) {
      return data.id
    } else {
      return data
    }
  },
  commentFormAction: async function(context, payload) {
    let { data } = await this.$axios.post(
      process.env.DBURL + '/comment',
      payload
    )
    context.commit('commentUpdate', data)
  },
  placeFormAction: async function(context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/place', payload)
    if (data == 'exists') {
      return data
    } else context.dispatch('getPlaceAction')
  },
  newuserAction: async function(context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/user', payload)
    let message = {
      to: payload.email,
      subject: 'user registration confirmation',
      body: './assets/email/welcome.html'
    }
    this.$axios.post(process.env.DBURL + '/newuseremail', message)
    return data
  },
  updateUserAction: async function(context, payload) {
    let { data } = await this.$axios.put(process.env.DBURL + '/user', payload)
    return data
  },
  tagFormAction: async function(context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/tag', payload)
    return data
  },
  removeTagAction: async function(context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/tag', payload)
    return data
  },
  editSwitchAction: async function(context, payload) {
    context.commit('setEditSwitch', payload)
  },
  imageUploadAction: async function(context, payload) {
    let { data } = await this.$axios.post(
      process.env.DBURL + '/image',
      payload.formImageData,
      payload.headers
    )
    if (data.id) return data.id
    else return data.status
  },
  contactEmailAction: async function(context, payload) {
    let { data } = await this.$axios.post(
      process.env.DBURL + '/contactemail',
      payload
    )
    return data
  },
  checkOldPasswordAction: async function(context, payload) {
    let { data } = await this.$axios.post(
      process.env.DBURL + '/checkpassword',
      payload
    )
    return data
  },
  recoverPasswordAction: async function(context, payload) {
    console.log(' ' + JSON.stringify(payload))
    let { data } = await this.$axios.post(
      process.env.DBURL + '/recoverpassword',
      payload
    )
    return data
  },

  //Admin stuff here: be careful
  resetcpVotingAction: async function() {
    await this.$axios.post(process.env.DBURL + '/resetcpvoting')
    return 'OK'
  },
  resetuVotingAction: async function() {
    await this.$axios.post(process.env.DBURL + '/resetuvoting')
    return 'OK'
  }
}
