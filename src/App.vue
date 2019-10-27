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
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-img :src="require('@/assets/logo.png')" />
          </v-list-item-title>
          <v-list-item-subtitle>
            Dashboard
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list
        dense
        nav
      >
        <!-- root routes-->
        <div
          v-for="route in $router.options.routes"
          :key="route.path"
        >
          <v-list-item
            v-if="!route.children || route.meta.forceSingle"
            :key="route.path"
            @click="$router.push({name: route.name})"
          >
            <v-list-item-icon>
              <v-icon v-text="route.meta.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t(route.meta.i18n) }} &nbsp; <v-icon
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
              <v-list-item-title>{{ $t(route.meta.i18n) }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="child in route.children"
              :key="child.name"
              @click="$router.push({name: child.name})"
            >
              <v-list-item-title>{{ $t(child.meta.i18n) }}</v-list-item-title>

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
            {{ new Date().getFullYear() }} — <strong>Universal Village</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-navigation-drawer>

    <v-app-bar
      color="primary"
      app
      dark
      prominent
      shrink-on-scroll
      fade-img-on-scroll
      src="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(78,169,94,.7), rgba(102,166,102,.7)"
        />
      </template>

      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      />

      <v-toolbar-title>
        {{ $t($router.currentRoute.meta.i18n) }}
      </v-toolbar-title>

      <v-spacer />

      <v-btn
        icon
        @click="dark = !dark"
      >
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content id="content">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
    }),
    computed: {
      dark: {
        get () {
          return this.$store.state.settings.dark;
        },
        set (value) {
          this.$store.commit('switchDark', value);
        },
      },
    },
  };
</script>