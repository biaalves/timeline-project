import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import {firebaseConfig} from './firebase-config'

// Your web app's Firebase configuration

// Initialize 
export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider()
export const storage = firebase.storage()
export const firestore = firebase.firestore()
export const serverTime = firebase.firestore.FieldValue.serverTimestamp()

export default function setFirebase (Vue){
  Object.defineProperty(Vue.prototype, '$firebase', {
    get () {
      return firebaseApp
    }
  })
}