import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import LoginScreen from "./src/screens/LoginScreen";
import CadastroScreen from "./src/screens/CadastroScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RecuperarSenhaScreen from "./src/screens/RecuperarSenhaScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "right", "left", "bottom"]}
      >
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastro"
            component={CadastroScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecuperarSenha"
            component={RecuperarSenhaScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
