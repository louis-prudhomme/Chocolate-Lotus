import Vue from 'vue'
import Vuex from 'vuex'
import decksStore from '@/store/modules/decks'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pendingCard: null
  },
  actions: {
    async initDeckDialog ({ commit }, card) {
      commit('updatePendingCard', card)
    },
    async resetDeckDialog ({ commit }) {
      commit('updatePendingCard', null)
    }
  },
  mutations: {
    updatePendingCard (state, value) {
      state.pendingCard = value
    }
  },
  getters: {
    isDeckDialogAsked: state => !!state.pendingCard,
    getPendingCard: state => state.pendingCard
  },
  modules: {
    decks: decksStore
  }
})
