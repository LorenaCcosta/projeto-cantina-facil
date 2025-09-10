import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Telas principais
import HomeScreen from "../screens/HomeScreen";

import SearchScreen from "../screens/SearchScreen";     
import WalletScreen from "../screens/WalletScreen";    
import OrdersScreen from "../screens/OrdersScreen";     
import ProfileScreen from "../screens/ProfileScreen"

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const map = {
            "Início": "home-outline",
            "Busca": "search-outline",
            "Carteira": "wallet-outline",
            "Pedidos": "list-outline",
            "Perfil": "person-outline",
          };
          return <Ionicons name={map[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FFC107",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60, paddingBottom: 6, paddingTop: 6 },
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Busca" component={SearchScreen} />
      <Tab.Screen name="Carteira" component={WalletScreen} />
      <Tab.Screen name="Pedidos" component={OrdersScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
