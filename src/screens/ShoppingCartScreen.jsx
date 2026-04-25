import { useState } from 'react';
import { Link } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import { cartItems } from '../data/mockData';

export default function ShoppingCartScreen() {
  const [quantities, setQuantities] = useState(
    Object.fromEntries(cartItems.map(c => [c.id, c.qty]))
  );
  const [selected, setSelected] = useState(
    Object.fromEntries(cartItems.map(c => [c.id, true]))
  );

  const allSelected = cartItems.every(c => selected[c.id]);

  const toggle = (id) => setSelected(s => ({ ...s, [id]: !s[id] }));
  const toggleAll = () => {
    const next = !allSelected;
    setSelected(Object.fromEntries(cartItems.map(c => [c.id, next])));
  };

  const changeQty = (id, delta) => {
    setQuantities(q => ({ ...q, [id]: Math.max(1, q[id] + delta) }));
  };

  const subtotal = cartItems
    .filter(c => selected[c.id])
    .reduce((sum, c) => sum + c.price * quantities[c.id], 0);

  const selectedCount = Object.values(selected).filter(Boolean).length;

  // Group by shop
  const shops = [...new Set(cartItems.map(c => c.shopName))];

  return (
    <>
      <TopAppBar variant="back" title="My Cart" />

      <main className="pt-14 pb-32 min-h-screen bg-[#F5F5F5]">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant">shopping_cart</span>
            <p className="text-body-lg text-on-surface-variant">Your cart is empty</p>
            <Link to="/" className="text-primary text-label-sm font-semibold">Continue Shopping</Link>
          </div>
        ) : (
          <>
            {shops.map((shopName) => {
              const shopItems = cartItems.filter(c => c.shopName === shopName);
              return (
                <section key={shopName} className="bg-white mb-2">
                  {/* Shop Header */}
                  <div className="flex items-center gap-3 px-3 py-3 border-b border-surface-container">
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={shopItems.every(c => selected[c.id])}
                      onChange={() => shopItems.forEach(c => toggle(c.id))}
                    />
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">storefront</span>
                    <span className="text-body-md text-on-surface font-semibold flex-1">{shopName}</span>
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">chevron_right</span>
                  </div>

                  {/* Items */}
                  {shopItems.map((item) => (
                    <div key={item.id} className="flex gap-3 px-3 py-3 border-b border-surface-container last:border-b-0">
                      <input
                        type="checkbox"
                        className="custom-checkbox mt-1"
                        checked={!!selected[item.id]}
                        onChange={() => toggle(item.id)}
                      />
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded border border-surface-container flex-shrink-0"
                      />
                      <div className="flex flex-col flex-1 gap-1 min-w-0">
                        <h3 className="text-body-md text-on-surface line-clamp-2 leading-tight">{item.title}</h3>
                        <p className="text-caption text-on-surface-variant">{item.variant}</p>
                        {item.originalPrice && (
                          <p className="text-caption text-on-surface-variant line-through">${item.originalPrice.toFixed(2)}</p>
                        )}
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-price-lg text-primary">${item.price.toFixed(2)}</span>
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-surface-variant rounded-full overflow-hidden">
                            <button
                              onClick={() => changeQty(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-low active:bg-surface-container"
                            >
                              <span className="material-symbols-outlined text-[18px] text-on-surface">remove</span>
                            </button>
                            <span className="w-8 text-center text-body-md text-on-surface font-medium">
                              {quantities[item.id]}
                            </span>
                            <button
                              onClick={() => changeQty(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-low active:bg-surface-container"
                            >
                              <span className="material-symbols-outlined text-[18px] text-on-surface">add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              );
            })}

            {/* Voucher Row */}
            <section className="bg-white mb-2 px-3 py-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">local_activity</span>
              <span className="text-body-md text-on-surface flex-1">Shopee Voucher</span>
              <span className="text-label-sm text-on-surface-variant">Select voucher</span>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">chevron_right</span>
            </section>
          </>
        )}
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-surface-container shadow-[0_-2px_10px_rgba(0,0,0,0.06)] z-50 pb-safe">
        <div className="flex items-center gap-3 px-3 py-3">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={allSelected}
            onChange={toggleAll}
          />
          <span className="text-body-md text-on-surface font-medium">All</span>
          <div className="flex-1">
            <span className="text-caption text-on-surface-variant">Total ({selectedCount} item{selectedCount !== 1 ? 's' : ''})</span>
            <p className="text-price-lg text-primary font-bold">${subtotal.toFixed(2)}</p>
          </div>
          <Link
            to="/checkout"
            className={`px-5 py-2.5 rounded-full text-label-sm font-bold ${
              selectedCount > 0
                ? 'bg-primary text-on-primary active:opacity-80'
                : 'bg-surface-container text-on-surface-variant cursor-not-allowed'
            }`}
          >
            Check Out ({selectedCount})
          </Link>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
