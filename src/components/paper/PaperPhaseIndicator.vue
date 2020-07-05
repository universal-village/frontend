<template>
  <div>
    <div
      v-for="chip in phases()"
      :key="chip.id"
      class="my-1"
    >
      <v-chip
        :color="chip.current ? 'green white--text' : 'grey lighten-1 grey--text text--darken-2'"

        :small="!chip.current"
        style="width: 200px"
        class="text-center"
        :outlined="!chip.history && !chip.current"
      >
        <v-icon
          v-if="chip.history"
          small
          class="mr-2"
        >
          mdi-check-circle
        </v-icon>
        <v-icon
          v-else-if="chip.current"
          small
          class="mr-2"
        >
          mdi-arrow-right-bold-circle
        </v-icon>
        {{ chip.text }}
      </v-chip>
    </div>
  </div>
</template>

<script>
  const phases = [
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
      binary: true,
    },

    {
      id: "REJECT",
      color: "error",
      text: "Rejected",
      subtitle: "",
      icon: "mdi-close-circle",
      binary: true,
    },

    {
      id: "CAMERA_READY",
      color: "green darken-1",
      text: "Camera Ready",
      subtitle: "",
      icon: "mdi-checkbox-marked-circle-outline",
    },
  ];
  export default {
    name: "PaperPhaseIndicator",
    props: {
      phase: {
        type: String,
        required: true,
      },
    },
    methods: {
      phases () {
        let history = true;
        return phases.map(el => {
          if (el.id === this.phase) history = false;
          el.current = el.id === this.phase;
          el.history = history;
          return el;
        });
      },
    },
  };
</script>

<style scoped>

</style>