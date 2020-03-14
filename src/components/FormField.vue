<template>
  <v-text-field
      v-model="password"

      :label="name"
      :prepend-icon="model.icon"

      :type="model.type"
      :autocomplete="autoComplete"
      :required="model.required"
      :error-messages="errors('password')"

      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
  />
</template>

<script>
  export default {
    name: "FormField",
    props: {
      model: {
        type: Object,
        required: true,
      },
    },
    methods: {
      input () {

      }
    },
    computed: {
      name () {
        return `${this.model.name}${this.model.required ? '*' : ''}`;
      },
      autoComplete () {
        const map = {
          "password": "new-password",
          "phone": "phone";
        };
        return map[this.model.type] || "";
      }
    }
  };
</script>

<style scoped>

</style>