import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import ProductCard from '../components/ui/ProductCard';
import FilterChip from '../components/ui/FilterChip';
import SearchBar from '../components/ui/SearchBar';
import { products } from '../data/mockData';

const sortOptions = ['Relevance', 'Latest', 'Top Sales', 'Price ↑', 'Price ↓'];
const filterChips = [
  { id: 'all', label: 'All' },
  { id: 'mall', label: 'Mall', icon: 'verified' },
  { id: 'verified', label: 'Verified', icon: 'workspace_premium' },
  { id: 'free-ship', label: 'Free Shipping', icon: 'local_shipping' },
  { id: 'on-sale', label: 'On Sale', icon: 'sell' },
];

export default function SearchResultsScreen() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || 'Wireless Earbuds';
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('Relevance');
  const [showError] = useState(false);

  const filtered = products.filter(p => {
    const matchesQuery = p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.category.toLowerCase().includes(q.toLowerCase());
    if (activeFilter === 'mall') return matchesQuery && p.isMall;
    if (activeFilter === 'verified') return matchesQuery && p.verified;
    if (activeFilter === 'on-sale') return matchesQuery && p.discountPct;
    return matchesQuery;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (activeSort === 'Price ↑') return a.price - b.price;
    if (activeSort === 'Price ↓') return b.price - a.price;
    if (activeSort === 'Top Sales') return parseInt(b.sold) - parseInt(a.sold);
    return 0;
  });

  return (
    <>
      {/* Custom search header */}
      <header className="flex items-center gap-2 px-3 h-14 w-full max-w-[430px] fixed top-0 z-50 bg-white shadow-sm border-b border-zinc-100 pt-safe">
        <Link to="/" aria-label="Go back">
          <span className="material-symbols-outlined text-primary text-[22px] p-1">arrow_back</span>
        </Link>
        <SearchBar defaultValue={q} />
        <Link to="/cart" className="flex-shrink-0" aria-label="Cart">
          <span className="material-symbols-outlined text-zinc-600 text-[22px] p-1">shopping_cart</span>
        </Link>
      </header>

      {/* Non-modal error banner */}
      {showError && (
        <div className="fixed top-14 left-0 right-0 max-w-[430px] mx-auto z-40 bg-error-container px-4 py-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-on-error-container text-[18px]">wifi_off</span>
          <span className="text-body-md text-on-error-container flex-1">No internet connection. Showing cached results.</span>
        </div>
      )}

      {/* Sticky filter bar */}
      <div className="fixed top-14 left-0 right-0 max-w-[430px] mx-auto z-40 bg-white border-b border-surface-container shadow-sm">
        {/* Filter chips */}
        <div className="flex gap-2 px-3 py-2 overflow-x-auto no-scrollbar">
          {filterChips.map((chip) => (
            <FilterChip
              key={chip.id}
              label={chip.label}
              icon={chip.icon}
              selected={activeFilter === chip.id}
              onClick={() => setActiveFilter(chip.id)}
            />
          ))}
          <Link to="/search/filters">
            <FilterChip label="Filters" icon="tune" />
          </Link>
        </div>
        {/* Sort + results count */}
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
            <h2 className="text-h2 text-on-surface">No results for "{q}"</h2>
            <p className="text-body-md text-on-surface-variant">Try different keywords or remove filters</p>
            <button
              onClick={() => setActiveFilter('all')}
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
