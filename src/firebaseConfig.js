import { initializeApp, getApps } from "firebase/app"; // ⬅️ AÑADIDO getApps
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRv8G90Gwy4naqDQSMP5YL2-CqwDieK0E",
  authDomain: "iowagamblingtask-c5a4d.firebaseapp.com",
  projectId: "iowagamblingtask-c5a4d",
  storageBucket: "iowagamblingtask-c5a4d.firebasestorage.app",
  messagingSenderId: "1054594573549",
  appId: "1:1054594573549:web:95aaf4738ff6dcb63dd8e4",
  measurementId: "G-H2LCZCEZT7",
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
export { db };
