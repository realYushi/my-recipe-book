import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDksHgb82uwSRewrzBWRYw9Oue6-yHqqYY",
  authDomain: "my-recipe-book-1e28c.firebaseapp.com",
  projectId: "my-recipe-book-1e28c",
  storageBucket: "my-recipe-book-1e28c.firebasestorage.app",
  messagingSenderId: "681524189151",
  appId: "1:681524189151:web:82ea2a366eed3214cb966a",
  measurementId: "G-XZHGF56D89"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default firebaseConfig;