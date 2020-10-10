<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="6"
        xl="4"
      >
        <h1 class="display-1 pa-3">
          Review Paper
        </h1>
        <v-alert
          border="bottom"
          colored-border
          type="warning"
          elevation="2"
          v-if="currentPaper.paperId == -1"
        >
          You don't have paper selected right now. To draft review, please choose a paper from the assigned papers list below.
        </v-alert>
        <ReviewEditor
          :paper="currentPaper"
          :review="currentReview"
          :readOnly="paperSelected"
        >
        </ReviewEditor>
      </v-col>
    </v-row>
    <v-divider class="my-4" />
    <v-row class="px-6">
      <h2 class="title">
        Papers
      </h2>
      <v-col
        cols="12"
      >
        <CategoryChairPaperList
          :papers="papers"
          :loading="isBusy"
          viewBy="reviewer"
          preview-only
          @change="update"
          v-on:selectPaper="setCurrentPaper"
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
  import ReviewEditor from "../../components/paper/ReviewEditor";
  export default {
    name: "ReviewPaper",
    components: {CategoryChairPaperList, ReviewEditor},  
    data() {
      return {
        papers: [],
        reviews: [],
        currentPaper: {
          paperId: -1,
        },
        currentReview: {},
        isBusy: false,
      };
    },
    created() {
      this.update();
      this.paper = {
        title: "",
      };
      this.review = {
      };
    },
    computed: {
      paperSelected ()
      {
        return this.currentPaper.paperId === -1;
      },
    },
    methods: {
      setCurrentPaper (value) {
        this.currentPaper = value;
        this.currentReview = this.reviews.find(r => r.paperId == value.id);
      },
      update () {
        this.isBusy = true;
        api.papers.getReviews(this.$store.getters["account/details"].userId)
          .then(({data}) => {
            this.reviews = data;
          })
          .catch(err => {
            console.error(err);
            snackbar.error(`Failed to fetch paper list: ${err.errorMessage}`);
          })
          .finally(() => this.isBusy = false);

        api.papers.getPapersAssigned()
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