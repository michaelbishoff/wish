// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpkcjg8XFZqOxC0aicfKtDxb9YBJuhQ9s",
  authDomain: "wish-98ac7.firebaseapp.com",
  projectId: "wish-98ac7",
  storageBucket: "wish-98ac7.appspot.com",
  messagingSenderId: "150671478555",
  appId: "1:150671478555:web:e62e11e18928ac8ae24dbe",
  measurementId: "G-3HWX70Y6XT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const signInWithGoogleAction = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};
export const signOutAction = () => {
  signOut(auth);
};
