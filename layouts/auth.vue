<template>
  <v-app dark>
    <v-app-bar clipped-left fixed app>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-fab-transition>
      <v-btn fixed fab large dark bottom right @click="toggleDarkMode">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} GAST Entertainemnt Mall</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'Gast Cinema Admin Panel'
    }
  },
  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>
