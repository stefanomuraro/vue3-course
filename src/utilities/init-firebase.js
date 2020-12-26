import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBYE6v9ejyinR85q3y53xu4BSWsWV6Sea4",
  authDomain: "vue3-course.firebaseapp.com",
  projectId: "vue3-course",
  storageBucket: "vue3-course.appspot.com",
  messagingSenderId: "258100104156",
  appId: "1:258100104156:web:44391ea6f8bc5d62fe1d19"
}

firebase.initializeApp(firebaseConfig)

export default firebase