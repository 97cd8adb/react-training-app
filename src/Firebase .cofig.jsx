// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKf5UO7u_qQx4vlfqNY-g42j904DCFIyY",
  authDomain: "react-training-app-5051e.firebaseapp.com",
  projectId: "react-training-app-5051e",
  storageBucket: "react-training-app-5051e.firebasestorage.app",
  messagingSenderId: "589546439655",
  appId: "1:589546439655:web:7c03eb76dee856aa03b342"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Autheticationの設定
export const auth = getAuth(app);
export const db = getFirestore(app);