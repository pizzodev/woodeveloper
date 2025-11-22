// lib/firestore.ts
import { firebaseApp } from "./firebase";
import { getFirestore } from "firebase/firestore";

export const productsDb = getFirestore(firebaseApp);