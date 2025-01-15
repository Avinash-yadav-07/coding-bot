
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDFtT2nhIfs2LK-zDUrHFr92VakSaBqhMA",
  authDomain: "first-c362d.firebaseapp.com",
  projectId: "first-c362d",
  storageBucket: "first-c362d.appspot.com", 
  messagingSenderId: "961822509276",
  appId: "1:961822509276:web:baedce90b3d225f5220c19",
  measurementId: "G-XQ02YV11YY"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

export { db }; // Export Firestore to use in other files
