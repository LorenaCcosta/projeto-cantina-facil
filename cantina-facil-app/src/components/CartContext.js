import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // items: [{ id, nome, preco, imagemUrl, qtd }]
  const [items, setItems] = useState([]);

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

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);

  const count = useMemo(
    () => items.reduce((acc, it) => acc + (it.qtd || 0), 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
