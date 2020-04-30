const { auth } = require('../services/fireinit.js')

export default function({ $axios, redirect, $store }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      return new Promise((resolve, reject) => {
        $axios.setToken(auth.currentUser.getIdToken(), 'Bearer')
        $axios(error.config)
          .then(data => {
            resolve(data)
          })
          .reject(err => {
            $store.dispatch('signOut').then(() => redirect({ name: 'auth' }))
          })
      })
    }
  })
}
