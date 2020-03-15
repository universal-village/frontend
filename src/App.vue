<template>
  <v-app
    class="background"
    :class="{'login-background': $route.meta.background === 'login'}"
  >
    <!--    <v-app-bar-->
    <!--      app-->
    <!--      color="indigo"-->
    <!--      dark-->
    <!--    >-->
    <!--      <v-tooltip bottom>-->
    <!--        <template v-slot:activator="{ on }">-->
    <!--          <v-app-bar-nav-icon-->
    <!--            @click.stop="drawer = !drawer"-->
    <!--            v-on="on"-->
    <!--          />-->
    <!--        </template>-->
    <!--        <span>Show/Hide Menu</span>-->
    <!--      </v-tooltip>-->
    <!--      <v-toolbar-title>UV 2020</v-toolbar-title>-->
    <!--    </v-app-bar>-->
    <v-navigation-drawer
      v-model="drawer"
      :disable-resize-watcher="!drawerPermitted"
      app
      width="300"
    >
      <v-list-item
        @click="$router.push({name: 'Dashboard'})"
      >
        <v-list-item-content>
          <v-list-item-title class="title py-4">
            <v-img
              :src="require('@/assets/logo.png')"
              :aspect-ratio="5.513"
              height="80"
              class="mx-12 logo"
              contain
            />
            <h2 class="overline text-center">
              {{ $config.conference.name.long }}
            </h2>
            <h1 class="title text-center">
              Submittion System
            </h1>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list
        dense
        nav
      >
        <!-- root routes-->
        <div
          v-for="route in routes"
          :key="route.path"
        >
          <v-list-item
            v-if="!route.children"
            :key="route.path"
            :to="{path: route.path}"
          >
            <v-list-item-icon>
              <v-icon v-text="route.meta.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ route.meta.title }} &nbsp; <v-icon
                  v-if="!route.component"
                  small
                >
                  mdi-open-in-new
                </v-icon>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-else-if="route.meta.forceSingle"
            :key="route.children[0].name"
            :to="{name: route.children[0].name}"
          >
            <v-list-item-icon>
              <v-icon v-text="route.children[0].meta.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ route.children[0].meta.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-else
            :value="route.meta.active"
            :prepend-icon="route.meta.icon"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-title>{{ route.meta.title }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="child in route.children.filter(el => !el.meta.hide)"
              :key="child.name"
              :to="{name: child.name}"
            >
              <v-list-item-title>
                <span class="mr-2 grey--text">—</span> {{ child.meta.title }}
              </v-list-item-title>

              <v-list-item-icon>
                <v-icon v-text="child.meta.icon" />
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>

      <v-footer
        absolute
        padless
      >
        <v-card
          flat
          tile
          width="100%"
          class="text-center grey lighten-2"
        >
          <v-card-text>
            <span
              class="overline"
              style="font-size: 1.5em"
            >
              <span class="monospace mr-2">{{ $config.conference.identifier }}</span>
              <small style="letter-spacing: -.03em; text-transform: none;">ver.</small><span class="monospace">{{ gitHash }}</span>
            </span>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-navigation-drawer>

    <v-app-bar
      v-if="drawerPermitted"
      color="primary"
      app
      dark
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(78,169,94,.7), rgba(102,166,102,.7)"
          position="top center"
          :src="require('@/assets/background-1.jpg')"
        />
      </template>

      <v-app-bar-nav-icon
        v-if="drawerPermitted"
        @click.stop="drawer = !drawer"
      />

      <v-toolbar-title>
        {{ $route.meta.title }}
      </v-toolbar-title>

      <v-spacer />

      <AccountNavButton />

      <template
        v-slot:extension
      >
        <v-breadcrumbs :items="routeBreadcrumbs" />
      </template>
    </v-app-bar>

    <v-content id="content">
      <GlobalSnackbar />
      <transition
        name="slide-fade"
        mode="out-in"
      >
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
  import AccountNavButton from "./components/account/AccountNavButton";
  import GlobalSnackbar from "./components/global/GlobalSnackbar";

  export default {
    components: {GlobalSnackbar, AccountNavButton},
    data() {
      return {
        rawDrawer: false,
      };
    },
    computed: {
      drawer: {
        get: function () {
          if (this.drawerPermitted) {
            return this.rawDrawer;
          }
          return false;
        },
        set: function (value) {
          if (this.drawerPermitted) {
            this.rawDrawer = value;
          }
        },
      },
      drawerPermitted () {
        return this.$store.getters['account/isLoggedIn'] && this.$store.getters['account/details'];
      },
      routeBreadcrumbs () {
        let breadcrumbs = [];
        for (let route of this.$route.matched) {
          breadcrumbs.push(
            {
              text: route.meta.title,
              link: true,
              to: {name: route.name},
            }
          );
        }
        return breadcrumbs;
      },
      routes () {
        let routes = this.$router.options.routes;
        routes = routes.filter(el => !el.meta.hide && this.allowed(el.meta.acl));
        return routes;
      },
      gitHash () {
        return GIT_VERSION;
      },
    },
    methods: {
      allowed () {
        // return acl.allowed(policy) === acl.OK;
        return true;
      },
    },
  };
</script>

<style>
  html {
    overflow-y: auto;
  }

  #app {
    font-family: 'SF Pro Display', 'SF Pro Text', 'SF Pro', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .slide-fade-enter-active {
    transition: all .325s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .slide-fade-leave-active {
    transition: all .175s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(2vh);
    opacity: 0;
  }

  .background {
    transition: background-image 1s ease-out;
  }

  .login-background {
    background-image: url("assets/login-background.jpg") !important;
    background-size: cover !important;
    background-position: center center !important;
  }

  .monospace {
    font-family: SF Mono, Consolas, Monospaced, Courier New, monospace;
    letter-spacing: 0;
  }

  .logo {
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, .5));
  }
</style>