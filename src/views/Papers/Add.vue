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
        lg="8"
        xl="6"
      >
        <v-stepper
          v-model="step"
          vertical
        >
          <v-stepper-step
            :complete="step > 1"
            step="1"
          >
            Basic information
            <small>Required</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <h1 class="subtitle-1">
              Basic Information
            </h1>
            <p class="caption">
              Please fill the fields below with basic information of your paper, which we will be using as a way to categorize paper submissions.
            </p>
            <v-text-field
              v-model="form.title"

              :counter="500"
              prepend-icon="mdi-file-document"
              label="Title"
              outlined
            />
            <v-textarea
              v-model="form.abstract"

              :counter="4000"
              prepend-icon="mdi-file-document-box-outline"
              label="Abstract"
              outlined
            />
            <v-combobox
              :delimiters="[',']"
              outlined
              hide-no-data
              label="Category"
              :items="prefill.categories"

              prepend-icon="mdi-account"
            />
            <v-combobox
              class="paper_add__author_selection"
              multiple
              deletable-chips

              :delimiters="[',']"
              chips
              outlined
              small-chips
              hide-no-data
              label="Authors"

              prepend-icon="mdi-account"
            />
            <v-btn
              color="primary"
              @click="step = 2"
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
            <h1 class="subtitle-1">
              Upload Paper
            </h1>
            <p class="caption">
              Please ensure that the your camera-ready paper follows the <a
                href="https://www.ieee.org/conferences/publishing/templates.html"
                target="_blank"
              >IEEE conference template</a> and uses <strong>letter size paper</strong>. IEEE<em>Xplore</em> will reject all papers not meeting the formatting requirement. Thank you very much!
            </p>
            <v-input
              prepend-icon="mdi-upload"
            >
              <v-col
                cols="12"
                class="pa-0"
              >
                <file-pond
                  ref="files"
                  :allow-revert="false"
                  :drop-on-page="true"
                  :instant-upload="false"
                  :server="server"
                  :file-list="fileList"
                  :accepted-file-types="['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf']"
                  max-file-size="5MB"
                  label-idle="Drag & Drop your paper or <span class=&quot;filepond--label-action&quot;> Browse </span><br><span class='caption'>Only .doc, .docx or .pdf file</span>"
                  file-validate-type-label-expected-types="Only .doc, .docx and .pdf file"
                />
              </v-col>
            </v-input>
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
  import {required, maxLength} from 'vuelidate/lib/validators';

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
          maxLength: maxLength(200),
        },
        abstract: {
          required,
          maxLength: maxLength(200),
        },
        authors: {
          required,
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
          id: -1,
        },
        form: {
          title: "",
          abstract: "",
          authors: [],
          category: null,
        },
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
      getCategories() {
        api.getCategories()
        .then(({data}) => {
          this.prefill.categories = data;
        })
        .catch((err) => {
          this.prefill.categoriesFailed = true;
          console.error(err);
        })
        .finally(() => {
          this.prefill.categoriesFetching = true;
        });
      },
    },
  };
</script>

<style>
.paper_add__author_selection .v-input__append-inner {
  display: none;
}
</style>