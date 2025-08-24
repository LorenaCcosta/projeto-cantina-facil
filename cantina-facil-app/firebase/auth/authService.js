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
    switch (error.code) {
      case "auth/email-already-in-use":
        Alert.alert("Erro", "Este e-mail já está em uso.");
        break;
      case "auth/invalid-email":
        Alert.alert("Erro", "E-mail inválido.");
        break;
      case "auth/weak-password":
        Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
        break;
      case "auth/missing-password":
        Alert.alert("Erro", "A senha é obrigatória.");
        break;
      case "auth/missing-email":
        Alert.alert("Erro", "O e-mail é obrigatório.");
        break;
      case "auth/network-request-failed":
        Alert.alert("Erro", "Falha na conexão. Verifique sua internet.");
        break;
      default:
        Alert.alert("Erro", "Erro ao cadastrar. Tente novamente.");
        console.error("Erro ao cadastrar:", error);
        break;
    }
    return null;
  }
};

// Login
export const loginUsuario = async (email, senha) => {
  try {
    return await signInWithEmailAndPassword(auth, email, senha);
  } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
        Alert.alert("Login", "Usuário não encontrado.");
        break;
      case "auth/wrong-password":
        Alert.alert("Erro", "Senha incorreta.");
        break;
      case "auth/invalid-email":
        Alert.alert("Erro", "E-mail inválido.");
        break;
      case "auth/invalid-credential":
        Alert.alert("Erro", "Email ou senha inválidos.");
        break;
      default:
        Alert.alert("Erro", "Erro ao fazer login. Tente novamente.");
        console.error("Erro ao logar:", error);
        break;
    }
    return null;
  }
};

// Recuperar Senha
export const recuperarSenha = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    // switch (error.code) {
    //   case "auth/user-not-found":
    //     Alert.alert("Erro", "Usuário não encontrado.");
    //     break;
    //   case "auth/invalid-email":
    //     Alert.alert("Erro", "E-mail inválido.");
    //     break;
    //   case "auth/missing-email":
    //     Alert.alert("Erro", "O e-mail é obrigatório.");
    //     break;
    //   default:
    //     Alert.alert(
    //       "Erro",
    //       "Erro ao enviar e-mail de recuperação. Tente novamente."
    //     );
    //     console.error("Erro ao enviar e-mail de recuperação:", error);
    //     break;
    // }
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
