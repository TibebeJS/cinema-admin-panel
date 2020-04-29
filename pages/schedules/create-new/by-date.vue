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
        <v-layout> </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped></style>

<script>
export default {
  data: () => ({
    picker: new Date().toISOString()
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
