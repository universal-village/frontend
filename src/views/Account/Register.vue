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
        lg="8"
        xl="8"
      >
        <v-img
          :src="require('@/assets/logo.png')"
          :aspect-ratio="5.513"
          max-width="200px"
          contain
          class="mx-auto mb-6"
          style="cursor: pointer"
          @click="$router.push({path: '/'})"
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
        
        <v-card
          class="mx-auto"
          max-width="800"
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
            <v-avatar
              v-if="step <= 6"
              color="primary darken-1"
              class="subheading white--text font-weight-bold"
              size="36"
              v-text="step"
            />
          </v-toolbar>

          <v-form v-model="form.valid">
            <v-window v-model="step">
              <v-window-item :value="1">
                <div class="pa-4 text-center">
                  <v-img
                    class="my-6 mx-auto"
                    contain
                    width="256"
                    :aspect-ratio="5.513"
                    src="../../assets/logo.png"
                  />
                  <h3 class="title font-weight-light mb-2">
                    Register for Universal Village account
                  </h3>
                  <span class="caption grey--text">We will be asking for the information that will be used to identify you. Your personal information will not be disclosed to any third-party.</span>
                </div>
              </v-window-item>

              <v-window-item :value="2">
                <v-card-text>
                  <v-text-field
                    v-model="email"

                    label="Email*"
                    prepend-icon="mdi-email"

                    autocomplete="email"
                    required
                    :error-messages="errors('email')"

                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  />
                  <v-text-field
                    v-model="password"

                    label="Password*"
                    prepend-icon="mdi-lock"

                    type="password"
                    autocomplete="new-password"
                    required
                    :error-messages="errors('password')"

                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  />
                  <v-text-field
                    v-model="confirmPassword"

                    label="Confirm Password*"
                    prepend-icon="mdi-lock"

                    type="password"
                    autocomplete="new-password"
                    required
                    :error-messages="errors('confirmPassword')"

                    @input="$v.confirmPassword.$touch()"
                    @blur="$v.confirmPassword.$touch()"
                  />
                </v-card-text>
              </v-window-item>

              <v-window-item :value="3">
                <v-card-text>
                  <v-text-field
                    v-model="title"

                    label="Title"
                    prepend-icon="mdi-account-badge-horizontal"

                    autocomplete="honorific-prefix"
                    required
                    :error-messages="errors('title')"

                    @input="$v.title.$touch()"
                    @blur="$v.title.$touch()"
                  />
                  <v-text-field
                    v-model="firstName"

                    label="First Name*"
                    prepend-icon="mdi-account-circle"

                    autocomplete="given-name"
                    required
                    :error-messages="errors('firstName')"

                    @input="$v.firstName.$touch()"
                    @blur="$v.firstName.$touch()"
                  />
                  <v-text-field
                    v-model="middleName"

                    label="Middle Name"
                    prepend-icon="mdi-account-circle"

                    autocomplete="additional-name"
                    :error-messages="errors('middleName')"

                    @input="$v.middleName.$touch()"
                    @blur="$v.middleName.$touch()"
                  />
                  <v-text-field
                    v-model="lastName"

                    label="Last Name*"
                    prepend-icon="mdi-account-circle"

                    autocomplete="family-name"
                    required
                    :error-messages="errors('lastName')"

                    @input="$v.lastName.$touch()"
                    @blur="$v.lastName.$touch()"
                  />

                  <v-text-field
                    v-model="customName"

                    label="Name in your own language"
                    prepend-icon="mdi-account-circle"

                    autocomplete="name"
                    :error-messages="errors('customName')"

                    @input="$v.customName.$touch()"
                    @blur="$v.customName.$touch()"
                  />

                  <v-dialog
                    ref="dialog"
                    v-model="form.states.birthday"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="birthday"
                        label="Birthday*"
                        prepend-icon="mdi-calendar"
                        readonly
                        :error-messages="errors('birthday')"

                        v-on="on"

                        @blur="$v.birthday.$touch()"
                      />
                    </template>
                    <v-date-picker
                      v-model="birthday"
                      scrollable

                      :max="new Date().toISOString().substr(0, 10)"
                      min="1850-01-01"
                    >
                      <v-spacer />
                      <v-btn
                        text
                        color="secondary"
                        @click="closeBirthdayDialog(false)"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="closeBirthdayDialog(true)"
                      >
                        Confirm
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-card-text>
              </v-window-item>

              <v-window-item :value="4">
                <v-card-text>
                  <v-textarea
                    v-model="biography"
                      
                    label="Biography*"
                    prepend-icon="mdi-account-box"
                    placeholder="Short summary about yourself"
                    counter="200"

                    autocomplete="organization-title"
                    :error-messages="errors('biography')"

                    @input="$v.biography.$touch()"
                    @blur="$v.biography.$touch()"
                  />
                  <v-text-field
                    v-model="organization"

                    label="Organization*"
                    prepend-icon="mdi-domain"

                    autocomplete="organization"
                    required
                    :error-messages="errors('organization')"

                    @input="$v.organization.$touch()"
                    @blur="$v.organization.$touch()"
                  />
                </v-card-text>
              </v-window-item>

              <v-window-item :value="5">
                <v-card-text>
                  <vuetify-google-autocomplete
                    id="addressInput"
                    prepend-icon="mdi-map-marker"
                    placeholder="Address"
                    :error-messages="errors('address')"

                    autocomplete="street-address"

                    @placechanged="updateAddress"

                    @input="$v.address.$touch()"
                    @blur="$v.address.$touch()"
                  />
                  <v-text-field
                    v-model="phone"

                    label="Phone"
                    prepend-icon="mdi-phone"

                    type="phone"
                    autocomplete="tel"
                    :error-messages="errors('phone')"

                    @input="$v.phone.$touch()"
                    @blur="$v.phone.$touch()"
                  />
                </v-card-text>
              </v-window-item>

              <v-window-item :value="6">
                <v-card-text>
                  <v-switch
                    v-model="visa"
                      
                    label="I need a Support Letter for US Visa*"
                    :error-messages="errors('visa')"

                    @input="$v.visa.$touch()"
                    @blur="$v.visa.$touch()"
                  />
                  <v-slide-y-transition>
                    <v-text-field
                      v-if="visa"

                      v-model="passport"

                      label="Passport Number*"
                      prepend-icon="mdi-passport"

                      :error-messages="errors('passport')"

                      @input="$v.passport.$touch()"
                      @blur="$v.passport.$touch()"
                    />
                  </v-slide-y-transition>
                </v-card-text>
              </v-window-item>

              <v-window-item :value="7">
                <div class="pa-4 text-center">
                  <v-img
                    class="my-6 mx-auto"
                    contain
                    width="256"
                    :aspect-ratio="5.513"
                    src="../../assets/logo.png"
                  />
                  <h3 class="title font-weight-light mb-2">
                    Welcome to Universal Village!
                  </h3>
                  <span class="caption grey--text">
                    Thanks for signing up!
                  </span><br>
                  <span class="caption grey--text">
                    Now you can submit a paper or register for a UV conference by heading to your dashboard.
                  </span><br>
                  <v-btn
                    class="mt-3"
                    outlined
                    :to="{name: 'Dashboard'}"
                  >
                    go to dashboard
                  </v-btn>
                </div>
              </v-window-item>
            </v-window>
          </v-form>

          <v-divider v-if="step < 7" />

          <v-card-actions>
            <v-btn
              v-if="step < 7"
              :disabled="step === 1"
              text
              @click="step--"
            >
              Back
            </v-btn>
            <v-spacer />
            <v-btn
              v-if="step < 6"
              color="primary"
              depressed
              :disabled="!nextable"
              @click="next"
            >
              Next
            </v-btn>
            <vue-recaptcha
              v-else-if="step === 6"
              ref="recaptcha"
              :sitekey="config.credentials.recaptchaSiteKey"
              :load-recaptcha-script="true"
              recaptcha-host="www.recaptcha.net"
              @verify="submit"
            >
              <v-btn
                color="primary"
                depressed
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
  </v-container>
