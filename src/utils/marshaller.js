const sha256 = require("hash.js/lib/hash/sha/256");

function get(key, object, fallback="") {
  if (key in object) {
    return object[key];
  } else {
    return fallback;
  }
}

export default {
  credentials: ({username, password}) => {
    const salt = "universal-village";
    username = encodeURIComponent(username);
    password = sha256().update(password + salt).digest('hex');
    return {username, password};
  },
  register: ({
    email,
    password,

    title,
    firstName,
    middleName,
    lastName,
    customName,
    birthday,

    biography,
    organization,

    phone,

    visa,
    passport,

    form,
  }) => {
    let [birthYear, birthMonth, birthDay] = birthday.split("-");
    let address = form.meta.address;

    return {
      email,
      password,

      title,
      firstName,
      middleName,
      lastName,
      nameInOwnLanguage: customName,

      birthYear,
      birthMonth,
      birthDay,

      bios: biography,
      organization,

      address: get("name", address),
      zipCode: get("postal_code", address),
      country: get("country", address),
      city: get("locality", address),
      state: get("administrative_area_level_1", address),

      telephone: phone,
      needSupport: visa.toString(),
      passport,
    };
  },
};