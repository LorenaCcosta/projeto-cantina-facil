import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../components/CartContext";

export default function CartScreen() {
  const { items, updateQuantity, removeItem, clear, total } = useCart();

  return (
    <View style={s.container}>
      <Text style={s.title}>Meu Carrinho</Text>

      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 32 }}>Seu carrinho está vazio.</Text>}
        renderItem={({ item }) => (
          <View style={s.item}>
            <Image source={{ uri: item.imagemUrl }} style={s.img} />
            <View style={{ flex: 1 }}>
              <Text style={s.nome}>{item.nome}</Text>
              <Text style={s.preco}>
                {Number(item.preco).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
              <View style={s.qtdControls}>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.qtd - 1)}
                  style={s.qtdBtn}
                >
                  <Ionicons name="remove" size={18} color="#333" />
                </TouchableOpacity>
                <Text style={s.qtdText}>{item.qtd}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.qtd + 1)}
                  style={s.qtdBtn}
                >
                  <Ionicons name="add" size={18} color="#333" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Ionicons name="trash-outline" size={20} color="#D32F2F" />
            </TouchableOpacity>
          </View>
        )}
      />

      {items.length > 0 && (
        <View style={s.footer}>
          <Text style={s.total}>
            Total: {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
          <TouchableOpacity style={s.btn} onPress={clear}>
            <Text style={s.btnTxt}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderColor: "#eee" },
  img: { width: 56, height: 56, borderRadius: 8, marginRight: 10, backgroundColor: "#eee" },
  nome: { fontWeight: "600", fontSize: 15 },
  preco: { color: "#666", marginTop: 2, fontSize: 14 },
  qtdControls: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 8 },
  qtdBtn: { 
    backgroundColor: "#f5f5f5", 
    borderRadius: 6, 
    width: 28, 
    height: 28, 
    alignItems: "center", 
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd"
  },
  qtdText: { fontWeight: "600", fontSize: 16, minWidth: 30, textAlign: "center" },
  footer: { paddingTop: 12, borderTopWidth: 1, borderColor: "#eee", marginTop: 8 },
  total: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  btn: { backgroundColor: "#FFC107", padding: 14, borderRadius: 10, alignItems: "center" },
  btnTxt: { fontWeight: "700", color: "#333" },
});
