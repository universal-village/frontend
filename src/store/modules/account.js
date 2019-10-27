import api from "../../api";

export default {
  namespaced: true,
  state: {
    jwt: {
      token: "",
      sub: "",
      roles: [],
      iat: -1,
      exp: -1,
    },
  },
  getters: {
    isLoggedIn (state) {
      return state.jwt.token.length > 0;
    },
    token: state => state.jwt.token,
  },
  mutations: {
    updateJwt (state, newJwtObject) {
      state.jwt = Object.assign({}, state.jwt, newJwtObject);
    },
  },
  actions: {
    login ({commit}, {username, password}) {
      api.login(username, password)
        .then(jwt => {
          commit('updateJwt', jwt);
        });
    },
  },
};