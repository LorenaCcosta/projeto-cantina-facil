import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../components/CartContext";

export default function CartScreen() {
  const { items, removeItem, clear } = useCart();
  const total = items.reduce((s, it) => s + (it.preco || 0) * (it.qtd || 0), 0);

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
              <Text style={s.linha}>
                {item.qtd} x R$ {Number(item.preco).toFixed(2).replace(".", ",")}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Text style={s.remover}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {items.length > 0 && (
        <View style={s.footer}>
          <Text style={s.total}>Total: R$ {total.toFixed(2).replace(".", ",")}</Text>
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
  linha: { color: "#666", marginTop: 2 },
  remover: { color: "red", fontSize: 12 },
  footer: { paddingTop: 12, borderTopWidth: 1, borderColor: "#eee", marginTop: 8 },
  total: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  btn: { backgroundColor: "#FFC107", padding: 14, borderRadius: 10, alignItems: "center" },
  btnTxt: { fontWeight: "700", color: "#333" },
});
