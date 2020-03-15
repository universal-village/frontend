<template>
  <v-snackbar
    v-model="snackbar.enabled"
    bottom
    :timeout="snackbar.timeout"
    :color="`${snackbar.color} darken-1`"
  >
    <v-icon class="mr-2 white--text">
      {{ snackbar.icon }}
    </v-icon>
    {{ snackbar.text }}
    <v-spacer />
    <!--    <v-btn-->
    <!--      text-->
    <!--      @click="snackbar.enabled = false"-->
    <!--    >-->
    <!--      {{ $t('dialog.close') }}-->
    <!--    </v-btn>-->
  </v-snackbar>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "GlobalSnackbar",
    computed: {
      ...mapGetters("ui", ["snackbar"]),
    },
  };
</script>

<style scoped>

</style>