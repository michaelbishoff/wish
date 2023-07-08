import React, { useEffect, useState } from 'react'
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, serverTimestamp, query } from "@firebase/firestore"

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


export default function App() {

  const [user] = useAuthState(auth)

  useEffect(() => {
    const usersRef = collection(firestore, 'users')

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log("user signed in")
        const docRef = doc(firestore, "users", user.uid)
        getDoc(docRef).then(docSnap => {
          if (!docSnap.exists()) {
            // no document, so save it
            setDoc(doc(usersRef, user.uid), {
              uid: user.uid,
              name: user.displayName,
              photoURL: user.photoURL,
              createdAt: serverTimestamp(),
            })
          }
        })
      } else {
        console.log("user signed out")
      }
    })
    return unsubscribe
  }, [])

  return (
    <div className="App">
      <header>
      </header>
      <div>
        {user ? <SignOutAndListUsers user={user} /> : <SignIn />}
      </div>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }
  return (
    <button type="button" className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOutAndListUsers({ user }) {
  return (
    <div>
      <SignOut user />
      <Users />
    </div>
  )
}

function SignOut({ user }) {
  return user && (
    <button onClick={() => signOut(auth)}>Sign Out</button>
  )
}

function Users() {
  // let users: Array<any> = [];
  const [users, setUsers] = useState<Array<any>>([])

  useEffect(() => {
    async function getUsers() {
      const q = query(collection(firestore, "users"))
      const querySnapshot = await getDocs(q)
      setUsers(querySnapshot.docs.map(doc => {
        return doc.data()
      }))
      // await getDocs(q).then(querySnapshot => {
      //   users = querySnapshot.docs.map(docSnapShot => {
      //     return docSnapShot.data()
      //   })
      // })
      console.log("Done setting users")
    }
    getUsers()
  }, [])

  console.log(users.length)
  return (
    <ul className="divide-y divide-gray-200">
      {users.map(user => {
        return <User key={user.uid} user={user} />
      })}
    </ul>
  )
}

function User({ user }) {
  console.log("user:", user)
  return (
    <li className="py-4 flex">
      <img className="h-10 w-10 rounded-full" src={user.photoURL} alt="" />
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{user.name}</p>
        <p className="text-sm text-gray-500">{user.uid}</p>
      </div>
    </li>
  )
}