import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';
import { useCart, DELIVERY_OPTIONS } from '../context/CartContext';

const paymentMethods = [
  { id: 'shopeepay', label: 'ShopeePay',           icon: 'account_balance_wallet', desc: 'Balance: $150.00' },
  { id: 'cod',       label: 'Cash on Delivery',     icon: 'payments',               desc: '' },
  { id: 'card',      label: 'Credit / Debit Card',  icon: 'credit_card',            desc: 'Visa, Mastercard' },
];

export default function CheckoutScreen() {
  const navigate = useNavigate();
  const { selectedItems, subtotal, shippingTotal, deliveryMethods, setDeliveryMethod } = useCart();
  const { items: allItems } = useCart();

  const [payMethod, setPayMethod] = useState('shopeepay');
  const [changeDeliveryShop, setChangeDeliveryShop] = useState(null); // shop name with open panel

  const orderItems = selectedItems.length > 0 ? selectedItems : allItems;
  const activeShops = [...new Set(orderItems.map(i => i.shopName))];

  const discount = 10.00;
  const total = subtotal + shippingTotal - discount;

  return (
    <>
      <TopAppBar variant="back" title="Checkout" />

      <main className="pt-14 pb-36 min-h-screen bg-[#F5F5F5]">
        {/* Delivery Address */}
        <section className="bg-white mb-2">
          <div
            className="h-1.5 w-full"
            style={{ background: 'repeating-linear-gradient(90deg, #b22204 0px, #b22204 10px, #ffdad3 10px, #ffdad3 20px)' }}
          />
          <div className="flex items-start gap-3 px-4 py-4">
            <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">location_on</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-h3 text-on-surface font-semibold">Delivery Address</h3>
                <button className="text-primary text-label-sm font-semibold">Change</button>
              </div>
              <p className="text-body-md text-on-surface font-medium mt-1">Jane Doe · +65 9123 4567</p>
              <p className="text-body-md text-on-surface-variant">123 Orchard Road, #04-01</p>
              <p className="text-body-md text-on-surface-variant">Singapore 238858</p>
              <span className="mt-1 inline-block text-[9px] font-bold px-2 py-0.5 bg-primary text-white rounded uppercase">Default</span>
            </div>
          </div>
        </section>

        {/* Order Items + Delivery per shop */}
        {activeShops.map((shopName) => {
          const shopItems = orderItems.filter(i => i.shopName === shopName);
          const selectedMethodId = deliveryMethods[shopName] || 'standard';
          const selectedMethod = DELIVERY_OPTIONS.find(o => o.id === selectedMethodId);
          const isOpen = changeDeliveryShop === shopName;

          return (
            <section key={shopName} className="bg-white mb-2">
              {/* Shop label */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-surface-container">
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">storefront</span>
                <span className="text-body-md text-on-surface font-semibold flex-1">{shopName}</span>
              </div>

              {/* Items */}
              <div className="px-4 py-3">
                {shopItems.map((item) => (
                  <div key={item.id} className="flex gap-3 mb-3 last:mb-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded border border-surface-container flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-body-md text-on-surface line-clamp-2 leading-tight">{item.title}</p>
                      <p className="text-caption text-on-surface-variant mt-0.5">{item.variant}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-label-sm text-on-surface-variant">Qty: {item.qty}</span>
                        <span className="text-body-md text-primary font-semibold">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery method — live from CartContext, changeable inline */}
              <div className="border-t border-surface-container">
                <button
                  onClick={() => setChangeDeliveryShop(isOpen ? null : shopName)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 active:bg-surface-container-low"
                >
                  <span className="material-symbols-outlined text-tertiary text-[18px]">{selectedMethod.icon}</span>
                  <div className="flex-1 text-left">
                    <span className="text-label-sm text-on-surface font-semibold">{selectedMethod.label}</span>
                    <span className="text-caption text-on-surface-variant ml-1.5">{selectedMethod.desc}</span>
                  </div>
                  <span className={`text-label-sm font-semibold ${selectedMethod.price === 0 ? 'text-tertiary' : 'text-on-surface'}`}>
                    {selectedMethod.price === 0 ? 'FREE' : `$${selectedMethod.price.toFixed(2)}`}
                  </span>
                  <span className="text-primary text-label-sm font-semibold ml-1">Change</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {/* Inline delivery change panel */}
                {isOpen && (
                  <div className="border-t border-surface-container bg-surface-container-low px-3 py-2 flex flex-col gap-1.5">
                    {DELIVERY_OPTIONS.map((opt) => {
                      const isSel = selectedMethodId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setDeliveryMethod(shopName, opt.id);
                            setChangeDeliveryShop(null);
                          }}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-colors ${
                            isSel ? 'border-primary bg-primary-fixed' : 'border-surface-variant bg-white'
                          } active:opacity-80`}
                        >
                          <span className={`material-symbols-outlined text-[20px] ${isSel ? 'text-primary' : 'text-on-surface-variant'}`}>
                            {opt.icon}
                          </span>
                          <div className="flex-1 text-left">
                            <p className={`text-body-md font-semibold ${isSel ? 'text-primary' : 'text-on-surface'}`}>{opt.label}</p>
                            <p className="text-caption text-on-surface-variant">{opt.desc}</p>
                          </div>
                          <span className={`text-label-sm font-bold ${opt.price === 0 ? 'text-tertiary' : isSel ? 'text-primary' : 'text-on-surface'}`}>
                            {opt.price === 0 ? 'FREE' : `$${opt.price.toFixed(2)}`}
                          </span>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSel ? 'border-primary' : 'border-outline'}`}>
                            {isSel && <div className="w-2 h-2 rounded-full bg-primary" />}
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

        {/* Voucher */}
        <section className="bg-white mb-2 px-4 py-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">local_activity</span>
          <span className="text-body-md text-on-surface flex-1">Shopee Voucher Applied</span>
          <span className="text-primary text-body-md font-semibold">-${discount.toFixed(2)}</span>
          <span className="material-symbols-outlined text-on-surface-variant text-[18px]">chevron_right</span>
        </section>

        {/* Payment Method */}
        <section className="bg-white mb-2 px-4 py-3">
          <h3 className="text-h3 text-on-surface font-semibold mb-3">Payment Method</h3>
          <div className="flex flex-col gap-2">
            {paymentMethods.map((pm) => (
              <button
                key={pm.id}
                onClick={() => setPayMethod(pm.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  payMethod === pm.id ? 'border-primary bg-primary-fixed' : 'border-surface-variant bg-surface-container-lowest'
                } active:opacity-80`}
              >
                <span className={`material-symbols-outlined text-[22px] ${payMethod === pm.id ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {pm.icon}
                </span>
                <div className="flex-1 text-left">
                  <p className={`text-body-md font-medium ${payMethod === pm.id ? 'text-primary' : 'text-on-surface'}`}>{pm.label}</p>
                  {pm.desc && <p className="text-caption text-on-surface-variant">{pm.desc}</p>}
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${payMethod === pm.id ? 'border-primary' : 'border-outline'}`}>
                  {payMethod === pm.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Price Breakdown — live from CartContext */}
        <section className="bg-white mb-2 px-4 py-3">
          <h3 className="text-h3 text-on-surface font-semibold mb-3">Payment Details</h3>
          <div className="flex justify-between py-1.5">
            <span className="text-body-md text-on-surface-variant">Subtotal</span>
            <span className="text-body-md font-medium text-on-surface">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-body-md text-on-surface-variant">Shipping</span>
            <span className={`text-body-md font-medium ${shippingTotal === 0 ? 'text-tertiary' : 'text-on-surface'}`}>
              {shippingTotal === 0 ? 'FREE' : `$${shippingTotal.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-body-md text-on-surface-variant">Voucher Discount</span>
            <span className="text-body-md font-medium text-tertiary">-${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 mt-1 border-t border-surface-container">
            <span className="text-h3 text-on-surface font-bold">Total Payment</span>
            <span className="text-price-lg text-primary">${total.toFixed(2)}</span>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-surface-container shadow-[0_-2px_10px_rgba(0,0,0,0.06)] z-50 pb-safe px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-caption text-on-surface-variant">Total Payment</p>
            <p className="text-price-lg text-primary font-bold">${total.toFixed(2)}</p>
          </div>
          <button
            onClick={() => navigate('/order-confirmed')}
            className="bg-primary text-on-primary px-8 py-3 rounded-full text-label-sm font-bold active:opacity-80"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
