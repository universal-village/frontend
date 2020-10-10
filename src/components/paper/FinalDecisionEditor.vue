<template>
  <v-row
    justify="center"
  >
    <div>
      <div>
        <v-card-text
          class="mx-auto"
          max-width="400"
        >
          <div
            class="headline mb-4"
          >
            Final Decision on Paper#{{paper.id}} {{paper.title}}
          </div>
          <v-list-item-title
            class="overline mb-1"
          >
            Comment
          </v-list-item-title>
          <v-textarea
            name="input-7-1"
            label="Comment"
            v-model="decision.comment"
            v-bind:hint="``"
            :autoGrow="true"
            :disabled="viewOnly"
          ></v-textarea>
          <div>
            <v-list-item-title
              class="overline mb-1"
            >
              Scores
            </v-list-item-title>
            <v-select
              :items="items"
              label="Total Performance"
              v-model="decision.totalPerformance"
              :disabled="viewOnly"
            ></v-select>
            <v-list-item-title
              class="overline mb-1"
            >
              Decision
            </v-list-item-title>
            <v-select
              :items="decisions"
              label="Decision"
              v-model="decision.decision"
              :disabled="viewOnly"
            ></v-select>
          </div>
        </v-card-text>
      </div>
    </div>
  </v-row>
</template>

<script>
  export default {
    name: "FinalDecisionEditor",
    props: {
      paper: {
        type: Object,
        required: true,
      },
      viewOnly: {
        type: Boolean,
        required: true,
      },
      decision: {
        type: Object,
        required: true,
      },
    },
    data () {
      return {
        items: [ "A+", "A", "A-", "B+", "B", "B-", "C" ],
        decisions: ["Accept", "Reject"],
      };
    },
  };
</script>