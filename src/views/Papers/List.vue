<template>
  <v-row>
    <v-col
      cols="12"
      sm="12"
      md="6"
      lg="6"
      xl="4"
    >
      <h1 class="display-1 pa-3">
        My Submissions
      </h1>
    </v-col>

    <v-data-iterator
      :items="records"
      :items-per-page.sync="itemsPerPage"
      :footer-props="{ itemsPerPageOptions }"
      sort-by="meta.created"
      sort-desc
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.recordId"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card
              ripple
              hover
              @click="jump(item.recordId)"
            >
              <v-card-title>
                <span class="monospace">
                  at {{ time.relative(item.meta.created) }}
                </span>
              </v-card-title>
              <v-card-subtitle>
                <span class="monospace">rec# {{ item.recordId }}</span>
              </v-card-subtitle>
              <v-card-text>
                <v-list
                  two-line
                >
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon color="indigo">
                        mdi-file
                      </v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title class="monospace">
                        {{ get.exam.idName(item.meta.examId) }}
                      </v-list-item-title>
                      <v-list-item-subtitle>Exam</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-action>
                      <v-icon color="indigo">
                        mdi-math-compass
                      </v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title class="monospace">
                        §{{ item.meta.subjectId-3 }} {{ get.subject.name(item.meta.subjectId) }}
                      </v-list-item-title>
                      <v-list-item-subtitle>Subject</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-action>
                      <v-icon color="indigo">
                        mdi-counter
                      </v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title class="monospace">
                        {{ item.records.length }} / {{ item.meta.totalQuestions }}
                      </v-list-item-title>
                      <v-list-item-subtitle>Answered</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-if="item.grade.error">
                    <v-list-item-action>
                      <v-icon color="warning">
                        mdi-alert-circle
                      </v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.grade.error }}
                      </v-list-item-title>
                      <v-list-item-subtitle>Correctness</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-else>
                    <v-list-item-action>
                      <v-icon color="indigo">
                        mdi-file-check
                      </v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title class="monospace">
                        {{ item.grade.summary.correct }} ({{ percentage(item.grade.summary) }}%)
                      </v-list-item-title>
                      <v-list-item-subtitle>Correctness</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
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
          No paper has been submitted yet. <v-btn
            outlined
            small
            :to="{name: 'PaperAdd'}"
          >
            submit a paper
          </v-btn>
        </v-alert>
      </template>
    </v-data-iterator>
  </v-row>
</template>

<script>
  export default {
    name: "PaperList",
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style scoped>

</style>