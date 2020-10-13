export const state = {
  activeIndex: '0',
  headHeight: 0,
}

export const mutations = {
  SET_INDEX(state, index) {
    state.activeIndex = index.toString()
  },
  SET_HEIGHT(state, height) {
    state.headHeight = height
  },
}
