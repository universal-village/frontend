import store from "../store";

// permission state
const permissionState = {
  NOT_LOGGED_IN: -1,
  NO_PERMISSION: 0,
  OK: 1,
};

// entity type
const entityType = {
  GUEST: 1,
  USER: 2,
  ATTENDEE: "Attendee",
  REVIEWER: "Reviewer",
  CATEGORY_CHAIR: "CategoryChair",
};

export default {
  ...permissionState,
  ...entityType,

  allowed: function (policy) {
    if (typeof policy === "undefined") return permissionState.OK;

    if (typeof policy === "boolean") {
      // all entities will be able to access resource
      return policy ? permissionState.OK : permissionState.NO_PERMISSION;
    } else if (Array.isArray(policy)) {
      if (store.getters['account/isLoggedIn']) {
        // entity is acl.USER
        if (policy.includes(entityType.USER)) {
          // resource allows acl.USER to access
          if (policy.length === 1) {
            // only acl.USER
            return permissionState.OK;
          } else {
            let roles = store.getters['account/roles'];
            // more rules
            // only decide objects that are with a key
            for (let rule of policy.filter(el => typeof el === "string")) {
              // see if the user have all roles that are needed
              if (!roles.includes(rule)) return permissionState.NO_PERMISSION;
            }
            // users have all roles that are needed
            return permissionState.OK;
          }
        } else {
          // resource does NOT allow acl.USER to access
          return permissionState.NO_PERMISSION;
        }
      } else {
        // entity is acl.GUEST
        if (policy.includes(entityType.GUEST)) {
          // resource allows acl.GUEST to access
          return permissionState.OK;
        } else {
          // resource does NOT allow acl.GUEST to access
          // let them login
          return permissionState.NOT_LOGGED_IN;
        }
      }
    } else {
      return permissionState.OK;
    }
  },
};