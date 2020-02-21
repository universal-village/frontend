import api from "../../api/api";
import marshaller from "../../utils/marshal";

const EMPTY_JWT_STATE = {
  token: "",
  refreshToken: "",
  sub: "",
  roles: [],
  iat: -1,
  exp: -1,
};

export default {
  namespaced: true,
  state: {
    jwt: Object.assign({}, EMPTY_JWT_STATE),
    details: {},
  },
  getters: {
    isLoggedIn (state) {
      return state.jwt.token.length > 0;
    },
    token: state => state.jwt.token,
    email: state => decodeURI(state.jwt.sub),
    isRole: (state, role) => state.jwt.roles.includes(role),
    roles: state => state.jwt.roles,
    details: state => state.details,
  },
  mutations: {
    updateJwt (state, newJwtObject) {
      state.jwt = Object.assign({}, state.jwt, newJwtObject);
    },
    updateDetails (state, newDetailsObject) {
      state.details = Object.assign({}, newDetailsObject);
    },
  },
  actions: {
    login ({commit, dispatch}, credentials) {
      let {username, password} = marshaller.credentials(credentials);

      return new Promise((resolve, reject) => {
        api.login(username, password)
          .then(jwt => {
            commit('updateJwt', jwt);
            api.getCurrentUser()
              .then(({data}) => {
                commit('updateDetails', data);
                resolve();
              })
              .catch(err => {
                dispatch('logout');
                reject(err);
              });
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    jwtLogin ({commit, dispatch}, credentials) {
      return new Promise((resolve, reject) => {
        commit('updateJwt', credentials);
        api.getCurrentUser()
          .then(({data}) => {
            commit('updateDetails', data);
            resolve();
          })
          .catch(err => {
            dispatch('logout');
            reject(err);
          });
      });
    },
    async refreshToken ({state, commit}) {
      return new Promise((resolve, reject) => {
        api.refresh(state.jwt.refreshToken)
          .then(jwt => {
            commit('updateJwt', jwt);
            resolve(jwt);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    logout ({commit}) {
      commit('updateJwt', EMPTY_JWT_STATE);
    },
  },
};