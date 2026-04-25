import { Link } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import { products } from '../data/mockData';

const p1 = products.find(p => p.id === 'p10');
const p2 = products.find(p => p.id === 'p11');

const compareRows = [
  { label: 'Price',    key: 'price',    render: (v) => <span className="text-body-md text-primary font-bold">${v.toFixed(2)}</span> },
  { label: 'Rating',  key: 'rating',   render: (v) => (
    <div className="flex items-center gap-0.5">
      <span className="material-symbols-outlined text-secondary-container text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="text-body-md text-on-surface">{v}</span>
    </div>
  )},
  { label: 'Sold',     key: 'sold',     render: (v) => <span className="text-body-md text-on-surface">{v}</span> },
  { label: 'Mall',     key: 'isMall',   render: (v) => (
    <span className={`material-symbols-outlined text-[20px] ${v ? 'text-tertiary' : 'text-on-surface-variant'}`}>
      {v ? 'check_circle' : 'cancel'}
    </span>
  )},
  { label: 'Verified', key: 'verified', render: (v) => (
    <span className={`material-symbols-outlined text-[20px] ${v ? 'text-tertiary' : 'text-on-surface-variant'}`}>
      {v ? 'check_circle' : 'cancel'}
    </span>
  )},
  { label: 'Sensor',   spec: 'sensor',  render: (v) => <span className="text-body-md text-on-surface">{v || '—'}</span> },
  { label: 'Video',    spec: 'video',   render: (v) => <span className="text-body-md text-on-surface">{v || '—'}</span> },
  { label: 'Autofocus',spec: 'autofocus',render: (v) => <span className="text-body-md text-on-surface">{v || '—'}</span> },
];

const getValue = (product, row) => {
  if (row.spec) return product.specs?.[row.spec];
  return product[row.key];
};

export default function ProductComparisonScreen() {
  if (!p1 || !p2) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <span className="material-symbols-outlined text-[48px] text-on-surface-variant">compare</span>
        <p className="text-body-lg text-on-surface-variant">No products to compare</p>
        <Link to="/" className="text-primary text-label-sm font-semibold">Back to Home</Link>
      </div>
    );
  }

  return (
    <>
      <TopAppBar variant="back" title="Compare" />

      <main className="pt-14 pb-20 min-h-screen bg-[#F5F5F5]">
        {/* Sticky Product Header */}
        <div className="sticky top-14 z-40 bg-white border-b border-surface-container shadow-sm">
          <div className="grid grid-cols-[80px_1fr_1fr]">
            <div className="p-2 flex items-end">
              <span className="text-caption text-on-surface-variant">vs</span>
            </div>
            {[p1, p2].map((p) => (
              <div key={p.id} className="p-2 flex flex-col items-center gap-1 border-l border-surface-container">
                <div className="w-16 h-16 rounded overflow-hidden bg-surface-container-low">
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <p className="text-caption text-on-surface line-clamp-2 text-center leading-tight">{p.title}</p>
                {p.isMall && (
                  <span className="text-[8px] font-bold px-1.5 py-0.5 bg-primary text-white rounded uppercase">Mall</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <section className="bg-white mb-2">
          {compareRows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[80px_1fr_1fr] ${i < compareRows.length - 1 ? 'border-b border-surface-container' : ''}`}
            >
              {/* Row label */}
              <div className="px-3 py-3 flex items-center">
                <span className="text-caption text-on-surface-variant font-medium">{row.label}</span>
              </div>
              {/* P1 value */}
              <div className="px-3 py-3 flex items-center justify-center border-l border-surface-container">
                {row.render(getValue(p1, row))}
              </div>
              {/* P2 value */}
              <div className="px-3 py-3 flex items-center justify-center border-l border-surface-container">
                {row.render(getValue(p2, row))}
              </div>
            </div>
          ))}
        </section>

        {/* Verdict */}
        <section className="bg-white mb-2 px-4 py-4">
          <h2 className="text-h3 text-on-surface font-bold mb-3">Quick Verdict</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { product: p1, label: 'Higher Resolution', icon: 'photo_camera', color: 'text-tertiary' },
              { product: p2, label: 'Better Autofocus', icon: 'center_focus_strong', color: 'text-primary' },
            ].map((item) => (
              <div key={item.product.id} className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-1.5">
                <span className={`material-symbols-outlined ${item.color} text-[22px]`}>{item.icon}</span>
                <p className="text-caption text-on-surface-variant">{item.label}</p>
                <p className="text-label-sm text-on-surface font-semibold">{item.product.shopName}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Action buttons */}
        <section className="px-4 py-3 grid grid-cols-2 gap-3">
          {[p1, p2].map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="bg-primary text-on-primary text-center py-3 rounded-full text-label-sm font-bold active:opacity-80"
            >
              Buy {p.shopName.split(' ')[0]}
            </Link>
          ))}
        </section>

        {/* Add more products */}
        <section className="px-4 py-2 mb-2">
          <button className="w-full border border-dashed border-outline-variant rounded-xl py-4 flex items-center justify-center gap-2 text-on-surface-variant active:opacity-70">
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span className="text-label-sm">Add another product to compare</span>
          </button>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
