import { Link } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';
import ProductCard from '../components/ui/ProductCard';
import { products, categories, img } from '../data/mockData';

const carouselSlides = [
  { id: 1, src: img('banner-sale', 800, 340), alt: 'Flash Sale — Up to 90% off electronics' },
  { id: 2, src: img('banner-fashion', 800, 340), alt: 'New arrivals in fashion' },
  { id: 3, src: img('banner-beauty', 800, 340), alt: 'Beauty essentials deals' },
];

const flashSaleProducts = products.filter(p => p.discountPct).slice(0, 6);
const forYouProducts = products.slice(0, 8);

export default function HomeScreen() {
  return (
    <>
      <TopAppBar variant="home" />

      <main className="pt-14 pb-20 bg-[#F5F5F5] min-h-screen">
        {/* Carousel */}
        <section className="bg-white mb-2">
          <div className="relative overflow-x-auto no-scrollbar flex snap-x snap-mandatory">
            {carouselSlides.map((slide, i) => (
              <div key={slide.id} className="w-full flex-shrink-0 snap-start aspect-[21/9] relative">
                <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 py-2">
            {carouselSlides.map((_, i) => (
              <div key={i} className={`rounded-full ${i === 0 ? 'w-4 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-zinc-300'}`} />
            ))}
          </div>
        </section>

        {/* Category Grid */}
        <section className="bg-white mb-2 px-3 py-4">
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/search?category=${cat.id}`}
                className="flex flex-col items-center gap-1.5 active:opacity-70"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.bg}`}>
                  <span className={`material-symbols-outlined text-[22px] ${cat.text}`}>{cat.icon}</span>
                </div>
                <span className="text-caption text-on-surface text-center leading-tight">{cat.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Voucher Banner */}
        <section className="bg-white mb-2 px-3 py-3">
          <div className="flex items-center justify-between bg-primary-fixed rounded-xl px-4 py-3">
            <div>
              <p className="text-h3 text-on-primary-fixed font-bold">Collect Vouchers</p>
              <p className="text-caption text-on-primary-fixed-variant">Up to $50 off your next purchase</p>
            </div>
            <button className="bg-primary text-on-primary text-label-sm font-semibold px-3 py-1.5 rounded-full active:opacity-80">
              Collect
            </button>
          </div>
        </section>

        {/* Flash Sale */}
        <section className="bg-white mb-2 py-3">
          <div className="flex items-center justify-between px-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>sell</span>
              <h2 className="text-h3 text-on-surface font-bold">Flash Sale</h2>
              <div className="flex items-center gap-0.5 bg-on-surface rounded px-1.5 py-0.5">
                {['02', '34', '56'].map((t, i) => (
                  <span key={i} className="text-white text-[11px] font-bold font-mono">{t}{i < 2 ? ':' : ''}</span>
                ))}
              </div>
            </div>
            <Link to="/search?type=flash-sale" className="text-primary text-label-sm flex items-center">
              See all <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </Link>
          </div>
          <div className="flex gap-3 px-3 overflow-x-auto no-scrollbar">
            {flashSaleProducts.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="flex-shrink-0 w-32 active:opacity-80">
                <div className="aspect-square rounded overflow-hidden bg-surface-container-low relative">
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                  {p.discountPct && (
                    <div className="absolute bottom-0 left-0 right-0 bg-primary text-white text-center text-[9px] font-bold py-0.5">
                      -{p.discountPct}% OFF
                    </div>
                  )}
                </div>
                <p className="text-price-lg text-primary mt-1">${p.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Shopee Guarantee Strip */}
        <section className="bg-tertiary mb-2 px-3 py-2">
          <div className="flex items-center justify-around">
            {[
              { icon: 'verified_user', label: 'Shopee Guarantee' },
              { icon: 'assignment_return', label: 'Free Returns' },
              { icon: 'local_shipping', label: 'Free Shipping' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-on-tertiary text-[18px]">{item.icon}</span>
                <span className="text-caption text-on-tertiary font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* For You — Product Grid */}
        <section className="bg-white py-3">
          <div className="flex items-center justify-between px-3 mb-3">
            <h2 className="text-h3 text-on-surface font-bold">For You</h2>
            <Link to="/search" className="text-primary text-label-sm flex items-center">
              See all <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-[1px] px-3">
            {forYouProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
