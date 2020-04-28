<template>
  <div class="venue" style="max-width: 1000px;">
    <ul
      class="squares"
      v-for="row of Object.keys(Array(rows).fill(undefined))"
      :key="row"
    >
      <span>
        <v-icon style="font-size: 36px; color:gray;" class="pa-0 mr-3"
          >mdi-format-align-justify</v-icon
        >
      </span>
      <v-menu
        v-for="col of Object.keys(Array(columns).fill(undefined))"
        :key="`${row}:${col}`"
      >
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" class="seat-icon" :class="resolveSeatType(row, col)">mdi-seat</v-icon>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title
              >{{ col }} x {{ row }} ({{
                Number(row) * columns + Number(col)
              }}'th seat)</v-list-item-title
            >
          </v-list-item>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </ul>
  </div>
</template>

<style>
:root {
  --square-size: 4%;
  --square-gap: 1%;
  --week-width: calc(var(--square-size) + var(--square-gap));
  --seat-color: darkorange;
  --non-seat-color: transparent;
  --taken-seat-color: cyan;
  --seat-hover-color: darkcyan;
}

.seat-icon {
  /* color: darkorange !important; */
  font-size: 250% !important;
}
.months {
  grid-area: months;
}
.days {
  grid-area: days;
}
.squares {
  grid-area: squares;
}

.venue {
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  transform: perspective(1400px) rotateX(20deg);
  box-sizing: border-box;
  padding: 50px;
  /* background-color: #AAA; */
}

.days,
.squares {
  display: grid;
  grid-gap: var(--square-gap);
  /* grid-template-rows: repeat(4, var(--square-size)); */
}

.squares {
  grid-auto-flow: column;
  grid-auto-columns: var(--square-size);
  margin: calc(var(--square-gap)) 0;
}

.squares > li {
  list-style-type: none;
  height: var(--square-size);
  width: var(--square-size);
}

.seat:hover,
.seat-taken:hover {
  background-color: var(--seat-hover-color) !important;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 12px;
}

.venue {
  padding: 20px;
  border: 1px #e1e4e8 solid;
  margin: 20px;
}

.days li:nth-child(odd) {
  visibility: hidden;
}

.seat {
  background-color: var(--seat-color);
}

.non-seat {
  background-color: var(--non-seat-color) !important;
  content: '' !important; 
}

.non-seat:hover {
  background-color: transparent;
}

.seat-taken {
  background-color: var(--taken-seat-color);
}
</style>

<script>
export default {
  data() {
    return {
      rows: 11,
      columns: 18,
      nonSeats: [
        ...Array(6)
          .fill(undefined)
          .map((_, i) => {
            return {
              column: 6 + i,
              row: 10
            }
          }),
      ],
      items: [{ title: 'Mark Unavailable' }, { title: 'Change Type' }]
    }
  },

  methods: {
    resolveSeatType(row, col) {
      if (
        this.nonSeats.filter(
          nonSeat => nonSeat.column == col && nonSeat.row == row
        ).length
      ) {
        return 'non-seat'
      } else {
        return 'seat'
      }
    }
  }
}
</script>
