const state = {
  decks: []
}

const getters = {
  getDecks: state => state.decks,
  getDeckByName: state => name => {
    return state.decks.find(d => d.name === name)
  }
}

const mutations = {
  mutDeck (state, deck) {
    const doesExist = state.decks.findIndex(d => d.name === deck.name)
    if (doesExist !== -1) {
      state.decks[doesExist] = deck
    } else {
      state.decks.push(deck)
    }
  }
}

const actions = {
  async createDeck ({ commit }, deck) {
    commit('mutDeck', deck)
    localStorage.setItem('decks', JSON.stringify(this.decks))
  },
  async updateDeck ({ commit }, deck) {
    commit('mutDeck', deck)
    localStorage.setItem('decks', JSON.stringify(this.decks))
  },
  async fetchDecks ({ commit }) {
    if (localStorage.getItem('decks') !== null) {
      this.decks = JSON.parse(localStorage.getItem('decks'))
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
