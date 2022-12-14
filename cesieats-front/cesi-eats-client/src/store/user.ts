const user = window.localStorage.getItem('user')
const tokens = window.localStorage.getItem('tokens')

const state = {
  user: user ? JSON.parse(user) : [],
  accessToken: tokens ? JSON.parse(tokens).accessToken : null,
  refreshToken: tokens ? JSON.parse(tokens).refreshToken : null
}

const mutations = {
  defineUser (state, user) {
    state.user = user
    this.commit('saveUser')
  },
  defineTokens (state, tokens) {
    state.accessToken = tokens.accessToken
    state.refreshToken = tokens.refreshToken
    this.commit('saveTokens')
  },
  saveUser (state) {
    window.localStorage.setItem('user', JSON.stringify(state.user))
  },
  saveTokens (state) {
    window.localStorage.setItem('tokens', JSON.stringify({ accessToken: state.accessToken, refreshToken: state.refreshToken }))
  }
}

const actions = {
  //
}

const getters = {
  //
}

const userModule = {
  state,
  mutations,
  actions,
  getters
}
export default userModule
