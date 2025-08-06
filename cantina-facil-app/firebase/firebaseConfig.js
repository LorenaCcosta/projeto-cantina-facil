import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMFaLECd-F66HLznFwXC5xXytvLn_9Sxk",
  authDomain: "cantina-facil-app.firebaseapp.com",
  projectId: "cantina-facil-app",
  storageBucket: "cantina-facil-app.firebasestorage.app",
  messagingSenderId: "322044509416",
  appId: "1:322044509416:web:c9227385163b96cf281d5d"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});