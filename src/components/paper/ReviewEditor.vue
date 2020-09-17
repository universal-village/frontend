<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
    elevation="2"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Review Paper {{props.paper.title}}</div>
        <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn text>Button</v-btn>
      <v-btn text>Button</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import api from "../../api/api";
  import snackbar from "../../utils/snackbar";
  export default {
    name: "ReviewEditor",
    props: {
      paper: {
        type: Object,
        required: true,
      },
      review: {
        type: Object,
        required: true,
      },
    },
    created () {
      
    },
    data() {
      return {
      };
    },
    methods: {
      postReview(item) {
        this.dialog.assign = true;
        this.dialog.activePaperData = item;
      },
      close () {
        this.dialog.submit = false;
        this.dialog.delete = false;
        this.dialog.activePaperData = {};
      },
    },
  };
</script>