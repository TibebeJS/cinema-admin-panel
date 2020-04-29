const { auth } = require('../services/fireinit.js')

export default function ({ $axios, redirect }) {
  $axios.onError(error => {
    if(error.response.status === 401) {
      $axios.setToken(auth.currentUser.getIdToken(), 'Bearer')
      redirect('#')
    }
  })
}