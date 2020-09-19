import service from "../utils/service";
import unmarshal from "../utils/unmarshal";
import store from "../store";

export default {
  login (username, password) {
    return service
      .post("/auth/login", {
        username,
        password,
      })
      .then(({data}) => {
        return unmarshal.jwt(data);
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
        return unmarshal.jwt(data);
      });
  },
  getCurrentUser () {
    return service
      .get(`/auth/me`);
  },
  getCategories () {
    return service
      .get(`/categories`)
      .then(({data}) => {
        const categories = [];
        for (const category of data) {
          categories.push(
            {name: category[1], categoryId: parseInt(category[0])}
          );
        }
        return categories;
      });
  },
  papers: {
    list () {
      return service
        .get(`/papers`);
    },
    listCategory (categoryId) {
      return service.get(`/categories/${categoryId}/papers`);
    },
    submit (data) {
      return service
        .post("/papers", data);
    },
    update (paperId, data) {
      return service
        .put(`/papers/${paperId}`, data);
    },
    upload (paperId, file, progress) {
      const formData = new FormData();
      formData.append("paperId", paperId);
      formData.append("file", file, file.name);

      return service({
        url: `/papers/${paperId}/upload`,
        timeout: 86400000, // 24 hours
        data: formData, // form data
        onUploadProgress: progress,
        method: 'post',
      });
    },
    registerAuthor (data) {
      return service
        .post("/papers/registerAuthor", data);
    },
    delete (paperId) {
      return service
        .delete(`/papers/${paperId}`, {
          paperId,
        });
    },
    submitToReview (paperId) {
      return service
        .post("/papers/submitToReview", {
          paperId,
        });
    },
    assign (paperId, categoryId, userEmail, userId) {
      return service
        .post(`/papers/${paperId}/assign`, {
          categoryId,
          userEmail,
          userId,
        });
    },
    getReviews (reviewerId) {
      return service({
        url: `/reviews?reviewerId=${reviewerId}`,
        timeout: 86400000,
        method: 'get',
      });
    },
    getPapersAssigned () {
      return service({
        url: "/reviews/papers",
        timeout: 86400000,
        method: 'get',
      });
    },
    updatePaperReview (review)
    {
      return service({
        url: "/reviews",
        timeout: 86400000,
        method: 'put',
        data: review,
      });
    },
  },
  users: {
    checkNames (names) {
      return service
        .post("/users/checkNames", names);
    },
    updateProfile (newProfile) {
      return service
        .put("/users/" + store.getters["account/details"].userId, newProfile);
    },
  },
};