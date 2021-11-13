import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzGyLsTqjWpLupFk1epbhzasKuY1P3-5s",
  authDomain: "cowis-28c06.firebaseapp.com",
  projectId: "cowis-28c06",
  storageBucket: "cowis-28c06.appspot.com",
  messagingSenderId: "57704866925",
  appId: "1:57704866925:web:326e0a4c84f8739d3b0b64",
  measurementId: "G-N17BXPRJ42"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };