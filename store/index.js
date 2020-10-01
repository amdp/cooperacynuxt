export const state = () => ({
  cooperation: [],
  comment: [],
  vote: [],
  fundingvar: {
    totalE: null,
    totaluser: null,
    totalfee: null,
  },
  userlist: [],
  cooperationuservote: [],
  commentuservote: [],
  professional: [],
  tag: [],
  place: [],
  country: [],
  survey: [],
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
    { id: 1, name: 'Funded' },
    { id: 2, name: 'Fee based' },
    { id: 3, name: 'Ecosystem' },
    { id: 4, name: 'Voting' },
    { id: 5, name: 'Evaluation' },
    { id: 6, name: 'Science, Edu, Health' },
    { id: 7, name: 'Not funded' }
  ],
  state: [
    { id: 1, name: 'archived' },
    { id: 2, name: 'active' },
    { id: 3, name: 'caring' },
    { id: 4, name: 'testing' },
    { id: 5, name: 'approval' },
    { id: 6, name: 'pairing' },
    { id: 7, name: 'idea' }
  ],
  role: [
    { id: 0, name: 'user' },
    { id: 1, name: 'admin' },
    { id: 2, name: 'reporter' }
  ],
  budgetstep: [
    { id: 1, name: 'business plan', percentage: '0,03' },
    { id: 2, name: 'human resources', percentage: '0,1' },
    { id: 3, name: 'setup', percentage: '0,12' },
    { id: 4, name: 'production', percentage: '0,5' },
    { id: 5, name: 'kick off', percentage: '0,12' },
    { id: 6, name: 'fine tuning', percentage: '0,1' },
    { id: 7, name: 'celebrate', percentage: '0,03' }
  ]
})

export const getters = {}

