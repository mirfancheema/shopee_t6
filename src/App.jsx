import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomeScreen             from './screens/HomeScreen';
import ProductDetailsScreen   from './screens/ProductDetailsScreen';
import ShoppingCartScreen     from './screens/ShoppingCartScreen';
import CheckoutScreen         from './screens/CheckoutScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import MyProfileScreen        from './screens/MyProfileScreen';
import SearchResultsScreen    from './screens/SearchResultsScreen';
import SmartSearchFiltersScreen from './screens/SmartSearchFiltersScreen';
import DealsLoyaltyHubScreen  from './screens/DealsLoyaltyHubScreen';
import ProductComparisonScreen from './screens/ProductComparisonScreen';
import NotificationsScreen    from './screens/NotificationsScreen';

export default function App() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    setShowInstall(false);
  };

  return (
    <CartProvider>
      <div className="max-w-[430px] mx-auto min-h-screen relative bg-background overflow-x-hidden">
        {/* PWA install prompt banner */}
        {showInstall && (
          <div className="fixed top-0 left-0 right-0 max-w-[430px] mx-auto z-[60] bg-primary text-on-primary px-4 py-2 flex items-center gap-2 shadow-bar">
            <span className="material-symbols-outlined text-[20px]">install_mobile</span>
            <span className="text-label-sm flex-1">Install Shopee for the best experience</span>
            <button
              onClick={handleInstall}
              className="text-label-sm font-bold bg-white/20 px-3 py-1 rounded-full active:opacity-80"
            >
              Install
            </button>
            <button onClick={() => setShowInstall(false)} aria-label="Dismiss install prompt">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        <Routes>
          <Route path="/"                element={<HomeScreen />} />
          <Route path="/search"          element={<SearchResultsScreen />} />
          <Route path="/search/filters"  element={<SmartSearchFiltersScreen />} />
          <Route path="/product/:id"     element={<ProductDetailsScreen />} />
          <Route path="/cart"            element={<ShoppingCartScreen />} />
          <Route path="/checkout"        element={<CheckoutScreen />} />
          <Route path="/order-confirmed" element={<OrderConfirmationScreen />} />
          <Route path="/profile"         element={<MyProfileScreen />} />
          <Route path="/deals"           element={<DealsLoyaltyHubScreen />} />
          <Route path="/compare"         element={<ProductComparisonScreen />} />
          <Route path="/notifications"   element={<NotificationsScreen />} />
        </Routes>
      </div>
    </CartProvider>
  );
}
