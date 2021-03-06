module.exports = {
  conference: {
    identifier: "uv-2020",
    name: {
      short: "UV 2020",
      long: "Universal Village 2020",
    },
  },
  externalLinks: {
    contact: 'https://universalvillage.org/contact/',
  },
  credentials: {
    recaptchaSiteKey: process.env.NODE_ENV === 'production' ? '6LeE8GQUAAAAADw5NwLtA6Ge_trrLCvTkJe8yD7d' : "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
    googleMapsApiKey: 'AIzaSyBO-y1Boglo9ylfKdLtHfSbEHnVioVTWJQ',
  },
};