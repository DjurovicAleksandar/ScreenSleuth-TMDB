import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCjylSb_gG0gcKu0hLMGOYyFHnQ-TNvURo',
  authDomain: 'screensleuth-dbb21.firebaseapp.com',
  projectId: 'screensleuth-dbb21',
  storageBucket: 'screensleuth-dbb21.appspot.com',
  messagingSenderId: '1089912724676',
  appId: '1:1089912724676:web:d076604c28e79b9154fd91',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
