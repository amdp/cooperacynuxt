export const state = () => ({
  conditions: [ 'equivalence', 'trust', 'care', 'transparency', 'freedom', 'understanding', 'diversity' ],
  shortconditions: ['E','T','C','I','F','U','D']
})

export const getters = {
  conditionsGetter: state => { return state.conditions },
  shortconditionsGetter: state => { return state.shortconditions },
}
