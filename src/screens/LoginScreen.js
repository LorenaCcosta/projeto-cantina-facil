import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUsuario } from "../config/auth/authService";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregandoLogin, setCarregandoLogin] = useState(false);
  const [erroLogin, setErroLogin] = useState("");

  const handleLogin = async () => {
    setCarregandoLogin(true);
    setErroLogin("");

    try {
      const login = await loginUsuario(email, senha);
      if (login) {
        // Reset para as abas e foca na aba "Início"
        navigation.reset({
          index: 0,
          routes: [{ name: "Tabs", params: { screen: "Início" } }],
        });
      }
    } catch (error) {
      if (error.code === "auth/user-disabled") {
        Alert.alert("Usuário desativado", "Entre em contato com o suporte.");
      } else if (error.code === "auth/network-request-failed") {
        Alert.alert("Erro de rede", "Verifique sua conexão.");
      } else if (error.code === "auth/invalid-credential") {
        setErroLogin("E-mail ou senha incorreta.");
      } else if (error.code === "auth/invalid-email") {
        setErroLogin("E-mail inválido.");
      } else {
        setErroLogin("Erro ao fazer login. Tente novamente.");
      }
    } finally {
      setCarregandoLogin(false);
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
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.titulo}>Login</Text>

        <Text style={styles.textEmail}>E-mail</Text>
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
        />

        <View style={styles.inputWrapper}>
          <Text style={styles.textSenha}>Senha</Text>
          <TextInput
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            style={[styles.input, styles.inputSenha]}
            secureTextEntry={!mostrarSenha}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.iconEye}
            onPress={() => setMostrarSenha(!mostrarSenha)}
            accessibilityLabel={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
          >
            <Icon name={mostrarSenha ? "visibility" : "visibility-off"} size={24} />
          </TouchableOpacity>
        </View>

        {erroLogin ? <Text style={styles.erroLogin}>{erroLogin}</Text> : null}

        <Text
          onPress={() => navigation.navigate("RecuperarSenha")}
          style={styles.esqueciSenha}
        >
          Esqueceu sua senha?
        </Text>

        <TouchableOpacity
          style={[styles.buttonAmarelo, (!email.trim() || !senha) && { opacity: 0.5 }]}
          onPress={handleLogin}
          disabled={!email.trim() || !senha || carregandoLogin}
        >
          {carregandoLogin ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonTextPreto}>Entrar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.divisao}>
          <View style={styles.linha} />
          <Text>Ou</Text>
          <View style={styles.linha} />
        </View>

        <Text style={{ textAlign: "center", marginBottom: 8 }}>
          Não tem uma conta? Crie uma
        </Text>

        <TouchableOpacity
          style={styles.buttonBorda}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.buttonTextBorda}>Criar conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 18,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  erroLogin: {
    color: "red",
    fontSize: 13,
    marginBottom: 24,
    marginTop: -18,
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    marginTop: 4,
  },
  inputSenha: {
    paddingRight: 54,
  },
  textEmail: { marginLeft: 8, marginBottom: 4 },
  textSenha: { marginLeft: 8, marginBottom: 4, marginTop: 8 },
  iconEye: {
    position: "absolute",
    right: 16,
    top: 46,
  },
  esqueciSenha: {
    color: "blue",
    textAlign: "left",
    marginBottom: 42,
    textDecorationLine: "underline",
    marginTop: -10,
    width: 160,
  },
  buttonAmarelo: {
    backgroundColor: "#FFc72c",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonTextPreto: { fontSize: 18 },
  divisao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginVertical: 10,
    marginBottom: 18,
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  buttonBorda: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  buttonTextBorda: { fontSize: 18 },
});
