
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgtJrmsFWG1C7m9S55HyT1laICEzuUS2g",
  authDomain: "echomind-3651a.firebaseapp.com",
  projectId: "echomind-3651a",
  storageBucket: "echomind-3651a.firebasestorage.app",
  messagingSenderId: "904706892885",
  appId: "1:904706892885:web:0e42b3dda796674ead20dc",
  measurementId: "G-SQ0WM6S28T"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore }; 