import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { recuperarSenha } from "../config/auth/authService";

import SetaVoltar from "../components/SetaVoltar";

export default function RecuperarSenha() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleRecuperar = async () => {
    setMensagem("");
    setErro("");

    if (!email.trim()) {
      setErro("Por favor, insira um e-mail.");
      return;
    }
    setCarregando(true);

    try {
      await recuperarSenha(email.trim());
      setMensagem("E-mail de recuperação enviado.");
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
      setEmail("");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErro("Usuário não encontrado.");
      } else if (error.code === "auth/invalid-email") {
        setErro("E-mail inválido.");
      } else if (error.code === "auth/missing-email") {
        setErro("O e-mail é obrigatório.");
      } else if (error.code === "auth/network-request-failed") {
        setErro("Falha na conexão. Verifique sua internet.");
      } else {
        setErro("Erro ao enviar e-mail de recuperação. Tente novamente.");
        console.error("Erro ao enviar e-mail de recuperação:", error);
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <SetaVoltar onPress={() => navigation.goBack()} />
      <Text style={styles.titulo}>Recuperar Senha</Text>
      <Text style={styles.subTitulo}>
        Verifique sua caixa de entrada e também a pasta de spam ou promoções.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      {mensagem ? <Text style={{ color: "green" }}>{mensagem}</Text> : null}

      <TouchableOpacity
        style={[styles.button, !email.trim() && { opacity: 0.5 }]}
        onPress={handleRecuperar}
        disabled={!email.trim() || carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.textoButton}>Recuperar Senha</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 12,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
  },
  button: {
    backgroundColor: "#FFc72c",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginTop: 28,
  },
  textoButton: {
    fontSize: 18,
  },
  erro: {
    color: "red",
  },

  subTitulo: {
    fontSize: 14,
    color: "#5c5c5c",
    marginBottom: 16,
  },
});
