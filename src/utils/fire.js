import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCRlU3U_cS-PH1PGzq2cuDLtOMPkIKjffo",
    authDomain: "booking-4b038.firebaseapp.com",
    databaseURL: "https://booking-4b038.firebaseio.com",
    projectId: "booking-4b038",
    storageBucket: "booking-4b038.appspot.com",
    messagingSenderId: "4868457003"
  };
// var fire = firebase.initializeApp(config);
// const databaseRef = firebase.database();
// export const listingsRef = databaseRef.ref('listings').orderByKey().limitToLast(100);
// export default fire;
firebase.initializeApp(config);
const database = firebase.database().ref();
export const listingsRef = database.child('listings').orderByKey().limitToLast(100);
// export const todosRef = databaseRef.child("todos");

export default database