<template>
  <v-layout column justify-center align-center class="mt-5">
    <v-flex xs12 sm8 md6 class="mt-5">
      <v-card min-width="900" class="pa-1">
        <v-card-title class="headline">
          Quick start
        </v-card-title>
        <v-card-text>
          <p>
            Use the following buttons to get accesss to the mostly used
            resources
          </p>

          <v-container>
            <v-row>
              <v-col>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="d-flex align-center"
                      height="200"
                      width="100%"
                      v-on="on"
                      nuxt
                      to="/schedules"
                    >
                      <v-icon color="primary" size="150">mdi-calendar</v-icon>
                    </v-btn>
                  </template>
                  <span>Manage Schedules</span>
                </v-tooltip>
              </v-col>
              <v-col>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="d-flex align-center"
                      height="200"
                      width="100%"
                      v-on="on"
                      nuxt
                      to="/cinemas"
                    >
                      <v-icon color="primary" size="150">mdi-film</v-icon>
                    </v-btn>
                  </template>
                  <span>Manage Cinemas</span>
                </v-tooltip>
              </v-col>
              <v-col>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="d-flex align-center"
                      height="200"
                      width="100%"
                      v-on="on"
                      nuxt
                      to="/tickets"
                      disabled
                    >
                      <v-icon color="primary" size="150">mdi-ticket</v-icon>
                    </v-btn>
                  </template>
                  <span>Manage Tickets</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" class="ma-2" disabled>
            <v-icon class="pa-1">mdi-pencil</v-icon>
            Customize
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {}
}
</script>
