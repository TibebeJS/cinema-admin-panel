<template>
  <v-app dark>
    <v-navigation-drawer :mini-variant="drawer" clipped fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <nuxt-link to='/' tag="v-text" style="cursor: pointer;">
          {{ title }}
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />

<v-hover
 v-slot:default="{ hover }"
 height="100%"
>
  <span class="mx-2 px-2"
   @click.stop="rightDrawer = !rightDrawer"  :class="hover ? 'elevation-1' : ''">
    <v-avatar
              color="accent"
            >
            <img
              src="~/assets/images/no-profile-pic.jpg"
              width="55"
            />
            </v-avatar>        
        <v-icon class="px-2">mdi-chevron-down</v-icon>
  </span>
</v-hover>

    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      right
      temporary
      fixed
      class="d-flex"
    >
      <v-list>
        <v-list-item @click.native="right = !right" class="pb-3">
          <v-list-tile-avatar class="pr-2">
            <v-avatar
              color="accent"
            >
            <img
              src="~/assets/images/no-profile-pic.jpg"
              width="55"
            />
            </v-avatar>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-item-title class="pl-1">
              [No NAME]
            </v-list-item-title>
            <VListTileSubTitle>
              <v-btn color="primary" text @click="alert" x-small class="pa-0 px-1">
                Profile
              </v-btn>
              <v-btn color="primary" text @click="signOut" x-small class="pa-0 px-1">
                Sign out
              </v-btn>
            </VListTileSubTitle>
          </v-list-tile-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-btn-toggle v-model="languageSelected" tile color="accent-3" group>
            <v-btn value="english">
              English
            </v-btn>

            <v-btn value="amharic">
              አማርኛ
            </v-btn>
          </v-btn-toggle>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-fab-transition>
      <v-btn
      fixed
        fab
        large
        dark
        bottom
        right
        @click="toggleDarkMode"
      >
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
      drawer: false,
      languageSelected: 'english',
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-calendar',
          title: 'Schedules',
          to: '/schedules'
        },
        {
          icon: 'mdi-film',
          title: 'Cinemas',
          to: '/cinemas'
        }
      ],
      rightDrawer: false,
      title: 'Gast Cinema Admin Panel'
    }
  },
  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    signOut() {
      this.$store.dispatch('signOut').then(() => this.$router.replace({ name: 'auth' }));
    }
  }
}
</script>