export const mutations = {
  cooperationSort: (state, sorting) => {
    let cooperationsorting = state.cooperation
    cooperationsorting.sort((a, b) => (a[sorting] < b[sorting] ? 1 : -1))
    state.cooperation = cooperationsorting
  },
  //crunch the following sets with "set: (state, payload, statetoset) => {state[statetoset] = payload}"
  setCooperation: (state, payload) => {
    state.cooperation = payload
  },
  setComment: (state, payload) => {
    state.comment = payload
  },
  setFundingvar: (state, payload) => {
    state.fundingvar.totalE = payload.totalE
    state.fundingvar.totaluser = payload.totaluser
    state.fundingvar.totalfee = payload.totalfee
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
  setSurvey: (state, payload) => {
    state.survey = payload
  },
  setNews: (state, payload) => {
    state.news = payload
  },
  setEditSwitch: (state, payload) => {
    state.edit = payload
  },
  setProfessional: (state, payload) => {
    state.professional = payload
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
    //updates the voted proptype (cooperation or comment) state and uservote table
    var votedProptype = state[payload.proptype].find(
      proptype => proptype.id == payload.id
    )
    if (payload.add > 0) { votedProptype[payload.cc] += payload.add }
    if (payload.cc == 'D' && payload.proptype == 'cooperation') {
      if ((votedProptype.D - Math.floor(votedProptype.D / 7) * 7) == 0)
        votedProptype.E -= payload.add
    }
    if (payload.add < 0) { votedProptype[payload.cc] += payload.add }
    //at this point we have updated the proptype, we proceed with the uservote table:
    if (payload.add == 1) {
      state[payload.proptype + 'uservote'].push({
        user: payload.user,
        [payload.proptype]: payload.id,
        condition: payload.cc
      })
    } else {
      state[payload.proptype + 'uservote'].splice(
        state[payload.proptype + 'uservote'].findIndex(
          uservote =>
            uservote[payload.proptype] == payload.id &&
            uservote.condition == payload.cc
        ),
        1
      )
    }

  }
}

export const actions = {
  getFundingvar: async function (context) {
    let { data } = await this.$axios.get(process.env.DBURL + '/fundingvar')
    context.commit('setFundingvar', data)
  },
  getCooperation: async function (context, payload) {
    let { data } = await this.$axios.get(process.env.DBURL + '/cooperation', {
      params: payload
    })
    context.commit('setCooperation', data)
  },
  getUserCooperation: async function (context, payload) {
    let { data } = await this.$axios.get(process.env.DBURL + '/usercooperation', {
      params: payload
    })
    context.commit('setCooperation', data)
  },
  getComment: async function (context, payload) {
    let { data } = await this.$axios.get(process.env.DBURL + '/comment', {
      params: payload
    })
    context.commit('setComment', data)
  },
  getProfessional: async function (context, payload) {
    let { data } = await this.$axios.get(process.env.DBURL + '/professional', {
      params: payload
    })
    context.commit('setProfessional', data)
  },
  getTag: async function (context, payload) {
    let { data } = await this.$axios.get(process.env.DBURL + '/tag', {
      params: payload
    })
    context.commit('setTag', data)
  },
  getNews: async function (context) {
    let { data } = await this.$axios.get(process.env.DBURL + '/news')
    context.commit('setNews', data)
  },
  getPlace: async function (context) {
    let { data } = await this.$axios.get(process.env.DBURL + '/place')
    context.commit('setPlace', data)
  },
  getCountry: async function (context) {
    let { data } = await this.$axios.get(process.env.DBURL + '/country')
    context.commit('setCountry', data)
  },
  getUserlist: async function (context) {
    let { data } = await this.$axios.get(process.env.DBURL + '/userlist')
    context.commit('setUserlist', data)
  },
  getCCI: async function (context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/CCI', payload)
    let go = { godata: data, goyear: payload.cciyear }
    context.commit('setCCI', go)
  },
  cooperationForm: async function (context, payload) {
    let { data } = await this.$axios.post(
      process.env.DBURL + '/cooperation',
      payload
    )
    if (data.id) {
      return data.id
    } else {
      return data
    }
  },
  professional: async function (context, payload) {
    let { data } = await this.$axios.post(
      process.env.DBURL + '/professional',
      payload
    )
    return data
  },
  budgetstepdoc: async function (context, payload) {
    let { data } = await this.$axios.post(
      process.env.DBURL + '/budgetstepdoc',
      payload
    )
    return data
  },
  fundingstep: async function (context, payload) {
    let { data } = await this.$axios.post(
      process.env.DBURL + '/fundingstep',
      payload
    )
    return data
  },
  commentForm: async function (context, payload) {
    let { data } = await this.$axios.post(
      process.env.DBURL + '/comment',
      payload
    )
    context.commit('commentUpdate', data)
    return data.id
  },
  placeForm: async function (context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/place', payload)
    if (data == 'exists') {
      return data
    } else context.dispatch('getPlace')
  },
  newuser: async function (context, payload) {
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
  updateUser: async function (context, payload) {
    let { data } = await this.$axios.put(process.env.DBURL + '/user', payload)
    return data
  },
  updatePaypal: async function (context, payload) {
    let { data } = await this.$axios.put(process.env.DBURL + '/userpaypal', payload)
    return data
  },
  tagForm: async function (context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/tag', payload)
    return data
  },
  removeTag: async function (context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/tag', payload)
    return data
  },
  editSwitch: async function (context, payload) {
    context.commit('setEditSwitch', payload)
  },
  imageUpload: async function (context, payload) {
    let { data } = await this.$axios.post(
      process.env.DBURL + '/image',
      payload.formImageData,
      payload.headers
    )
    if (data.id) return data.id
    else return data.status
  },
  contactEmail: async function (context, payload) {
    let { data } = await this.$axios.post(
      process.env.DBURL + '/contactemail',
      payload
    )
    return data
  },
  checkCurrentPassword: async function (context, payload) {
    let { data } = await this.$axios.post(
      process.env.DBURL + '/checkpassword',
      payload
    )
    return data
  },
  recoverPassword: async function (context, payload) {
    let { data } = await this.$axios.post(
      process.env.DBURL + '/recoverpassword',
      payload
    )
    return data
  },
  getUservote: async function (context, payload) {
    // this action GETS THE USER VOTE INFO,  addVote IS THE REAL VOTING ACTION-FUNCTION
    if (payload.reset) { return context.commit('setUservote', { body: [], proptype: 'cooperation' }) }
    let { data } = await this.$axios.get(process.env.DBURL + '/uservote', {
      params: payload
    })
    let go = { body: data, proptype: payload.proptype }
    context.commit('setUservote', go)
  },
  addVote: async function (context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/vote', payload)
    return data
  },
  notificationPush: async function (context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/notification', payload)
    return data
  },
  cooperationTool: async function (context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/cooperationtool', payload)
    return data
  },
  getSurvey: async function (context, payload) {
    let { data } = await this.$axios.get(process.env.DBURL + '/survey', { params: payload })
    context.commit('setSurvey', data)
  },
  //Admin stuff here: be careful
  resetVoting: async function () {
    await this.$axios.post(process.env.DBURL + '/resetvoting')
    return 'OK'
  }
}
