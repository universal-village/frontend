<template>
  <v-container>
    <v-row
      justify="center"
      class="px-3 pt-3"
    >
      <h1 class="heading">
        Papers under your Category
      </h1>
      <p class="subtitle-1">
        {{ }}
      </p>
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
        <CategoryChairPaperList
          :papers="papers"
          :loading="isBusy"

          preview-only
          @change="update"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import api from "../../api/api";
  import snackbar from "../../utils/snackbar";
  import unmarshal from "../../utils/unmarshal";
  import CategoryChairPaperList from "../../components/paper/CategoryChairPaperList";
  export default {
    name: "ChairListPapers",
    components: {CategoryChairPaperList},
    data() {
      return {
        papers: [],
        isBusy: false,
      };
    },
    created () {
      this.update();
    },
    methods: {
      update () {
        this.isBusy = true;
        api.papers.listCategory(this.$store.getters["account/details"].categoryChair.categoryId)
          .then(({data}) => {
            this.papers = data.map(el => {
              return unmarshal.paper(el);
            });
          })
          .catch(err => {
            console.error(err);
            snackbar.error(`Failed to fetch paper list: ${err.errorMessage}`);
          })
          .finally(() => this.isBusy = false);
      },
    },
  };
</script>

<style scoped>

</style>