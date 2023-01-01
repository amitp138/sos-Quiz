import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD8NATy5hl_mLr-8ykEgWLcCGBc6X_FTnM",
  authDomain: "sos-quizz.firebaseapp.com",
  projectId: "sos-quizz",
  storageBucket: "sos-quizz.appspot.com",
  messagingSenderId: "998255292799",
  appId: "1:998255292799:web:cf05892feb3964bdecaa4a",
  measurementId: "G-9277T0V1Q4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
