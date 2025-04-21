import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_27fCvoXE8siBa0pgC0guJoWj7M2JKVk",
  authDomain: "finance-f4154.firebaseapp.com",
  projectId: "finance-f4154",
  storageBucket: "finance-f4154.firebasestorage.app",
  messagingSenderId: "220723002511",
  appId: "1:220723002511:web:22963548b6757aa92b84fa",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();
