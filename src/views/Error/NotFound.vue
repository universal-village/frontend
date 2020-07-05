<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
      class="mt-12"
    >
      <v-col
        cols="12"
      >
        <h1 class="display-4 monospace mb-4">
          &gt; 404 _
        </h1>
        <h1>Page Not Found</h1>
        <p>
          The resource that you try to access cannot be found.
        </p>
        <v-divider class="mb-4" />
        Need support? Contact us at <a :href="contact">{{ contact }}</a>
      </v-col>
      <v-col
        cols="12"
        class="justify-center d-flex"
      >
        <span>
          Universal Village | {{ gitHash }}
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import config from '@/config';
  export default {
    name: "NotFound",
    computed: {
      contact () {
        return config.externalLinks.contact;
      },
      gitHash () {
        return GIT_VERSION;
      },
    },
  };
</script>

<style scoped>
.monospace {
  font-family: SF Mono, Consolas, Monospaced, Courier New, monospace;
  letter-spacing: -1px;
  font-stretch: condensed;
  font-weight: bolder;
}
</style>