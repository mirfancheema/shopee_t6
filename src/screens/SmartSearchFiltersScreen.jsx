import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categoryOptions = [
  { id: 'all-cats', label: 'All Categories',    icon: 'grid_view' },
  { id: 'appliances', label: 'Home Appliances', icon: 'blender' },
  { id: 'cookware',   label: 'Cookware',        icon: 'skillet' },
  { id: 'storage',    label: 'Storage',         icon: 'kitchen' },
  { id: 'cutlery',    label: 'Cutlery',         icon: 'flatware' },
  { id: 'dining',     label: 'Dining',          icon: 'restaurant' },
];

const priceRanges = [
  { id: 'any',     label: 'Any Price' },
  { id: 'u25',     label: 'Under $25' },
  { id: '25-50',   label: '$25 – $50' },
  { id: '50-100',  label: '$50 – $100' },
  { id: '100-200', label: '$100 – $200' },
  { id: 'o200',    label: 'Over $200' },
];

const ratingOptions = [4, 3, 2];
const locationOptions = ['All Locations', 'Singapore', 'Malaysia', 'Indonesia', 'Thailand'];

export default function SmartSearchFiltersScreen() {
  const navigate = useNavigate();
  const [selectedCats, setSelectedCats] = useState(['appliances']);
  const [priceRange, setPriceRange] = useState('any');
  const [minRating, setMinRating] = useState(null);
  const [location, setLocation] = useState('All Locations');
  const [mallOnly, setMallOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [freeShip, setFreeShip] = useState(false);

  const toggleCat = (id) => {
    if (id === 'all-cats') { setSelectedCats([]); return; }
    setSelectedCats(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const activeCount = [
    selectedCats.length > 0 ? 1 : 0,
    priceRange !== 'any' ? 1 : 0,
    minRating ? 1 : 0,
    location !== 'All Locations' ? 1 : 0,
    mallOnly ? 1 : 0,
    verifiedOnly ? 1 : 0,
    freeShip ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between px-4 h-14 max-w-[430px] fixed top-0 z-50 w-full bg-white shadow-sm border-b border-zinc-100 pt-safe">
        <button onClick={() => navigate(-1)} className="p-1" aria-label="Close filters">
          <span className="material-symbols-outlined text-primary text-[22px]">arrow_back</span>
        </button>
        <h1 className="text-h3 text-on-surface font-bold">Filters</h1>
        <button
          onClick={() => {
            setSelectedCats([]);
            setPriceRange('any');
            setMinRating(null);
            setLocation('All Locations');
            setMallOnly(false);
            setVerifiedOnly(false);
            setFreeShip(false);
          }}
          className="text-primary text-label-sm font-semibold"
        >
          Reset
        </button>
      </header>

      <main className="pt-14 pb-24 min-h-screen bg-[#F5F5F5]">
        {/* Smart Defaults Banner */}
        <section className="bg-tertiary px-4 py-3 mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-on-tertiary text-[20px]">auto_awesome</span>
          <p className="text-caption text-on-tertiary">
            Smart defaults applied — accessories filtered out based on your search for <strong>home appliances</strong>
          </p>
        </section>

        {/* Category */}
        <section className="bg-white mb-2 px-4 py-4">
          <h2 className="text-h3 text-on-surface font-semibold mb-3">Category</h2>
          <div className="grid grid-cols-3 gap-2">
            {categoryOptions.map((cat) => {
              const isSelected = selectedCats.includes(cat.id) || (cat.id === 'all-cats' && selectedCats.length === 0);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCat(cat.id)}
                  className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center overflow-hidden ${
                    isSelected
                      ? 'border-primary bg-primary-fixed text-primary'
                      : 'border-surface-variant bg-surface-container-lowest text-on-surface-variant'
                  } active:opacity-70`}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 border-t-[20px] border-l-[20px] border-t-primary border-l-transparent">
                      <span className="absolute -top-[18px] -left-[4px] material-symbols-outlined text-white text-[10px]">check</span>
                    </div>
                  )}
                  <span className={`material-symbols-outlined text-[22px] ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {cat.icon}
                  </span>
                  <span className="text-caption leading-tight">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Price Range */}
        <section className="bg-white mb-2 px-4 py-4">
          <h2 className="text-h3 text-on-surface font-semibold mb-3">Price Range</h2>
          <div className="flex flex-wrap gap-2">
            {priceRanges.map((pr) => (
              <button
                key={pr.id}
                onClick={() => setPriceRange(pr.id)}
                className={`px-3 py-1.5 rounded-full border text-label-sm ${
                  priceRange === pr.id
                    ? 'border-primary bg-primary-fixed text-primary'
                    : 'border-surface-variant text-on-surface-variant'
                }`}
              >
                {pr.label}
              </button>
            ))}
          </div>
        </section>

        {/* Minimum Rating */}
        <section className="bg-white mb-2 px-4 py-4">
          <h2 className="text-h3 text-on-surface font-semibold mb-3">Minimum Rating</h2>
          <div className="flex gap-2">
            {ratingOptions.map((r) => (
              <button
                key={r}
                onClick={() => setMinRating(minRating === r ? null : r)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-label-sm ${
                  minRating === r
                    ? 'border-primary bg-primary-fixed text-primary'
                    : 'border-surface-variant text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-secondary-container text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                {r}+
              </button>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="bg-white mb-2 px-4 py-4">
          <h2 className="text-h3 text-on-surface font-semibold mb-3">Ship From</h2>
          <div className="flex flex-wrap gap-2">
            {locationOptions.map((loc) => (
              <button
                key={loc}
                onClick={() => setLocation(loc)}
                className={`px-3 py-1.5 rounded-full border text-label-sm ${
                  location === loc
                    ? 'border-primary bg-primary-fixed text-primary'
                    : 'border-surface-variant text-on-surface-variant'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </section>

        {/* Toggles */}
        <section className="bg-white mb-2">
          {[
            { label: 'Shopee Mall Only', desc: 'Official brand stores', value: mallOnly, set: setMallOnly },
            { label: 'Authenticity Verified', desc: 'Genuine product guarantee', value: verifiedOnly, set: setVerifiedOnly },
            { label: 'Free Shipping', desc: 'No delivery cost', value: freeShip, set: setFreeShip },
          ].map((toggle, i) => (
            <div
              key={toggle.label}
              className={`flex items-center gap-3 px-4 py-3 ${i < 2 ? 'border-b border-surface-container' : ''}`}
            >
              <div className="flex-1">
                <p className="text-body-md text-on-surface font-medium">{toggle.label}</p>
                <p className="text-caption text-on-surface-variant">{toggle.desc}</p>
              </div>
              <button
                onClick={() => toggle.set(v => !v)}
                className={`w-10 h-6 rounded-full transition-colors ${toggle.value ? 'bg-primary' : 'bg-surface-container-high'}`}
                role="switch"
                aria-checked={toggle.value}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${toggle.value ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </section>
      </main>

      {/* Fixed Apply Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-surface-container shadow-[0_-2px_10px_rgba(0,0,0,0.06)] z-50 pb-safe px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-primary text-on-primary py-3 rounded-full text-label-sm font-bold active:opacity-80"
        >
          Apply Filters{activeCount > 0 ? ` (${activeCount})` : ''}
        </button>
      </div>
    </>
  );
}
