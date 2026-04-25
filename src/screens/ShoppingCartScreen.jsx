import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import { useCart, DELIVERY_OPTIONS } from '../context/CartContext';

export default function ShoppingCartScreen() {
  const navigate = useNavigate();
  const {
    items, selectedCount, subtotal, shippingTotal,
    deliveryMethods, setDeliveryMethod,
    updateQty, toggleItem, toggleShop, toggleAll,
  } = useCart();

  // Track which shop's delivery panel is open
  const [openDeliveryShop, setOpenDeliveryShop] = useState(null);

  const allSelected = items.length > 0 && items.every(i => i.selected);
  const shops = [...new Set(items.map(i => i.shopName))];
  const total = subtotal + shippingTotal;

  const handleCheckout = () => {
    if (selectedCount > 0) navigate('/checkout');
  };

  return (
    <>
      <TopAppBar variant="back" title="My Cart" />

      <main className="pt-14 pb-48 min-h-screen bg-[#F5F5F5]">
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
              const selectedMethodId = deliveryMethods[shopName] || 'standard';
              const selectedMethod = DELIVERY_OPTIONS.find(o => o.id === selectedMethodId);
              const isDeliveryOpen = openDeliveryShop === shopName;
              const shopHasSelected = shopItems.some(i => i.selected);

              return (
                <section key={shopName} className="bg-white mb-2">
                  {/* Shop Header */}
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

                  {/* Items */}
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

                  {/* Delivery Method Row */}
                  <div className="border-t border-surface-container">
                    <button
                      onClick={() => setOpenDeliveryShop(isDeliveryOpen ? null : shopName)}
                      className="w-full flex items-center gap-2 px-3 py-2.5 active:bg-surface-container-low"
                      aria-label="Select delivery method"
                    >
                      <span className="material-symbols-outlined text-tertiary text-[18px]">{selectedMethod.icon}</span>
                      <div className="flex-1 text-left">
                        <span className="text-label-sm text-on-surface font-semibold">{selectedMethod.label}</span>
                        <span className="text-caption text-on-surface-variant ml-1.5">{selectedMethod.desc}</span>
                      </div>
                      <span className={`text-label-sm font-semibold ${selectedMethod.price === 0 ? 'text-tertiary' : 'text-on-surface'}`}>
                        {selectedMethod.price === 0 ? 'FREE' : `$${selectedMethod.price.toFixed(2)}`}
                      </span>
                      <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                        {isDeliveryOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>

                    {/* Delivery Options Panel */}
                    {isDeliveryOpen && (
                      <div className="border-t border-surface-container bg-surface-container-low px-3 py-2 flex flex-col gap-1">
                        {DELIVERY_OPTIONS.map((opt) => {
                          const isSelected = selectedMethodId === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => {
                                setDeliveryMethod(shopName, opt.id);
                                setOpenDeliveryShop(null);
                              }}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-colors ${
                                isSelected
                                  ? 'border-primary bg-primary-fixed'
                                  : 'border-surface-variant bg-white'
                              } active:opacity-80`}
                            >
                              <span className={`material-symbols-outlined text-[20px] ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                                {opt.icon}
                              </span>
                              <div className="flex-1 text-left">
                                <p className={`text-body-md font-semibold ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                                  {opt.label}
                                </p>
                                <p className="text-caption text-on-surface-variant">{opt.desc}</p>
                              </div>
                              <span className={`text-label-sm font-bold ${opt.price === 0 ? 'text-tertiary' : isSelected ? 'text-primary' : 'text-on-surface'}`}>
                                {opt.price === 0 ? 'FREE' : `$${opt.price.toFixed(2)}`}
                              </span>
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-primary' : 'border-outline'}`}>
                                {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
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

            {/* Price Summary */}
            <section className="bg-white mb-2 px-4 py-3">
              <div className="flex justify-between py-1">
                <span className="text-body-md text-on-surface-variant">
                  Subtotal ({selectedCount} item{selectedCount !== 1 ? 's' : ''})
                </span>
                <span className="text-body-md text-on-surface font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-body-md text-on-surface-variant">Shipping</span>
                <span className={`text-body-md font-medium ${shippingTotal === 0 ? 'text-tertiary' : 'text-on-surface'}`}>
                  {shippingTotal === 0 ? 'FREE' : `$${shippingTotal.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between py-2 mt-1 border-t border-surface-container">
                <span className="text-h3 text-on-surface font-bold">Total</span>
                <span className="text-price-lg text-primary font-bold">${total.toFixed(2)}</span>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Fixed Bottom Bar — positioned above BottomNav (bottom-16 = 64px = h-16) */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-surface-container shadow-[0_-2px_10px_rgba(0,0,0,0.06)] z-40">
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
            <p className="text-price-lg text-primary font-bold">${total.toFixed(2)}</p>
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
