import service from "../utils/service";
import jwtDecode from 'jwt-decode';

export default {
  login (username, password) {
    return service
      .post("/Auth/login", {
        username,
        password,
      })
      .then(({data}) => {
        let token = data.token;
        return {...jwtDecode(token), ...{token}};
      });
  },

};