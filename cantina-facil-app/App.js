// App.js
import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import LoginScreen from "./src/screens/LoginScreen";
import CadastroScreen from "./src/screens/CadastroScreen";
import RecuperarSenhaScreen from "./src/screens/RecuperarSenhaScreen";
import CartScreen from "./src/screens/CartScreen";

import AppTabs from "./src/components/AppTabs";
import { CartProvider } from "./src/components/CartContext";
import FloatingCartButton from "./src/components/FloatingCartButton";

const Stack = createNativeStackNavigator();

// HOC para renderizar o botão flutuante do carrinho por cima
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
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
            <Stack.Screen name="RecuperarSenha" component={RecuperarSenhaScreen} />

            {/* App com abas (cada aba tem seu Stack interno) */}
            <Stack.Screen name="Tabs" component={withCartFab(AppTabs)} />

            {/* Carrinho pode (ou não) mostrar a tab bar. 
                Se você quiser que a tab bar apareça também no Carrinho,
                coloque o Carrinho dentro de algum Stack de aba em AppTabs. */}
            <Stack.Screen name="Carrinho" component={CartScreen} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </CartProvider>
  );
}
