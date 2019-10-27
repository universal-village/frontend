import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import Login from './views/Account/Login';
import AccountLayout from "./layouts/AccountLayout";
import Profile from "./views/Account/Profile";
import DashboardIndex from "./views/Dashboard/Index";
import DashboardLayout from "./layouts/DashboardLayout";

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
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      components: {
        default: DashboardLayout,
      },
      meta: {
        i18n: 'pages.dashboard.title',
        icon: "mdi-view-dashboard-variant",
      },
      children: [
        {
          path: '',
          name: 'DashboardHome',
          components: {
            dashboard: DashboardIndex,
          },
          meta: {
            i18n: "pages.dashboard.home.title",
            icon: "mdi-home",
          },
        },
      ],
    },
    {
      path: '/account',
      name: 'Account',
      components: {
        default: AccountLayout,
      },
      meta: {
        i18n: 'pages.account.title',
        icon: "mdi-account-circle",
      },
      children: [
        {
          path: '',
          name: 'AccountProfile',
          components: {
            account: Profile,
          },
          meta: {
            i18n: "pages.account.profile.title",
            icon: "mdi-account-badge-horizontal",
          },
        },
        {
          path: 'login',
          name: 'AccountLogin',
          components: {
            account: Login,
          },
          meta: {
            i18n: "pages.account.login.title",
            icon: "mdi-exit-to-app",
            hide: true,
          },
        },
      ],
    },
  ],
});
