// src/screens/NotificationsScreen.js
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import NotificationCard from "../components/NotificationCard";
import SetaVoltar from "../components/SetaVoltar";
import { useNavigation } from "@react-navigation/native";

// use dois ícones locais (troque pelos seus arquivos/nomes)
const ICON_CART = require("../../assets/Carrinho_notificacao.png");
const ICON_CONGRATS = require("../../assets/Confete_notificacao.png");

// Conteúdo fixo (sem interação)
const DATA = [
  {
    id: "1",
    titulo: "Faça seu primeiro pedido no App!",
    descricao: "É Rápido e fácil",
    quando: "Agora",
    icon: ICON_CART,
    bg: "#FFA600",
  },
  {
    id: "2",
    titulo: "Parabéns sua conta foi criada",
    descricao: "Agora é só fazer o seu primeiro pedido!",
    quando: "1d",
    icon: ICON_CONGRATS,
    bg: "#FFD900",
  },
];

export default function NotificationsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* seta igual à tela de cadastro */}
      <SetaVoltar onPress={() => navigation.goBack()} />

      <Text style={styles.title}>Notificações</Text>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationCard
            titulo={item.titulo}
            descricao={item.descricao}
            quando={item.quando}
            iconSource={item.icon}
            bg={item.bg}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
});
