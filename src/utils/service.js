import axios from 'axios';

const service = axios.create({
  // when developing using webpack-dev-server, the server will automatically
  // proxy requests to the unknown url to http://localhost:8080, so we can
  // just set the basic base URL here. (such behavior has described in
  // package.json)
  baseURL: '/api',
  timeout: 30000,
});

export default service;