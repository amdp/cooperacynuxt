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
    { id: 1, name: 'Wealth - General funded or fee-based' },
    { id: 2, name: 'Community' },
    {
      id: 3,
      name: 'Ecosystem and Wellbeing'
    },
    { id: 4, name: 'Voting Proposals and Reporting' },
    {
      id: 5,
      name: 'Official Locations, Cities, Nations'
    },
    {
      id: 6,
      name: 'Science, Research, Education and Groups of Professionals'
    },
    { id: 7, name: 'Arts Music Games Fun' }
  ],
  stage: [
    { id: 1, name: 'archived' },
    { id: 2, name: 'active' },
    { id: 3, name: 'approval' },
    { id: 4, name: 'testing' },
    { id: 5, name: 'free' },
    { id: 6, name: 'pairing' },
    { id: 7, name: 'idea' }
  ],
  role: [
    { id: 0, name: 'user' },
    { id: 2, name: 'admin' },
    { id: 3, name: 'reporter' }
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
    context.commit('setProject', data)
  },
  getCommentAction: async function(context, payload) {
    let { data } = await this.$axios.get(process.env.DBURL + '/comment', {
      params: payload
    })
    context.commit('setComment', data)
  },
  getTagAction: async function(context, payload) {
    let { data } = await this.$axios.get(process.env.DBURL + '/tag', {
      params: payload
    })
    context.commit('setTag', data)
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
    if (data) {
      let message = {
        to: payload.email,
        subject: 'User registration confirmation',
        body: './assets/email/welcome.html'
      }
      this.$axios.post(process.env.DBURL + '/newuseremail', message)
      return data
    } else {
      alert('Sorry, please try again only once')
    }
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
    let { data } = await this.$axios.post(
      process.env.DBURL + '/recoverpassword',
      payload
    )
    return data
  },
  getUservoteAction: async function(context, payload) {
    // this action GETS THE USER VOTE INFO,  addVoteAction IS THE REAL VOTING ACTION-FUNCTION
    let { data } = await this.$axios.get(process.env.DBURL + '/uservote', {
      params: payload
    })
    let go = { body: data, proptype: payload.proptype }
    context.commit('setUservote', go)
  },
  addVoteAction: async function(context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/vote', payload)
    return data
  },
  //Admin stuff here: be careful
  resetVotingAction: async function() {
    await this.$axios.post(process.env.DBURL + '/resetvoting')
    return 'OK'
  }
}
