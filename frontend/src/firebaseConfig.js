import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCglT3Q65zKIw84v2wAv9DUXHOfuyosFzA",
  authDomain: "gamingcart-14201.firebaseapp.com",
  projectId: "gamingcart-14201",
  storageBucket: "gamingcart-14201.firebasestorage.app",
  messagingSenderId: "282740817902",
  appId: "1:282740817902:web:c4153b04818356c61b18ff",
  measurementId: "G-T5B6RFZ0HX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth
export const auth = getAuth(app);
