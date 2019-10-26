import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Login from './views/Account/Login';

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
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        i18n: "pages.login.title",
        icon: "mdi-exit-to-app",
      },
    },
  ],
});
