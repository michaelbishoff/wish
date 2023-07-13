import "./App.css";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp,
  query,
} from "@firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./components/Header";
import Background from "./components/Background";
import {
  auth,
  firestore,
  signInWithGoogleAction,
  signOutAction,
} from "./firebase";

export default function App() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    const usersRef = collection(firestore, "users");

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user signed in");
        const docRef = doc(firestore, "users", user.uid);
        getDoc(docRef).then((docSnap) => {
          if (!docSnap.exists()) {
            // no document, so save it
            setDoc(doc(usersRef, user.uid), {
              uid: user.uid,
              name: user.displayName,
              photoURL: user.photoURL,
              createdAt: serverTimestamp(),
            });
          }
        });
      } else {
        console.log("user signed out");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <Header
        signInAction={signInWithGoogleAction}
        signOutAction={signOutAction}
      />
      <Background content={<MyContent user={user} />} />
    </div>
  );
}

function SignIn() {
  return (
    <button
      type="button"
      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={signInWithGoogleAction}
    >
      Sign in with Google
    </button>
  );
}

function SignOutAndListUsers({ user }: any) {
  return (
    <div className="mt-8">
      <SignOut user={user} />
      <Users />
    </div>
  );
}

function SignOut({ user }: any) {
  return user && <button onClick={signOutAction}>Sign Out</button>;
}

function Users() {
  // let users: Array<any> = [];
  const [users, setUsers] = useState<Array<any>>([]);

  useEffect(() => {
    async function getUsers() {
      const q = query(collection(firestore, "users"));
      const querySnapshot = await getDocs(q);
      setUsers(
        querySnapshot.docs.map((doc) => {
          return doc.data();
        })
      );
      // await getDocs(q).then(querySnapshot => {
      //   users = querySnapshot.docs.map(docSnapShot => {
      //     return docSnapShot.data()
      //   })
      // })
      console.log("Done setting users");
    }
    getUsers();
  }, []);

  console.log(users.length);
  return (
    <ul className="divide-y divide-gray-200">
      {users.map((user) => {
        return <User key={user.uid} user={user} />;
      })}
    </ul>
  );
}

function User({ user }: any) {
  console.log("user:", user);
  return (
    <li className="py-4 flex">
      <img className="h-10 w-10 rounded-full" src={user.photoURL} alt="" />
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{user.name}</p>
        <p className="text-sm text-gray-500">{user.uid}</p>
      </div>
    </li>
  );
}

type MyContentProps = {
  user: User | null | undefined;
};

function MyContent({ user }: MyContentProps) {
  return (
    <div className="mx-auto max-w-2xl">
      {user ? <SignOutAndListUsers user={user} /> : <LogInHero />}
    </div>
  );
}

function LogInHero() {
  return (
    <div className="py-32 sm:py-48 lg:py-56">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Wish
        </h1>
      </div>
      <div className="mt-20 flex items-center justify-center gap-x-6">
        <SignIn />
      </div>
    </div>
  );
}
