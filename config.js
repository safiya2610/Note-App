import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAkdV5fbr_6KKxqRbC7Yzo-ZUnPpBxyf9g",
  authDomain: "app-sn-7f59d.firebaseapp.com",
  projectId: "app-sn-7f59d",
  storageBucket: "app-sn-7f59d.appspot.com",
  messagingSenderId: "266845195630",
  appId: "1:266845195630:web:f7962cef27a4dbb92f057f",
  measurementId: "G-2KDVM2519X"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export Firestore instance
const db = firebase.firestore();
export { firebase, db };
