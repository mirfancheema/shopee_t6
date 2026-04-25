import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';
import { products, img } from '../data/mockData';

export default function ProductDetailsScreen() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false); // DEF-015

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 px-4 text-center">
        <span className="material-symbols-outlined text-[56px] text-on-surface-variant">error_outline</span>
        <h2 className="text-h2 text-on-surface">Product not found</h2>
        <p className="text-body-md text-on-surface-variant">This item may have been removed or is unavailable.</p>
        <Link to="/" className="bg-primary text-on-primary px-6 py-2.5 rounded-full text-label-sm font-bold">
          Back to Home
        </Link>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.id !== id && p.category === product.category).slice(0, 4);
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <>
      <TopAppBar variant="back" />

      <main className="pt-14 pb-28 min-h-screen bg-[#F5F5F5]">
        {/* Image Gallery */}
        <section className="bg-white mb-2">
          <div className="aspect-square w-full bg-surface-container-low relative">
            <img
              src={product.images[activeImg] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <button
                onClick={() => setLiked(l => !l)}
                className="w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow"
                aria-label="Wishlist"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={liked ? { fontVariationSettings: "'FILL' 1", color: '#b22204' } : { color: '#5b403b' }}
                >
                  favorite
                </span>
              </button>
            </div>
            {/* Image count pill */}
            <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
              {activeImg + 1} / {product.images.length}
            </div>
            {/* Badges overlay */}
            {product.isMall && (
              <div className="absolute top-3 left-3 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                Shopee Mall
              </div>
            )}
          </div>
          {/* Thumbnail row */}
          {product.images.length > 1 && (
            <div className="flex gap-2 px-3 py-2">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-14 h-14 rounded border-2 overflow-hidden ${i === activeImg ? 'border-primary' : 'border-transparent'}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Product Info */}
        <section className="bg-white mb-2 px-4 py-4">
          <div className="flex items-center gap-2 mb-1">
            {product.verified && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed rounded-sm uppercase tracking-wide">
                Authenticity Verified
              </span>
            )}
            {product.isMall && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 bg-primary text-white rounded-sm uppercase tracking-wide">
                Mall
              </span>
            )}
          </div>
          <h1 className="text-h2 text-on-surface font-bold leading-snug mb-3">{product.title}</h1>

          <div className="flex items-end gap-2 mb-2">
            <span className="text-price-lg text-primary" style={{ fontSize: '28px' }}>${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-body-md text-on-surface-variant line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            {savings > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded">
                -{product.discountPct}%
              </span>
            )}
          </div>

          {savings > 0 && (
            <p className="text-caption text-tertiary font-medium mb-3">You save ${savings.toFixed(2)}</p>
          )}

          {/* Stats Row */}
          <div className="flex items-center gap-4 py-3 border-y border-surface-container">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary-container text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="text-body-md text-on-surface font-semibold">{product.rating}</span>
              <span className="text-caption text-on-surface-variant">(128 ratings)</span>
            </div>
            <div className="w-px h-4 bg-surface-variant" />
            <span className="text-body-md text-on-surface-variant">{product.sold} sold</span>
            <div className="w-px h-4 bg-surface-variant" />
            <button className="flex items-center gap-1 text-on-surface-variant" aria-label="Share product">
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span className="text-caption">Share</span>
            </button>
          </div>
        </section>

        {/* Shopee Guarantee */}
        <section className="bg-white mb-2 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[20px]">verified_user</span>
            <span className="text-body-md text-on-surface font-medium flex-1">Shopee Guarantee</span>
            <span className="text-caption text-tertiary">Protected purchase</span>
          </div>
        </section>

        {/* Product Specs */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <section className="bg-white mb-2 px-4 py-4">
            <h2 className="text-h3 text-on-surface font-bold mb-3">Specifications</h2>
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex py-2 border-b border-surface-container last:border-b-0">
                <span className="text-body-md text-on-surface-variant capitalize w-32 flex-shrink-0">{key}</span>
                <span className="text-body-md text-on-surface">{val}</span>
              </div>
            ))}
          </section>
        )}

        {/* Seller Info */}
        <section className="bg-white mb-2 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant text-[24px]">storefront</span>
            </div>
            <div className="flex-1">
              <p className="text-body-md text-on-surface font-semibold">{product.shopName}</p>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-caption text-tertiary">Official Store</span>
              </div>
            </div>
            <button
              onClick={() => setFollowing(f => !f)}
              className={`text-label-sm px-3 py-1.5 rounded-full active:opacity-70 transition-colors ${
                following
                  ? 'bg-surface-container text-on-surface-variant border border-surface-variant'
                  : 'border border-primary text-primary'
              }`}
              aria-label={following ? 'Unfollow seller' : 'Follow seller'}
            >
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="bg-white py-4">
            <h2 className="text-h3 text-on-surface font-bold px-4 mb-3">Related Products</h2>
            <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="flex-shrink-0 w-36 active:opacity-80">
                  <div className="aspect-square rounded overflow-hidden bg-surface-container-low">
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <p className="text-caption text-on-surface line-clamp-2 mt-1 leading-tight">{p.title}</p>
                  <p className="text-price-lg text-primary">${p.price.toFixed(2)}</p>
                </Link>
              ))}
              {/* Compare link */}
              <Link to="/compare" className="flex-shrink-0 w-36 flex flex-col items-center justify-center gap-2 border border-dashed border-outline-variant rounded-xl active:opacity-70">
                <span className="material-symbols-outlined text-on-surface-variant text-[28px]">compare</span>
                <span className="text-caption text-on-surface-variant text-center">Compare Products</span>
              </Link>
            </div>
          </section>
        )}
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-surface-container shadow-bar z-50 pb-safe">
        <div className="flex items-center gap-2 px-3 py-3">
          <button className="flex flex-col items-center gap-0.5 w-14 active:opacity-70">
            <span className="material-symbols-outlined text-on-surface-variant text-[22px]">chat</span>
            <span className="text-[9px] text-on-surface-variant">Chat</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 w-14 active:opacity-70">
            <span className="material-symbols-outlined text-on-surface-variant text-[22px]">shopping_cart</span>
            <span className="text-[9px] text-on-surface-variant">Cart</span>
          </button>
          <Link
            to="/cart"
            className="flex-1 bg-primary-fixed text-on-primary-fixed-variant text-label-sm font-bold py-3 rounded-full text-center active:opacity-80"
          >
            Add to Cart
          </Link>
          <Link
            to="/checkout"
            className="flex-1 bg-primary text-on-primary text-label-sm font-bold py-3 rounded-full text-center active:opacity-80"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </>
  );
}
