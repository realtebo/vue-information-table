// https://firebase.google.com/docs/web/setup?authuser=0#add-sdks-initialize
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import {
  FB_APIKEY,
  FB_AUTH_DOMAIN,
  FB_DATABASE_URL,
  FB_PROJECT_ID,
  FB_STORAGE_BUCKET,
  FB_SENDER_ID,
  FB_APPID
} from "./config";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: FB_APIKEY,
  authDomain: FB_AUTH_DOMAIN,
  databaseURL: FB_DATABASE_URL,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_SENDER_ID,
  appId: FB_APPID
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);

let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

// Allow Google as auth provider
let firebaseGoogleProvider = new firebase.auth.GoogleAuthProvider();

export { firebaseAuth, firebaseDb, firebaseGoogleProvider };
