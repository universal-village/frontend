export default {
  namespaced: true,
  state: {
    snackbar: {
      enabled: false,
      color: "",
      timeout: 0,
      text: "",
      icon: "",
    },
  },
  mutations: {
    setSnackbar (state, {color, timeout, text, icon}) {
      state.snackbar.enabled = true;
      state.snackbar.color = color;
      state.snackbar.timeout = timeout;
      state.snackbar.text = text;
      state.snackbar.icon = icon;
    },
  },
  getters: {
    snackbar: state => state.snackbar,
  },
};