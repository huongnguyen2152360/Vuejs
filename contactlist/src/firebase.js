import Firebase from "firebase/app";
import 'firebase/database'; // If using Firebase database
let config = {
  apiKey: "AIzaSyA7opiulTwKU-_gMpSNKrBrFbQOPFMGm_w",
  authDomain: "contactlistvuejs.firebaseapp.com",
  databaseURL: "https://contactlistvuejs.firebaseio.com",
  projectId: "contactlistvuejs",
  storageBucket: "contactlistvuejs.appspot.com",
  messagingSenderId: "282107073117"
};
export const app = Firebase.initializeApp(config);
export const db = app.database();
export const usersRef = db.ref("users");