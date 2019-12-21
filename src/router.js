import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

import Login from './views/Account/Login';
import AccountLayout from "./layouts/AccountLayout";
import Profile from "./views/Account/Profile";
import DashboardIndex from "./views/Dashboard/Index";
import DashboardLayout from "./layouts/DashboardLayout";
import Register from "./views/Account/Register";
import acl from "./utils/acl";

Vue.use(Router);

export default new Router({
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
        title: 'pages.dashboard.title',
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
            title: "pages.dashboard.home.title",
            icon: "mdi-home",
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
        title: 'pages.account.title',
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
            title: "pages.account.profile.title",
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
            title: "pages.account.login.title",
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
            title: "pages.account.register.title",
            hide: true,
            acl: [acl.GUEST],
          },
        },
      ],
    },
  ],
});
