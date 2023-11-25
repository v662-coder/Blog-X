// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

import{getAuth,GoogleAuthProvider} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAAwsxAUiI8AVAWqs4hk399-N1BBOXIZQ",
  authDomain: "blogapp-a64c0.firebaseapp.com",
  projectId: "blogapp-a64c0",
  storageBucket: "blogapp-a64c0.appspot.com",
  messagingSenderId: "350390881066",
  appId: "1:350390881066:web:366dc32789a721e2f66c53"
};

// Initialize Firebase


// Initialize Firebase
const app = initializeApp(firebaseConfig);












// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAAAwsxAUiI8AVAWqs4hk399-N1BBOXIZQ",
//   authDomain: "blogapp-a64c0.firebaseapp.com",
//   projectId: "blogapp-a64c0",
//   storageBucket: "blogapp-a64c0.appspot.com",
//   messagingSenderId: "350390881066",
//   appId: "1:350390881066:web:366dc32789a721e2f66c53"
// };

// Initialize Firebase

export const db=getFirestore(app);
export const auth=getAuth(app);
export const provider = new GoogleAuthProvider();