export default function (context, inject) {
  const Http = {
    getCooperation: async function (payload) {
      let { data } = await this.$http.$get(process.env.DBURL + '/cooperation', {
        params: payload
      })
      return data
    },
    getUserCooperation: async function (payload) {
      let { data } = await this.$http.$get(process.env.DBURL + '/usercooperation', {
        params: payload
      })
      return data
    },
    getComment: async function (payload) {
      let { data } = await this.$http.$get(process.env.DBURL + '/comment', {
        params: payload
      })
      return data
    },
    getProfessional: async function (payload) {
      let { data } = await this.$http.$get(process.env.DBURL + '/professional', {
        params: payload
      })
      return data
    },
    getTag: async function (payload) {
      let { data } = await this.$http.$get(process.env.DBURL + '/tag', {
        params: payload
      })
      return data
    },
    getNews: async function () {
      let { data } = await this.$http.$get(process.env.DBURL + '/news')
      return data
    },
    getPlace: async function () {
      let { data } = await this.$http.$get(process.env.DBURL + '/place')
      return data
    },
    getCountry: async function () {
      let { data } = await this.$http.$get(process.env.DBURL + '/country')
      return data
    },
    getUserlist: async function () {
      let { data } = await this.$http.$get(process.env.DBURL + '/userlist')
      return data
    },
    getCCI: async function (payload) {
      let { data } = await this.$http.$post(process.env.DBURL + '/CCI', payload)
      let go = { godata: data, goyear: payload.cciyear }
      context.commit('setCCI', go)
    },
    getFundingvar: async function () {
      let { data } = await this.$http.$get(process.env.DBURL + '/fundingvar')
      return data
    },
    cooperationForm: async function (payload) {
      let { data } = await this.$http.$post(
        process.env.DBURL + '/cooperation',
        payload
      )
      if (data.id) {
        return data.id
      } else {
        return data
      }
    },
    professional: async function (payload) {
      let { data } = await this.$http.$post(
        process.env.DBURL + '/professional',
        payload
      )
      return data
    },
    budgetstep: async function (payload) {
      let { data } = await this.$http.$post(
        process.env.DBURL + '/budgetstep',
        payload
      )
      return data
    },
    fundingstep: async function (payload) {
      let { data } = await this.$http.$post(
        process.env.DBURL + '/fundingstep',
        payload
      )
      return data
    },
    commentForm: async function (payload) {
      let { data } = await this.$http.$post(
        process.env.DBURL + '/comment',
        payload
      )
      return data
      return data.id
    },
    placeForm: async function (payload) {
      let { data } = await this.$http.$post(process.env.DBURL + '/place', payload)
      if (data == 'exists') {
        return data
      } else context.dispatch('getPlace')
    },
    newuser: async function (payload) {
      let { data } = await this.$http.$post(process.env.DBURL + '/user', payload)
      if (data) {
        let message = {
          to: payload.email,
          subject: 'User registration confirmation',
          body: './assets/email/welcome.html'
        }
        this.$http.$post(process.env.DBURL + '/newuseremail', message)
        return data
      } else {
        alert('Sorry, please try again only once')
      }
    },
    recoverPassword: async function (payload) {
      let { data } = await this.$http.$post(process.env.DBURL + '/recoverpassword',
        payload
      )
      return data
    },
    updateUser: async function (payload) {
      let { data } = await this.$http.$put(process.env.DBURL + '/user', payload)
      return data
    },
    updatePaypal: async function (payload) {
      let { data } = await this.$http.$put(process.env.DBURL + '/userpaypal', payload)
      return data
    },
    tagForm: async function (payload) {
      let { data } = await this.$http.$post(process.env.DBURL + '/tag', payload)
      return data
    },
    removeTag: async function (payload) {
      let { data } = await this.$http.$post(process.env.DBURL + '/tag', payload)
      return data
    },
    editSwitch: async function (payload) {
      context.commit('setEditSwitch', payload)
    },
    imageUpload: async function (payload) {
      let { data } = await this.$http.$post(
        process.env.DBURL + '/image',
        payload.formImageData,
        payload.headers
      )
      if (data.id) return data.id
      else return data.status
    },
    contactEmail: async function (payload) {
      let { data } = await this.$http.$post(
        process.env.DBURL + '/contactemail',
        payload
      )
      return data
    },
    checkCurrentPassword: async function (payload) {
      let { data } = await this.$http.$post(
        process.env.DBURL + '/checkpassword',
        payload
      )
      return data
    },
    recoverPassword: async function (payload) {
      let { data } = await this.$http.$post(
        process.env.DBURL + '/recoverpassword',
        payload
      )
      return data
    },
    getUservote: async function (payload) {
      // this action GETS THE USER VOTE INFO,  addVote IS THE REAL VOTING ACTION-FUNCTION
      if (payload.reset) { return context.commit('setUservote', { body: [], proptype: 'cooperation' }) }
      let { data } = await this.$http.$get(process.env.DBURL + '/uservote', {
        params: payload
      })
      let go = { body: data, proptype: payload.proptype }
      context.commit('setUservote', go)
    },
    addVote: async function (payload) {
      let { data } = await this.$http.$post(process.env.DBURL + '/vote', payload)
      return data
    },
    notificationPush: async function (payload) {
      let { data } = await this.$http.$post(process.env.DBURL + '/notification', payload)
      return data
    },
    cooperationTool: async function (payload) {
      let { data } = await this.$http.$post(process.env.DBURL + '/cooperationtool', payload)
      return data
    },
    getSurvey: async function (payload) {
      let { data } = await this.$http.$get(process.env.DBURL + '/survey', { params: payload })
      return data
    },
    budgetcheck: async function () {
      this.$http.$post(process.env.DBURL + '/budgetcheck')
      return 'OK'
    },
    //Admin stuff here: be careful
    resetVoting: async function () {
      await this.$http.$post(process.env.DBURL + '/resetvoting')
      return 'OK'
    }
  }
  inject('Http', Http)
}