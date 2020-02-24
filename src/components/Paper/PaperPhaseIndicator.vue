<template>
  <div>
    <div
      v-for="chip in phases"
      :key="chip.id"
      class="my-1"
    >
      <template v-if="chip.id === state.id">
        <v-tooltip bottom>
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
            {{ state.subtitle }}
          </template>
        </v-tooltip>
      </template>

      <template v-else>
        <v-tooltip bottom>
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
            id: "SUBMITTED",
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
            icon: "mdi-dots-horizontal",
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
            color: "green",
            text: "Camera Ready",
            subtitle: "",
            icon: "mdi-check-circle",
          },
        ],
      };
    },
    computed: {
      state () {
        const UNKNOWN = {
          color: "grey",
          text: "Unknown",
          icon: "mdi-help-circle",
        };

        return this.phases.find(el => el.id === this.phase) || UNKNOWN;
      },
    },
  };
</script>

<style scoped>

</style>