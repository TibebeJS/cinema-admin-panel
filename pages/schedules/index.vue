<template>
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
            <span class="align-start"
              ><v-icon>mdi-filter</v-icon> Filters :
              <span class="secondary--text">{{
                picker.slice(0, 10)
              }}</span></span
            >
          </v-expansion-panel-header>
          <v-expansion-panel-content>
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
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

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
                @click:close="close"
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
</template>
<style scoped></style>
<script>
export default {
  data() {
    return {
      picker: new Date().toISOString(),
      schedules: [
        {
          id: 1,
          overview:
            "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine—'Bloodshot'. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there's more to the conspiracy than he thought.",
          poster_path: '/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg',
          release_date: '2020-03-13T00:00:00.000Z',
          title: 'Bloodshot',
          vote: 7.2,
          schedules: [
            {
              id: 29,
              date: '2020-04-20',
              time: '21:04:00',
              CinemaId: 2,
              MovieId: 1,
              MovieTypeId: 2,
              Cinema: {
                id: 2,
                description: 'Cinema 2 cinema',
                name: 'Cinema 2',
                rows: null,
                columns: null
              },
              MovieType: {
                id: 2,
                description: '',
                name: '3D',
                title: '3D Movies'
              }
            }
          ]
        },
        {
          id: 1,
          overview:
            "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine—'Bloodshot'. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there's more to the conspiracy than he thought.",
          poster_path: '/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg',
          release_date: '2020-03-13T00:00:00.000Z',
          title: 'Bloodshot',
          vote: 7.2,
          schedules: [
            {
              id: 29,
              date: '2020-04-20',
              time: '21:04:00',
              CinemaId: 2,
              MovieId: 1,
              MovieTypeId: 2,
              Cinema: {
                id: 2,
                description: 'Cinema 2 cinema',
                name: 'Cinema 2',
                rows: null,
                columns: null
              },
              MovieType: {
                id: 2,
                description: '',
                name: '3D',
                title: '3D Movies'
              }
            }
          ]
        },
        {
          id: 1,
          overview:
            "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine—'Bloodshot'. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there's more to the conspiracy than he thought.",
          poster_path: '/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg',
          release_date: '2020-03-13T00:00:00.000Z',
          title: 'Bloodshot',
          vote: 7.2,
          schedules: [
            {
              id: 29,
              date: '2020-04-20',
              time: '21:04:00',
              CinemaId: 2,
              MovieId: 1,
              MovieTypeId: 2,
              Cinema: {
                id: 2,
                description: 'Cinema 2 cinema',
                name: 'Cinema 2',
                rows: null,
                columns: null
              },
              MovieType: {
                id: 2,
                description: '',
                name: '3D',
                title: '3D Movies'
              }
            }
          ]
        },
        {
          id: 1,
          overview:
            "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine—'Bloodshot'. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there's more to the conspiracy than he thought.",
          poster_path: '/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg',
          release_date: '2020-03-13T00:00:00.000Z',
          title: 'Bloodshot',
          vote: 7.2,
          schedules: [
            {
              id: 29,
              date: '2020-04-20',
              time: '21:04:00',
              CinemaId: 2,
              MovieId: 1,
              MovieTypeId: 2,
              Cinema: {
                id: 2,
                description: 'Cinema 2 cinema',
                name: 'Cinema 2',
                rows: null,
                columns: null
              },
              MovieType: {
                id: 2,
                description: '',
                name: '3D',
                title: '3D Movies'
              }
            }
          ]
        }
      ]
    }
  }
}
</script>
