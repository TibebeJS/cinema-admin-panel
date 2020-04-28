<template>
  <v-container>
    <v-card width="100%">
      <v-card-title class="headline">
        Seat Arrangement
        <v-spacer></v-spacer>
        <v-btn>Edit Arrangement</v-btn>
      </v-card-title>
      <v-card-subtitle>
        Manage how seats are arranged inside this venue
      </v-card-subtitle>
      <v-card-text>
        <seat-arrangement></seat-arrangement>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<style scoped></style>
<script>
import seatArrangement from '~/components/seat-arrangement.vue'

export default {
  components: {
    seatArrangement
  }
}
</script>
