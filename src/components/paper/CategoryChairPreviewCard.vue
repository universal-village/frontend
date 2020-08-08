<template>
  <v-card
    class="d-flex flex-column"
    style="overflow: hidden; border-top: 3px solid #4EA95E;"
  >
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
    <v-card-text class="flex-grow-1">
      <v-list
        two-line
        dense
      >
        <v-list-item>
          <v-list-item-action>
            <v-icon>
              mdi-shape
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Category
            </v-list-item-title>
            <v-list-item-subtitle class="nowrap">
              {{ content.category.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-icon>
              mdi-file-document-box-outline
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Abstract
            </v-list-item-title>
            <v-list-item-subtitle class="nowrap">
              {{ content.paperAbstract }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-icon>
              mdi-tag
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Keywords
            </v-list-item-title>
            <v-list-item-subtitle class="nowrap">
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
              mdi-account-multiple
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Authors
            </v-list-item-title>
            <v-list-item-subtitle class="nowrap">
              <span
                v-for="author in content.authors"
                :key="author.userId"
                class="d-inline-block mb-1 mr-1"
              >
                <UserChip
                  :user="author"
                />
              </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="!previewOnly">
          <v-list-item-action>
            <v-icon>
              mdi-timeline-text
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Status
            </v-list-item-title>
            <v-list-item-subtitle class="nowrap">
              <PaperPhaseIndicator :phase="content.phase" />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="!previewOnly"
          :href="content.link"
          target="_blank"
        >
          <v-list-item-action>
            <v-icon>
              mdi-download
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Paper Submission File
            </v-list-item-title>
            <v-list-item-subtitle class="nowrap">
              {{ content.link ? "Click to download" : "(no file has been submitted yet)" }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>
              {{ content.link ? `mdi-file-${content.link.split(".").pop()}` : "mdi-file-question" }}
            </v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions
      class="grey lighten-4 justify-space-around"
      style="border-radius: 0"
    >
      <slot name="actions" />
    </v-card-actions>
    <v-sheet
      v-if="!content.canEdit"
      color="grey lighten-4"
      class="caption align-center d-flex px-2 py-1 justify-center"
      tile
    >
      <v-icon
        small
        class="mr-1"
      >
        mdi-information
      </v-icon>
      <span>
        You cannot edit a paper once you have submitted it.
      </span>
    </v-sheet>
  </v-card>
</template>

<script>
  import PaperPhaseIndicator from "./PaperPhaseIndicator";
  import UserChip from "../account/UserChip";

  export default {
    name: "CategoryChairPreviewCard",
    components: {UserChip, PaperPhaseIndicator},
    props: {
      paper: {
        type: Object,
        required: true,
      },
      /** Ignore current states */
      previewOnly: {
        type: Boolean,
        default () {
          return false;
        },
      },
    },
    computed: {
      content () {
        return this.paper;
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
  .nowrap {
    white-space: normal !important;
  }
</style>