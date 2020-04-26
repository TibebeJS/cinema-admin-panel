<template>
  <v-container>
    <v-card width="100%">
      <v-card-title class="headline">
        Schedules
        <v-spacer></v-spacer>
        <v-btn>New Schedule</v-btn>
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
        {
          "id": 2,
          "overview": "A hardened CIA operative finds himself at the mercy of a precocious 9-year-old girl, having been sent undercover to surveil her family.",
          "poster_path": "/n2C6jRK9PtPIs99RQhKtqGlsnsO.jpg",
          "release_date": "2020-04-17T00:00:00.000Z",
          "title": "My Spy",
          "vote": 7.2,
          "schedules": [
            {
              "id": 14,
              "date": "2020-04-19",
              "time": "14:08:00",
              "CinemaId": 3,
              "MovieId": 2,
              "MovieTypeId": 1,
              "Cinema": {
                "id": 3,
                "description": "Gold 1 cinema",
                "name": "Gold 1",
                "rows": null,
                "columns": null
              },
              "MovieType": {
                "id": 1,
                "description": "",
                "name": "2D",
                "title": "2D Movies"
              }
            },
            {
              "id": 15,
              "date": "2020-04-19",
              "time": "14:15:00",
              "CinemaId": 1,
              "MovieId": 2,
              "MovieTypeId": 1,
              "Cinema": {
                "id": 1,
                "description": "Cinema 1 cinema",
                "name": "Cinema 1",
                "rows": null,
                "columns": null
              },
              "MovieType": {
                "id": 1,
                "description": "",
                "name": "2D",
                "title": "2D Movies"
              }
            },
            {
              "id": 16,
              "date": "2020-04-19",
              "time": "14:17:00",
              "CinemaId": 2,
              "MovieId": 2,
              "MovieTypeId": 1,
              "Cinema": {
                "id": 2,
                "description": "Cinema 2 cinema",
                "name": "Cinema 2",
                "rows": null,
                "columns": null
              },
              "MovieType": {
                "id": 1,
                "description": "",
                "name": "2D",
                "title": "2D Movies"
              }
            },
          ]
        },
        {
          "id": 4,
          "overview": "A sweeping drama set in the chaotic aftermath of the US invasion of Iraq, where the life of top UN diplomat Sergio Vieira de Mello hangs in the balance during the most treacherous mission of his career.",
          "poster_path": "/jgLlp0jF1EDG8N1rAulAUlv9pL6.jpg",
          "release_date": "2020-04-17T00:00:00.000Z",
          "title": "Sergio",
          "vote": 7.3,
          "schedules": [
            {
              "id": 26,
              "date": "2020-04-19",
              "time": "16:09:00",
              "CinemaId": 2,
              "MovieId": 4,
              "MovieTypeId": 2,
              "Cinema": {
                "id": 2,
                "description": "Cinema 2 cinema",
                "name": "Cinema 2",
                "rows": null,
                "columns": null
              },
              "MovieType": {
                "id": 2,
                "description": "",
                "name": "3D",
                "title": "3D Movies"
              }
            }
          ]
        },
        {
          "id": 1,
          "overview": "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine—'Bloodshot'. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there's more to the conspiracy than he thought.",
          "poster_path": "/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
          "release_date": "2020-03-13T00:00:00.000Z",
          "title": "Bloodshot",
          "vote": 7.2,
          "schedules": [
            {
              "id": 29,
              "date": "2020-04-20",
              "time": "21:04:00",
              "CinemaId": 2,
              "MovieId": 1,
              "MovieTypeId": 2,
              "Cinema": {
                "id": 2,
                "description": "Cinema 2 cinema",
                "name": "Cinema 2",
                "rows": null,
                "columns": null
              },
              "MovieType": {
                "id": 2,
                "description": "",
                "name": "3D",
                "title": "3D Movies"
              }
            }
          ]
        },        
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
      selected: []
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
  }
}
</script>
