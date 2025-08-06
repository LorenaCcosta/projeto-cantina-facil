import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, ScrollView } from "react-native";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Loading from "../components/Loading"

export default function HomeScreen() {
  const [produtosPorTipo, setProdutosPorTipo] = useState({});
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      await Promise.all([buscarProdutos(), buscarNomeUsuario()]);
      setCarregando(false);
    };

    const timeout = setTimeout(() => {
      buscarDados();
    }, 500); // espera 500ms antes de buscar

    return () => clearTimeout(timeout);
  }, []);

  const buscarProdutos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "produtos"));
      const agrupados = {};

      querySnapshot.forEach((doc) => {
        const produto = doc.data();
        if (!produto.ativo) return;

        const tipo = produto.tipo || "Outros";
        if (!agrupados[tipo]) agrupados[tipo] = [];
        agrupados[tipo].push({ id: doc.id, ...produto });
      });

      setProdutosPorTipo(agrupados);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const buscarNomeUsuario = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const dados = docSnap.data();
        setNomeUsuario(dados.nome);
      } else {
        console.log("Usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar nome:", error);
    }
  };

  const renderItem = ({ item }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.imagemUrl }} style={styles.imagem} />
    <Text style={styles.nome}>{item.nome}</Text>
    <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
  </View>
);

  if (carregando) return <Loading />;

  return (
    <ScrollView style={styles.container}>
      {/* Topo */}
      <View style={styles.topo}>
        <View style={styles.topoHeader}>
          <View>
            <Text style={styles.ola}>Olá, {nomeUsuario}!</Text>
            <Text style={styles.cantina}>
              Cantina Prates <Text style={{ fontSize: 14 }}>▼</Text>
            </Text>
          </View>

          {/* Notificação */}
          <View style={styles.notificacao}>
            <Text style={styles.sino}>🔔</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeTexto}>2</Text>
            </View>
          </View>
        </View>

        {/* Categorias */}
       <View style={styles.categorias}>
        {Object.keys(produtosPorTipo).map((tipo) => (
            <Text key={tipo} style={styles.categoria}>
                {tipo}
            </Text>
        ))}
      </View>
      </View>

      {/* Produtos */}
      {Object.entries(produtosPorTipo).map(([tipo, lista]) => (
        <View key={tipo}>
          <View style={styles.header}>
            <Text style={styles.titulo}>{tipo}</Text>
            <Text style={styles.verTudo}>Ver tudo ›</Text>
          </View>
          <FlatList
            data={lista}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            horizontal={false}
            numColumns={3}
            scrollEnabled={false}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 10
  },
  titulo: { fontSize: 18, fontWeight: "bold" },
  verTudo: { color: "#007bff", fontSize: 14 },
  card: {
    alignItems: "left",
    width: 116,
  },
  imagem: {
    width: 118,
    height: 86,
    borderRadius: 8
  },
  nome: {
    marginTop: 8,
    fontWeight: "400",
    textAlign: "left"
  },
  preco: {
    fontSize: 16,
    fontWeight: 800,
  },
  topo: {
    backgroundColor: "#FFF5CC",
    padding: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  topoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  ola: {
    fontSize: 18,
    fontWeight: "bold"
  },
  cantina: {
    fontSize: 16
  },
  notificacao: {
    position: "relative"
  },
  sino: {
    fontSize: 24
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "orange",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center"
  },
  badgeTexto: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold"
  },
  categorias: {
    justifyContent: "space-around",
    textAlign:"left",
    marginTop: 8
  },
  categoria: {
    fontSize: 15,
    fontWeight: "500"
  },
});

