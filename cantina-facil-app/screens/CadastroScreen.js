import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { cadastrarUsuario } from "../firebase/auth/authService";

export default function CadastroScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceito, setAceito] = useState(false);

  const handleCadastrar = async () => {
    if (senha !== confirmarSenha) return alert("As senhas não coincidem.");
    if (!aceito) return alert("Você deve aceitar os termos.");

    try {
      await cadastrarUsuario(email, senha, nome);
      alert("Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltar}>
        <Text style={styles.voltarTexto}>←</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Crie uma conta</Text>
      <Text style={styles.subtitulo}>Os campos em (*) são obrigatórios</Text>

      <TextInput placeholder="Nome*" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="E-mail*" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Senha*" value={senha} onChangeText={setSenha} style={styles.input} secureTextEntry />
      <TextInput placeholder="Confirmar senha*" value={confirmarSenha} onChangeText={setConfirmarSenha} style={styles.input} secureTextEntry />

      <TouchableOpacity onPress={() => setAceito(!aceito)} style={styles.checkboxContainer}>
        <Text style={styles.checkboxEmoji}>{aceito ? "☑️" : "⬜"}</Text>
        <Text style={styles.termoTexto}>
          Li e estou de acordo com o{" "}
          <Text style={styles.link} onPress={() => Linking.openURL("https://www.exemplo.com/termos")}>
            Termo de Uso e Política de Privacidade
          </Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={handleCadastrar}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  voltar: { marginBottom: 10 },
  voltarTexto: { fontSize: 22 },
  titulo: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 5 },
  subtitulo: { textAlign: "center", color: "#666", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15
  },
  checkboxEmoji: {
    fontSize: 22,
    marginRight: 10
  },
  termoTexto: {
    flex: 1,
    flexWrap: "wrap"
  },
  link: { color: "blue", textDecorationLine: "underline" },
  botao: {
    backgroundColor: "#FFD700",
    borderRadius: 8,
    padding: 15,
    alignItems: "center"
  },
  botaoTexto: { fontWeight: "bold", fontSize: 16 }
});
