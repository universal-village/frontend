<template>
  <v-card>
    <v-card-title class="mb-2">
      Add an author
    </v-card-title>

    <v-card-subtitle>
      Add an author who does not register a UV account yet. We will send them a confirmation email, notifying them that you have added them as the author of your paper.
    </v-card-subtitle>

    <v-card-text>
      <v-text-field
        v-model="form.title"

        label="Title"
        prepend-icon="mdi-account-badge-horizontal"

        autocomplete="honorific-prefix"
        required
        :error-messages="errors('title')"

        @input="$v.form.title.$touch()"
        @blur="$v.form.title.$touch()"
      />
      <v-text-field
        v-model="form.firstName"

        label="First Name*"
        prepend-icon="mdi-account-circle"

        autocomplete="given-name"
        required
        :error-messages="errors('firstName')"

        @input="$v.form.firstName.$touch()"
        @blur="$v.form.firstName.$touch()"
      />
      <v-text-field
        v-model="form.middleName"

        label="Middle Name"
        prepend-icon="mdi-account-circle"

        autocomplete="additional-name"
        :error-messages="errors('middleName')"

        @input="$v.form.middleName.$touch()"
        @blur="$v.form.middleName.$touch()"
      />
      <v-text-field
        v-model="form.lastName"

        label="Last Name*"
        prepend-icon="mdi-account-circle"

        autocomplete="family-name"
        required
        :error-messages="errors('lastName')"

        @input="$v.form.lastName.$touch()"
        @blur="$v.form.lastName.$touch()"
      />
      <v-text-field
        v-model="form.email"

        label="Email*"
        prepend-icon="mdi-email"

        autocomplete="email"
        required
        :error-messages="errors('email')"

        @input="$v.form.email.$touch()"
        @blur="$v.form.email.$touch()"
      />
      <v-text-field
        v-model="form.organization"

        label="Organization*"
        prepend-icon="mdi-account-multiple"

        autocomplete="organization"
        required
        :error-messages="errors('organization')"

        @input="$v.form.organization.$touch()"
        @blur="$v.form.organization.$touch()"
      />
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        text
        :loading="pending"
        :disabled="$v.form.$invalid"
        @click="register"
      >
        Add
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import {validationMixin} from "vuelidate";
  import {email, maxLength, required} from "vuelidate/lib/validators";
  import api from "../../api/api";
  import snackbar from "../../utils/snackbar";
  import marshal from "../../utils/marshal";

  const initial = {
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    organization: "",
  };

  export default {
    name: "RegisterPartialAuthor",
    mixins: [validationMixin],
    data() {
      return {
        form: initial,
        error: "",
        pending: false,
      };
    },
    validations: {
      form: {
        email: {
          required,
          email,
          maxLength: maxLength(64),
        },
        title: {
          maxLength: maxLength(10),
        },
        firstName: {
          required,
          maxLength: maxLength(64),
        },
        middleName: {
          maxLength: maxLength(64),
        },
        lastName: {
          required,
          maxLength: maxLength(64),
        },
        organization: {
          required,
          maxLength: maxLength(128),
        },
      },
    },
    methods: {
      errors (key) {
        const errors = [];
        const fieldsMap = {
          email: "Email",
          title: "Title",
          firstName: "First Name",
          middleName: "Middle Name",
          lastName: "Last Name",
          organization: "Organization",
        };
        const errorsMap = {
          required: (field) => `${field} is required`,
          email: "Must be a valid e-mail",
          minLength: (field, {min}) => `Length of ${field} is too short${min ? ': must be longer than ' + min : ''}`,
          maxLength: (field, {max}) => `Length of ${field} is too long${max ? ': must be shorter than ' + max : ''}`,
        };
        let $form = this.$v.form;
        if (key in $form) {
          if (!$form[key].$dirty) return [];

          for (let ruleName of Object.keys($form[key]).filter(el => !el.startsWith("$") || el === "$each")) {
            console.log(key, ruleName, $form[key][ruleName]);
            if (!$form[key][ruleName] || $form[key][ruleName].$invalid) {
              console.log("deep", key, ruleName);
              if (ruleName in errorsMap) {
                let rule = errorsMap[ruleName];
                if (typeof rule === "function") {
                  let fieldName = (key in fieldsMap) ? `'${fieldsMap[key]}'` : "Your input";
                  let params = $form[key].$params[ruleName];
                  let evaluation = rule(fieldName, params, $form[key]);
                  if (evaluation !== false) errors.push(evaluation);
                } else {
                  errors.push(errorsMap[ruleName]);
                }
              } else {
                errors.push(`Invalid input: rule [${ruleName}] triggered`);
              }
            }
          }
          return errors;
        } else {
          return [];
        }
      },
      reset () {
        this.$set(this, "form", Object.assign({}, {
          title: "",
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          organization: "",
        }));
        this.$v.form.$reset();
      },
      register() {
        this.pending = true;
        api.papers.registerAuthor(this.form)
        .then(() => {
          this.$emit("registered", this.form);
          snackbar.success(`Added author: ${marshal.name(this.form)} (${this.form.email})`);
          this.reset();
        })
        .catch(err => {
          console.error(err);
          snackbar.error(`Failed to add author: ${err.errorMessage}`);
        })
        .finally(() => this.pending = false);
      },
    },
  };
</script>

<style scoped>

</style>