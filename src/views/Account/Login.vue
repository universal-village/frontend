<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>
              {{ $t('pages.account.login.title') }}
            </v-toolbar-title>
            <v-spacer />
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="config.externalLinks.contact"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon>mdi-help-circle</v-icon>
                </v-btn>
              </template>
              <span>Having trouble?</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model.trim="username"
                :label="$t('nouns.account.email')"
                name="username"
                prepend-icon="mdi-account"
                type="email"
                required
                clearable

                :error-messages="usernameErrors"
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
              />

              <v-text-field
                v-model="password"
                :label="$t('nouns.account.password')"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                required
                clearable

                :error-messages="passwordErrors"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <vue-recaptcha
              ref="recaptcha"
              :sitekey="config.credentials.recaptchaSiteKey"
              :load-recaptcha-script="true"
              recaptcha-host="www.recaptcha.net"
              @verify="submit"
            >
              <v-btn
                color="primary"
                :loading="buttonBusy"
                :disabled="buttonBusy || $v.$invalid"
                large
                @click="solvingRecaptcha = true"
              >
                {{ $t('nouns.form.submit') }}
              </v-btn>
            </vue-recaptcha>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import config from '@/config';
import VueRecaptcha from 'vue-recaptcha';
import {validationMixin} from 'vuelidate';
import {required, email} from 'vuelidate/lib/validators';
export default {
  name: "Login",
  components: {
    VueRecaptcha,
  },
  mixins: [validationMixin],
  data () {
    return {
      solvingRecaptcha: false,
      username: '',
      password: '',
    };
  },
  validations: {
    username: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  computed: {
    config () {
      return config;
    },
    buttonBusy () {
      return this.solvingRecaptcha || this.$store.getters['network/isBusy'];
    },
    usernameErrors () {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.email && errors.push(this.$t('nouns.account.emailInvalid'));
      !this.$v.username.required && errors.push(this.$t('nouns.account.emailRequired'));
      return errors;
    },
    passwordErrors () {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push(this.$t('nouns.account.passwordRequired'));
      return errors;
    },
  },
  methods: {
    submit () {
      this.$store.dispatch('account/login', {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>
