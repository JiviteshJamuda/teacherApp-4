import firebase from 'firebase';
require('@firebase/firestore')

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZgO6Uj5lNbvLr4y3MH4Sa6dowbVeq6YA",
    authDomain: "assignment-48f97.firebaseapp.com",
    databaseURL: "https://assignment-48f97.firebaseio.com",
    projectId: "assignment-48f97",
    storageBucket: "assignment-48f97.appspot.com",
    messagingSenderId: "472381483518",
    appId: "1:472381483518:web:639ad7a691f13b9d9638af",
    measurementId: "G-F3TGZFM64M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
