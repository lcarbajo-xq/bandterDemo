import * as firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyCyZNbEFfZLb4MtWTFQdJiMchbTZji5Hyo",
  authDomain: "bandter-ebe30.firebaseapp.com",
  databaseURL: "https://bandter-ebe30.firebaseio.com",
  projectId: "bandter-ebe30",
  storageBucket: "bandter-ebe30.appspot.com",
  messagingSenderId: "435140485812",
  appId: "1:435140485812:web:3c322a994376972adaade1",
  measurementId: "G-VG3X9GK4JS",
}

firebase.apps.length === 0 && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { email, photoURL, displayName, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
    .catch((err) => console.log(err))
}

export const addBandTit = ({ avatar, content, userId, userName }) => {
  return db.collection("bandtits").add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    shareCount: 0,
  })
}
