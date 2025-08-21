// components/Carregando.js
import { View, Text, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function Carregando() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: -5,
            duration: 300,
            delay,
            useNativeDriver: true
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          })
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 150);
    animateDot(dot3, 300);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.dots}>
        <Animated.View style={[styles.dot, { transform: [{ translateY: dot1 }] }]} />
        <Animated.View style={[styles.dot, { transform: [{ translateY: dot2 }] }]} />
        <Animated.View style={[styles.dot, { transform: [{ translateY: dot3 }] }]} />
      </View>
      <Text style={styles.texto}>Carregando delícias da cantina...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  dots: {
    flexDirection: "row",
    marginBottom: 8,
    gap: 10
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "orange"
  },
  texto: {
    fontSize: 14,
    color: "#333"
  }
});
