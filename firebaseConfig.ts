import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: add your own config from Firebase console
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);