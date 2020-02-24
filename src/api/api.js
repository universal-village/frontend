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
      .post("/auth/register", data);
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
  papers: {
    submit: (data) => {
      return service
        .post("/papers", data);
    },
    update: (paperId, data) => {
      return service
        .put(`/papers/${paperId}`, data);
    },
    upload: (paperId, file, progress) => {
      const formData = new FormData();
      formData.append("paperId", paperId);
      formData.append("file", file, file.name);

      return service({
        url: `/papers/${paperId}/upload`,
        timeout: 8640000, // 24 hours
        data: formData, // form data
        onUploadProgress: progress,
        method: 'post',
      });
    },
  },
  users: {
    checkNames: (names) => {
      return service
        .post("/users/checkNames", names);
    },
  },
};