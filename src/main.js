import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from './i18n';
import './registerServiceWorker';

import config from './config';
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

import acl from "./utils/acl";

Vue.config.productionTip = false;

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: config.credentials.googleMapsApiKey,
});

router.beforeEach((to, from, next) => {
  if (typeof to.meta.acl === "undefined") return next();

  if (typeof to.meta.acl === "boolean") {
    // all entities will be able to access resource
    return to.meta.acl ? next() : next(false);
  } else if (Array.isArray(to.meta.acl)) {
    if (store.getters['account/isLoggedIn']) {
      // entity is acl.USER
      if (to.meta.acl.includes(acl.USER)) {
        // resource allows acl.USER to access
        next();
      } else {
        // resource does NOT allow acl.USER to access
        next(false);
      }
    } else {
      // entity is acl.GUEST
      if (to.meta.acl.includes(acl.GUEST)) {
        // resource allows acl.GUEST to access
        next();
      } else {
        // resource does NOT allow acl.GUEST to access
        // let them login
        next({name: "AccountLogin", query: {redirect: to.path}});
      }
    }
  }
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app');
