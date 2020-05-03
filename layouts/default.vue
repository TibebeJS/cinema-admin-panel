<template>
  <v-app dark>
    <v-navigation-drawer :mini-variant="drawer" clipped fixed app>
      <v-list>
        <template v-for="(menu, i) in menus">
          <template v-if="menu.submenus">
            <v-list-group :key="i" prepend-icon="mdi-lifebuoy" value="true">
              <template v-slot:activator>
                <v-list-item-title>{{ menu.title }}</v-list-item-title>
              </template>

              <template v-for="subMenu in menu.submenus">
                <v-list-group
                  v-if="subMenu.submenus"
                  no-action
                  sub-group
                  value="true"
                  :key="subMenu.key"
                >
                  <template v-slot:activator>
                    <v-list-item-icon class="mr-2">
                      <v-icon v-text="subMenu.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ subMenu.title }}</v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item
                    v-for="subSubMenu in subMenu.submenus"
                    :to="subSubMenu.to"
                    router
                    :key="subSubMenu.key"
                  >
                    <v-list-item-title
                      v-text="subSubMenu.title"
                    ></v-list-item-title>
                    <v-list-item-icon>
                      <v-icon v-text="subSubMenu.icon"></v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-group>
                <v-list-item
                  v-else-if="subMenu.to"
                  :key="subMenu.key"
                  :to="subMenu.to"
                  router
                >
                  <v-list-item-action>
                    <v-icon>{{ subMenu.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title v-text="subMenu.title" />
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-group>
          </template>
          <v-list-item v-else-if="menu.to" :key="menu.key" :to="menu.to" router>
            <v-list-item-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="menu.title" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <nuxt-link to="/" tag="v-text" style="cursor: pointer;">
          {{ title }}
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />

      <v-hover v-slot:default="{ hover }" height="100%">
        <span
          class="mx-2 px-2"
          style="cursor: pointer;"
          @click.stop="rightDrawer = !rightDrawer"
          :class="hover ? 'elevation-1' : ''"
        >
          <v-avatar color="accent">
            <img
              v-if="activeUser.photoURL"
              :src="activeUser.photoURL"
              width="55"
            />
            <img v-else src="~/assets/images/no-profile-pic.jpg" width="55" />
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
            <v-avatar color="accent">
              <img
                v-if="activeUser.photoURL"
                :src="activeUser.photoURL"
                width="55"
              />
              <img v-else src="~/assets/images/no-profile-pic.jpg" width="55" />
            </v-avatar>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-item-title class="pl-1">
              {{ activeUser.displayName || activeUser.email }}
            </v-list-item-title>
            <VListTileSubTitle>
              <v-btn
                color="primary"
                text
                @click="alert"
                x-small
                class="pa-0 px-1"
              >
                Profile
              </v-btn>
              <v-btn
                color="primary"
                text
                @click="signOut"
                x-small
                class="pa-0 px-1"
              >
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
      drawer: false,
      languageSelected: 'english',
      menus: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-calendar',
          title: 'Schedules',
          to: '/schedules',
          key: 'schedules'
        },
        {
          icon: 'mdi-film',
          title: 'Cinemas',
          to: '/cinemas',
          key: 'cinemas'
        },
        {
          icon: 'mdi-server-security',
          title: 'Server Logs',
          to: '/logs',
          key: 'logs'
        },
        {
          icon: 'mdi-shield-account',
          title: 'Admin Users',
          to: '/admin-users',
          key: 'admin-users'
        },
        {
          icon: 'mdi-lifebuoy',
          title: 'Supports',
          key: 'supports',
          submenus: [
            {
              icon: 'mdi-mail',
              title: 'Mail',
              key: 'supports-mail',
              submenus: [
                {
                  icon: 'mdi-inbox-arrow-down',
                  title: 'Inbox',
                  to: '/supports/mail/inbox',
                  key: 'supports-mail-inbox'
                },
                {
                  icon: 'mdi-cog',
                  title: 'Settings',
                  to: '/supports/mail/settings',
                  key: 'supports-mail-settings'
                }
              ]
            },
            {
              icon: 'mdi-telegram',
              title: 'Telegram',
              key: 'supports-telegram',
              submenus: [
                {
                  icon: 'mdi-inbox-arrow-down',
                  title: 'Inbox',
                  to: '/supports/telegram/inbox',
                  key: 'supports-telegram-inbox'
                },
                {
                  icon: 'mdi-cog',
                  title: 'Settings',
                  to: '/supports/telegram/settings',
                  key: 'supports-telegram-settings'
                }
              ]
            }
          ]
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
      this.$store
        .dispatch('signOut')
        .then(() => this.$router.replace({ name: 'auth' }))
    }
  },
  computed: {
    activeUser() {
      return this.$store.state.user || {}
    }
  }
}
</script>
