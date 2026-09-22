import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPIjpz3UCvypEBp88I7Tcn6Z23A6qjl0s",
  authDomain: "advera-d62a6.firebaseapp.com",
  projectId: "advera-d62a6",
  storageBucket: "advera-d62a6.firebasestorage.app",
  messagingSenderId: "342916923065",
  appId: "1:342916923065:web:8ab824f6f1b4fa6c34e568",
  measurementId: "G-WN55PG9X76"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
