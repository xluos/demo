import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 1
}

const mutations = {
  add (state, n) {
    state.count += n
    setTimeout(() => { state.count += n }, 2000)
    console.log(state.count)
  },
  sub (state, n = 1) {
    state.count -= n
  }
}

const getters = {
  count: function (state) {
    state.count += 100
    return state.count
  }
}

const actions = {
  addAction (context) {
    context.commit('add', 10)
    setTimeout(() => { context.commit('sub') }, 2000)
    console.log(state.count)
  },
  subAction ({commit}) {
    commit('sub')
  }
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
