<template>
  <v-app>
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
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-img
              :src="require('@/assets/logo.png')"
              :aspect-ratio="5.513"
              height="100"
              contain
            />
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
            v-if="!route.children || route.meta.forceSingle"
            :key="route.path"
            @click="$router.push({path: route.path})"
          >
            <v-list-item-icon>
              <v-icon v-text="route.meta.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t(route.meta.title) }} &nbsp; <v-icon
                  v-if="!route.component && !route.meta.forceSingle"
                  small
                >
                  mdi-open-in-new
                </v-icon>
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
              <v-list-item-title>{{ $t(route.meta.title) }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="child in route.children.filter(el => !el.meta.hide)"
              :key="child.name"
              @click="$router.push({path: `${route.path}/${child.path}`})"
            >
              <v-list-item-title>
                {{ child.meta.title }}
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
          class="text-center"
        >
          <v-divider />

          <v-card-text>
            {{ new Date().getFullYear() }} — <strong>Universal Village</strong> <v-btn
              icon
              href="https://github.com/universal-village/frontend"
              target="_blank"
            >
              <v-icon>
                mdi-github-circle
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-navigation-drawer>

    <v-app-bar
      color="primary"
      app
      dark

      src="https://picsum.photos/1920/1080?random"
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
        {{ $t($route.meta.title) }}
      </v-toolbar-title>

      <v-spacer />

      <AccountNavButton />

      <template v-slot:extension>
        <v-breadcrumbs :items="routeBreadcrumbs" />
      </template>
    </v-app-bar>

    <v-content id="content">
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
  import AccountNavButton from "./components/AccountNavButton";
  // import acl from "./utils/acl";
  export default {
    components: {AccountNavButton},
    data: () => ({
      _drawer: false,
    }),
    computed: {
      drawer: {
        get() {
          return this.drawerPermitted ? this._drawer : false;
        },
        set(value) {
          this.drawerPermitted && (this._drawer = value);
        },
      },
      drawerPermitted () {
        return this.routes.length !== 0 && this.$store.getters['account/isLoggedIn'];
      },
      routeBreadcrumbs () {
        let breadcrumbs = [];
        for (let route of this.$route.matched) {
          breadcrumbs.push(
            {
              text: this.$t(route.meta.title),
              link: true,
              exact: true,
              to: {name: route.name},
            }
          );
        }
        return breadcrumbs;
      },
      routes () {
        let routes = this.$router.options.routes;
        routes = routes.filter(el => !el.meta.hide && this.allowed(el.meta.acl));
        console.log(routes);
        return routes;
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
</style>