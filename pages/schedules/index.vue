<template>
  <v-card width="100%">
    <v-card-title class="headline">
      Schedules - {{ picker.slice(0, 10) }}
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
          <span class="align-start"><v-icon>mdi-filter</v-icon> Filters</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>

          <v-date-picker v-model="picker" landscape type="month" no-title reactive></v-date-picker>
          <v-date-picker v-model="picker" landscape no-title reactive></v-date-picker>
        

        </v-expansion-panel-content>
      </v-expansion-panel>
</v-expansion-panels>
  
  <v-layout>

  <v-card
    class="mx-auto my-12 px-2"
    max-width="374"
    v-for="schedule of [1,1,1,1,1]"
    :key="schedule"
  >
    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>

</v-layout>




</v-card-text>

        </v-card>
    </v-row>

    </v-card-text>
  </v-card>
</template>
<style scoped>

</style>
<script>
export default {
  data() {
    return {
      picker: new Date().toISOString()
    }
  }

}
</script>
