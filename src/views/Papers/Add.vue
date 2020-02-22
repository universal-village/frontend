<template>
  <v-container>
    <v-row class="pa-3">
      <v-col
        cols="12"
      >
        <h1 class="title">
          Submit a New Paper
        </h1>
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="10"
        md="10"
        lg="9"
        xl="7"
      >
        <v-stepper
          v-model="step"
          vertical
        >
          <v-stepper-step
            :complete="step > 1"
            step="1"
          >
            Basic Information
            <small>Required</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <p class="caption">
              Please fill the fields below with basic information of your paper, which we will be using as a way to categorize paper submissions.
            </p>

            <v-text-field
              v-model="$v.form.title.$model"
              :error-messages="errors('title')"
              :counter="500"

              prepend-icon="mdi-file-document"
              label="Title"
              outlined

              @input="$v.form.title.$touch()"
              @blur="$v.form.title.$touch()"
            />
            <v-textarea
              v-model="$v.form.abstract.$model"
              :error-messages="errors('abstract')"
              :counter="4000"

              prepend-icon="mdi-file-document-box-outline"
              label="Abstract"
              outlined

              @input="$v.form.abstract.$touch()"
              @blur="$v.form.abstract.$touch()"
            />
            <v-select
              v-model="$v.form.category.$model"
              :error-messages="errors('category')"

              outlined
              label="Category"
              :items="prefill.categories"
              item-text="name"
              item-value="categoryId"

              :loading="prefill.categoriesFetching"
              prepend-icon="mdi-shape"

              @input="$v.form.category.$touch()"
              @blur="$v.form.category.$touch()"
            />
            <v-combobox
              v-model="$v.form.keywords.$model"
              :error-messages="errors('keywords')"
              class="paper_add__author_selection"

              multiple
              deletable-chips
              clearable

              chips
              outlined
              small-chips

              hide-no-data
              label="Keywords"
              hint="Press [enter] to continue add more keywords"
              prepend-icon="mdi-tag"
              @input="$v.form.keywords.$touch()"
              @blur="$v.form.keywords.$touch()"
            />
            <v-combobox
              v-model="$v.form.authors.$model"
              :error-messages="errors('authors')"
              class="paper_add__author_selection"

              :loading="$v.form.authors.$pending"

              multiple
              clearable

              chips
              outlined
              small-chips

              hide-no-data
              label="Authors"
              hint="Please enter the E-mail of the authors; press [enter] to continue add more authors"
              prepend-icon="mdi-account"

              @blur="$v.form.authors.$touch()"
            >
              <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-chip
                      small
                      close
                      v-bind="attrs"
                      :input-value="selected"
                      :color="authorsChip(item).color"
                      @click:close="parent.selectItem(item)"
                      v-on="on"
                    >
                      {{ authorsChip(item).text }}
                    </v-chip>
                  </template>
                  Email: {{ authorsChip(item).email }}
                </v-tooltip>
              </template>
            </v-combobox>
            <v-btn
              color="primary"
              :disabled="$v.form.$invalid"
              :loading="paper.submitting"
              @click="submitBasicInformation"
            >
              Continue
            </v-btn>
          </v-stepper-content>

          <v-stepper-step
            :complete="step > 2"
            step="2"
          >
            Upload Paper
            <small>Required</small>
          </v-stepper-step>

          <v-stepper-content step="2">
            <p class="caption">
              Please ensure that the your camera-ready paper follows the <a
                href="https://www.ieee.org/conferences/publishing/templates.html"
                target="_blank"
              >IEEE conference template</a> and uses <strong>letter size paper</strong>. IEEE<em>Xplore</em> will reject all papers not meeting the formatting requirement. Thank you very much!
            </p>
            <v-col
              cols="12"
              class="pa-0"
            >
              <file-pond
                ref="files"
                :allow-revert="false"
                :drop-on-page="true"
                :instant-upload="true"
                :server="server"
                :file-list="fileList"
                :accepted-file-types="['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf']"
                max-file-size="5MB"
                label-idle="Drag & Drop your paper or <span class=&quot;filepond--label-action&quot;> Browse </span><br><span class='caption'>Only accepts <span class='overline'>Word</span> and <span class='overline'>PDF</span> file</span>"
                file-validate-type-label-expected-types="Only accepts .doc, .docx and .pdf file"
                @updatefiles="uploadFile"
              />
            </v-col>
          </v-stepper-content>

          <v-stepper-step
            :complete="step >= 3"
            step="3"
          >
            Submission Result
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-alert
              text
              prominent
              type="success"
              border="left"
              transition="scale-transition"
            >
              You have successfully submitted your paper.
            </v-alert>

            <p class="body-1">
              Now you can go to <v-btn
                outlined
                small
                :to="{name: 'Dashboard'}"
              >
                <v-icon
                  left
                  small
                >
                  mdi-view-dashboard-variant
                </v-icon>
                dashboard
              </v-btn> and manage your submissions.
            </p>
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import vueFilePond from 'vue-filepond';
  import 'filepond/dist/filepond.min.css';

  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
  import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
  import api from "../../api/api";

  const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

  import {validationMixin} from 'vuelidate';
  import {required, maxLength, email} from 'vuelidate/lib/validators';
  import marshal from "../../utils/marshal";

  export default {
    name: "PaperAdd",
    components: {
      FilePond,
    },
    mixins: [validationMixin],
    validations: {
      form: {
        title: {
          required,
          maxLength: maxLength(500),
        },
        abstract: {
          required,
          maxLength: maxLength(4000),
        },
        keywords: {
          required,
        },
        authors: {
          required,
          $each: {
            email,
          },
          registered (value) {
            // standalone validator ideally should not assume a field is required
            if (value === '') return true;
            console.log(this.$v.form.authors.$model.length === 0, this.$v.form.authors.$each.$invalid);
            if (this.$v.form.authors.$model.length === 0 || this.$v.form.authors.$each.$invalid) return false;

            // simulate async call, fail for all logins with even length
            return new Promise(((resolve, reject) => {
              api.users.checkNames(value)
                .then(({data}) => {
                  const invalids = {reason: "SOME_INVALID", proof: []};
                  console.log(data, typeof data, value);
                  for (const [index, user] of data.entries()) {
                    if (user.userId === 0) invalids.proof.push({index, user: value[index]});
                  }
                  if (invalids.proof.length === 0) {
                    this.$set(this, "authorsError", null);
                    const success = {};
                    for (const [index, author] of value.entries()) {
                      success[author] = data[index];
                    }
                    this.$set(this, "authorsLastSuccess", success);
                    resolve(true);
                  } else {
                    this.$set(this, "authorsError", invalids);
                    this.$set(this, "authorsLastSuccess", null);
                    reject(invalids);
                  }
                })
              .catch((err) => {
                const reason = {reason: "SERVER_ERROR", proof: err};
                this.$set(this, "authorsError", reason);
                this.$set(this, "authorsLastSuccess", null);
                reject(reason);
              });
            }));
          },
        },
        category: {
          required,
        },
      },
    },
    data() {
      return {
        step: 1,
        paper: {
          submitting: false,
          id: null,
        },
        form: {
          title: "",
          abstract: "",
          authors: [],
          keywords: [],
          category: null,
        },
        authorsError: null,
        authorsLastSuccess: null,
        prefill: {
          categories: [],
          categoriesFetching: true,
          categoriesFailed: false,
        },
        server: {
          process: (fieldName, file, metadata, load, error, progress) => {
            api.papers.upload(
              this.paper.id,
              file,
              progressEvent => {
                if (progressEvent.total > 0) {
                  progress(progressEvent.lengthComputable, progressEvent.loaded, progressEvent.total);
                }
              }
            )
              .then(response => {
                load(response);
                console.debug('Uploaded successfully', response);
                setTimeout(() => {
                  this.step += 1;
                }, 1000);
              })
              .catch(failure => {
                console.debug('Failed to upload file', failure);
                error();
              });
          },
        },
        fileList: [],
      };
    },
    created() {
      this.getCategories();
    },
    methods: {
      errors (key) {
        const errors = [];
        const fieldsMap = {
          title: "Title",
          abstract: "Abstract",
          category: "Category",
          keywords: "Keywords",
          authors: "Authors",
        };
        const errorsMap = {
          required: (field) => `${field} is required`,
          minLength: (field, {min}) => `Length of ${field} is too short${min ? ': must be longer than ' + min : ' characters'}`,
          maxLength: (field, {max}) => `Length of ${field} is too long${max ? ': must be shorter than ' + max : ' characters'}`,
          registered: () => {
            if (!this.authorsError) return false;
            if (this.authorsError.reason === "SOME_INVALID") {
              const users = [];
              for (const user of this.authorsError.proof) {
                users.push(`'${user.user}'`);
              }
              return `Author ${users.join(", ")} ${users.length === 1 ? 'is' : 'are'} not${users.length === 1 ? ' a' : ''} valid registered ${users.length === 1 ? 'user' : 'users'}.`;
            } else if (this.authorsError.reason === "SERVER_ERROR") {
              return `Format: One of the E-mail provided is invalid`;
            } else {
              return "Unknown error";
            }
          },
          "$each": (field, params, all) => {
            console.log(all.$each);
            for (const [index, param] of Object.entries(all.$each)) {
              let i = parseInt(index);
              if (param.$invalid) {
                return `'${this.form.authors[i]}' is not a valid e-mail address.`;
              }
            }
          },
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

      submitBasicInformation () {
        if (this.$v.form.$touch() && this.$v.form.$invalid) return;
        const marshalled = marshal.paper(this.$v.form.$model);
        console.log(marshalled);

        this.paper.submitting = true;

        api.papers.submit(marshalled)
        .then(({data}) => {
          console.log(data);

          this.paper.id = data.paperId;
          console.log(this.paper);
          this.step += 1;
        })
        .catch((err) => {
          console.error(err);
          alert(err);
        })
        .finally(() => {
          this.paper.submitting = false;
        });
      },

      getCategories() {
        api.getCategories()
        .then(({data}) => {
          const categories = [];
          for (const category of data) {
            categories.push(
              {name: category[1], categoryId: parseInt(category[0])}
            );
          }
          this.prefill.categories = categories;
        })
        .catch((err) => {
          this.prefill.categoriesFailed = true;
          console.error(err);
        })
        .finally(() => {
          this.prefill.categoriesFetching = false;
        });
      },

      uploadFile(file) {
        console.log(file);
      },
      authorsChip (item) {
        let name;
        if (this.authorsLastSuccess && item in this.authorsLastSuccess) {
          const o = this.authorsLastSuccess[item];
          const title = o.title ? (o.title.includes('.') ? `${o.title} ` : `${o.title}. ` ) : '';
          name = `${title}${o.firstName}${o.middleName ? ` ${o.middleName}` : ' '} ${o.lastName}`;
        } else {
          name = item;
        }

        if (this.authorsError) {
          if (this.authorsError.reason === "SOME_INVALID") {
            if (this.authorsError.proof.find(el => el.user === item)) {
              return {
                color: "error",
                text: `${item} (invalid)`,
                email: item,
              };
            } else if (!this.$v.form.authors.$each.$invalid || !this.$v.form.authors.$pending) {
              return {
                color: "success",
                text: name,
                email: item,
              };
            }
          } else if (this.authorsError.reason === "SERVER_ERROR") {
            return {
              color: "warning",
              text: item,
              email: item,
            };
          }
        }

        return {
          color: "",
          text: name,
          email: item,
        };
      },
    },
  };
</script>

<style>
.paper_add__author_selection .v-input__append-inner {
  display: none;
}
</style>