export default {
  namespaced: true,
  state: {
    busy: false,
    errors: [],
  },
  getters: {
    isBusy: state => state.busy,
    errors: state => state.errors,
  },
  mutations: {
    setBusy (state, busy) {
      state.busy = busy;
    },
    addError (state, error) {
      state.errors.push(error);
    },
    removeError (state, error) {
      state.errors = state.errors.filter(el => el.config._id !== error.config._id);
    },
  },
};