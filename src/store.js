import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: {
      isLoggedIn: false,
      jwt: {
        token: "",
        sub: "",
        roles: [],
        iat: -1,
        exp: -1,
      },
    },
  },
  mutations: {
    updateJwt (state, newJwtObject) {
      Object.assign(state.jwt, newJwtObject);
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
});
