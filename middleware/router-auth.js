export default function({ store, redirect, route }) {
  // store.state.user != null && route.path == '/auth' ? redirect('/') : ''
  // store.state.user === null ?  redirect('/auth') : ''
  redirect('/auth')
}
