import { Routes, Route } from 'react-router-dom';
import HomeScreen             from './screens/HomeScreen';
import ProductDetailsScreen   from './screens/ProductDetailsScreen';
import ShoppingCartScreen     from './screens/ShoppingCartScreen';
import CheckoutScreen         from './screens/CheckoutScreen';
import MyProfileScreen        from './screens/MyProfileScreen';
import SearchResultsScreen    from './screens/SearchResultsScreen';
import SmartSearchFiltersScreen from './screens/SmartSearchFiltersScreen';
import DealsLoyaltyHubScreen  from './screens/DealsLoyaltyHubScreen';
import ProductComparisonScreen from './screens/ProductComparisonScreen';

export default function App() {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen relative bg-background overflow-x-hidden">
      <Routes>
        <Route path="/"               element={<HomeScreen />} />
        <Route path="/search"         element={<SearchResultsScreen />} />
        <Route path="/search/filters" element={<SmartSearchFiltersScreen />} />
        <Route path="/product/:id"    element={<ProductDetailsScreen />} />
        <Route path="/cart"           element={<ShoppingCartScreen />} />
        <Route path="/checkout"       element={<CheckoutScreen />} />
        <Route path="/profile"        element={<MyProfileScreen />} />
        <Route path="/deals"          element={<DealsLoyaltyHubScreen />} />
        <Route path="/compare"        element={<ProductComparisonScreen />} />
      </Routes>
    </div>
  );
}
