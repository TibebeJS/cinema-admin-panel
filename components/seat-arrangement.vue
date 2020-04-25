<template>
<div class="venue">
    <ul class="squares" v-for="row of Object.keys(Array(rows).fill(undefined))">
		<li :class="resolveSeatType(row, col)" v-for="col of Object.keys(Array(columns).fill(undefined))">
		</li>
    </ul>
  </div>
</template>

<style>


:root {
  --square-size: 15px;
  --square-gap: 5px;
  --week-width: calc(var(--square-size) + var(--square-gap));
  --seat-color: lightcyan;
  --non-seat-color: transparent;
  --taken-seat-color: cyan;
  --seat-hover-color: darkcyan;
}

.months { grid-area: months; }
.days { grid-area: days; }
.squares { grid-area: squares; }

.venue {
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  width: 100%;
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

.seat:hover, .seat-taken:hover {
	background-color: var(--seat-hover-color) !important;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
  background-color: var(--seat-color) !important;
}

.non-seat {
  background-color: var(--non-seat-color) !important;
}

.non-seat:hover {
	background-color: transparent !important;
}

.seat-taken {
  background-color: var(--taken-seat-color) !important;
}

</style>

<script>
export default {
	data() {
		return {
			rows: 10,
			columns: 75,
			nonSeats: Array(30).fill(undefined).map((_, i) => {
				return {
					column: 20 + i,
					row: 0
				}
			})
		}
	},

	methods: {
		resolveSeatType(row, col) {
			if (this.nonSeats.filter(nonSeat => nonSeat.column == col && nonSeat.row == row).length) {
				return 'non-seat';
			} else {
				return 'seat';
			}
		}
	}

}
</script>
