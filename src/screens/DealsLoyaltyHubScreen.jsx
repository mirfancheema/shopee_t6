import { Link } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import { deals, recentOrders, products } from '../data/mockData';
import useCountdown from '../hooks/useCountdown';

const loyaltyTier = { name: 'Silver', coins: 2500, nextTier: 'Gold', progress: 62 };
const vouchers = [
  { id: 'v1', label: '$10 Off', desc: 'Min. spend $50', expiry: 'Expires in 3 days', icon: 'local_activity' },
  { id: 'v2', label: 'Free Ship', desc: 'No min. spend', expiry: 'Expires in 7 days', icon: 'local_shipping' },
];
const weeklyDeals = products.filter(p => p.discountPct).slice(0, 6);
const flashProducts = products.slice(3, 7);

export default function DealsLoyaltyHubScreen() {
  const flashCountdown = useCountdown(21); // counts down to 9pm

  return (
    <>
      <TopAppBar variant="home" />

      <main className="pt-14 pb-20 min-h-screen bg-[#F5F5F5]">
        {/* Loyalty Banner */}
        <section className="bg-gradient-to-r from-primary to-primary-container px-4 py-5 mb-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-caption text-white/80 uppercase tracking-wider">My Rewards</p>
              <h2 className="text-h2 text-white font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-container text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                {loyaltyTier.name} Member
              </h2>
            </div>
            <div className="text-right">
              <p className="text-caption text-white/80">Coins balance</p>
              <p className="text-h2 text-secondary-container font-bold">{loyaltyTier.coins.toLocaleString()}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <p className="text-caption text-white/80 mb-1">
            {loyaltyTier.progress}% toward <strong className="text-white">{loyaltyTier.nextTier}</strong>
          </p>
          <div className="h-2.5 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${loyaltyTier.progress}%`,
                background: 'linear-gradient(90deg, #ffbb0c 0%, #f9b500 100%)',
              }}
            />
          </div>
        </section>

        {/* Vouchers */}
        <section className="bg-white mb-2 px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-h3 text-on-surface font-bold">My Vouchers</h2>
            <Link to="#" className="text-primary text-label-sm flex items-center">
              See all <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {vouchers.map((v) => (
              <div key={v.id} className="flex-shrink-0 w-44 border border-outline-variant rounded-xl overflow-hidden">
                <div className="bg-primary px-4 py-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-primary text-[20px]">{v.icon}</span>
                  <span className="text-h3 text-on-primary font-bold">{v.label}</span>
                </div>
                <div className="px-3 py-2.5 bg-primary-fixed">
                  <p className="text-body-md text-on-primary-fixed-variant font-medium">{v.desc}</p>
                  <p className="text-caption text-on-primary-fixed-variant/70 mt-0.5">{v.expiry}</p>
                  <button className="mt-2 w-full border border-primary text-primary text-caption font-bold py-1 rounded-full">
                    Use Now
                  </button>
                </div>
              </div>
            ))}
            {/* Empty voucher slot */}
            <div className="flex-shrink-0 w-44 border border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center gap-2 py-6 active:opacity-70">
              <span className="material-symbols-outlined text-[28px] text-outline">add_circle</span>
              <span className="text-caption text-on-surface-variant text-center">Collect more vouchers</span>
            </div>
          </div>
        </section>

        {/* Back Again? */}
        <section className="bg-white mb-2 px-4 py-4">
          <h2 className="text-h3 text-on-surface font-bold mb-1">Back Again?</h2>
          <p className="text-caption text-on-surface-variant mb-3">Reorder your recent purchases quickly</p>
          <div className="grid grid-cols-3 gap-3">
            {recentOrders.map((order) => (
              <button key={order.id} className="flex flex-col items-center gap-1.5 active:opacity-70">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container-low border border-surface-container">
                  <img src={order.image} alt={order.title} className="w-full h-full object-cover" />
                </div>
                <span className="text-caption text-on-surface text-center line-clamp-2 leading-tight">{order.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Weekly Personalised Deals */}
        <section className="bg-white mb-2 py-4">
          <div className="flex items-center justify-between px-4 mb-3">
            <div>
              <h2 className="text-h3 text-on-surface font-bold">Your Weekly Deals</h2>
              <p className="text-caption text-on-surface-variant">Refreshes every Monday</p>
            </div>
            <Link to="/search?type=deals" className="text-primary text-label-sm flex items-center">
              See all <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </Link>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar">
            {weeklyDeals.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="flex-shrink-0 w-36 active:opacity-80">
                <div className="aspect-square rounded-xl overflow-hidden bg-surface-container-low relative">
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <span className="text-white text-[10px] font-bold">-{p.discountPct}% OFF</span>
                  </div>
                </div>
                <p className="text-caption text-on-surface line-clamp-2 mt-1 leading-tight">{p.title}</p>
                <p className="text-price-lg text-primary">${p.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash Deals Countdown */}
        <section className="bg-white mb-2 py-4">
          <div className="flex items-center justify-between px-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <h2 className="text-h3 text-on-surface font-bold">Flash Deals</h2>
              <div className="flex items-center gap-0.5 bg-on-surface rounded px-1.5 py-0.5">
                <span className="text-white text-[11px] font-bold font-mono">{flashCountdown}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[1px] px-[1px]">
            {flashProducts.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="bg-white flex gap-3 p-3 active:bg-surface-container-low">
                <div className="w-16 h-16 rounded overflow-hidden bg-surface-container-low flex-shrink-0">
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between min-w-0">
                  <p className="text-body-md text-on-surface line-clamp-2 leading-tight">{p.title}</p>
                  <div>
                    <p className="text-price-lg text-primary">${p.price.toFixed(2)}</p>
                    {p.discountPct && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-secondary-container text-on-secondary-container rounded">
                        -{p.discountPct}% OFF
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
