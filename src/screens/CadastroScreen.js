import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { cadastrarUsuario } from "../config/auth/authService";
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
      const cadastro = await cadastrarUsuario(email, senha, nome);
      if (cadastro) {
        navigation.navigate("Login");
        Alert.alert(
          "Cadastro Realizado!",
          "Verifique seu e-mail para ativar a conta em sua caixa de entrada ou a pasta de spam."
        );
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErroEmail("Este e-mail já está em uso.");
      } else if (error.code === "auth/invalid-email") {
        setErroEmail("E-mail inválido.");
      } else if (error.code === "auth/weak-password") {
        setErroSenha("Senha fraca, use pelo menos 6 caracteres.");
      } else if (error.code === "auth/missing-password") {
        setErroSenha("A senha é obrigatória.");
      } else if (error.code === "auth/missing-email") {
        setErroEmail("O e-mail é obrigatório.");
      } else if (error.code === "auth/network-request-failed") {
        Alert.alert("Falha na conexão", "Verifique sua internet.");
      } else {
        Alert.alert("Erro ao cadastrar", "Tente novamente.");
      }
    } finally {
      setCarregandoCadastro(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SetaVoltar onPress={() => navigation.goBack()} />

        <Text style={styles.titulo}>Crie uma conta</Text>
        <Text style={styles.subtitulo}>Os campos em (*) são obrigatórios</Text>

        <Text style={styles.text_input}>Nome*</Text>
        <TextInput
          placeholder="Somente seu primeiro nome*"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          maxLength={12}
          returnKeyType="next"
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
          autoCorrect={false}
          returnKeyType="next"
        />
        {erroEmail ? <Text style={styles.erro}>{erroEmail}</Text> : null}

        <View style={styles.inputWrapper}>
          <Text style={styles.text_input}>Senha*</Text>
          <TextInput
            placeholder="Senha*"
            value={senha}
            onChangeText={setSenha}
            style={[styles.input, styles.inputSenha]}
            secureTextEntry={!mostrarSenha}
            returnKeyType="next"
          />
          <TouchableOpacity
            style={styles.iconEye}
            onPress={() => setMostrarSenha(!mostrarSenha)}
            accessibilityLabel={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
          >
            <Icon name={mostrarSenha ? "visibility" : "visibility-off"} size={24} />
          </TouchableOpacity>
        </View>
        {erroSenha ? <Text style={styles.erro}>{erroSenha}</Text> : null}

        <View style={styles.inputWrapper}>
          <Text style={styles.text_input}>Confirmar senha*</Text>
          <TextInput
            placeholder="Confirmar senha*"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            style={[styles.input, styles.inputSenha]}
            secureTextEntry={!mostrarConfirmaSenha}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.iconEye}
            onPress={() => setMostrarConfirmaSenha(!mostrarConfirmaSenha)}
            accessibilityLabel={
              mostrarConfirmaSenha ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"
            }
          >
            <Icon name={mostrarConfirmaSenha ? "visibility" : "visibility-off"} size={24} />
          </TouchableOpacity>
        </View>
        {erroConfirmarSenha ? <Text style={styles.erro}>{erroConfirmarSenha}</Text> : null}

        <View style={styles.checkboxContainer}>
          <Icon
            onPress={() => setAceito(!aceito)}
            name={aceito ? "check-box" : "check-box-outline-blank"}
            size={24}
            color={"#0026ff"}
            style={styles.checkboxEmoji}
          />
          <Text style={styles.termoText}>
            Li e estou de acordo com o{" "}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("https://example.com/politica")}
            >
              Termo de Uso e Política de Privacidade
            </Text>
          </Text>
        </View>
        {erroTermos ? <Text style={[styles.erro, styles.erroTermos]}>{erroTermos}</Text> : null}

        <TouchableOpacity
          style={[
            styles.button,
            (!email.trim() || !senha || !aceito) && { opacity: 0.5 },
          ]}
          onPress={handleCadastrar}
          disabled={!email.trim() || !senha || carregandoCadastro || !aceito }
        >
          {carregandoCadastro ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
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
    right: 16,
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
  termoText: {
    flex: 1,
    flexWrap: "wrap",
  },
  link: { color: "blue", textDecorationLine: "underline" },
  button: {
    backgroundColor: "#FFc72c",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginTop: 42,
  },
  buttonText: { fontSize: 18 },
  text_input: { marginLeft: 8, marginBottom: -16, marginTop: 22 },
  erroTermos: { marginLeft: 32 },
  inputSenha: { paddingRight: 54 },
});
