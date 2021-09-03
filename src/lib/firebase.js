import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDBJl9JGVpVvwlaoqq6FN122dXNii0UVeE',
  authDomain: 'react-whats-app.firebaseapp.com',
  projectId: 'react-whats-app',
  storageBucket: 'react-whats-app.appspot.com',
  messagingSenderId: '363812041276',
  appId: '1:363812041276:web:121817408aa0e3df6ec939',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
//const rtdb = firebase.database();

export { firebase, db, auth };
