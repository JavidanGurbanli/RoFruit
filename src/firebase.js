import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgKdbM1S0yVsGzI1D57lkZHcvy50XEfAA",
  authDomain: "login-register-client.firebaseapp.com",
  projectId: "login-register-client",
  storageBucket: "login-register-client.appspot.com",
  messagingSenderId: "370876419618",
  appId: "1:370876419618:web:8624bc3cb4f4804c6c047b",
  measurementId: "G-SLRWPZQEVG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
