import { Link } from 'react-router-dom';

export default function OrderConfirmationScreen() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-5 px-6 text-center bg-background">
      <div className="w-24 h-24 rounded-full bg-tertiary flex items-center justify-center">
        <span
          className="material-symbols-outlined text-on-tertiary text-[48px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
      </div>
      <div>
        <h1 className="text-h1 text-on-surface font-bold mb-2">Order Placed!</h1>
        <p className="text-body-lg text-on-surface-variant">
          Your order has been received and is being processed. You'll receive a confirmation shortly.
        </p>
      </div>
      <div className="w-full flex flex-col gap-3 mt-4">
        <Link
          to="/profile"
          className="w-full bg-primary text-on-primary py-3 rounded-full text-label-sm font-bold text-center active:opacity-80"
        >
          Track My Order
        </Link>
        <Link
          to="/"
          className="w-full border border-primary text-primary py-3 rounded-full text-label-sm font-semibold text-center active:opacity-70"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
