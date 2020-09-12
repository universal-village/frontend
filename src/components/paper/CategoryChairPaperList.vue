<template>
  <div>
    <v-dialog
      v-model="dialog.assign"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <h1 class="title mb-2">
            Assign Reviewer to Paper
          </h1>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="assign.email" />
        </v-card-text>
        <v-card-actions class="d-flex">
          <v-btn
            large
            text
            color="secondary"
            @click="dialog.assign = false"
          >
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn
            large
            color="primary"
            class="px-6"
            :loading="dialog.pending"
            @click="doAssign(dialog.activePaperData, assign.email)"
          >
            <v-icon left>
              mdi-send
            </v-icon>
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-if="dialog.activePaperData"
      v-model="dialog.delete"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <h1 class="title mb-2">
            Delete Paper?
          </h1>
        </v-card-title>
        <v-card-subtitle>
          <p class="subtitle-1">
            After deleting the paper you will not be able to see it again in the system. Are you sure to proceed?
          </p>
        </v-card-subtitle>
        <v-card-text>
          <PreviewCard
            preview-only
            :paper="dialog.activePaperData"
          />
        </v-card-text>
        <v-card-actions class="d-flex">
          <v-btn
            large
            text
            color="secondary"
            @click="close"
          >
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn
            large
            color="error"
            class="px-6"
            :loading="dialog.pending"
            @click="doDelete(dialog.activePaperData)"
          >
            <v-icon left>
              mdi-delete
            </v-icon>
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-fade-transition
      leave-absolute
      hide-on-leave
    >
      <v-row
        v-if="loading"
      >
        <v-col
          v-for="item in 6"
          :key="item"
          cols="12"
          sm="6"
          md="6"
          lg="6"
          xl="4"
        >
          <v-skeleton-loader
            type="card-heading,list-item-avatar-three-line@5,actions"
          />
        </v-col>
      </v-row>

      <v-data-iterator
        v-else
        :items-per-page="6"
        :items="papers"
        :footer-props="{'items-per-page-options': [6, 12, 18, -1]}"

        sort-by="id"
        sort-desc
      >
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.id"
              cols="12"
              sm="6"
              md="6"
              lg="6"
              xl="4"
              class="align-content-stretch"
            >
              <CategoryChairPreviewCard
                :paper="item"
                style="height: 100%"
                v-bind="$attrs"
              >
                <template v-slot:actions>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        style="padding: 0;"
                        color="blue"
                        v-on="on"
                        @click="assignReviewerToPaper(item)"
                      >
                        <v-icon>mdi-account-plus</v-icon>
                      </v-btn>
                    </template>
                    Assign Reviewer to Paper
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        style="padding: 0;"
                        color="orange"
                        v-on="on"
                        @click="movePaper(item)"
                      >
                        <v-icon>mdi-send</v-icon>
                      </v-btn>
                    </template>
                    Move Paper to other Categories
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        style="padding: 0;"
                        color="green"
                        v-on="on"
                        @click="download(item)"
                      >
                        <v-icon>mdi-download</v-icon>
                      </v-btn>
                    </template>
                    Provide hyperlink to download paper
                  </v-tooltip>
                </template>
              </CategoryChairPreviewCard>
            </v-col>
          </v-row>
        </template>
        <template v-slot:loading />
        <template v-slot:no-data>
          <v-alert
            text
            border="left"
            color="info"
            icon="mdi-information"
          >
            There's no paper matching the criteria.
          </v-alert>
        </template>
      </v-data-iterator>
    </v-fade-transition>
  </div>
</template>

<script>
  import PreviewCard from "./PreviewCard";
  import api from "../../api/api";
  import snackbar from "../../utils/snackbar";
  import CategoryChairPreviewCard from "./CategoryChairPreviewCard";
  export default {
    name: "CategoryChairPaperList",
    components: {CategoryChairPreviewCard, PreviewCard},
    props: {
      papers: {
        type: Array,
        required: true,
      },
      loading: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        dialog: {
          assign: false,
          move: false,
          activePaperData: {},
          pending: false,
        },
        assign: {
          email: "",
        },
      };
    },
    methods: {
      assignReviewerToPaper(item) {
        this.dialog.assign = true;
        this.dialog.activePaperData = item;
      },
      movePaper(item) {
        this.dialog.move = true;
        this.dialog.activePaperData = item;
      },
      close () {
        this.dialog.submit = false;
        this.dialog.delete = false;
        this.dialog.activePaperData = {};
      },
      doAssign(item, email) {
        this.dialog.pending = true;
        api.papers.assign(item.paperId, item.categoryId, email)
          .then(() => {
            snackbar.success(`Successfully submitted Paper#${id} to review.`);

            this.$emit("change");
            this.close();
          })
          .catch((err) => {
            console.error(err);
            snackbar.error(`Failed to submit Paper#${id} to review: ${err.errorMessage}`);
          })
          .finally(() => this.dialog.pending = false);
      },
      download(item) {
        window.open(item.link);
      },
      doDelete() {
        snackbar.info("Currently we do not support deleting paper from the web interface. If you need to do so, please manually contact us!");

        // api.papers.delete(paperId)
        //   .then(() => {
        //     snackbar.success(`Successfully deleted Paper#${paperId}.`);
        //
        //     this.$emit("change");
        //     this.close();
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //     snackbar.error(`Failed to delete Paper#${paperId}: ${err.errorMessage}`);
        //   })
        //   .finally(() => this.dialog.pending = false);
      },
    },
  };
</script>

<style scoped>

</style>