import store from "../store";

function getDefaultIcon (type) {
  const MAP = {
    "info": "mdi-information",
    "success": "mdi-check-circle",
    "error": "mdi-close-circle",
  };
  return MAP[type];
}

export default {
  launch (type = "info", text, timeout = 10000, icon) {
    return store.commit("ui/setSnackbar", {
      color: type,
      timeout,
      text,
      icon: icon || getDefaultIcon(type) || "mdi-alert-circle",
    });
  },
  info (...args) { this.launch("info", ...args) },
  success (...args) { this.launch("success", ...args) },
  error (...args) { this.launch("error", ...args) },
};