<template>
  <v-card style="overflow: hidden; border-top: 3px solid #4EA95E;">
    <span
      class="display-3 font-weight-black preview-card--background"
    >
      <small style="font-size: .6em; color: rgba(0, 0, 0, .05)">PAPER#</small>{{ content.id }}
    </span>
    <v-card-title
      class="title grey lighten-3"
      style="word-break: break-word"
    >
      <span style="z-index: 1">{{ content.title }}</span>
      <v-spacer />
    </v-card-title>
    <v-card-text>
      <v-list
        two-line
        dense
      >
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
              mdi-note-text
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
    <v-card-actions class="grey lighten-4 justify-space-around">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            style="padding: 0;"
            v-on="on"
          >
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
        </template>
        Edit
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            color="error"
            icon
            style="padding: 0;"
            v-on="on"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
        Delete
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            style="padding: 0;"
            color="blue"
            v-on="on"
          >
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </template>
        Submit
      </v-tooltip>
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
span.preview-card--background {
  position: absolute;
  top: .3em;
  right: .3em;
  color: rgba(0, 0, 0, .1);
  user-select: none;
  z-index: 0;
  letter-spacing: -.05em !important;
}
</style>