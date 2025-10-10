import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export const cadastrarUsuario = async (email, senha, nome) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    await sendEmailVerification(user);

    await setDoc(doc(db, "usuarios", user.uid), {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      criadoEm: new Date().toISOString(),
      saldo: 0,
      emailVerificado: false,
    });

    return true;
  } catch (error) {
    console.error("Erro ao cadastrar usuario:", error);
    throw error;
  }
};

export const loginUsuario = async (email, senha) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      senha
    );
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

export const recuperarSenha = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email.trim().toLowerCase());
    return true;
  } catch (error) {
    console.error("Erro ao recuperar senha:", error);
    throw error;
  }
};

export const deslogarUsuario = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Erro ao deslogar:", error);
    throw error;
  }
};

