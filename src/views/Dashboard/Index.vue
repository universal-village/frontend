<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="6"
        xl="4"
      >
        <h1 class="display-1 pa-3">
          Welcome!
        </h1>
        <h2 class="title px-3 mb-4">
          Signed in as {{ details.firstName }} {{ details.middleName }} {{ details.lastName }}
        </h2>
      </v-col>

      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="6"
        xl="4"
      >
        <template
          v-if="rolesText.length > 0"
        >
          <h2 class="title px-3 mb-4">
            You are...
            <!--            Your {{ rolesText.length > 1 ? "roles" : "role" }}:-->
          </h2>
          <ul
            v-for="role in rolesText"
            :key="role"
          >
            <li>{{ role }}</li>
          </ul>
        </template>
      </v-col>
    </v-row>
    <v-divider class="my-4" />
    <v-row class="px-6">
      <h2 class="title">
        Now you can...
      </h2>
    </v-row>
    <v-row
      class="px-4"
    >
      <v-col
        v-for="(child, i) in routes"
        :key="`${i}`"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
      >
        <v-card
          hover
          :to="{name: child.route}"
        >
          <v-sheet
            class="d-flex align-center justify-center"
            color="grey lighten-3"
            height="128"
            tile
          >
            <v-icon size="48">
              {{ child.icon }}
            </v-icon>
            <v-chip
              color="secondary"
              style="position: absolute; top: 112px; right: .5em;"
              elevation="3"
            >
              <v-icon left>
                mdi-account-circle
              </v-icon>
              as {{ child.as.startsWith("A") ? "an" : "a" }} {{ child.as }}
            </v-chip>
            <!--            <span class="headline grey&#45;&#45;text text&#45;&#45;darken-3 ml-4 font-weight-black">-->
            <!--              x5-->
            <!--            </span>-->
          </v-sheet>
          <v-card-title>
            {{ child.title }}
          </v-card-title>
          <v-card-subtitle>
            {{ child.subtitle }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

  import {mapGetters} from "vuex";

  export default {
    name: "DashboardIndex",
    computed: {
      ...mapGetters('account', ['details', 'roles']),

      routes () {
        let routes = [];

        // if (this.roles.includes("CategoryChair")) {
        //   routes.push({
        //     "route": "ChairAssignReviewer",
        //     "title": "Assign Reviewer",
        //     "subtitle": "Assign reviewer to papers",
        //     "icon": "mdi-file-account",
        //     "as": "Category Chair",
        //   });
        // }
        //
        // if (this.roles.includes("Reviewer")) {
        //   routes.push({
        //     "route": "ReviewerReview",
        //     "title": "Assigned Papers",
        //     "subtitle": "Review papers assigned to you",
        //     "icon": "mdi-file-document-edit",
        //     "as": "Reviewer",
        //   });
        // }

        routes.push({
          "route": "AuthorSubmit",
          "title": "Submit Paper",
          "subtitle": "Submit a new paper to the conference",
          "icon": "mdi-file-document-box-plus",
          "as": "Author",
        },
        {
          "route": "AuthorSubmissions",
          "title": "My Submissions",
          "subtitle": "View the statuses of previous paper submissions",
          "icon": "mdi-file-document-box-multiple",
          "as": "Author",
        });

        return routes;
      },
      rolesText () {
        let roles = [];
        if (this.details) {
          if (this.roles.includes("CategoryChair")) {
            // roles.push(`The Category Chair of "${this.details.categoryChair.category.name}"`);
            roles.push("A Category Chair");
          }
          if (this.roles.includes("Reviewer")) {
            // roles.push(`The paper Reviewer of "${this.details.reviewer.category.name}"`);
            roles.push("A paper Reviewer");
          }
          if (this.roles.includes("Attendee")) {
            let tags = [];
            tags.push("A registered conference attendee as a");
            (this.details.attendee.isStudent === "YES") && tags.push("student");
            (this.details.attendee.isStudent === "YES" && this.details.attendee.isSenior === "YES") && tags.push("and");
            (this.details.attendee.isSenior === "YES") && tags.push("senior");
            roles.push(tags.length === 1 ? "A registered conference attendee" : tags.join(" "));
          }
        }
        return roles;
      },
    },
  };
</script>

<style scoped>

</style>