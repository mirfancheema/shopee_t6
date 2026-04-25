import { Link, useSearchParams } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import ProductCard from '../components/ui/ProductCard';
import FilterChip from '../components/ui/FilterChip';
import SearchBar from '../components/ui/SearchBar';
import { products } from '../data/mockData';

const sortOptions = ['Relevance', 'Latest', 'Top Sales', 'Price ↑', 'Price ↓'];

const filterChips = [
  { id: 'all',       label: 'All' },
  { id: 'mall',      label: 'Mall',          icon: 'verified' },
  { id: 'verified',  label: 'Verified',       icon: 'workspace_premium' },
  { id: 'free-ship', label: 'Free Shipping',  icon: 'local_shipping' },
  { id: 'on-sale',   label: 'On Sale',        icon: 'sell' },
];

// DEF-007: correctly parse sold strings like "2.5k", "25k+", "8.9k"
const parseSold = (sold) => {
  const s = String(sold).toLowerCase().replace('+', '');
  if (s.endsWith('k')) return parseFloat(s) * 1000;
  return parseFloat(s) || 0;
};

// DEF-011: map category IDs from HomeScreen to product category strings
const categoryLabelMap = {
  'cat-electronics': 'Electronics',
  'cat-fashion':     'Fashion',
  'cat-home':        'Home & Living',
  'cat-health':      'Health',
  'cat-gaming':      'Gaming',
  'cat-beauty':      'Beauty',
  'cat-pets':        'Pets',
};

// DEF-008: parse price range param from SmartSearchFilters
const priceRangeBounds = {
  'u25':     [0, 25],
  '25-50':   [25, 50],
  '50-100':  [50, 100],
  '100-200': [100, 200],
  'o200':    [200, Infinity],
};

export default function SearchResultsScreen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q          = searchParams.get('q') || '';
  const categoryId = searchParams.get('category') || '';

  // Advanced filters set by SmartSearchFiltersScreen (DEF-008)
  const mallParam      = searchParams.get('mall')      === '1';
  const verifiedParam  = searchParams.get('verified')  === '1';
  const freeShipParam  = searchParams.get('freeShip')  === '1';
  const priceRangeParam = searchParams.get('priceRange') || 'any';
  const ratingParam    = searchParams.get('rating') ? Number(searchParams.get('rating')) : null;

  // Chip filter synced with URL params so SmartFilters and chips stay consistent
  const activeChip = searchParams.get('chip') || 'all';
  const setActiveChip = (chipId) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (chipId === 'all') next.delete('chip');
      else next.set('chip', chipId);
      return next;
    }, { replace: true });
  };

  const [activeSort, setActiveSort] = useState('Relevance');

  const categoryLabel = categoryLabelMap[categoryId] || '';
  const displayQuery = q || categoryLabel || 'All Products';

  const filtered = products.filter(p => {
    // Match search query
    const matchesQuery = !q ||
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.category.toLowerCase().includes(q.toLowerCase());

    // DEF-011: match category param from HomeScreen
    const matchesCategory = !categoryLabel ||
      p.category.toLowerCase() === categoryLabel.toLowerCase();

    const base = matchesQuery && matchesCategory;

    // Quick chip filter takes priority over advanced filters
    if (activeChip === 'mall')      return base && p.isMall;
    if (activeChip === 'verified')  return base && p.verified;
    if (activeChip === 'free-ship') return base && p.freeShipping;  // DEF-006: implemented
    if (activeChip === 'on-sale')   return base && !!p.discountPct;

    // Apply advanced filters from SmartSearchFilters (DEF-008)
    let passes = base;
    if (mallParam)     passes = passes && p.isMall;
    if (verifiedParam) passes = passes && p.verified;
    if (freeShipParam) passes = passes && p.freeShipping;           // DEF-006
    if (ratingParam)   passes = passes && p.rating >= ratingParam;
    if (priceRangeParam !== 'any') {
      const [min, max] = priceRangeBounds[priceRangeParam] || [0, Infinity];
      passes = passes && p.price >= min && p.price <= max;
    }
    return passes;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (activeSort === 'Price ↑')   return a.price - b.price;
    if (activeSort === 'Price ↓')   return b.price - a.price;
    if (activeSort === 'Top Sales') return parseSold(b.sold) - parseSold(a.sold);  // DEF-007
    if (activeSort === 'Latest')    return products.indexOf(b) - products.indexOf(a); // DEF-010: higher index = newer
    return 0; // Relevance — preserve filter order
  });

  const hasAdvancedFilters = mallParam || verifiedParam || freeShipParam || priceRangeParam !== 'any' || ratingParam;

  return (
    <>
      <header className="flex items-center gap-2 px-3 h-14 w-full max-w-[430px] fixed top-0 z-50 bg-white shadow-sm border-b border-zinc-100 pt-safe">
        <Link to="/" aria-label="Go back">
          <span className="material-symbols-outlined text-primary text-[22px] p-1">arrow_back</span>
        </Link>
        <SearchBar defaultValue={q} />
        <Link to="/cart" className="flex-shrink-0" aria-label="Cart">
          <span className="material-symbols-outlined text-zinc-600 text-[22px] p-1">shopping_cart</span>
        </Link>
      </header>

      {/* Sticky filter bar */}
      <div className="fixed top-14 left-0 right-0 max-w-[430px] mx-auto z-40 bg-white border-b border-surface-container shadow-sm">
        <div className="flex gap-2 px-3 py-2 overflow-x-auto no-scrollbar">
          {filterChips.map((chip) => (
            <FilterChip
              key={chip.id}
              label={chip.label}
              icon={chip.icon}
              selected={activeChip === chip.id}
              onClick={() => setActiveChip(chip.id)}
            />
          ))}
          <Link to={`/search/filters?${searchParams.toString()}`}>
            <FilterChip
              label="Filters"
              icon="tune"
              selected={hasAdvancedFilters}
            />
          </Link>
        </div>
        <div className="flex items-center gap-2 px-3 pb-2 overflow-x-auto no-scrollbar">
          <span className="text-caption text-on-surface-variant flex-shrink-0">{sorted.length} results</span>
          <div className="flex gap-1.5">
            {sortOptions.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSort(s)}
                className={`text-caption px-2 py-0.5 rounded-full whitespace-nowrap border ${
                  activeSort === s
                    ? 'border-primary text-primary bg-primary-fixed'
                    : 'border-surface-variant text-on-surface-variant'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="pt-[100px] pb-20 min-h-screen">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3 px-4 text-center">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant">search_off</span>
            <h2 className="text-h2 text-on-surface">No results for "{displayQuery}"</h2>
            <p className="text-body-md text-on-surface-variant">Try different keywords or remove filters</p>
            <button
              onClick={() => setActiveChip('all')}
              className="text-primary text-label-sm font-semibold"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-[1px] p-[1px] bg-surface-container">
            {sorted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </>
  );
}
