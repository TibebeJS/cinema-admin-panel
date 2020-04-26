<template>
  <v-container style="max-width: 800px;">
    <v-card>
      <v-card-title class="headline">
        ACCESS TO GAST CINEMA
      </v-card-title>
      <v-card-subtitle>
        Authentication is required to continue
      </v-card-subtitle>      
    </v-card>
    
     <v-tabs
      v-model="tab"
      grow
    >
      <v-tab
        v-for="item in ['sign in', 'register']"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>

    <v-card class="mt-4">
      
      <v-card-text>
        <v-form
      ref="form"
      v-model="signin.valid"
    >

      <v-alert type="error" v-if="signInError">
        {{ signInError }}
      </v-alert>

      <v-text-field
        v-model="signin.emailAddress"
        :rules="emailRules"
        label="E-mail Address"
        required
      ></v-text-field>

      
      <v-text-field
        v-model="signin.password"
        type="password"
        :rules="passwordRules"
        label="password"
        required
      ></v-text-field>

      <v-checkbox
        v-model="signin.rememberMe"
        label="Remember me"
        required
      ></v-checkbox>

      <v-btn
        :disabled="!signin.valid"
        @click="signIn"
        class="mr-4"
      >
        Sign in
      </v-btn>

      <v-btn
        color="warning"
      >
        Forgot password
      </v-btn>
    </v-form>
      </v-card-text>    
    </v-card>

      </v-tab-item>

      <v-tab-item>

    <v-card class="mt-4">

   Sign up   
    </v-card>

      </v-tab-item>


    </v-tabs-items>


  </v-container>
</template>
<style scoped>
</style>
<script>
export default {
  layout: 'auth',
  auth: false,
  data() {
    return {
      signin: {
        emailAddress: '',
        password: '',
        rememberMe: true,
        valid: false
      },
      signInError: null,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length > 8 || 'Password too short',
      ],
       tab: null,
        items: [
          { tab: 'One', content: 'Tab 1 Content' },
          { tab: 'Two', content: 'Tab 2 Content' },
        ]
    }
  },
  methods: {
    signIn() {
      this.signInError = null;
      this.$store.dispatch('signInWithEmailAndPassword', this.signin).then(() => {
        this.signin.emailAddress = ''
        this.signin.password = ''
      }).catch((e) => {
       this.signInError = e.message;
      })
    },
  }
  
}
</script>
