import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDiyTC6xoWcnWb8qcOul04h4ZbhzDaJPts",
    authDomain: "kolabo-todo-c4c83.firebaseapp.com",
    projectId: "kolabo-todo-c4c83",
    storageBucket: "kolabo-todo-c4c83.appspot.com",
    messagingSenderId: "470755339490",
    appId: "1:470755339490:web:cf858ba795d3a62c6a42bb"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  export {auth};
  export default db;