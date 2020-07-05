<template>
  <v-container>
    <v-overlay v-if="$store.getters['network/isBusy']">
      <v-container class="fill-height">
        <v-progress-circular
          indeterminate
          :size="64"
          :width="4"
        />
      </v-container>
    </v-overlay>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
      >
        <v-text-field
          v-model="details.email"

          label="Email*"
          prepend-icon="mdi-email"

          autocomplete="email"
          required
          disabled
        />

        <v-text-field
          v-model="details.title"

          label="Title"
          prepend-icon="mdi-account-badge-horizontal"

          autocomplete="honorific-prefix"
          required
        />
        <v-text-field
          v-model="details.firstName"

          label="First Name*"
          prepend-icon="mdi-account-circle"

          autocomplete="given-name"
          required
        />
        <v-text-field
          v-model="details.middleName"

          label="Middle Name"
          prepend-icon="mdi-account-circle"

          autocomplete="additional-name"
        />
        <v-text-field
          v-model="details.lastName"

          label="Last Name*"
          prepend-icon="mdi-account-circle"

          autocomplete="family-name"
          required
        />

        <v-text-field
          v-model="details.customName"

          label="Name in your own language"
          prepend-icon="mdi-account-circle"

          autocomplete="name"
        />

        <v-textarea
          v-model="details.biography"

          label="Biography*"
          prepend-icon="mdi-account-box"
          placeholder="Short summary about yourself"
          counter="200"

          autocomplete="organization-title"
        />
        <v-text-field
          v-model="details.organization"

          label="Organization*"
          prepend-icon="mdi-domain"

          autocomplete="organization"
          required
        />

        <v-text-field
          id="addressInput"
          v-model="details.address"
          prepend-icon="mdi-map-marker"
          placeholder="Address"

          autocomplete="street-address"
        />
        <v-text-field
          v-model="details.phone"

          label="Phone"
          prepend-icon="mdi-phone"

          type="phone"
          autocomplete="tel"
        />

        <v-switch
          v-model="details.visa"

          label="I need a Support Letter for US Visa*"
        />

        <v-slide-y-transition>
          <v-text-field
            v-if="details.visa"

            v-model="details.passport"

            label="Passport Number*"
            prepend-icon="mdi-passport"
          />
        </v-slide-y-transition>

        <v-text-field
          v-model="password"

          label="Password*"
          prepend-icon="mdi-lock"

          autocomplete="new-password"
          required
        />

        <v-btn
          block
          color="primary"
          large
          @click="submit"
        >
          <v-icon left>
            mdi-send
          </v-icon>
          Submit
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {mapState} from "vuex";
import api from "../../api/api";
import snackbar from "../../utils/snackbar";

export default {
  name: "Profile",
  created () {
    this.update();
  },
  computed: {
    ...mapState("account", ["details"]),
  },
  data() {
    return {
      password: "",
    };
  },
  methods: {
    update () {
      return this.$store.dispatch("account/updateDetails");
    },
    submit () {
      api.users.updateProfile({
        ...this.details,
        password: this.password,
      })
        .then(() => {
          snackbar.success("Successfully updated profile");
        })
        .catch((err) => {
          snackbar.error("Failed to update profile: " + err.errorMessage);
        });
    },
  },
};
</script>
