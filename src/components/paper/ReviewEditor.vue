<template>
  <v-card
    class="mx-auto"
    max-width="full-width"
    outlined
    elevation="2"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="headline mb-4">Review Paper {{paper.title}}</div>
        <v-list-item-title class="overline mb-1">Comment</v-list-item-title>
        <v-textarea
          name="input-7-1"
          label="Comment"
          v-model="review.comment"
          v-bind:hint="``"
          :disabled="readOnly"
        ></v-textarea>
        <v-list-item-title class="overline mb-1">Scores</v-list-item-title>
        <div>
          <v-row align="center">
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
              <v-select
                :items="items"
                label="Overall"
                v-model="review.overall"
                :disabled="readOnly"
              ></v-select>
            </v-col>
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
              <v-select
                :items="items"
                filled
                v-model="review.theoreticalContribution"
                label="Theoretical Contribution"
                :disabled="readOnly"
              ></v-select>
            </v-col>
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
              <v-select
                :items="items"
                filled
                v-model="review.technologicalContribution"
                label="Technological Contribution"
                :disabled="readOnly"
              ></v-select>
            </v-col>
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
              <v-select
                :items="items"
                filled
                v-model="review.surveyTutorialContribution"
                label="Survey Tutorial Contribution"
                :disabled="readOnly"
              ></v-select>
            </v-col>
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
              <v-select
                :items="items"
                filled
                v-model="review.originalityOfConcepts"
                label="Originality Of Concepts"
                :disabled="readOnly"
              ></v-select>
            </v-col>
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
              <v-select
                :items="items"
                filled
                v-model="review.technicalSoundness"
                label="Technical Soundness"
                :disabled="readOnly"
              ></v-select>
            </v-col>
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
              <v-select
                :items="items"
                filled
                v-model="review.importanceOfResults"
                label="Importance Of Results"
                :disabled="readOnly"
              ></v-select>
            </v-col>
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
              <v-select
                :items="items"
                filled
                v-model="review.clarityOfPresentation"
                label="Clarity Of Presentation"
                :disabled="readOnly"
              ></v-select>
            </v-col>
          </v-row>
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions
      v-if="!readOnly"
    >
      <v-btn
        block
        @click="postReview()"
      >
        Save Review
        <v-icon
          right
          color="blue"
        >
          mdi-cloud-upload
        </v-icon>
      </v-btn>
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
      readOnly: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        items: [ "A+", "A", "A-", "B+", "B", "B-", "C" ],
      };
    },
    methods: {
      postReview() {
        api.papers.updatePaperReview(this.review)
          .then(() => {
            snackbar.success(`Successfully submitted Review to Paper#${this.paper.id}.`);
          })
          .catch((err) => {
            console.error(err);
            snackbar.error(`Failed to submit Review to Paper#${this.paper.id} : ${err.errorMessage}`);
          });
      },
    },
  };
</script>