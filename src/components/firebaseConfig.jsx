import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  //firebase api keys
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth()

export const storge = getStorage()

export const usersRef = collection(db, 'users')
