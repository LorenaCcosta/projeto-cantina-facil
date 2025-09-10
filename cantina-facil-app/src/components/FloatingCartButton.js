import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useCart } from "./CartContext";

export default function FloatingCartButton({ offsetBottom = 16, offsetRight = 20 }) {
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight?.() ?? 0; // funciona c/ ou sem tabs
  const { count } = useCart();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Abrir carrinho"
      activeOpacity={0.9}
      onPress={() => navigation.navigate("Carrinho")}
      style={[
        styles.fab,
        { right: offsetRight, bottom: tabBarHeight ? tabBarHeight + offsetBottom : offsetBottom + 8 },
      ]}
    >
      <Ionicons name="cart-outline" size={26} color="#fff" />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFC107",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
    }),
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: "#FFC107",
  },
  badgeText: { fontWeight: "700", color: "#333", fontSize: 12 },
});
