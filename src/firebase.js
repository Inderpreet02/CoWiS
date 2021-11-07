import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZd6jkMob7jTkWKACV2GIeaGbHhESJpfw",
    authDomain: "test-7c699.firebaseapp.com",
    projectId: "test-7c699",
    storageBucket: "test-7c699.appspot.com",
    messagingSenderId: "919505404300",
    appId: "1:919505404300:web:608bbf108d2905a0ded6a9",
    measurementId: "G-0H36R8NF8L"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };