import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// require('dotenv').config()

const firebaseConfig = {
  apiKey: "AIzaSyAJhNUBs9eHtxHEpOrp4T4cy5E0rGF85t8",
  authDomain: "videoverse-chat-app-assignment.firebaseapp.com",
  projectId: "videoverse-chat-app-assignment",
  storageBucket: "videoverse-chat-app-assignment.appspot.com",
  messagingSenderId: "66593982950",
  appId: "1:66593982950:web:0af4f318d95577cda3ee27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
