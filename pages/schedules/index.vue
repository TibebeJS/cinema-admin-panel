<template>
  <v-container>
    <v-card width="100%">
      <v-card-title class="headline">
        Schedules
        <v-spacer></v-spacer>
        <nuxt-link to="new" tag="v-btn">
          New Schedule
        </nuxt-link>
      </v-card-title>
      <v-card-subtitle>
        Mange cinema schedules
      </v-card-subtitle>
      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row class="align-start align-baseline">
                <v-icon>mdi-filter</v-icon> Filters :
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
                <v-col>
                  <v-list>
                    <span class="subtitle-1">
                      Movie Filters:
                    </span>
                    <template v-for="(item, i) in categories">
                      <v-list-item
                        :class="{ 'active-filter': selected.includes(i) }"
                        class="my-2"
                        :key="i"
                        :disabled="selected.includes(i)"
                        @click="selected.push(i)"
                      >
                        <v-list-item-title
                          v-text="item.text"
                        ></v-list-item-title>
                      </v-list-item>
                    </template>
                  </v-list>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <v-card width="100%" class="mt-5">
      <v-card-text>
        <v-layout>

<v-alert type="error" v-if="error" width="100%">
  <strong>ERROR:</strong> {{error.message}}
</v-alert>

          <v-card
            class="mx-auto my-12 px-2"
            max-width="374"
            v-for="schedule of schedules"
            :key="schedule"
          >
            <v-img
              height="250"
              :src="`http://image.tmdb.org/t/p/w185/${schedule.poster_path}`"
            ></v-img>

            <v-card-title>{{ schedule.title }}</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                Ratings:
                <div class="grey--text ml-1">{{ schedule.vote }}</div>
              </v-row>

              <div>{{ schedule.overview.slice(0, 100) }} ...</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Recorded Schedules</v-card-title>

            <v-card-text>
              <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip
                  class="ma-2"
                  close
                  text-color="white"
                  close-icon="mdi-delete"
                  v-for="movieSchedule in schedule.schedules"
                  :key="movieSchedule.id"
                >
                  <v-avatar left>
                    2D
                  </v-avatar>
                  {{ movieSchedule.Cinema.name }} |
                  {{ movieSchedule.time.slice(0, 5) }}
                </v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn text color="error lighten-2" outlined>
                remove all
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<style scoped>
.active-filter {
  border: 1px solid darkcyan;
}
</style>
<script>
export default {
  data() {
    return {
      picker: new Date().toISOString(),
      schedules: [
      ],
      items: [
        {
          text: '2D Movies'
        },
        {
          text: '3D Movies'
        }
      ],
      loading: false,
      search: '',
      selected: [],
      error: null
    }
  },
  computed: {
    allSelected() {
      return this.selected.length === this.items.length
    },
    categories() {
      const search = this.search.toLowerCase()

      if (!search) return this.items

      return this.items.filter(item => {
        const text = item.text.toLowerCase()

        return text.indexOf(search) > -1
      })
    },
    selections() {
      const selections = []

      for (const selection of this.selected) {
        selections.push(this.items[selection])
      }

      return selections
    }
  },
  methods: {
    async fetchSchedulesFor(date) {
      this.schedules = []
      try {
        const result = await this.$axios.$get(`https://cinema.addis-dev.com/gast-cinema/api/schedules/by-date/${date}`)
        this.schedules = result
        this.error = null
      } catch (e) {
        this.error = e
      }

    }
  },
  mounted() {
    this.fetchSchedulesFor(this.picker.slice(0, 10))
  },
  watch: {
    picker: function (newVal) {
      this.fetchSchedulesFor(newVal.slice(0, 10))
    }
  }
}
</script>
