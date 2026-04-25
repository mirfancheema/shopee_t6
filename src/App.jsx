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
  return (
    <CartProvider>
      <div className="max-w-[430px] mx-auto min-h-screen relative bg-background overflow-x-hidden">
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
