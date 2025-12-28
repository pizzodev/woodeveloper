// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "@firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCC26TBo2-LIEbeaps4sZ5rQ7TD4LalMjk",
    authDomain: "woodeveloper-721fd.firebaseapp.com",
    projectId: "woodeveloper-721fd",
    storageBucket: "woodeveloper-721fd.firebasestorage.app",
    messagingSenderId: "698643633638",
    appId: "1:698643633638:web:3eacf3803463ba5bc7f227"
};

export const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const authProvider = getAuth(firebaseApp);