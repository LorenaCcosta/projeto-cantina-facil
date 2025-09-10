import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CadastroScreen from "./src/screens/CadastroScreen";
import RecuperarSenhaScreen from "./src/screens/RecuperarSenhaScreen";
import DetalhesProdutoScreen from "./src/screens/DetalhesProdutoScreen";
import CartScreen from "./src/screens/CartScreen";

import AppTabs from "./src/components/AppTabs";
import { CartProvider } from "./src/components/CartContext";
import FloatingCartButton from "./src/components/FloatingCartButton";

const Stack = createNativeStackNavigator();

// wrapper pra renderizar FAB por cima de um componente
const withCartFab = (Component) => (props) => (
  <View style={{ flex: 1 }}>
    <Component {...props} />
    <FloatingCartButton />
  </View>
);

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "left", "bottom"]}>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
            <Stack.Screen name="RecuperarSenha" component={RecuperarSenhaScreen} />
            {/* Tabs como Home, com FAB do carrinho por cima */}
            <Stack.Screen name="Tabs" component={withCartFab(AppTabs)} />
            {/* Detalhe com FAB também */}
            <Stack.Screen
              name="DetalheProduto"
              component={withCartFab(DetalhesProdutoScreen)}
              options={{ headerShown: true, title: "Detalhes do produto" }}
            />
            {/* Tela do carrinho */}
            <Stack.Screen name="Carrinho" component={CartScreen} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </CartProvider>
  );
}
