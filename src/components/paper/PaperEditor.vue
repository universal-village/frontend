<template>
  <v-form>
    <v-text-field
      v-model="form.title"

      label="Title*"
      prepend-icon="mdi-email"

      required
      :error-messages="errors('title')"

      @input="$v.form.title.$touch()"
      @blur="$v.form.title.$touch()"
    />
  </v-form>
</template>

<script>
  import Paper from "../../models/Paper";

  export default {
    name: "PaperEditor",
    props: {
      prefill: {
        type: Paper,
        default: null,
      },
    },
    data() {
      return {
        form: {
          title: "",

        },
      };
    },
    computed: {

    },
  };
</script>

<style scoped>

</style>