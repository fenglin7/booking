import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCRlU3U_cS-PH1PGzq2cuDLtOMPkIKjffo",
    authDomain: "booking-4b038.firebaseapp.com",
    databaseURL: "https://booking-4b038.firebaseio.com",
    projectId: "booking-4b038",
    storageBucket: "booking-4b038.appspot.com",
    messagingSenderId: "4868457003"
  };
var fire = firebase.initializeApp(config);
export default fire;