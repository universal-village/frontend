import Paper from "../models/Paper";
import jwtDecode from "jwt-decode";
//
// function get(key, object, fallback="") {
//   if (key in object) {
//     return object[key];
//   } else {
//     return fallback;
//   }
// }

export default {
  paper (args) {
    // const doubleEncodingKeys = "title authors keywords paperAbstract".split(" ");
    // for (let key of doubleEncodingKeys) {
    //  if (key in args) {
    //    args[key] = decodeURIComponent(decodeURIComponent(args[key]));
    //  }
    // }
    return new Paper(args);
  },
  jwt (data) {
    let token = data.token;
    let refreshToken = data.refreshToken;
    return {...jwtDecode(token), ...{refreshToken, token}};
  },
};