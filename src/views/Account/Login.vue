<template>
  <v-container
    class="align-content-center fill-height"
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
            <v-alert
              :value="!!notice || !!error"
              type="warning"
              icon="mdi-account-lock"
              border="left"
            >
              {{ notice ? notice : (error ? error : "") }}
            </v-alert>
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
          <!--          <v-sheet-->
          <!--            class="d-flex align-center justify-start px-4"-->
          <!--            color="primary"-->
          <!--            height="64"-->
          <!--            tile-->
          <!--            dark-->
          <!--          >-->
          <!--            &lt;!&ndash;            <v-icon size="28">&ndash;&gt;-->
          <!--            &lt;!&ndash;              mdi-account&ndash;&gt;-->
          <!--            &lt;!&ndash;            </v-icon>&ndash;&gt;-->
          <!--            <span class="subtitle-1 white&#45;&#45;text ml-3 font-weight-bold">-->
          <!--              Register-->
          <!--            </span>-->
          <!--            <v-spacer />-->
          <!--            <v-icon-->
          <!--              right-->
          <!--              size="36"-->
          <!--            >-->
          <!--              mdi-chevron-right-->
          <!--            </v-icon>-->
          <!--          </v-sheet>-->
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
  props: {
    redirect: {
      type: String,
      required: false,
    },
  },
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
            this.$router.push({path: this.redirect});
          } else {
            this.$router.push({
              name: "Dashboard",
            });
          }
        })
        .catch(() => {
          this.error = this.$t('pages.account.login.reason.failedAuthentication');
          this.$refs.recaptcha.reset();
        });
    },
  },
};
</script>
