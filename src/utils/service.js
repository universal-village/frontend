import axios from 'axios';
import store from '@/store';
import router from '@/router';
import uuidv1 from 'uuid/v1';
import i18n from '../i18n';

const service = axios.create({
  // when developing using webpack-dev-server, the server will automatically
  // proxy requests to the unknown url to http://localhost:8080, so we can
  // just set the basic base URL here. (such behavior has described in
  // package.json)
  baseURL: '/api',
  timeout: 30000,
});

service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters["account/isLoggedIn"]) {
    config.headers = {
      Authorization: `Bearer ${store.getters["account/token"]}`,
    };
  }
  config._id = uuidv1();
  store.commit('network/setBusy', true);
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
service.interceptors.response.use(response => {
  store.commit('network/setBusy', false);

  // Remain response intact if there's no error
  return response;
}, error => {
  store.commit('network/setBusy', false);

  if (error.request && error.request.url === "/auth/refresh" && error.response && error.response.code === 403) {
    // this IS the refresh token doing its job but it fails, maybe because the refresh token has expired.
    router.push({name: 'AccountLogin', params: {reason: "expiredSession"}});
  }

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    if (error.response.code === 403 && error.request.url !== "/auth/login") {
      // jwt has been rejected
      // try to refresh the token
      store.dispatch('account/refreshToken')
        .then(() => {
          return service.request(error.config);
        })
        .catch(() => {
          router.push({
            name: 'Login',
            query: {
              reason: 'sessionExpired',
            },
          });
        });
    }

    if ([401, 403, 404, 500, 502, 503, 504].includes(error.statusCode)) {
      error.errorMessage = i18n.t(`message.network.status.response.${error.statusCode}`);
    } else {
      error.errorMessage = `${i18n.t('message.network.status.response.default')} (${error.statusCode || -1})`;
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    error.errorMessage = i18n.t(`message.network.status.request`);
  } else {
    error.errorMessage = i18n.t(`message.network.status.internal`);
  }

  store.commit('network/addError', {
    config: error.config,
    message: error.errorMessage,
  });

  // Do something with response error
  return Promise.reject(error);
});

export default service;