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


             <v-container>
      <v-layout row wrap class="py-2 mb-2">
        <h1 class="title">
          <VBtn text icon color="primary" @click="() => $router.go(-1)">
            <VIcon dark>mdi-arrow-left</VIcon>
          </VBtn>
          Add a new Schedule</h1
        >
      </v-layout>

      <v-stepper v-model="page">
        <v-stepper-header>
          <v-stepper-step :complete="page > 1" step="1"
            >Movie Selection</v-stepper-step
          >

          <v-divider></v-divider>

          <v-stepper-step :complete="page > 2" step="2"
            >Create schedules</v-stepper-step
          >
        </v-stepper-header>

        <v-stepper-items class="mt-1">
          <v-stepper-content step="1">
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-tabs vertical>
                <v-tab>
                  <v-icon left>mdi-movie</v-icon>
                  Hollywood Movies
                </v-tab>
                <v-tab class="mr-3">
                  <v-icon left>mdi-translate</v-icon>
                  Ethiopian Movies
                </v-tab>

                <v-tab-item>
                  <v-layout justify="space-between">
                    <v-container grid-list-xs>
                      <v-card class="elevation-0">
                        <v-card-title primary-title class="font-weight-light">
                          Type the movie name below to search:
                        </v-card-title>
                        <v-card-text>
                          <v-layout row wrap>
                            <v-autocomplete
                              v-model="movieSelected"
                              :items="movies"
                              :loading="isLoading"
                              :search-input.sync="search"
                              color="white"
                              hide-no-data
                              hide-selected
                              item-text="title"
                              item-value="API"
                              placeholder="Search for movies ..."
                              return-object
                              outlined
                            >
                            
                              <template v-slot:item="data">
                                <v-list-item-avatar>
                                  <img
                                    :src="
                                      [
                                        'http://image.tmdb.org/t/p/w500',
                                        data.item.poster_path,
                                      ].join('/')
                                    "
                                  />
                                </v-list-item-avatar>
                                <v-list-item-content>
                                  <v-list-item-title
                                    v-text="data.item.title"
                                  ></v-list-item-title>
                                </v-list-item-content>
                              </template>
                            </v-autocomplete>
                            <v-spacer></v-spacer>
                          </v-layout>
                        </v-card-text>
                      </v-card>
                      <v-card
                        class="elevation-0"
                        v-if="nowShowingMovies && nowShowingMovies.length"
                      >
                        <v-card-title primary-title class="font-weight-light">
                          Or choose from latest Movies showing on Cinemas:
                        </v-card-title>
                        <v-card-text>
                          <v-item-group v-model="movieSelected">
                            <v-row>
                              <v-col
                                v-for="movie in nowShowingMovies"
                                :key="movie.id"
                                cols="12"
                                md="4"
                              >
                                <v-item
                                  v-slot="{ active, toggle }"
                                  :value="movie"
                                >
                                  <v-card
                                    :color="active ? 'primary' : ''"
                                    class="d-flex align-center"
                                    dark
                                    height="150"
                                    @click="toggle"
                                  >
                                    <v-img
                                      :src="
                                        [
                                          'http://image.tmdb.org/t/p/w500',
                                          movie.poster_path,
                                        ].join('/')
                                      "
                                      height="150"
                                    >
                                      <v-scroll-y-transition>
                                        <div
                                          v-if="active"
                                          class="headline flex-grow-1 text-center primary darken-2 pa-3"
                                        >
                                          <v-icon primary>mdi-check</v-icon>
                                          Selected
                                        </div>
                                      </v-scroll-y-transition>
                                    </v-img>
                                  </v-card>
                                </v-item>
                              </v-col>
                            </v-row>
                          </v-item-group>
                        </v-card-text>
                      </v-card>
                    </v-container>
                    <v-card class="mb-3 ma-1 elevation-0" width="600px">
                      <v-card-title primary-title class="font-weight-light">
                        <span><b>Movie Details: </b></span>
                      </v-card-title>
                      <v-card-text v-if="movieSelected">
                        <v-img
                          :src="
                            [
                              'http://image.tmdb.org/t/p/w500',
                              movieSelected.poster_path,
                            ].join('/')
                          "
                        >
                          <v-overlay
                            color="black"
                            :absolute="true"
                            :value="true"
                            opacity="0.6"
                            class="align-start"
                          >
                            <v-card-title class="white--text">
                              {{ movieSelected.title }} -
                              {{ getYearFrom(movieSelected.release_date) }}
                              <VSpacer />
                              {{ movieSelected.vote }}
                            </v-card-title>
                            <v-card-text class="white--text">
                              {{ movieSelected.overview }}
                            </v-card-text>
                            <template v-slot:placeholder>
                              <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                              >
                                <v-progress-circular
                                  indeterminate
                                  color="grey lighten-5"
                                ></v-progress-circular>
                              </v-row>
                            </template>
                          </v-overlay>
                        </v-img>
                      </v-card-text>
                      <v-card-text v-else>
                        The movie detail will be shown here as soon as you
                        select it
                      </v-card-text>
                    </v-card>
                  </v-layout>
                </v-tab-item>

                <v-tab-item>
                  <v-container grid-list-xs>
                    <v-layout row wrap class="headline">
                      coming soon
                    </v-layout>
                  </v-container>
                </v-tab-item>
              </v-tabs>

           
              <v-divider class="ma-2"></v-divider>

              <v-layout row wrap class="ma-1">
                <v-spacer></v-spacer>
                <v-btn
                  outlined
                  text
                  class="mx-1 pa-1"
                  @click="page = 2"
                  :disabled="!movieSelected"
                  >Next</v-btn
                >
                <v-btn text class="mx-1" @click="() => $router.go(-1)"
                  >Cancel</v-btn
                >
              </v-layout>
            </v-form>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-layout justify="space-between">
              <v-container grid-list-xs>
                <CreateSchedule
                  v-if="movieSelected"
                  :movie-selected="movieSelected"
                />
              </v-container>
              <v-card class="mb-3 ma-1 elevation-0" width="600px">
               
                <v-card-text v-if="movieSelected">
                  <v-img
                    :src="
                      [
                        'http://image.tmdb.org/t/p/w500',
                        movieSelected.poster_path,
                      ].join('/')
                    "
                  >
                    <v-overlay
                      color="black"
                      :absolute="true"
                      :value="true"
                      opacity="0.6"
                      class="align-start"
                    >
                      <v-card-title class="white--text">
                        {{ movieSelected.title }} -
                        {{ getYearFrom(movieSelected.release_date) }}
                        <VSpacer />
                        {{ movieSelected.vote }}
                      </v-card-title>
                      <v-card-text class="white--text">
                        {{ movieSelected.overview }}
                      </v-card-text>
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-overlay>
                  </v-img>
                </v-card-text>
                <v-card-text v-else>
                  The movie detail will be shown here as soon as you select it
                </v-card-text>
              </v-card>
            </v-layout>
          

            <v-divider class="ma-2"></v-divider>

            <v-layout row wrap class="ma-1">
              <v-spacer></v-spacer>
            

              <v-btn color="primary" class="mx-1 pa-1" @click="page = 2"
                >Finish up</v-btn
              >

              <v-btn text class="mx-1" @click="() => $router.go(-1)"
                >Cancel</v-btn
              >
            </v-layout>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>

        </v-layout>
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

              <div>{{ schedule.overview }} ...</div>
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
  

  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    nowShowingMovies: [],
    movies: [],

    movieSelected: null,
    latestMovieSelected: null,
    transparent: 'rgba(255, 255, 255, 0)',

    page: 1,
  }),

  computed: {
    fields() {
      if (!this.model) return []

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || 'n/a',
        }
      })
    },

    movieIsSelected() {
      return this.movieSelected !== null || this.latestMovieSelected !== null
    },
  },

  watch: {
    search(val) {
      // Items have already been loaded
      // if (this.movies.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      fetch(`${process.env.CINEMA_API}/movies/suggestions?q=${val}`)
        .then((res) => res.json())
        .then((res) => {
          // const { count, entries } = res
          // this.count = 2
          this.movies = res
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
  },
  created() {
    this.fetchNowShowingMovies()
      .then((movies) => {
        this.nowShowingMovies = movies
      })
      .catch((e) => {
        console.error(e)
      })
    this.fetchCinemas()
      .then(function(cinemas) {
        console.log('#@$#@$')
        console.log(cinemas)
        this.cinemas = cinemas
      })
      .catch(function(e) {
        console.error(e)
      })
  },
  methods: {
    async fetchNowShowingMovies() {
      const res = await fetch(`${process.env.CINEMA_API}/movies/now-showing`)
      return res.json()
    },

    clearMovieSelection() {
      this.movieSelected = null
      this.latestMovieSelected = null
    },

    getYearFrom(releaseDate) {
      return new Date(releaseDate).getFullYear()
    },
  },

}
</script>
