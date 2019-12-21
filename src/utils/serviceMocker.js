import MockAdapter from 'axios-mock-adapter';

export default function (axiosInstance) {
  const mock = new MockAdapter(axiosInstance);
  mock
    .onPost("/api/Auth/login", {
      username: "user",
      password: "pass",
    }).reply(() => {
      return [
        200,
        {
          userId: 5,
          username: "cheng.gu%40husky.neu.edu",
          refreshToken: "RDYvdZjrM21QuXs4abkTzVPB7wA8m3H60iUItyfhKc59qgoSlNEGOnWJexpCFL",
          token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGVuZy5ndSU0MGh1c2t5Lm5ldS5lZHUiLCJyb2xlcyI6WyJDYXRlZ29yeUNoYWlyIiwiUmV2aWV3ZXIiLCJBdHRlbmRlZSJdLCJpYXQiOjE1NzIxOTE5OTksImV4cCI6MTU3MjE5NTU5OX0.9VisUckO_c4H7MG2P7FP0fldhalfG9FJhlRkz2dGxlM",
        },
      ];
    })
    .onPost("/api/Auth/refresh", {
      refreshToken: "RDYvdZjrM21QuXs4abkTzVPB7wA8m3H60iUItyfhKc59qgoSlNEGOnWJexpCFL",
    }).reply(() => {
      return [
        200,
        {
          userId: 5,
          username: "cheng.gu%40husky.neu.edu",
          refreshToken: "RDYvdZjrM21QuXs4abkTzVPB7wA8m3H60iUItyfhKc59qgoSlNEGOnWJexpCFL",
          token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGVuZy5ndSU0MGh1c2t5Lm5ldS5lZHUiLCJyb2xlcyI6WyJDYXRlZ29yeUNoYWlyIiwiUmV2aWV3ZXIiLCJBdHRlbmRlZSJdLCJpYXQiOjE1NzIxOTE5OTksImV4cCI6MTU3MjE5NTU5OX0.9VisUckO_c4H7MG2P7FP0fldhalfG9FJhlRkz2dGxlM",
        },
      ];
  });
}