import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

export const INITIAL_BALANCE = 100000

export function subscribeAuth(callback) {
  return onAuthStateChanged(auth, callback)
}

export async function registerUser({ email, name, password }) {
  const normalizedEmail = email.trim().toLowerCase()
  const credential = await createUserWithEmailAndPassword(auth, normalizedEmail, password)
  const userRef = doc(db, 'users', credential.user.uid)

  await setDoc(userRef, {
    nombre: name.trim(),
    email: normalizedEmail,
    saldo: INITIAL_BALANCE,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastTransferId: null,
  })

  return credential.user
}

export function loginUser({ email, password }) {
  return signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password)
}

export function logoutUser() {
  return signOut(auth)
}
