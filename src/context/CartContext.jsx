import { createContext, useContext, useState, useCallback } from 'react';
import { cartItems as initialItems } from '../data/mockData';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(
    initialItems.map(item => ({ ...item, selected: true }))
  );

  const updateQty = useCallback((id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  }, []);

  const toggleItem = useCallback((id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  }, []);

  const toggleShop = useCallback((shopName) => {
    setItems(prev => {
      const shopItems = prev.filter(i => i.shopName === shopName);
      const allSelected = shopItems.every(i => i.selected);
      return prev.map(item =>
        item.shopName === shopName ? { ...item, selected: !allSelected } : item
      );
    });
  }, []);

  const toggleAll = useCallback(() => {
    setItems(prev => {
      const allSelected = prev.every(i => i.selected);
      return prev.map(item => ({ ...item, selected: !allSelected }));
    });
  }, []);

  const selectedItems = items.filter(i => i.selected);
  const subtotal = selectedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const selectedCount = selectedItems.length;
  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, selectedItems, subtotal, selectedCount, cartCount,
      updateQty, toggleItem, toggleShop, toggleAll,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
