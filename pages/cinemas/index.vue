<template>
  <v-layout
    column
    justify-center
    align-center
  >

    <v-card width="100%">
      <v-card-title class="headline">
        Cinemas
        <v-spacer></v-spacer>
        <v-btn>New Venue</v-btn>
      </v-card-title>
      <v-card-subtitle>
          Manage GAST cinema Venues
      </v-card-subtitle>
      <v-card-text>
        
      <v-layout>
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
          v-for="cinema of cinemas"
          :key="cinema.id"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">venue</div>
              <v-list-item-title class="headline mb-1">{{ cinema.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ cinema.description }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            >
              <v-img :src="cinema.picture"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn text @click="routeTo(`/cinemas/manage/${cinema.id}`)">manage</v-btn>
            <v-btn text @click="routeTo(`/cinemas/schedules/${cinema.id}`)">schedules</v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-card-text>
  </v-card>
        
  </v-layout>
</template>

<script>
export default {
  components: {
  },
  data() {
      return {
          cinemas: [
              {"id":1,"description":"Cinema 1 cinema", "picture":"https://cinema.gastmall.net/views/images/cinema/2.jpg", "name":"Cinema 1","rows":null,"columns":null,"Schedules":[{"id":15,"date":"2020-04-19","time":"14:15:00","CinemaId":1,"MovieId":2,"MovieTypeId":1},{"id":34,"date":"2020-04-24","time":"17:58:00","CinemaId":1,"MovieId":4,"MovieTypeId":1}]},
              {"id":2,"description":"Cinema 2 cinema", "picture": "https://cinema.gastmall.net/views/images/cinema/2.jpg", "name":"Cinema 2","rows":null,"columns":null,"Schedules":[{"id":29,"date":"2020-04-20","time":"21:04:00","CinemaId":2,"MovieId":1,"MovieTypeId":2},{"id":16,"date":"2020-04-19","time":"14:17:00","CinemaId":2,"MovieId":2,"MovieTypeId":1},{"id":30,"date":"2020-04-25","time":"07:55:00","CinemaId":2,"MovieId":3,"MovieTypeId":1},{"id":26,"date":"2020-04-19","time":"16:09:00","CinemaId":2,"MovieId":4,"MovieTypeId":2}]},
              {"id":3,"description":"Gold 1 cinema", "picture": "https://cinema.gastmall.net/views/images/cinema/14.jpg", "name":"Gold 1","rows":null,"columns":null,"Schedules":[{"id":33,"date":"2020-04-22","time":"06:35:00","CinemaId":3,"MovieId":1,"MovieTypeId":2},{"id":14,"date":"2020-04-19","time":"14:08:00","CinemaId":3,"MovieId":2,"MovieTypeId":1}]},
              {"id":4,"description":"Gold 2 cinema", "picture": "https://cinema.gastmall.net/views/images/cinema/14.jpg", "name":"Gold 2","rows":null,"columns":null,"Schedules":[{"id":27,"date":"2020-04-21","time":"16:58:00","CinemaId":4,"MovieId":2,"MovieTypeId":2}]}
            ]
      }
  },
  methods: {
    routeTo(path) {
      this.$router.push(path)
    }
  }
}
</script>
