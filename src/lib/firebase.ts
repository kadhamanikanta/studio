// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-2852089076-17daf",
  "appId": "1:611451925537:web:bbf217000f9c49aedf9f60",
  "apiKey": "AIzaSyBqeou5fyh8AogmTYxEWpfGYp5wLdc2LZc",
  "authDomain": "studio-2852089076-17daf.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "611451925537"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
