import React from 'react'
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "@firebase/firestore"

import { useAuthState } from 'react-firebase-hooks/auth'
// import { useCollectionData } from 'react-firebase-hooks/firestore'


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
const auth = getAuth(app)
export const firestore = getFirestore(app);


function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header>
      </header>
      <div>Does this auto deploy</div>
      <section>
        {user ? <SignOut /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

// function Users() {
//   const usersRef = firestore.collection('users');

// }

export default App;