import { Alert } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

// Cadastro
export const cadastrarUsuario = async (email, senha, nome) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
    const uid = userCredential.user.uid;

    await sendEmailVerification(userCredential.user);

    await setDoc(doc(db, "usuarios", uid), {
      nome: nome,
      email: email,
    });

    return userCredential;
  } catch (error) {
    throw error;
  }
};

// Login
export const loginUsuario = async (email, senha) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    if (!user.emailVerified) {
      await signOut(auth);
      Alert.alert(
        "Verificação necessária",
        "Você precisa confirmar seu e-mail antes de acessar. Verifique sua caixa de entrada ou a pasta de spam."
      );
      return null;
    }

    return userCredential;
  } catch (error) {
    throw error;
  }
};

// Recuperar Senha
export const recuperarSenha = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    throw error;
  }
};

// Logout
export const logoutUsuario = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    Alert.alert("Erro", "Erro ao sair da conta.");
    console.error("Erro ao sair:", error);
  }
};
