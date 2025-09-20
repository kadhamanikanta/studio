// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration - this is a public configuration
// and it's safe to commit this to your repository.
// Security is enforced by Firebase Security Rules.
const firebaseConfig = {
  projectId: "studio-2852089076-17daf",
  appId: "1:611451925537:web:bbf217000f9c49aedf9f60",
  apiKey: "AIzaSyBqeou5fyh8AogmTYxEWpfGYp5wLdc2LZc",
  authDomain: "studio-2852089076-17daf.firebaseapp.com",
  messagingSenderId: "611451925537",
};

// Initialize Firebase for SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
