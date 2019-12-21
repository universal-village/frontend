<template>
  <v-card>
    <v-card-title>
      My Paper Title
    </v-card-title>
    <v-card-text>
      My paper description which will take a several lines in order to fully describe my idea.
    </v-card-text>
    <v-card-actions>
      <v-btn icon>
        <v-icon>
          mdi-chevron-down
        </v-icon>
      </v-btn>
      <v-spacer />
      <v-btn icon>
        <v-icon>
          mdi-edit
        </v-icon>
      </v-btn>
      <v-btn
        color="error"
        icon
      >
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: "PreviewCard",
    props: {
      paper: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style scoped>

</style>