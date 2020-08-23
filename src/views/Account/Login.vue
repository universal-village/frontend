<template>
  <v-container
    class="fill-height align-content-center justify-center"
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

        class="flex-column"
      >
        <v-btn
          class="mb-6"
          color="accent"
          href="https://universalvillage.org"
          target="_blank"
        >
          <v-icon left>
            mdi-chevron-left
          </v-icon>
          Back to Main Website
        </v-btn>

        <v-img
          :src="require('@/assets/logo.png')"
          :aspect-ratio="5.513"
          max-width="250px"
          contain
          class="mx-auto mb-3 logo"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="primary lighten-1"
              />
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
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
            <v-expand-transition>
              <v-alert
                v-if="!!notice || !!error"
                type="warning"
                icon="mdi-account-lock"
                border="left"
              >
                {{ notice ? notice : (error ? error : "") }}
              </v-alert>
            </v-expand-transition>
            <v-form>
              <v-text-field
                v-model.trim="username"
                :label="$t('nouns.account.email')"
                name="username"
                prepend-icon="mdi-account"
                type="email"
                required
                clearable

                autocomplete="email"

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

                autocomplete="current-password"

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
                @click="solvingRecaptcha = true"
              >
                {{ $t('nouns.form.submit') }}
              </v-btn>
            </vue-recaptcha>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
        <v-card
          class="elevation-12"
          ripple
          style="cursor: pointer"
          @click="$router.push({name: 'AccountRegister'})"
        >
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>
              Register
            </v-toolbar-title>
            <v-spacer />
            <v-icon>
              mdi-chevron-right
            </v-icon>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
    <div class="justify-center">
      <span
        class="overline white--text"
        style="font-size: 1.5em; text-shadow: 0 0 3px rgba(0, 0, 0, .5)"
      >
        <span class="monospace mr-2">{{ $config.conference.identifier }}</span>
        <small style="letter-spacing: -.03em; text-transform: none;">ver.</small><span class="monospace">{{ gitHash }}</span>
      </span>
    </div>
  </v-container>
</template>

<script>
import config from '@/config';
import VueRecaptcha from 'vue-recaptcha';
import {validationMixin} from 'vuelidate';
import {required, email} from 'vuelidate/lib/validators';
export default {
  name: "AccountLogin",
  components: {
    VueRecaptcha,
  },
  mixins: [validationMixin],
  data () {
    return {
      solvingRecaptcha: false,
      username: '',
      password: '',
      error: '',
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
    notice () {
      const allowedReasons = ["sessionExpired"];
      let reason = this.$route.query.reason;
      if (allowedReasons.includes(reason)) {
        return this.$t(`pages.account.login.reason.${reason}`);
      } else {
        return null;
      }
    },
    redirect () {
      return this.$route.query.redirect;
    },
    gitHash () {
      return GIT_VERSION;
    },
  },
  methods: {
    submit () {
      this.solvingRecaptcha = false;
      this.$store.dispatch('account/login', {
        username: this.username,
        password: this.password,
      })
        .then(() => {
          if (this.redirect) {
            this.$router.push({
              path: this.redirect,
            });
          } else {
            this.$router.push({
              name: "Dashboard",
            });
          }
        })
        .catch(({type, error}) => {
          if (type === "FETCH_DETAIL") {
            this.error = "Failed to fetch account details. Please try logging in again";
          } else if (type === "CREDENTIALS") {
            if (error.response) {
              this.error = "E-mail or password is incorrect";
            } else {
              this.error = "Network request failed. Please check your network and try again";
            }
          } else {
            this.error = error.errorMessage;
          }

          this.$refs.recaptcha.reset();
        });
    },
  },
};
</script>
