// src/components/SetaVoltar.js
import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SetaVoltar({ onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} >
      <Ionicons name="arrow-back" size={28} color="#000" />
    </TouchableOpacity>
  );
}
