import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBl-p2m4kZFxLgwkyITcoF71w5TYjVnj9c",
  authDomain: "bdproyecto-366b6.firebaseapp.com",
  projectId: "bdproyecto-366b6",
  storageBucket: "bdproyecto-366b6.firebasestorage.app",
  messagingSenderId: "60058309610",
  appId: "1:60058309610:web:5933eb2501b1170d961893"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };