
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAH4Q5xoVwSvli6gg64yJDyFrRa9KtvIF8",
  authDomain: "test-app-ed84a.firebaseapp.com",
  projectId: "test-app-ed84a",
  storageBucket: "test-app-ed84a.appspot.com",
  messagingSenderId: "492907454224",
  appId: "1:492907454224:web:d964c7eec99b9192e44f95"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);