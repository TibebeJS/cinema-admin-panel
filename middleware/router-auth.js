export default function({ store, redirect, route }) {
  store.state.user != null && route.name == 'auth' ? redirect('/') : ''
  store.state.user === null && route.name !== 'auth' ? redirect('/auth') : ''
}
