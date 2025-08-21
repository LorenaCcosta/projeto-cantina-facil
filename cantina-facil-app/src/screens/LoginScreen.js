import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUsuario } from "../../firebase/auth/authService";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      await loginUsuario(email, senha);
      navigation.navigate("Home");

    } catch (error) {
      alert("Erro no login: " + error.message);
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

      <TouchableOpacity style={styles.iconEye} onPress={() => setMostrarSenha(!mostrarSenha)}>
        <Icon name={mostrarSenha ? 'visibility': 'visibility-off'} size={24}/>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.esqueci}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoAmarelo} onPress={handleLogin}>
        <Text style={styles.botaoTextoPreto}>Entrar</Text>
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
        style={styles.botaoBorda}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.botaoTextoBorda}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff"},
  logo: { width: 150, height: 150, alignSelf: "center", marginBottom: 14, marginTop: 28
   },
  titulo: { fontSize: 28, fontWeight: "500", textAlign: "center", marginBottom: 36 },
  input: {
    borderWidth: 1,
    borderColor: "#9F9F9F",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    marginBottom: 20,
  },
  esqueci: { color: "blue", textAlign: "center", marginBottom: 42 },
  botaoAmarelo: {
    backgroundColor: "#FFD700",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginBottom: 15
  },
  botaoTextoPreto: { fontWeight: "500", fontSize: 18 },
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
    backgroundColor: "#ccc"
  },
  botaoBorda: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 10,
    alignItems: "center"
  },
  botaoTextoBorda: { fontWeight: "500", fontSize: 18 },

  textEmail: {
    marginLeft: 8,
    marginBottom: 4
  },

  textSenha: {
    marginLeft: 8,
    marginBottom: 4
  },

  iconEye: {
    position: 'absolute',
    top: '55%',
    marginLeft: '93%',
  }, 

  inputSenha: {
    paddingRight: 54
  }
});
