<template>
  <div>
    <div
      v-if="state.id === 'UNKNOWN'"
      class="my-1"
    >
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-chip
            :color="state.color"
            small
            v-on="on"
          >
            <v-icon
              small
              left
            >
              {{ state.icon }}
            </v-icon>
            {{ state.text }}
          </v-chip>
        </template>
        {{ state.subtitle.replace("{phase}", state.id) }}
      </v-tooltip>
    </div>
    <div
      v-for="chip in phases"
      v-else
      :key="chip.id"
      class="my-1"
    >
      <template v-if="chip.id === state.id">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-chip
              :color="state.color"
              class="px-6"
              v-on="on"
            >
              <v-icon
                small
                left
                style="margin-left: -16px"
                class="mr-4"
              >
                mdi-arrow-right-bold-circle
              </v-icon>
              <v-icon
                small
                left
              >
                {{ state.icon }}
              </v-icon>

              {{ state.text }}
            </v-chip>
            {{ state.subtitle }}
          </template>
        </v-tooltip>
      </template>

      <template v-else>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-chip
              color="grey lighten-1 grey--text text--darken-2"
              small
              v-on="on"
            >
              <v-icon
                small
                left
              >
                {{ chip.icon }}
              </v-icon>
              {{ chip.text }}
            </v-chip>
            {{ chip.subtitle }}
          </template>
        </v-tooltip>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PaperPhaseIndicator",
    props: {
      phase: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        phases: [
          {
            id: "DRAFT",
            color: "grey darken-3 white--text",
            text: "Draft",
            subtitle: "",
            icon: "mdi-file-edit",
          },

          {
            id: "WITH_SESSION_CHAIR",
            color: "green white--text",
            text: "With Session Chair",
            subtitle: "",
            icon: "mdi-file-move",
          },

          {
            id: "IN_PROGRESS",
            color: "warning",
            text: "Under Review",
            subtitle: "",
            icon: "mdi-dots-horizontal",
          },

          {
            id: "TO_BE_REVISED",
            color: "warning",
            text: "To Be Revised",
            subtitle: "",
            icon: "mdi-account-clock",
          },

          {
            id: "ACCEPT",
            color: "success",
            text: "Accepted",
            subtitle: "",
            icon: "mdi-check-circle",
          },

          {
            id: "REJECT",
            color: "error",
            text: "Rejected",
            subtitle: "",
            icon: "mdi-close-circle",
          },

          {
            id: "CAMERA_READY",
            color: "green darken-1",
            text: "Camera Ready",
            subtitle: "",
            icon: "mdi-checkbox-marked-circle-outline",
          },
        ],
      };
    },
    computed: {
      state () {
        const UNKNOWN = {
          id: "UNKNOWN",
          color: "grey",
          text: "Unknown",
          subtitle: "Unknown paper phase \"{phase}\"",
          icon: "mdi-help-circle",
        };

        return this.phases.find(el => el.id === this.phase) || UNKNOWN;
      },
    },
  };
</script>

<style scoped>

</style>