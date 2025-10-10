import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();
const CART_STORAGE_KEY = "@cantina_facil:cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    carregarCarrinho();
  }, []);

  useEffect(() => {
    if (carregado) {
      salvarCarrinho();
    }
  }, [items, carregado]);

  const carregarCarrinho = async () => {
    try {
      const dados = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (dados) {
        setItems(JSON.parse(dados));
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
    } finally {
      setCarregado(true);
    }
  };

  const salvarCarrinho = async () => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Erro ao salvar carrinho:", error);
    }
  };

  const addItem = (produto, qtd = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.id === produto.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qtd: copy[i].qtd + qtd };
        return copy;
      }
      return [...prev, { ...produto, qtd }];
    });
  };

  const updateQuantity = (id, novaQtd) => {
    if (novaQtd <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => {
      const copy = [...prev];
      const i = copy.findIndex((p) => p.id === id);
      if (i >= 0) {
        copy[i] = { ...copy[i], qtd: novaQtd };
      }
      return copy;
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  
  const clear = () => setItems([]);

  const count = useMemo(
    () => items.reduce((acc, it) => acc + (it.qtd || 0), 0),
    [items]
  );

  const total = useMemo(
    () => items.reduce((acc, it) => acc + (it.preco || 0) * (it.qtd || 0), 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clear, count, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
