import store from "../store";

const p = {
  NOT_LOGGED_IN: -1,
  NO_PERMISSION: 0,
  OK: 1,
};

const et = {
  GUEST: 1,
  USER: 2,
  ATTENDEE: "Attendee",
  REVIEWER: "Reviewer",
  CATEGORY_CHAIR: "CategoryChair",
};

const acl = {
  ...p,
  ...et,

  allowed: (policy) => {
    if (policy.isPrototypeOf(undefined)) return p.OK;

    if (policy.isPrototypeOf(Boolean)) {
      return policy ? p.OK : p.NO_PERMISSION;
    } else if (Array.isArray(policy)) {
      if (store.getters['account/isLoggedIn']) {
        if (policy.includes(et.USER)) {
          if (policy.length === 1) {
            return p.OK;
          } else {
            let roles = store.getters['account/roles'];
            for (let rule of policy.filter(el => el.isPrototypeOf(String))) {
              if (!roles.includes(rule)) return p.NO_PERMISSION;
            }
            return p.OK;
          }
        } else {
          return p.NO_PERMISSION;
        }
      } else {
        if (policy.includes(et.GUEST)) {
          return p.OK;
        } else {
          return p.NOT_LOGGED_IN;
        }
      }
    } else {
      return p.OK;
    }
  },
};

console.log(acl);

export default acl;