<template>
  <v-menu
    v-model="active"
    bottom
    open-on-hover
    :close-on-content-click="false"
    transition="scale-transition"
    origin="16px 16px"
  >
    <template v-slot:activator="{ on }">
      <v-chip
        :small="small"
        v-on="on"
      >
        <v-avatar
          left
        >
          <v-img
            v-if="user.photo"
            :src="user.photo"
            aspect-ratio="1"
          />
          <v-icon v-else>
            mdi-account
          </v-icon>
        </v-avatar>
        {{ name }}
      </v-chip>
    </template>
    <v-card width="300">
      <v-list
        dark
        style="border-radius: 0"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              v-if="user.photo"
              :src="user.photo"
              aspect-ratio="1"
            />
            <v-icon v-else>
              mdi-account
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action v-if="user.email === $store.getters['account/email']">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">
                  mdi-account-check
                </v-icon>
              </template>
              You have logged in as this account
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-sheet
        v-if="user.systemGenerated === 'YES'"
        color="grey lighten-3 px-2 py-1"
        class="caption align-center d-flex"
        tile
      >
        <v-icon
          small
          class="mr-1"
        >
          mdi-information
        </v-icon>
        <span>
          This person has not registered yet.
        </span>
      </v-sheet>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>
              mdi-domain
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ user.organization | unescape }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Organization
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
  import marshal from "../../utils/marshal";

  export default {
    name: "UserChip",
    props: {
      user: {
        type: Object,
        required: true,
      },
      small: {
        type: Boolean,
        default () {
          return false;
        },
      },
    },
    data() {
      return {
        active: false,
      };
    },
    computed: {
      name() {
        return marshal.name(this.user);
      },
    },
  };
</script>

<style scoped>

</style>