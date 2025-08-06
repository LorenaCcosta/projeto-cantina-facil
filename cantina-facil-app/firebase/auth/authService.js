import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const cadastrarUsuario = async (email, senha, nome) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
  const uid = userCredential.user.uid;

  // Salva nome e email no Firestore
  await setDoc(doc(db, "usuarios", uid), {
    nome: nome,
    email: email
  });

  return userCredential;
};

export const loginUsuario = async (email, senha) => {
  return await signInWithEmailAndPassword(auth, email, senha);
};

export const logoutUsuario = async () => {
  return await signOut(auth);
};
