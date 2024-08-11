// firebase-config.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6WJfXLAuGHaNAcVcpXEzooDUJWuH-op8",
  authDomain: "placenext-17bb0.firebaseapp.com",
  projectId: "placenext-17bb0",
  storageBucket: "placenext-17bb0.appspot.com",
  messagingSenderId: "225265442811",
  appId: "1:225265442811:web:98d279c9f20b2b9adab55e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
