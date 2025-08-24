import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { cadastrarUsuario } from "../../firebase/auth/authService";
import Icon from "react-native-vector-icons/MaterialIcons";

import SetaVoltar from "../components/SetaVoltar";

export default function CadastroScreen() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmaSenha, setMostrarConfirmaSenha] = useState(false);
  const [aceito, setAceito] = useState(false);
  const [carregandoCadastro, setCarregandoCadastro] = useState(false);

  const [erroNome, setErroNome] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroConfirmarSenha, setErroConfirmarSenha] = useState("");
  const [erroTermos, setErroTermos] = useState("");

  const handleCadastrar = async () => {
    setErroNome("");
    setErroEmail("");
    setErroSenha("");
    setErroConfirmarSenha("");
    setErroTermos("");

    let temErro = false;

    if (!nome.trim()) {
      setErroNome("O nome é obrigatório.");
      temErro = true;
    }

    if (!email.trim()) {
      setErroEmail("O e-mail é obrigatório.");
      temErro = true;
    }

    if (!senha || senha.length < 6) {
      setErroSenha("A senha deve ter pelo menos 6 caracteres.");
      temErro = true;
    }

    if (senha !== confirmarSenha) {
      setErroConfirmarSenha("As senhas não coincidem.");
      temErro = true;
    }

    if (!aceito) {
      setErroTermos("Você deve aceitar os termos.");
      temErro = true;
    }

    if (temErro) return;

    setCarregandoCadastro(true);
    try {
      const resultado = await cadastrarUsuario(email, senha, nome);
      if (resultado) {
        navigation.navigate("Login");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErroEmail("Este e-mail já está em uso.");
      } else if (error.code === "auth/invalid-email") {
        setErroEmail("E-mail inválido.");
      } else if (error.code === "auth/weak-password") {
        setErroSenha("Senha fraca. Use pelo menos 6 caracteres.");
      } else {
        setErroEmail("Erro ao cadastrar. Tente novamente.");
      }
    } finally {
      setCarregandoCadastro(false);
    }
  };

  return (
    <View style={styles.container}>
      <SetaVoltar onPress={() => navigation.goBack()} />

      <Text style={styles.titulo}>Crie uma conta</Text>
      <Text style={styles.subtitulo}>Os campos em (*) são obrigatórios</Text>

      <Text style={styles.text_input}>Nome*</Text>
      <TextInput
        placeholder="Nome*"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      {erroNome ? <Text style={styles.erro}>{erroNome}</Text> : null}

      <Text style={styles.text_input}>E-mail*</Text>
      <TextInput
        placeholder="E-mail*"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {erroEmail ? <Text style={styles.erro}>{erroEmail}</Text> : null}

      <View style={styles.inputWrapper}>
        <Text style={styles.text_input}>Senha*</Text>
        <TextInput
          placeholder="Senha*"
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
          secureTextEntry={!mostrarSenha}
        />
        <TouchableOpacity
          style={styles.iconEye}
          onPress={() => setMostrarSenha(!mostrarSenha)}
        >
          <Icon
            name={mostrarSenha ? "visibility" : "visibility-off"}
            size={24}
          />
        </TouchableOpacity>
      </View>
      {erroSenha ? <Text style={styles.erro}>{erroSenha}</Text> : null}

      <View style={styles.inputWrapper}>
        <Text style={styles.text_input}>Confirmar senha*</Text>
        <TextInput
          placeholder="Confirmar senha*"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          style={styles.input}
          secureTextEntry={!mostrarConfirmaSenha}
        />
        <TouchableOpacity
          style={styles.iconEye}
          onPress={() => setMostrarConfirmaSenha(!mostrarConfirmaSenha)}
        >
          <Icon
            name={mostrarConfirmaSenha ? "visibility" : "visibility-off"}
            size={24}
          />
        </TouchableOpacity>
      </View>
      {erroConfirmarSenha ? (
        <Text style={styles.erro}>{erroConfirmarSenha}</Text>
      ) : null}

      <TouchableOpacity
        onPress={() => setAceito(!aceito)}
        style={styles.checkboxContainer}
      >
        <Icon
          name={aceito ? "check-box" : "check-box-outline-blank"}
          size={24}
          color={"#0026ff"}
          style={styles.checkboxEmoji}
        />
        <Text style={styles.termoTexto}>
          Li e estou de acordo com o{" "}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://example.com/politica")}
          >
            Termo de Uso e Política de Privacidade
          </Text>
        </Text>
      </TouchableOpacity>
      {erroTermos ? (
        <Text style={[styles.erro, styles.erroTermos]}>{erroTermos}</Text>
      ) : null}

      <TouchableOpacity
        style={[styles.botao, carregandoCadastro && { opacity: 0.5 }]}
        onPress={handleCadastrar}
        disabled={carregandoCadastro}
      >
        {carregandoCadastro ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.botaoTexto}>Cadastrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  titulo: {
    fontSize: 28,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitulo: {
    textAlign: "center",
    color: "#5c5c5c",
    fontSize: 14,
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
  },
  iconEye: {
    position: "absolute",
    marginLeft: "88%",
    top: 56,
  },
  erro: {
    color: "red",
    fontSize: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 28,
  },
  checkboxEmoji: {
    fontSize: 22,
    marginRight: 10,
  },
  termoTexto: {
    flex: 1,
    flexWrap: "wrap",
  },
  link: { color: "blue", textDecorationLine: "underline" },
  botao: {
    backgroundColor: "#FFc72c",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginTop: 42,
  },
  botaoTexto: { fontWeight: "500", fontSize: 18 },

  text_input: { marginLeft: 8, marginBottom: -16, marginTop: 22 },

  erroTermos: { marginLeft: 32 },
});
