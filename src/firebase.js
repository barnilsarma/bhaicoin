// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const firebaseConfig = {
    apiKey: "AIzaSyAcLbQIW9D27MQ5gEQwQjLxg6dzLdRQ8L4",
    authDomain: "bhaicoin-8b7c1.firebaseapp.com",
    projectId: "bhaicoin-8b7c1",
    storageBucket: "bhaicoin-8b7c1.appspot.com",
    messagingSenderId: "101300114962",
    appId: "1:101300114962:web:87892e00069eee6ada6acb"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };