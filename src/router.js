import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Login from './views/Account/Login';
import AccountLayout from "./layouts/AccountLayout";
import Profile from "./views/Account/Profile";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        i18n: "pages.home.title",
        icon: "mdi-home",
      },
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
          path: 'login',
          name: 'AccountLogin',
          components: {
            account: Login,
          },
          meta: {
            i18n: "pages.account.login.title",
            icon: "mdi-exit-to-app",
            roles: [],
          },
        },
        {
          path: 'profile',
          name: 'AccountProfile',
          components: {
            account: Profile,
          },
          meta: {
            i18n: "pages.account.profile.title",
            icon: "mdi-account-badge-horizontal",
          },
        },
      ],
    },
  ],
});
