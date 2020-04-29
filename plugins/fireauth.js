import { auth } from '@/services/fireinit.js'

export default context => {
  const { store, app: { $axios }} = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        $axios.setToken(user._lat, 'Bearer')
        return resolve(store.commit('setUser', user))
      }
      return resolve()
    })
  })
}