</template>

<script>
import config from '../../config';
import VueRecaptcha from 'vue-recaptcha';
import {validationMixin} from 'vuelidate';
import {required, email, sameAs, minLength, maxLength, requiredIf} from 'vuelidate/lib/validators';
import marshaller from "../../utils/marshal";
import api from "../../api/api";
// import api from "../../api";

export default {
  name: "AccountRegister",
  components: {
    VueRecaptcha,
  },
  mixins: [validationMixin],
  data () {
    return {
      recaptcha: false,
      step: 1,
      form: {
        valid: false,
        states: {
          birthday: false,
        },
        meta: {
          address: {},
        },
      },
      pagination: [[
        "email",
        "password",
        "confirmPassword",
      ], [
        "title",
        "firstName",
        "middleName",
        "lastName",
        "customName",
        "birthday",
      ], [
        "biography",
        "organization",
      ], [
        "address",
        "phone",
      ]],

      email: "",
      password: "",
      confirmPassword: "",

      title: "",
      firstName: "",
      middleName: "",
      lastName: "",
      customName: "",
      birthday: "",

      biography: "",
      organization: "",
      
      address: "",
      phone: "",

      visa: false,
      passport: "",
    };
  },
  validations: {
    email: {
      required,
      email,
      maxLength: maxLength(64),
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(64),
    },
    confirmPassword: {
      sameAsPassword: sameAs('password'),
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
    customName: {
      maxLength: maxLength(64),
    },
    birthday: {
      required,
      maxLength: maxLength(24),
    },
    biography: {
      required,
      maxLength: maxLength(200),
    },
    organization: {
      required,
      maxLength: maxLength(128),
    },
    address: {},
    phone: {
      maxLength: maxLength(18),
    },
    visa: {
      required,
    },
    passport: {
      required: requiredIf((self) => {return self.visa}),
    },
  },
  computed: {
    config () {
      return config;
    },
    buttonBusy () {
      return this.solvingRecaptcha || this.$store.getters['network/isBusy'];
    },
    nextable () {
      let index = this.step - 2;
      if (this.step === 1 || this.step === 7) {
        // first and last page
        return true;
      } else if (this.step === 6) {
        // final page
        return !this.$v.$invalid;
      } else {
        // middle pages
        let keys = this.pagination[index];
        for (let key of keys) {
          if (this.$v[key].$error) {
            return false;
          }
        }
        return true;
      }
    },
  },
  methods: {
    submit () {
      this.solvingRecaptcha = false;
      let marshalled = marshaller.register(this);
      api.register(marshalled)
        .then(({data}) => {
          this.$store.dispatch("account/jwtLogin", data)
          .then(() => {
            this.step += 1;
          })
          .catch((err) => {
            alert(err);
            this.$refs.recaptcha.reset();
          });
        })
        .catch((err) => {
          alert(err);
          this.$refs.recaptcha.reset();
        });
      console.log(marshalled);
    },
    next () {
      let index = this.step - 2;
      if (this.step > 1 && this.step < 6) {
        // first and last page
        let keys = this.pagination[index];
        for (let key of keys) {
          this.$v[key].$touch();
        }
      }

      (this.nextable) && (this.step += 1);
    },
    updateAddress (object) {
      console.log(object);
      this.form.meta.address = Object.assign({}, object);
      this.address = object.name;
    },
    closeBirthdayDialog (resolved) {
      if (!resolved) {
        this.birthday = null;
      }
      this.form.states.birthday = false;
    },
    errors (key) {
      const errors = [];
      const fieldsMap = {
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",

        title: "Title",
        firstName: "First Name",
        middleName: "Middle Name",
        lastName: "Last Name",
        customName: "Name In Your Own Language",
        birthday: "Birthday",

        biography: "Biography",
        organization: "Organization",

        address: "Address",
        phone: "Phone",

        visa: "Support Letter for US Visa",
        passport: "Passport Number",
      };
      const errorsMap = {
        required: (field) => `${field} is required`,
        email: "Must be a valid e-mail",
        sameAsPassword: "Must be the same as 'Password'",
        minLength: (field, {min}) => `Length of ${field} is too short${min ? ': must be longer than ' + min : ''}`,
        maxLength: (field, {max}) => `Length of ${field} is too long${max ? ': must be shorter than ' + max : ''}`,
      };
      if (key in this.$v) {
        if (!this.$v[key].$dirty) return [];
        for (let ruleName of Object.keys(this.$v[key]).filter(el => !el.startsWith("$"))) {
          if (!this.$v[key][ruleName]) {
            if (ruleName in errorsMap) {
              let rule = errorsMap[ruleName];
              if (typeof rule === "function") {
                let fieldName = (key in fieldsMap) ? `'${fieldsMap[key]}'` : "your input";
                let params = this.$v[key].$params[ruleName];
                errors.push(rule(fieldName, params));
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
  },
};
</script>
