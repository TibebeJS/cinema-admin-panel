// export default function({ store, redirect, route }) {
//   // store.state.user != null && route.path == '/auth' ? redirect('/') : ''
//   // store.state.user === null ?  redirect('/auth') : ''
//   redirect('/auth')
// }

export default function ({ store, redirect, route }) {
  console.log(route);
  // if (route.name !== 'auth')
  //   return redirect('/auth');
  store.state.user != null && route.name == 'auth' ? redirect('/') : ''
  store.state.user === null && route.name !== 'auth' ?  redirect('/auth') : ''
}