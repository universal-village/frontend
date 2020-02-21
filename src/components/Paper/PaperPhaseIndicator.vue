<template>
  <v-chip color="state.color">
    <v-icon left>
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
            id: "Reject",
            color: "error",
            text: "Rejected",
            icon: "mdi-close-circle",
          },
          {
            id: "Need-Review",
            color: "warning",
            text: "Need Review",
            icon: "mdi-dots-horizontal",
          },
          {
            id: "Accept",
            color: "success",
            text: "Accepted",
            icon: "mdi-check-circle",
          },
          {
            id: "Draft",
            color: "grey",
            text: "Draft",
            icon: "mdi-file",
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