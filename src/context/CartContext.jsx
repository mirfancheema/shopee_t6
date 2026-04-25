import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { cartItems as initialItems } from '../data/mockData';

export const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard',     desc: '3–5 business days',      price: 3.99,  icon: 'local_shipping' },
  { id: 'express',  label: 'Express',      desc: '1–2 business days',      price: 7.99,  icon: 'bolt' },
  { id: 'sameday',  label: 'Same-Day',     desc: 'Delivered today by 10pm', price: 12.99, icon: 'directions_run' },
  { id: 'free',     label: 'Free Shipping', desc: '5–7 business days',      price: 0,     icon: 'redeem' },
];

const shops = [...new Set(initialItems.map(i => i.shopName))];

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(
    initialItems.map(item => ({ ...item, selected: true }))
  );

  // One delivery method per shop, default to 'standard'
  const [deliveryMethods, setDeliveryMethodsState] = useState(
    Object.fromEntries(shops.map(s => [s, 'standard']))
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

  const setDeliveryMethod = useCallback((shopName, methodId) => {
    setDeliveryMethodsState(prev => ({ ...prev, [shopName]: methodId }));
  }, []);

  const selectedItems = items.filter(i => i.selected);
  const subtotal = selectedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const selectedCount = selectedItems.length;
  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);

  // Sum shipping cost for shops that have at least one selected item
  const shippingTotal = useMemo(() => {
    const activeShops = [...new Set(selectedItems.map(i => i.shopName))];
    return activeShops.reduce((sum, shop) => {
      const method = DELIVERY_OPTIONS.find(o => o.id === deliveryMethods[shop]) || DELIVERY_OPTIONS[0];
      return sum + method.price;
    }, 0);
  }, [selectedItems, deliveryMethods]);

  return (
    <CartContext.Provider value={{
      items, selectedItems, subtotal, shippingTotal, selectedCount, cartCount,
      deliveryMethods, setDeliveryMethod,
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
