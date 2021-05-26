import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBhGAL6iunpclHijWPdFqsiVEmlZRe1D1c",
  authDomain: "patadoc-88cbf.firebaseapp.com",
  projectId: "patadoc-88cbf",
  storageBucket: "patadoc-88cbf.appspot.com",
  messagingSenderId: "528404098570",
  appId: "1:528404098570:web:53207c9c9791dfeae839f3",
  measurementId: "G-VQ91Q7B209",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
