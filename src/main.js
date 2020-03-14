import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import i18n from './i18n';
import './registerServiceWorker';

import config from './config';
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

Vue.config.productionTip = false;

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: config.credentials.googleMapsApiKey,
});

Vue.prototype.$config = config;

Vue.filter("unescape", function (value) {
  if (!value) return '';
  value = value.replace(/\+/g, '%20');
  return decodeURIComponent(value);
});

new Vue({
  store,
  router,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app');
