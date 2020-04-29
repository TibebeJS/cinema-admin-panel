<template>
  <v-container>
    <v-layout column justify-center align-center>
      <v-card width="100%">
        <v-card-title class="headline">
          Server Logs
        </v-card-title>
        <v-card-subtitle>
          List of server logs due to activity
        </v-card-subtitle>
        <v-card-text>
          <v-layout>

          </v-layout>
        </v-card-text>
      </v-card>
    </v-layout>

    <v-card
        class="mx-auto mt-5"
        width="100%"
    >
        <v-card-title
        class="blue-grey lighten-2 white--text"
        >
        <span class="title">Logs</span>
        <v-spacer></v-spacer>
        <v-btn
            :outlined="interval == null"
            :color="interval == null ? 'white' : 'primary'"
            dark
            depressed
            @click="interval == null ? start() : stop()"
        >
            Realtime Logging
        </v-btn>
        </v-card-title>
        <v-card-text class="py-0">
        <v-timeline dense>
            <v-slide-x-reverse-transition
            group
            hide-on-leave
            >
            <v-timeline-item
                v-for="item in items"
                :key="item.id"
                :color="item.color"
                small
                fill-dot
            >
                <v-alert
                :value="true"
                :color="item.color"
                :icon="item.icon"
                class="white--text"
                >
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                </v-alert>
            </v-timeline-item>
            </v-slide-x-reverse-transition>
        </v-timeline>
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
const COLORS = [
    'info',
    'warning',
    'error',
    'success',
  ]
  const ICONS = {
    info: 'mdi-information',
    warning: 'mdi-alert',
    error: 'mdi-alert-circle',
    success: 'mdi-check-circle',
  }

  export default {
    data: () => ({
      interval: null,
      items: [
        {
          id: 1,
          color: 'info',
          icon: ICONS['info'],
        },
        {
          id: 2,
          color: 'warning',
          icon: ICONS['warning'],
        },
        {
          id: 3,
          color: 'info',
          icon: ICONS['info'],
        },
        {
          id: 4,
          color: 'error',
          icon: ICONS['error'],
        },
      ],
      nonce: 2,
    }),

    beforeDestroy () {
      this.stop()
    },

    methods: {
      addEvent () {
        let { color, icon } = this.genAlert()

        const previousColor = this.items[0].color

        while (previousColor === color) {
          color = this.genColor()
        }

        this.items.unshift({
          id: this.nonce++,
          color,
          icon,
        })

        if (this.nonce > 6) {
          this.items.pop()
        }
      },
      genAlert () {
        const color = this.genColor()

        return {
          color,
          icon: this.genIcon(color),
        }
      },
      genColor () {
        return COLORS[Math.floor(Math.random() * 3)]
      },
      genIcon (color) {
        return ICONS[color]
      },
      start () {
        this.interval = setInterval(this.addEvent, 3000)
      },
      stop () {
        clearInterval(this.interval)
        this.interval = null
      },
    },
  }
</script>
