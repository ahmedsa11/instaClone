import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA3e7xzjQWX0ttd0bwc6lcDgI4sLyflZTM",
  authDomain: "instaclone-ce3bc.firebaseapp.com",
  projectId: "instaclone-ce3bc",
  storageBucket: "instaclone-ce3bc.appspot.com",
  messagingSenderId: "1016122009254",
  appId: "1:1016122009254:web:267553d109ed0ac3b97667",
  measurementId: "G-C6HPDY3MQT",
}); 
const db =firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
export { db, auth, storage };
  