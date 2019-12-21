import service from "../utils/service";
import jwtDecode from 'jwt-decode';

function parseJwt(data) {
  let token = data.token;
  let refreshToken = data.refreshToken;
  return {...jwtDecode(token), ...{refreshToken, token}};
}

export default {
  login (username, password) {
    return service
      .post("/auth/login", {
        username,
        password,
      })
      .then(({data}) => {
        return parseJwt(data);
      });
  },
  register (data) {
    return service
      .post("/register", data);
  },
  refresh (refreshToken) {
    return service
      .post("/auth/refresh", {
        refreshToken,
      })
      .then(({data}) => {
        return parseJwt(data);
      });
  },
  getCurrentUser () {
    return service
      .get(`/auth/me`);
  },
  getPapers () {
    return service
      .get(`/papers`);
  },
  getCategories () {
    return service
      .get(`/categories`);
  },
};