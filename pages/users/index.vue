<template>
  <v-container>
    <v-layout column justify-center align-center>
      <v-card width="100%">
        <v-card-title class="headline">
          Admin Users
        </v-card-title>
        <v-card-subtitle>
          Manage administrator users authorized to access GAST admin panel
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
        >
        <span class="title">Users</span>
        <v-spacer></v-spacer>
        <v-btn
        >
          <v-icon class="pa-1">
            mdi-account-plus
          </v-icon>
            Create new user
        </v-btn>
        </v-card-title>
        <v-card-text class="py-0">


        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
    }),

    methods: {
    },
  }
</script>
