import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/database';


// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB_39yNEcwyF5ZYQ8z46YCaWizizP25H3w",
    authDomain: "gallery-90ce1.firebaseapp.com",
    projectId: "gallery-90ce1",
    storageBucket: "gallery-90ce1.appspot.com",
    messagingSenderId: "385154993734",
    appId: "1:385154993734:web:e03ae88f54062ef112c447",
    measurementId: "G-QCYJJT2C1K"
  };

  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { projectStorage, projectFirestore,database, timestamp };


