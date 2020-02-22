<template>
  <v-chip :color="state.color">
    <v-icon
      left
    >
      {{ state.icon }}
    </v-icon>
    {{ state.text }}
  </v-chip>
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
    computed: {
      state () {
        const MAP = [
          {
            id: "REJECT",
            color: "error",
            text: "Rejected",
            icon: "mdi-close-circle",
          },
          {
            id: "IN_PROGRESS",
            color: "warning",
            text: "In Progress",
            icon: "mdi-dots-horizontal",
          },
          {
            id: "ACCEPT",
            color: "success",
            text: "Accepted",
            icon: "mdi-check-circle",
          },
          {
            id: "DRAFT",
            color: "grey darken-3 white--text",
            text: "Draft",
            icon: "mdi-file-edit",
          },
          {
            id: "CAMERA_READY",
            color: "green",
            text: "Camera Ready",
            icon: "mdi-file-check",
          },
        ];

        const UNKNOWN = {
          color: "grey",
          text: "Unknown",
          icon: "mdi-help-circle",
        };

        return MAP.find(el => el.id === this.phase) || UNKNOWN;
      },
    },
  };
</script>

<style scoped>

</style>