import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

var config = {
  apiKey: 'AIzaSyD-RJQcpL7huuk8-MApLJgaZLldYFfYTQY',
  authDomain: 'gast-cinema.firebaseapp.com',
  databaseURL: 'https://gast-cinema.firebaseio.com',
  projectId: 'gast-cinema',
  storageBucket: 'gast-cinema.appspot.com',
  messagingSenderId: '1066640483133',
  appId: '1:1066640483133:web:b05289414c20c38faddb54',
  measurementId: 'G-076KN0BBGZ'
}

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
// export const DB = firebase.database()
// export const StoreDB = firebase.firestore()
export default firebase
