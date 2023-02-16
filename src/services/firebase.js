import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiV0WX1KO2b9l5_5bD1jDwn9OGZfp6mqE",
  authDomain: "reactappgb.firebaseapp.com",
  projectId: "reactappgb",
  storageBucket: "reactappgb.appspot.com",
  messagingSenderId: "1070908952897",
  appId: "1:1070908952897:web:e04c2429c4ee14e07dd1c0",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);

export const signUp = async (email, password) =>
  await createUserWithEmailAndPassword(firebaseAuth, email, password);

export const signIn = async (email, password) =>
  await signInWithEmailAndPassword(firebaseAuth, email, password);

export const logOut = async () => await signOut(firebaseAuth);

const db = getDatabase(app);

export const userRef = ref(db, "user");
export const messagesRef = ref(db, "messages");

export const getChatById = (chatId) => ref(db, `messages/${chatId}`);

export const getMessageListById = (chatId) =>
  ref(db, `messages/${chatId}/messageList`);
