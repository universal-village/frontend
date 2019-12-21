import store from "../store";
console.log(store);

// permission state
const p = {
  NOT_LOGGED_IN: -1,
  NO_PERMISSION: 0,
  OK: 1,
};

// entity type
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
    if (typeof policy === "undefined") return p.OK;

    if (typeof policy === "boolean") {
      // all entities will be able to access resource
      return policy ? p.OK : p.NO_PERMISSION;
    } else if (Array.isArray(policy)) {
      if (store.getters['account/isLoggedIn']) {
        // entity is acl.USER
        if (policy.includes(et.USER)) {
          // resource allows acl.USER to access
          if (policy.length === 1) {
            // only acl.USER
            return p.OK;
          } else {
            let roles = store.getters['account/roles'];
            // more rules
            // only decide objects that are with a key
            for (let rule of policy.filter(el => typeof el === "string")) {
              // see if the user have all roles that are needed
              if (!roles.includes(rule)) return p.NO_PERMISSION;
            }
            // users have all roles that are needed
            return p.OK;
          }
        } else {
          // resource does NOT allow acl.USER to access
          return p.NO_PERMISSION;
        }
      } else {
        // entity is acl.GUEST
        if (policy.includes(et.GUEST)) {
          // resource allows acl.GUEST to access
          return p.OK;
        } else {
          // resource does NOT allow acl.GUEST to access
          // let them login
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