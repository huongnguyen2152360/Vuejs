import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

export const store = new VueX.Store({
  state: {
    userSession: {},
    allPosts: {}
  },
  mutations: {
    userSessionInfo(state, rs) {
      state.userSession = rs
    },
    getAllPosts(state, rs) {
      state.allPosts = rs
    }
  }
})
