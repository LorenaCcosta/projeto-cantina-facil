// src/components/AppTabs.js
import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Telas
import HomeScreen from "../screens/HomeScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import DetalhesProdutoScreen from "../screens/DetalhesProdutoScreen";

import SearchScreen from "../screens/SearchScreen";
import WalletScreen from "../screens/WalletScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/** -------- Home Stack (aba "Início") ----------
 *  Coloque aqui todas as telas que devem mostrar a tab bar
 *  enquanto você navega a partir da Home: Notificações, Detalhes, etc.
 */
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeRoot" component={HomeScreen} />
      <Stack.Screen name="Notificacoes" component={NotificationsScreen} />
      <Stack.Screen
        name="DetalheProduto"
        component={DetalhesProdutoScreen}
      />
      {/* Futuras telas que devem manter a tab bar -> adicione aqui */}
    </Stack.Navigator>
  );
}

/** -------- Stacks das outras abas (opcional) ----------
 *  Se você quiser empilhar telas dentro de cada aba (ex.: Search -> filtros),
 *  crie Stacks também para as demais abas. Aqui vou usar telas simples.
 */

export default function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Início"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,

        tabBarIcon: ({ color, focused }) => {
          const icons = {
            Início: focused ? "home-sharp" : "home-outline",
            Busca: focused ? "search" : "search-outline",
            Carteira: focused ? "wallet" : "wallet-outline",
            Pedidos: focused ? "receipt" : "receipt-outline",
            Perfil: focused ? "person" : "person-outline",
          };
          return <Ionicons name={icons[route.name]} size={22} color={color} />;
        },

        tabBarLabel: ({ focused, color }) => (
          <Text style={{ fontSize: 12, color, fontWeight: focused ? "700" : "500" }}>
            {route.name}
          </Text>
        ),

        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
      })}
    >
      {/* A aba "Início" usa o Stack com Home, Notificações e Detalhes */}
      <Tab.Screen name="Início" component={HomeStack} />

      {/* As demais abas podem ser tela única ou também stacks próprios */}
      <Tab.Screen name="Busca" component={SearchScreen} />
      <Tab.Screen name="Carteira" component={WalletScreen} />
      <Tab.Screen name="Pedidos" component={OrdersScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
