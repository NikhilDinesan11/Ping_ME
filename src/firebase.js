import firebase from 'firebase/app'
import 'firebase/auth'

export const auth = firebase.initializeApp({
  apiKey: 'AIzaSyCTghQHxc7b1dOVShWY8YCYAUMBCptUHOA',
  authDomain: 'ping-75e3e.firebaseapp.com',
  projectId: 'ping-75e3e',
  storageBucket: 'ping-75e3e.appspot.com',
  messagingSenderId: '877074377380',
  appId: '1:877074377380:web:211fa1c03d825b48391431'
}).auth()
