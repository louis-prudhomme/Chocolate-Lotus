const state = {
  favorites: []
}

const getters = {
  getFavorites: state => state.favorites,
  getFavoriteById: state => id => {
    return state.favorites.find(f => f.id === id)
  },
  isFavorite: state => card => {
    return state.favorites.find(f => f.id === card.id)
  }
}

const mutations = {
  addFav (state, favorite) {
    const doesExist = state.favorites.findIndex(f => f.id === favorite.id)
    if (doesExist === -1) {
      state.favorites.push(favorite)
    }
  },
  rmFav (state, favorite) {
    const doesExist = state.favorites.findIndex(f => f.id === favorite.id)
    if (doesExist !== -1) {
      state.favorites.splice(doesExist)
    }
  }
}

const actions = {
  async addFavorite ({ commit, state }, favorite) {
    commit('addFav', favorite)
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  },
  async fetchFavorites ({ state }) {
    if (localStorage.getItem('favorites')) {
      state.favorites = JSON.parse(localStorage.getItem('favorites'))
    }
  },
  async deleteFavorite ({ commit }, favorite) {
    commit('rmFav', favorite)
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
