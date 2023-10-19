import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZNuOmM-d1klYVIwTrPfOnc9LpoFepEqg",
  authDomain: "crwn-clothing-db-2edaa.firebaseapp.com",
  projectId: "crwn-clothing-db-2edaa",
  storageBucket: "crwn-clothing-db-2edaa.appspot.com",
  messagingSenderId: "496522745969",
  appId: "1:496522745969:web:f263b60231c050961ce3d0",
  measurementId: "G-7FV7LS6JEF",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const GoogleProvider = new GoogleAuthProvider();

GoogleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, GoogleProvider);

export const db = getFirestore();
const additionalInformations = {};
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformations
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = getDoc(userDocRef);

  if (!userSnapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformations,
      });
    } catch (e) {
      console.log("error happens when creating a new user");
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callBack) =>
  onAuthStateChanged(auth, callBack);
