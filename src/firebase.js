import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDJW7-KXD4rp85YmFjK_zt1wduUSOhD0Kc",
    authDomain: "slack-clone-dffc6.firebaseapp.com",
    projectId: "slack-clone-dffc6",
    storageBucket: "slack-clone-dffc6.appspot.com",
    messagingSenderId: "947506343534",
    appId: "1:947506343534:web:4ac015148f16cae9bdc07f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;