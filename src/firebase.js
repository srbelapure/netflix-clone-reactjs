import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
//   databaseURL: "https://instagram-react-firebase-1e6f6-default-rtdb.firebaseio.com"
  apiKey: "AIzaSyA3JNfnIxEPfNvd-aSVXYB6ez24u3cG3Uc",
  authDomain: "netflix-clone-reactjs-514e8.firebaseapp.com",
  projectId: "netflix-clone-reactjs-514e8",
  storageBucket: "netflix-clone-reactjs-514e8.appspot.com",
  messagingSenderId: "955457871128",
  appId: "1:955457871128:web:d56fdaa50797fe835f126d",
  measurementId: "G-S58ZKN7LB4"
});

const db = firebaseApp.firestore()
const auth = firebase.auth(); // this is for authentication(login,logout,create users stc)

export {db,auth};
