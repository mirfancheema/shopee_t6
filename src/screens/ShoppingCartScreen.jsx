import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import { useCart } from '../context/CartContext';

export default function ShoppingCartScreen() {
  const navigate = useNavigate();
  const { items, selectedCount, subtotal, updateQty, toggleItem, toggleShop, toggleAll } = useCart();

  const allSelected = items.length > 0 && items.every(i => i.selected);
  const shops = [...new Set(items.map(i => i.shopName))];

  const handleCheckout = () => {
    if (selectedCount > 0) navigate('/checkout');
  };

  return (
    <>
      <TopAppBar variant="back" title="My Cart" />

      <main className="pt-14 pb-32 min-h-screen bg-[#F5F5F5]">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant">shopping_cart</span>
            <p className="text-body-lg text-on-surface-variant">Your cart is empty</p>
            <Link to="/" className="text-primary text-label-sm font-semibold">Continue Shopping</Link>
          </div>
        ) : (
          <>
            {shops.map((shopName) => {
              const shopItems = items.filter(i => i.shopName === shopName);
              const shopAllSelected = shopItems.every(i => i.selected);
              return (
                <section key={shopName} className="bg-white mb-2">
                  {/* Shop Header — DEF-013: uses toggleShop which correctly handles partial state */}
                  <div className="flex items-center gap-3 px-3 py-3 border-b border-surface-container">
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={shopAllSelected}
                      onChange={() => toggleShop(shopName)}
                      aria-label={`Select all items from ${shopName}`}
                    />
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">storefront</span>
                    <span className="text-body-md text-on-surface font-semibold flex-1">{shopName}</span>
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">chevron_right</span>
                  </div>

                  {shopItems.map((item) => (
                    <div key={item.id} className="flex gap-3 px-3 py-3 border-b border-surface-container last:border-b-0">
                      <input
                        type="checkbox"
                        className="custom-checkbox mt-1"
                        checked={item.selected}
                        onChange={() => toggleItem(item.id)}
                        aria-label={`Select ${item.title}`}
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
                          <div className="flex items-center border border-surface-variant rounded-full overflow-hidden">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-low active:bg-surface-container"
                              aria-label="Decrease quantity"
                            >
                              <span className="material-symbols-outlined text-[18px] text-on-surface">remove</span>
                            </button>
                            <span className="w-8 text-center text-body-md text-on-surface font-medium">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-low active:bg-surface-container"
                              aria-label="Increase quantity"
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

            <section className="bg-white mb-2 px-3 py-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">local_activity</span>
              <span className="text-body-md text-on-surface flex-1">Shopee Voucher</span>
              <span className="text-label-sm text-on-surface-variant">Select voucher</span>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">chevron_right</span>
            </section>
          </>
        )}
      </main>

      {/* Fixed Bottom Bar — DEF-009: button instead of Link, disabled when 0 selected */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-surface-container shadow-[0_-2px_10px_rgba(0,0,0,0.06)] z-50 pb-safe">
        <div className="flex items-center gap-3 px-3 py-3">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={allSelected}
            onChange={toggleAll}
            aria-label="Select all items"
          />
          <span className="text-body-md text-on-surface font-medium">All</span>
          <div className="flex-1">
            <span className="text-caption text-on-surface-variant">
              Total ({selectedCount} item{selectedCount !== 1 ? 's' : ''})
            </span>
            <p className="text-price-lg text-primary font-bold">${subtotal.toFixed(2)}</p>
          </div>
          <button
            onClick={handleCheckout}
            disabled={selectedCount === 0}
            className={`px-5 py-2.5 rounded-full text-label-sm font-bold transition-colors ${
              selectedCount > 0
                ? 'bg-primary text-on-primary active:opacity-80'
                : 'bg-surface-container text-on-surface-variant opacity-50 cursor-not-allowed'
            }`}
          >
            Check Out ({selectedCount})
          </button>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
