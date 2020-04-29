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
        
        <v-sheet elevation="10" class="px-4 py-1">
          <v-chip-group
            multiple
            active-class="primary--text"
          >
            <v-chip v-for="filter in filters" :key="filter">
              {{ filter }}
            </v-chip>
          </v-chip-group>
        </v-sheet>
        <v-card-text class="py-0">
          <v-progress-linear v-if="loading" class="my-4" indeterminate color="secondary darken-2">
          </v-progress-linear>
          <v-container v-else>
            <v-alert type="error" v-if="error" width="100%">
              <v-layout class="align-center">
                <strong class="mr-2">ERROR:</strong> {{ error.message }}
                <v-spacer></v-spacer>
                <v-btn @click="fetchLogs"
                  >Retry</v-btn
                >
              </v-layout>
            </v-alert>
            <v-timeline dense v-else>
            <v-slide-x-reverse-transition
            group
            hide-on-leave
            >
            <v-timeline-item
                v-for="log in logs"
                :key="`${log.time}-${log.pid}`"
                :color="log.err ? 'error': 'info'"
                small
                fill-dot
            >
                <v-alert
                :value="true"
                :color="log.err ? 'error': 'info'"
                :icon="log.err ? 'mdi-information': 'mdi-alert-circle'"
                class="white--text"
                >
                  {{ log.msg }}
                </v-alert>
            </v-timeline-item>
            </v-slide-x-reverse-transition>
          </v-timeline>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

  export default {
    data: () => ({
      interval: null,
      loading: false,
      logs: [],
      error: null,
      nonce: 2,
      filters: [
        'Requests',
        'Response',
        'System Info',
        'Errors',
        'Console.log',
        'Transactions',
        'Admin Actions',
        'Suspicious'
      ],
    }),

    // beforeDestroy () {
    //   this.stop()
    // },

    methods: {
      async fetchLogs() {
        this.loading = true
        this.logs = []
        this.error = null
        try {
          const result = await this.$axios.$get(
            `https://cinema.addis-dev.com/gast-cinema/api/logs/all`,
          )
          this.logs = result
        } catch (e) {
          this.error = e
        } finally {
          this.loading = false
        }
      },
      // addEvent () {
      //   let { color, icon } = this.genAlert()

      //   const previousColor = this.items[0].color

      //   while (previousColor === color) {
      //     color = this.genColor()
      //   }

      //   this.items.unshift({
      //     id: this.nonce++,
      //     color,
      //     icon,
      //   })

      //   if (this.nonce > 6) {
      //     this.items.pop()
      //   }
      // },
      // genAlert () {
      //   const color = this.genColor()

      //   return {
      //     color,
      //     icon: this.genIcon(color),
      //   }
      // },
      // genColor () {
      //   return COLORS[Math.floor(Math.random() * 3)]
      // },
      // genIcon (color) {
      //   return ICONS[color]
      // },
      // start () {
      //   this.interval = setInterval(this.addEvent, 3000)
      // },
      // stop () {
      //   clearInterval(this.interval)
      //   this.interval = null
      // },
    },
    mounted() {
      this.fetchLogs();
    }
  }
</script>
