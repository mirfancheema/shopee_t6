import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function TopAppBar({ variant = 'home', title = '' }) {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  if (variant === 'back') {
    return (
      <header className="flex items-center justify-between px-3 h-14 w-full max-w-[430px] fixed top-0 z-50 bg-white shadow-sm border-b border-surface-container pt-safe">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 active:opacity-70"
          aria-label="Go back"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        {title && (
          <h1 className="text-primary font-bold text-lg font-sans flex-1 text-center">{title}</h1>
        )}
        <div className="flex items-center gap-1">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50" aria-label="Share">
            <span className="material-symbols-outlined text-zinc-600">share</span>
          </button>
          <Link to="/cart" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50" aria-label="Cart">
            <span className="material-symbols-outlined text-zinc-600">shopping_cart</span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center gap-2 px-3 h-14 w-full max-w-[430px] fixed top-0 z-50 bg-white shadow-sm border-b border-surface-container pt-safe">
      <button className="p-2 text-zinc-500 rounded-full hover:bg-zinc-50 active:opacity-70 flex-shrink-0" aria-label="Scan QR">
        <span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
      </button>
      <Link to="/search" className="flex-1">
        <div className="flex items-center bg-[#F0F0F0] rounded h-9 px-3 gap-2">
          <span className="material-symbols-outlined text-zinc-400 text-[20px]">search</span>
          <span className="text-zinc-500 text-sm flex-1">Search in Shopee</span>
          <span className="material-symbols-outlined text-zinc-400 text-[20px]">photo_camera</span>
        </div>
      </Link>
      <Link to="/cart" className="p-2 text-zinc-500 rounded-full hover:bg-zinc-50 active:opacity-70 flex-shrink-0 relative" aria-label="Cart">
        <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
        {cartCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {cartCount > 9 ? '9+' : cartCount}
          </span>
        )}
      </Link>
    </header>
  );
}
