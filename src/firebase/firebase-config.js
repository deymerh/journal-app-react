import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_kT8GVbgDEMXVQUhZazpHfJiibKCus44",
  authDomain: "cards-ade65.firebaseapp.com",
  databaseURL: "https://cards-ade65.firebaseio.com",
  projectId: "cards-ade65",
  storageBucket: "cards-ade65.appspot.com",
  messagingSenderId: "816837843319",
  appId: "1:816837843319:web:8aa8841a65e9fdd6a96972",
  measurementId: "G-P58E4BKWCZ"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const gogleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  gogleAuthProvider,
  firebase
};