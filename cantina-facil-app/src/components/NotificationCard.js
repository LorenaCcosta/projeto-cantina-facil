// src/components/NotificationCard.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

/**
 * props:
 * - titulo: string
 * - descricao: string
 * - quando: string (ex.: "Agora", "1d")
 * - iconSource: require(...) | {uri: string}
 * - bg?: string (cor do quadradinho do ícone)
 */
export default function NotificationCard({ titulo, descricao, quando, iconSource, bg = "#FFE7A2" }) {
  return (
    <View style={[styles.row, { backgroundColor: "#FFF3D2" }]} pointerEvents="none">
      <View style={[styles.iconBox, { backgroundColor: bg }]}>
        <Image source={iconSource} style={{ width: 28, height: 28, resizeMode: "contain" }} />
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.topLine}>
          <Text numberOfLines={1} style={styles.title}>{titulo}</Text>
          <Text style={styles.time}>{quando}</Text>
        </View>
        <Text numberOfLines={1} style={styles.desc}>{descricao}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderRadius: 4,
    padding: 10,
    paddingRight: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  topLine: { flexDirection: "row", alignItems: "center" },
  title: { flex: 1, fontWeight: "700", fontSize: 14, color: "#1A1A1A" },
  time: { marginLeft: 8, color: "#6B6B6B", fontWeight: "700", fontSize: 12 },
  desc: { color: "#2F2F2F", marginTop: 4, fontSize: 13 },
});
