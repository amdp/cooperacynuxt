import axios from 'axios'

export const state = () => ({
  votes: ''
})

export const getters = {
  votes: state => {
    return state.votes
  }
}

export const actions = {  
  addVoteAction : async (context,payload) => {
    let { data } = await axios.post('/db/votes', payload.body)
    if (data == 'OK') {
      if (payload.body.project){
        if (payload.id){context.dispatch('projectsvx/getProjectAction', {id: payload.id}, {root:true})
        }else{context.dispatch('projectsvx/getProjectsAction', null, {root:true})}
      }else{context.dispatch('commentsvx/getCommentsAction', {id: payload.id}, {root:true})}
    }
  },
  getVoteIntensity : async (context,payload) => {
    let { data } = await axios.get('/db/votes', payload.body)
  }
}
