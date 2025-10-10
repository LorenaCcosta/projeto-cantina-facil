// src/components/NotificationBell.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function NotificationBell({ count = 0, color = "#444444ff" }) {
  return (
    <View style={styles.container} pointerEvents="none">
      <Ionicons name="notifications" size={24} color={color} />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeTxt}>{count > 99 ? "99+" : String(count)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 42,
    height: 42,
    borderRadius: 50,
    backgroundColor: "#eeeeeeff",
    alignItems: "center",
    justifyContent: "center",
    top: 6,
  },
  badge: {
    position: "absolute",
    right: -2,
    top: -5,
    minWidth: 18,
    height: 18,
    borderRadius: 50,
    backgroundColor: "#FF9800",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 1,
  },
  badgeTxt: { color: "#fff", fontSize: 12, fontWeight: "700" },
});
