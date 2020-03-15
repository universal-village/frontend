import axios from 'axios';
import store from '@/store';
import router from '@/router';
import uuidv1 from 'uuid/v1';
import i18n from '../i18n';

function redirectLogin() {
  router.push({
    name: 'AccountLogin',
    query: {
      reason: 'sessionExpired',
    },
  });
}

function isAuthEndpoint(path) {
  const publicPaths = ["/auth/refresh", "/auth/login", "/auth/register"];
  for (let publicPath of publicPaths) {
    if (path.indexOf(publicPath) >= 0) {
      return true;
    }
  }
  return false;
}

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
  if (store.getters["account/isLoggedIn"] && !isAuthEndpoint(config.url)) {
    config.headers = {
      Authorization: `Bearer ${store.getters["account/token"]}`,
    };
  }
  config._id = uuidv1();
  store.commit('network/setBusy', true);
  return config;
}, function (error) {
  store.commit('network/setBusy', false);
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

  console.log({error});

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    // if (error.config && error.config.url.indexOf("/auth") >= 0 && error.response && error.response.status === 401) {
    //   // this IS the refresh token doing its job but it fails, maybe because the refresh token has expired.
    //   router.push({name: 'AccountLogin', params: {reason: "expiredSession"}});
    //   return Promise.reject(error);
    // }

    if (error.response.status === 403 || error.response.status === 401) {
      if (error.config.url.includes("/auth/refresh")) {
        // this IS the refresh token doing its job but it has failed to so
        // because the refresh token has expired. let the user login again
        redirectLogin();
      } else if (!error.config.url.includes("/auth/login")) {
        // jwt has been rejected
        // try to refresh the token
        return store.dispatch('account/refreshToken')
          .then(() => {
            // succeeded. retry request
            let config = error.config;
            config.url = config.url.replace("/api", "");
            return service.request(config);
          })
          .catch(() => {
            // failed. let user login again.
            redirectLogin();
          });
      }
    }

    if ([400, 401, 403, 404, 500, 502, 503, 504].includes(error.response.status)) {
      error.errorMessage = i18n.t(`message.network.status.response.${error.response.status}`);
    } else {
      error.errorMessage = `${i18n.t('message.network.status.response.default')} (${error.response.status || -1})`;
    }
    if (error.response.data.message) {
      error.errorMessage += `: ${error.response.data.message}`;
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    error.errorMessage = i18n.t(`message.network.status.request`);
  } else {
    // internal error
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