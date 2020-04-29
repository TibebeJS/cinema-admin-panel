<template>
  <v-container>
    <v-card width="100%">
      <v-card-title class="headline">
        Add schedules for date
        <v-spacer></v-spacer>
        <nuxt-link to="schedules/new" tag="v-btn">
          Schedule by movie
        </nuxt-link>
      </v-card-title>
      <v-card-subtitle>
        Create a new schedule for a movie
      </v-card-subtitle>
      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row class="align-start align-baseline">
                <v-icon>mdi-calendar</v-icon> Date :
                <span class="secondary--text">{{ picker.slice(0, 10) }}</span>

                <v-col
                  v-for="(selection, i) in selections"
                  :key="selection.text"
                  class="shrink"
                >
                  <v-chip
                    :disabled="loading"
                    close
                    @click:close="selected.splice(i, 1)"
                    small
                  >
                    {{ selection.text }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col>
                  <v-date-picker
                    v-model="picker"
                    landscape
                    type="month"
                    no-title
                    reactive
                  ></v-date-picker>
                  <v-date-picker
                    v-model="picker"
                    landscape
                    no-title
                    reactive
                  ></v-date-picker>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <v-card width="100%" class="mt-5">
      <v-card-text>
        <v-row>
          <v-col cols="8">
            <v-stepper v-model="newScheduleStepper" vertical>
              <v-stepper-step :complete="newScheduleStepper > 1" step="1">
                Select a movie
                <small>Choose the movie to be scheduled.</small>
              </v-stepper-step>

              <v-stepper-content step="1">
                <v-card
                  color="grey lighten-1"
                  class="mb-12"
                  height="200px"
                ></v-card>
                <v-btn color="primary" @click="newScheduleStepper = 2"
                  >Proceed</v-btn
                >
              </v-stepper-content>

              <v-stepper-step :complete="newScheduleStepper > 2" step="2">
                Select venue &amp; time
              </v-stepper-step>

              <v-stepper-content step="2">
                <v-card
                  color="grey lighten-1"
                  class="mb-12"
                  height="200px"
                ></v-card>
                <v-btn color="primary" @click="newScheduleStepper = 2"
                  >Add more</v-btn
                >
                <v-btn text>Done &amp; Publish</v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-col>
          <v-col cols="4">
            <v-card class="elevation-0" outlined>
              <v-card-title>
                Preview
              </v-card-title>
              <v-card-media>
                <v-img
                  class="white--text align-end"
                  height="200px"
                  src="https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg"
                >
                  <v-card-title>Movie Name</v-card-title>
                </v-img>
              </v-card-media>
              <v-card-text>
                ...
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider class="mx-5"></v-divider>
      <v-card-actions>
        <v-btn block text disabled>
          add more
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped></style>

<script>
export default {
  data: () => ({
    picker: new Date().toISOString(),
    newScheduleStepper: 1,
    newSchedule: {
      schedules: []
    }
  }),

  computed: {},

  watchQuery: ['date'],

  mounted() {
    this.picker = this.$route.query.date
  },

  watch: {
    picker: function(val) {
      this.$router.push(`?date=${val.slice(0, 10)}`)
    }
  },

  created() {},
  methods: {}
}
</script>
