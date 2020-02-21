import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import acl from "./utils/acl";
import config from "./config";

import Login from './views/Account/Login';
import AccountLayout from "./layouts/AccountLayout";
import Profile from "./views/Account/Profile";
import DashboardIndex from "./views/Dashboard/Index";
import DashboardLayout from "./layouts/DashboardLayout";
import Register from "./views/Account/Register";
import PaperIndex from "./views/Papers/List";
import AssignReviewer from "./views/Chair/AssignReviewer";
import ReviewPaper from "./views/Reviewer/ReviewPaper";
import PaperAdd from "./views/Papers/Add";
import ConferenceRegistration from "./views/Member/ConferenceRegistration";
import ChairLayout from "./layouts/Roles/ChairLayout";
import ReviewerLayout from "./layouts/Roles/ReviewerLayout";
import MemberLayout from "./layouts/Roles/MemberLayout";
import NotFound from "./views/Error/NotFound";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      beforeEnter (to, from, next) {
        if (store.getters['account/isLoggedIn']) {
          next({name: "Dashboard"});
        } else {
          next({name: "AccountLogin"});
        }
      },
      meta: {
        hide: true,
        acl: true,
      },
    },
    {
      path: '/dashboard',
      components: {
        default: DashboardLayout,
      },
      meta: {
        title: 'Dashboard',
        icon: "mdi-view-dashboard-variant",
        acl: [acl.USER],
      },
      children: [
        {
          path: '',
          name: 'Dashboard',
          components: {
            dashboard: DashboardIndex,
          },
          meta: {
            title: "Home",
            icon: "mdi-home",
            acl: [acl.USER],
          },
        },
      ],
    },
    {
      path: '/chair',
      components: {
        default: ChairLayout,
      },
      meta: {
        title: "Category Chair",
        icon: "mdi-account-tie",
        acl: [acl.USER, acl.CATEGORY_CHAIR],
      },
      children: [
        {
          path: 'assign-reviewer',
          name: 'ChairAssignReviewer',
          components: {
            chair: AssignReviewer,
          },
          meta: {
            title: "Assign Reviewer",
            icon: "mdi-account-plus",
            acl: [acl.USER, acl.CATEGORY_CHAIR],
          },
        },
      ],
    },
    {
      path: '/reviewer',
      components: {
        default: ReviewerLayout,
      },
      meta: {
        title: "Reviewer",
        icon: "mdi-account-edit",
        acl: [acl.USER, acl.REVIEWER],
      },
      children: [
        {
          path: 'review',
          name: 'ReviewerReview',
          components: {
            reviewer: ReviewPaper,
          },
          meta: {
            title: "Review Papers",
            icon: "mdi-file-account",
            acl: [acl.USER, acl.REVIEWER],
          },
        },
      ],
    },
    {
      path: '/member',
      components: {
        default: MemberLayout,
      },
      meta: {
        title: "Member",
        icon: "mdi-account-multiple",
        acl: [acl.USER],
        active: true,
      },
      children: [
        {
          path: 'submit',
          name: 'MemberSubmit',
          components: {
            member: PaperAdd,
          },
          meta: {
            title: "Submit Paper",
            icon: "mdi-file-document-box-plus",
            acl: [acl.USER],
          },
        },

        {
          path: 'submissions',
          name: 'MemberSubmissions',
          components: {
            member: PaperIndex,
          },
          meta: {
            title: "My Submissions",
            icon: "mdi-file-document-box-multiple",
            acl: [acl.USER],
          },
        },

        {
          path: 'registration',
          name: 'MemberConferenceRegistration',
          components: {
            member: ConferenceRegistration,
          },
          meta: {
            title: "Conference Registration",
            icon: "mdi-credit-card",
            acl: [acl.USER],
          },
        },
      ],
    },
    {
      path: '/account',
      components: {
        default: AccountLayout,
      },
      meta: {
        title: 'My Account',
        icon: "mdi-account-circle",
        acl: [acl.USER],
      },
      children: [
        {
          path: '',
          name: 'AccountProfile',
          components: {
            account: Profile,
          },
          meta: {
            title: "Account Profile",
            icon: "mdi-account-badge-horizontal",
            acl: [acl.USER],
          },
        },
        {
          path: 'login',
          name: 'AccountLogin',
          components: {
            account: Login,
          },
          props: (route) => ({ redirect: route.query.redirect || null }),
          meta: {
            title: "Login",
            icon: "mdi-exit-to-app",
            hide: true,
            acl: [acl.GUEST],
          },
        },
        {
          path: 'register',
          name: 'AccountRegister',
          components: {
            account: Register,
          },
          meta: {
            title: "Register",
            hide: true,
            acl: [acl.GUEST],
          },
        },
      ],
    },
    {
      path: '*',
      components: {
        default: NotFound,
      },
      meta: {
        title: 'Page Not Found',
        acl: [acl.GUEST, acl.USER],
        hide: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // acl check
  let permit = acl.allowed(to.meta.acl);
  if (permit === acl.OK) return next();
  if (permit === acl.NO_PERMISSION) return next(false);
  if (permit === acl.NOT_LOGGED_IN) return next({name: "AccountLogin", query: { redirect: to.path }});
  return next();
});

router.afterEach((to) => {
  document.title = `${to.meta.title} | ${config.conference.name.short}`;
});

export default router;
