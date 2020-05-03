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
          <v-layout> </v-layout>
        </v-card-text>
      </v-card>
    </v-layout>

    <v-card class="mx-auto mt-5" width="100%">
      <v-card-title>
        <span class="title">Users</span>
        <v-spacer></v-spacer>
        <v-btn text class="mb-2 mx-2" :loading="loading" @click="fetchUsers">
          <v-icon>
            mdi-reload
          </v-icon>
        </v-btn>
        <v-dialog v-model="signupDialog" max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">
              <v-icon class="pa-1">
                mdi-account-plus
              </v-icon>
              Create new user
            </v-btn>
          </template>
          <v-card class="pa-2">
            <v-card-title>
              <span class="headline">Create a new user</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <!-- emailVerified: false,
  password: 'secretPassword',
  disabled: false -->
                <v-alert type="error" v-if="signupError" width="100%">
                  <v-layout class="align-center">
                    <strong class="mr-2">ERROR:</strong>
                    {{ signupError.message }}
                    <v-spacer></v-spacer>
                    <v-btn @click="signUp">Retry</v-btn>
                  </v-layout>
                </v-alert>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="newUser.fullName"
                      label="Full Name"
                      placeholder="admin's first name + last name"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="newUser.emailAddress"
                      label="Email Address"
                      placeholder="type admin's email address here"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="ml-4">
                    <v-text-field
                      v-model="newUser.phoneNumber"
                      label="Phone Number"
                      placeholder="9XX - XXX - XXX"
                    >
                      <template slot="prepend">
                        +251
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <!-- <v-text-field
                      v-model="newUser.photoURL"
                      label="Photo URL"
                    ></v-text-field> -->
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancelSignup">Cancel</v-btn>
              <v-btn text @click="signUp">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-card-text class="py-0">
        <v-alert type="error" v-if="error" width="100%">
          <v-layout class="align-center">
            <strong class="mr-2">ERROR:</strong> {{ error.message }}
            <v-spacer></v-spacer>
            <v-btn @click="fetchUsers">Retry</v-btn>
          </v-layout>
        </v-alert>
        <v-data-table
          :headers="headers"
          :items="users"
          sort-by="calories"
          class="elevation-1"
          :loading="loading"
        >
          <template v-slot:item.emailVerified="{ item }">
            
            <v-chip
              v-if="item.emailVerified"
              class="pl-2"
              color="teal"
              text-color="white"
              small
            >
              <v-avatar left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-avatar>
              Verified
            </v-chip>
           
            <v-chip
              v-else
               class="pl-2"
              color="red"
              text-color="white"
              small
            >
              <v-avatar left>
                <v-icon>mdi-alert-circle</v-icon>
              </v-avatar>
              Unverified
            </v-chip>

          </template>
          <template v-slot:item.disabled="{ item }">
            <v-simple-checkbox
              v-model="item.disabled"
              disabled
            ></v-simple-checkbox>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-account-off
            </v-icon>
            <v-icon small @click="deleteUser(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            No Users Found
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    error: null,
    users: [],
    signupDialog: false,
    dialog: false,
    signupError: null,
    newUser: {},
    headers: [
      {
        text: 'UID',
        align: 'start',
        sortable: false,
        value: 'uid'
      },
      { text: 'Email Address', value: 'email' },
      { text: 'Email Verified', value: 'emailVerified' },
      { text: 'Disabled', value: 'disabled' },
      { text: 'Last Signed In', value: 'metadata.lastSignInTime' },
      { text: 'Created At', value: 'metadata.creationTime' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    async fetchUsers() {
      this.loading = true
      this.users = []
      this.error = null
      try {
        const result = await this.$axios.$get(
          `https://cinema.addis-dev.com/gast-cinema/api/users/all`
        )
        this.users = result
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },
    initialize() {
      this.desserts = []
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteUser(user) {
      if (confirm('Are you sure you want to delete this user?')) {
        await this.$axios
        .$delete(`http://localhost:3001/gast-cinema/api/users/${user.uid}`)
        await this.fetchUsers()
      }
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    cancelSignup() {
      this.newUser = {}
      this.signupDialog = false
    },

    signUp() {
      this.signupError = null
      this.$axios
        .$post(`http://localhost:3001/gast-cinema/api/users/create-user`, {
          ...this.newUser,
          phoneNumber: ['+251' + this.newUser.phoneNumber].join('')
        })
        .then(() => {
          this.newUser = {}
          this.signupDialog = false
          this.fetchUsers()
        })
        .catch(err => {
          this.signupError = err
        })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  },
  mounted() {
    this.fetchUsers()
  }
}
</script>
