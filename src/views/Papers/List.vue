<template>
  <v-container class="px-3">
    <h1 class="display-1 pt-3">
      My Submissions
    </h1>

    <v-row class="px-3">
      <v-spacer />
      <v-btn
        outlined
        @click="update"
      >
        <v-icon left>
          mdi-refresh
        </v-icon>
        refresh
      </v-btn>
    </v-row>

    <v-row
      justify="center"
    >
      <v-col
        cols="12"
      >
        <PaperList
          :papers="papers"
          :loading="isBusy"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from "vuex";
  import PaperList from "../../components/Paper/PaperList";
  import api from "../../api/api";
  export default {
    name: "MySubmissions",
    components: {PaperList},
    data() {
      return {
        papers: [],
      };
    },
    created () {
      this.update();
    },
    methods: {
      update () {
        api.getPapers()
          .then(({data}) => {
            this.papers = data;
          })
          .catch(err => {
            console.error(err);
          });
      },
    },
    computed: {
      ...mapGetters("network", ["isBusy"]),
    },
  };
</script>

<style scoped>

</style>