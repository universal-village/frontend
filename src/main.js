import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import i18n from './i18n';
import VueAnalytics from "vue-analytics";

import config from './config';
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

Vue.config.productionTip = false;
const production = process.env.NODE_ENV === 'production';

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: config.credentials.googleMapsApiKey,
});

Vue.prototype.$config = config;

Vue.filter("unescape", function (value) {
  if (!value) return '';
  value = value.replace(/\+/g, '%20');
  return decodeURIComponent(value);
});

Vue.use(VueAnalytics, {
  id: 'UA-122336687-2',
  // customResourceURL: "https://www.google-analytics.com/analytics.js",
  router,
  debug: {
    // enabled: process.env.NODE_ENV === "development",
    enabled: false,
    sendHitTask: production,
  },
  autoTracking: {
    exception: true,
    exceptionLogs: !production,
  },
});

new Vue({
  store,
  router,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app');
