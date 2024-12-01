import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// Cấu hình Firebase của bạn
const firebaseConfig = {
    apiKey: "AIzaSyBoETnNLSvEOPCNihIvS3WgmnOBvFYGosY",
    authDomain: "hfood-38c6f.firebaseapp.com",
    projectId: "hfood-38c6f",
    storageBucket: "hfood-38c6f.firebasestorage.app",
    messagingSenderId: "391445883962",
    appId: "1:391445883962:web:4117746d0db6c97da3d903",
    measurementId: "G-TYQ3WW8FRH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
