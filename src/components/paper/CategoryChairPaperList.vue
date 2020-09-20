<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="dialog.review"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar
            dark
            color="primary"
          >
            <v-btn
              icon
              dark
              @click="dialog.review = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Reviews on Paper#{{dialog.activePaperData.id}} {{dialog.activePaperData.title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                color="blue"
                @click="dialog.decision = true"
              >
                Decision
              </v-btn>
              <v-btn
                dark
                text
                @click="dialog.review = false"
              >
                Close
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-divider />
          <v-list
            three-line
            subheader
          >
            <v-data-iterator
              :items-per-page="6"
              :items="dialog.activeReviews"
              :footer-props="{'items-per-page-options': [6, 12, 18, -1]}"

              sort-by="id"
              sort-desc
            >
              <template v-slot:default="props">
                <v-row>
                  <v-col
                    v-for="item in dialog.activeReviews"
                    :key="item.reviewerId"
                    cols="12"
                    sm="6"
                    md="6"
                    lg="4"
                    xl="4"
                    class="align-content-stretch"
                  >
                    <ReviewEditor
                      :paper="dialog.activePaperData"
                      :review="item"
                      readOnly
                    >
                    </ReviewEditor>
                  </v-col>
                </v-row>
              </template>
              <template v-slot:no-data>
                <v-alert
                  text
                  border="left"
                  color="info"
                  icon="mdi-information"
                >
                  There are no reviews on current paper.
                </v-alert>
              </template>
            </v-data-iterator>
          </v-list>
        </v-card>
      </v-dialog>
    </v-row>
    <v-dialog
      v-model="dialog.decision"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-system-bar
          color="indigo darken-2"
          dark
        >
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog.decision = false"
          >
            Close
          </v-btn>
        </v-system-bar>
        <v-card-text>
          <FinalDecisionEditor
            :viewOnly="dialog.activeDecisionViewOnly"
            :paper="dialog.activePaperData"
            :decision="dialog.activeDecision"
          >
          </FinalDecisionEditor>
          <v-card-actions
            v-if="!dialog.activeDecisionViewOnly"
          >
            <v-btn
              block
              @click="postDecision()"
            >
              Save Decision
              <v-icon
                right
                color="blue"
              >
                mdi-cloud-upload
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
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
                  <div
                    v-if="viewBy=='chair'"
                  >
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
                          color="orange"
                          v-on="on"
                          @click="finalDecision(item)"
                        >
                          <v-icon>mdi-book-open-page-variant</v-icon>
                        </v-btn>
                      </template>
                      View Reviews and Give Final Decision
                    </v-tooltip>
                  </div>
                  <div
                    v-else
                  >
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          icon
                          style="padding: 0;"
                          color="blue"
                          v-on="on"
                          @click="selectPaper(item)"
                        >
                          <v-icon>mdi-pencil-plus</v-icon>
                        </v-btn>
                      </template>
                      Draft Review
                    </v-tooltip>
                  </div>
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
  import ReviewEditor from "../../components/paper/ReviewEditor";
  import FinalDecisionEditor from "../../components/paper/FinalDecisionEditor";
  export default {
    name: "CategoryChairPaperList",
    components: {CategoryChairPreviewCard, PreviewCard, ReviewEditor, FinalDecisionEditor},
    props: {
      papers: {
        type: Array,
        required: true,
      },
      loading: {
        type: Boolean,
        required: true,
      },
      viewBy: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        dialog: {
          assign: false,
          move: false,
          review: false,
          decision: false,
          activePaperData: {},
          activeReviews: [],
          activeDecision: {},
          activeDecisionViewOnly: false,
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
        api.papers.assign(item.id, item.categoryId, email, -1)
          .then(() => {
            snackbar.success(`Successfully submitted Paper#${item.id} to review.`);

            this.$emit("change");
            this.close();
          })
          .catch((err) => {
            console.error(err);
            snackbar.error(`Failed to submit Paper#${item.id} to review: ${err.errorMessage}`);
          })
          .finally(() => this.dialog.pending = false);
      },
      download(item) {
        window.open(item.link);
      },
      selectPaper(item) {
        this.$emit('selectPaper', item);
      },
      finalDecision(item) {
        this.dialog.review = true;
        this.dialog.activePaperData = item;
        let currentPaperId = item.id;
        api.papers.getReviewsByPaperId(currentPaperId)
          .then(({data}) => {
            this.dialog.activeReviews = data;
          })
          .catch((err) => {
            console.error(err);
            snackbar.error(`Failed to fetch Reviews on Paper#${item.id} : ${err.errorMessage}`);
          })
          .finally(() => this.dialog.pending = false);
        api.papers.getPaperDecision(currentPaperId)
          .then(({data}) => {
            if (data.length > 0)
            {
              this.dialog.activeDecision = data[0];
              this.dialog.activeDecisionViewOnly = true;
            }
            else {
              this.dialog.activeDecision = {};
              this.dialog.activeDecision.paperId = currentPaperId;
              this.dialog.activeDecision.categoryChairId = this.$store.getters["account/details"].userId;
              this.dialog.activeDecisionViewOnly = false;
            }
          })
          .catch((err) => {
            console.error(err);
            snackbar.error(`Failed to submit Review to Paper#${currentPaperId} : ${err.errorMessage}`);
          });
      },
      postDecision () {
        let currentPaperId = this.dialog.activePaperData.id;
        console.log(this.dialog.activeDecision);
        api.papers.savePaperDecision(currentPaperId, this.dialog.activeDecision)
          .then(() => {
            snackbar.success(`Successfully submitted Decision on Paper#${currentPaperId} to review.`);
          })
          .catch((err) => {
            console.error(err);
            snackbar.error(`Failed to submit Decision on Paper#${currentPaperId} : ${err.errorMessage}`);
          });
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