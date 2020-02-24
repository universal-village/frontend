<template>
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
        lg="4"
      >
        <v-skeleton-loader
          type="card-heading,list-item-avatar-three-line@4"
        />
      </v-col>
    </v-row>

    <v-data-iterator
      v-else
      :items-per-page="6"
      :items="papers"
      :footer-props="{'items-per-page-options': [6, 12, 18, -1]}"

      sort-by="paperId"
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
            lg="4"
          >
            <PreviewCard :paper="item" />
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
          No paper has been submitted yet. <v-btn
            outlined
            small
            :to="{name: 'AuthorSubmit'}"
          >
            submit a paper
          </v-btn>
        </v-alert>
      </template>
    </v-data-iterator>
  </v-fade-transition>
</template>

<script>
  import PreviewCard from "./PreviewCard";
  export default {
    name: "PaperList",
    components: {PreviewCard},
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
  };
</script>

<style scoped>

</style>