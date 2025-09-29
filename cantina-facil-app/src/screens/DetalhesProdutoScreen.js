// DetalheProduto.js
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../components/CartContext";

export default function DetalheProduto({ route, navigation }) {
  const { produto } = route.params; 
  const { addItem } = useCart();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}
    >
      {/* Imagem grande */}
      <Image source={{ uri: produto.imagemUrl }} style={styles.img} />

      {/* Botão voltar */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        {/* Nome */}
        <Text style={styles.nome}>{produto.nome}</Text>

        {/* Descrição */}
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.descricao}>{produto.descricao}</Text>

        {/* Preço */}
        <Text style={styles.preco}>
          R$ {produto.preco.toFixed(2).replace(".", ",")}
        </Text>

        {/* Botão adicionar */}
        <TouchableOpacity style={styles.btn} onPress={() => addItem()}>
          <Text style={styles.btnText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  img: { width: "100%", height: 200 },
  backBtn: { position: "absolute", top: 20, left: 16, backgroundColor:"#fff", borderRadius:20, padding:6 },
  nome: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  label: { fontSize: 14, fontWeight: "600", marginTop: 8 },
  descricao: { fontSize: 14, color: "#555", marginTop: 4 },
  preco: { marginTop: 16, fontSize: 18, fontWeight: "bold", color: "#2e7d32" },
  btn: { marginTop: 20, backgroundColor: "#FFC107", padding: 14, borderRadius: 10, alignItems: "center" },
  btnText: { fontWeight: "700", color: "#333" },
  cartFab: { position:"absolute", bottom:20, right:20, backgroundColor:"#FFC107", height:56, width:56, borderRadius:28, alignItems:"center", justifyContent:"center" },
  badge: { position:"absolute", top:-6, right:-6, backgroundColor:"#fff", borderRadius:10, minWidth:20, height:20, alignItems:"center", justifyContent:"center", borderWidth:2, borderColor:"#FFC107", paddingHorizontal:4 },
  badgeText: { fontWeight:"700", fontSize:12, color:"#333" },
});
