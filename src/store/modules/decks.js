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
  async createDeck ({ commit, state }, deck) {
    commit('mutDeck', deck)
    localStorage.setItem('decks', JSON.stringify(state.decks))
  },
  async updateDeck ({ commit, state }, deck) {
    commit('mutDeck', deck)
    localStorage.setItem('decks', JSON.stringify(state.decks))
  },
  async fetchDecks ({ state }) {
    if (localStorage.getItem('decks')) {
      state.decks = JSON.parse(localStorage.getItem('decks'))
    }
  },
  async napalm ({ state }) {
    state.decks = []
    localStorage.removeItem('decks')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
