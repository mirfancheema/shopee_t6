import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';
import { cartItems } from '../data/mockData';

const paymentMethods = [
  { id: 'shopeepay', label: 'ShopeePay', icon: 'account_balance_wallet', desc: 'Balance: $150.00' },
  { id: 'cod', label: 'Cash on Delivery', icon: 'payments', desc: '' },
  { id: 'card', label: 'Credit / Debit Card', icon: 'credit_card', desc: 'Visa, Mastercard' },
];

export default function CheckoutScreen() {
  const navigate = useNavigate();
  const [payMethod, setPayMethod] = useState('shopeepay');

  const subtotal = cartItems.reduce((s, c) => s + c.price * c.qty, 0);
  const shipping = 5.99;
  const discount = 10.00;
  const total = subtotal + shipping - discount;

  return (
    <>
      <TopAppBar variant="back" title="Checkout" />

      <main className="pt-14 pb-36 min-h-screen bg-[#F5F5F5]">
        {/* Delivery Address */}
        <section className="bg-white mb-2">
          {/* Decorative stripe */}
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

        {/* Order Items */}
        <section className="bg-white mb-2 px-4 py-3">
          <h3 className="text-h3 text-on-surface font-semibold mb-3">Order Summary</h3>
          {cartItems.map((item) => (
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
        </section>

        {/* Shipping */}
        <section className="bg-white mb-2 px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-h3 text-on-surface font-semibold">Shipping</h3>
            <button className="text-primary text-label-sm font-semibold">Change</button>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-low rounded-xl p-3">
            <span className="material-symbols-outlined text-tertiary text-[20px]">local_shipping</span>
            <div>
              <p className="text-body-md text-on-surface font-medium">Standard Delivery</p>
              <p className="text-caption text-on-surface-variant">Arrives in 3–5 business days</p>
            </div>
            <span className="ml-auto text-body-md text-on-surface font-semibold">${shipping.toFixed(2)}</span>
          </div>
        </section>

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

        {/* Price Breakdown */}
        <section className="bg-white mb-2 px-4 py-3">
          <h3 className="text-h3 text-on-surface font-semibold mb-3">Payment Details</h3>
          {[
            { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
            { label: 'Shipping', value: `$${shipping.toFixed(2)}` },
            { label: 'Voucher Discount', value: `-$${discount.toFixed(2)}`, color: 'text-tertiary' },
          ].map((row) => (
            <div key={row.label} className="flex justify-between py-1.5">
              <span className="text-body-md text-on-surface-variant">{row.label}</span>
              <span className={`text-body-md font-medium ${row.color || 'text-on-surface'}`}>{row.value}</span>
            </div>
          ))}
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
            <p className="text-caption text-on-surface-variant">Total</p>
            <p className="text-price-lg text-primary font-bold">${total.toFixed(2)}</p>
          </div>
          <button
            onClick={() => alert('Order placed successfully! 🎉')}
            className="bg-primary text-on-primary px-8 py-3 rounded-full text-label-sm font-bold active:opacity-80"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
