<template>
  <v-card>
    <span
      style="position: absolute; top: .4em; right: .4em; color: rgba(0, 0, 0, .05); user-select: none; z-index: 0"
      class="display-3 font-weight-black"
    >
      #{{ content.id }}
    </span>
    <v-card-title style="word-break: break-word">
      <span style="z-index: 1">{{ content.title }}</span>
    </v-card-title>
    <v-card-text>
      <v-list three-line>
        <v-list-item>
          <v-list-item-action>
            <v-icon>
              mdi-file
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Category
            </v-list-item-title>
            <v-list-item-subtitle>{{ content.category.name }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-icon>
              mdi-file
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Abstract
            </v-list-item-title>
            <v-list-item-subtitle>{{ content.paperAbstract }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-icon>
              mdi-tag
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title class="monospace">
              Keywords
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-chip
                v-for="keyword in content.keywords"
                :key="keyword"
                small
                class="mb-1 mr-1"
              >
                {{ keyword }}
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-icon>
              mdi-alert-circle
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Phase
            </v-list-item-title>
            <v-list-item-subtitle>
              <PaperPhaseIndicator :phase="content.phase" />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn icon>
        <v-icon>
          mdi-eye
        </v-icon>
      </v-btn>
      <v-spacer />
      <v-btn icon>
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn
        color="error"
        icon
      >
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import unmarshal from "../../utils/unmarshal";
  import PaperPhaseIndicator from "./PaperPhaseIndicator";

  export default {
    name: "PreviewCard",
    components: {PaperPhaseIndicator},
    props: {
      paper: {
        type: Object,
        required: true,
      },
    },
    computed: {
      content () {
        return unmarshal.paper(this.paper);
      },
    },
  };
</script>

<style scoped>

</style>