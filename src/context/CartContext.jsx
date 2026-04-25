import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { cartItems as initialItems } from '../data/mockData';

export const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard',      desc: '3–5 business days',       price: 3.99,  icon: 'local_shipping' },
  { id: 'express',  label: 'Express',       desc: '1–2 business days',       price: 7.99,  icon: 'bolt' },
  { id: 'sameday',  label: 'Same-Day',      desc: 'Delivered today by 10pm', price: 12.99, icon: 'directions_run' },
  { id: 'free',     label: 'Free Shipping', desc: '5–7 business days',       price: 0,     icon: 'redeem' },
];

const shops = [...new Set(initialItems.map(i => i.shopName))];
const defaultItems = initialItems.map(item => ({ ...item, selected: true }));
const defaultDelivery = Object.fromEntries(shops.map(s => [s, 'standard']));

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Persist cart items across page refreshes
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('shopee-cart');
      return saved ? JSON.parse(saved) : defaultItems;
    } catch { return defaultItems; }
  });

  // Persist delivery method selections
  const [deliveryMethods, setDeliveryMethodsState] = useState(() => {
    try {
      const saved = localStorage.getItem('shopee-delivery');
      return saved ? JSON.parse(saved) : defaultDelivery;
    } catch { return defaultDelivery; }
  });

  useEffect(() => {
    localStorage.setItem('shopee-cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('shopee-delivery', JSON.stringify(deliveryMethods));
  }, [deliveryMethods]);

  const updateQty = useCallback((id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const addItem = useCallback((product, qty = 1) => {
    setItems(prev => {
      const exists = prev.find(i => i.productId === product.id);
      if (exists) {
        return prev.map(i =>
          i.productId === product.id ? { ...i, qty: i.qty + qty, selected: true } : i
        );
      }
      return [...prev, {
        id: `c-${product.id}-${Date.now()}`,
        productId: product.id,
        title: product.title,
        variant: 'Default',
        price: product.price,
        originalPrice: product.originalPrice,
        qty,
        shopName: product.shopName,
        image: product.images[0],
        selected: true,
      }];
    });
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

  const clearCart = useCallback(() => {
    setItems([]);
    setDeliveryMethodsState(defaultDelivery);
    localStorage.removeItem('shopee-cart');
    localStorage.removeItem('shopee-delivery');
  }, []);

  const selectedItems = items.filter(i => i.selected);
  const subtotal = selectedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const selectedCount = selectedItems.length;
  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);

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
      updateQty, removeItem, addItem, clearCart, toggleItem, toggleShop, toggleAll,
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
