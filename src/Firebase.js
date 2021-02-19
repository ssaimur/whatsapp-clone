import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAER4iYCQ_bItE-jMcUXNCAl9xne_e-mpI",
  authDomain: "whats-app-clone-d66ac.firebaseapp.com",
  projectId: "whats-app-clone-d66ac",
  storageBucket: "whats-app-clone-d66ac.appspot.com",
  messagingSenderId: "957558509220",
  appId: "1:957558509220:web:d7e0d3e0658969b09da031",
  measurementId: "G-H4FY7CM1QP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;