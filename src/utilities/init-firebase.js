import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyBYE6v9ejyinR85q3y53xu4BSWsWV6Sea4",
  authDomain: "vue3-course.firebaseapp.com",
  projectId: "vue3-course",
  databaseURL: "https://vue3-course-default-rtdb.firebaseio.com/",
  storageBucket: "vue3-course.appspot.com",
  messagingSenderId: "258100104156",
  appId: "1:258100104156:web:44391ea6f8bc5d62fe1d19"
}

firebase.initializeApp(firebaseConfig)

export default firebase

// Chat.vue
const db = firebase.database()
export const chatRef = db.ref('chat')