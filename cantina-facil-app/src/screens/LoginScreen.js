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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUsuario } from "../../firebase/auth/authService";
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
      if (login) navigation.navigate("Home");
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
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.titulo}>Login</Text>

      <Text style={styles.textEmail}>E-mail</Text>
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <Text style={styles.textSenha}>Senha</Text>
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={[styles.input, styles.inputSenha]}
        secureTextEntry={!mostrarSenha}
      />

      <TouchableOpacity
        style={styles.iconEye}
        onPress={() => setMostrarSenha(!mostrarSenha)}
      >
        <Icon name={mostrarSenha ? "visibility" : "visibility-off"} size={24} />
      </TouchableOpacity>

      {erroLogin ? <Text style={styles.erroLogin}>{erroLogin}</Text> : null}

      {/* <TouchableOpacity
        onPress={() => navigation.navigate("RecuperarSenha")}
        style={styles.esqueciSenha_touch}
      > */}
      <Text
        onPress={() => navigation.navigate("RecuperarSenha")}
        style={styles.esqueciSenha}
      >
        Esqueceu sua senha?
      </Text>
      {/* </TouchableOpacity> */}

      <TouchableOpacity
        style={[
          styles.buttonAmarelo,
          (!email.trim() || !senha) && { opacity: 0.5 },
        ]}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
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
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  inputSenha: {
    paddingRight: 54,
  },
  textEmail: { marginLeft: 8, marginBottom: 4 },
  textSenha: { marginLeft: 8, marginBottom: 4 },
  iconEye: {
    position: "absolute",
    top: "52.5%",
    marginLeft: "93%",
  },
  esqueciSenha: {
    color: "blue",
    textAlign: "left",
    marginBottom: 42,
    textDecorationLine: "underline",
    marginTop: -10,
    width: 140,
  },
  buttonAmarelo: {
    backgroundColor: "#FFc72c",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonTextPreto: { fontWeight: "500", fontSize: 18 },
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
  buttonTextBorda: { fontWeight: "500", fontSize: 18 },
});
