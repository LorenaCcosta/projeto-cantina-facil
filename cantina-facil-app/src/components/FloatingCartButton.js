import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
const TAB_BAR_HEIGHT = 60;

export default function FloatingCartButton() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const route = useRoute();

 
  const isInsideTabs =
    route?.name === "Tabs" ||
    route?.name === "Início" ||
    route?.name === "Busca" ||
    route?.name === "Carteira" ||
    route?.name === "Pedidos" ||
    route?.name === "Perfil";

  const extraBottom = isInsideTabs ? TAB_BAR_HEIGHT : 0;
  const bottom = insets.bottom + extraBottom + 16;

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Carrinho")}
        activeOpacity={0.9}
        style={[styles.fab, { bottom }]}
      >
        <Ionicons name="cart" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 16,
    backgroundColor: "#FFA600",
    borderRadius: 50,
    height: 56,
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  fabText: {
    fontWeight: "700",
    color: "#000",
  },
});
