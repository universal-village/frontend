<template>
  <v-container>
    <v-row
      justify="center"
      class="px-3 pt-3"
    >
      <h1 class="heading">
        Submissions
      </h1>
      <v-spacer />
      <template v-if="!$vuetify.breakpoint.xs">
        <v-btn
          text
          class="mr-1"
          @click="update"
        >
          <v-icon left>
            mdi-refresh
          </v-icon>
          refresh
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          icon
          class="mr-1"
          @click="update"
        >
          <v-icon>
            mdi-refresh
          </v-icon>
        </v-btn>
      </template>
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
  import PaperList from "../../components/paper/PaperList";
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
        api.papers.list()
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