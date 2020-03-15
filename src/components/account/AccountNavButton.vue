<template>
  <v-scroll-x-transition>
    <v-btn
      v-if="!isLoggedIn"
      icon
      :to="{name: 'AccountLogin'}"
    >
      <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>

    <v-menu
      v-else
      :close-delay="50"
      open-on-hover
      :close-on-content-click="false"
      top
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          style="cursor: default;"
          v-on="on"
        >
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-list
        dense
        max-width="275"
      >
        <v-icon style="position: absolute; top: .3em; right: .3em;">
          mdi-account-circle
        </v-icon>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="subtitle-1">
              {{ details.firstName }} {{ details.lastName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ decodeURIComponent(details.email) }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="mt-2" />

        <!--        <v-list-item-->
        <!--          :to="{name: 'AccountProfile'}"-->
        <!--        >-->
        <!--          <v-list-item-title>Account Profile</v-list-item-title>-->
        <!--          <v-list-item-icon>-->
        <!--            <v-icon>mdi-account</v-icon>-->
        <!--          </v-list-item-icon>-->
        <!--        </v-list-item>-->

        <v-list-item
          @click="logout"
        >
          <v-list-item-title>Logout</v-list-item-title>
          <v-list-item-icon>
            <v-icon>
              mdi-exit-to-app
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-scroll-x-transition>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: "AccountNavButton",
    computed: {
      ...mapGetters('account', [
        'isLoggedIn',
        'details',
      ]),
    },
    methods: {
      logout () {
        this.$store.dispatch('account/logout');
        this.$router.push({
          name: "AccountLogin",
        });
      },
    },
  };
</script>

<style scoped>

</style>