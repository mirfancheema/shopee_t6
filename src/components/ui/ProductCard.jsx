import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { id, title, price, originalPrice, rating, sold, images, isMall, verified, discountPct } = product;

  return (
    <Link
      to={`/product/${id}`}
      className="bg-white rounded border border-surface-container overflow-hidden flex flex-col relative block active:opacity-90"
    >
      {/* Image with loading background (skeleton feel while LoremFlickr loads) */}
      <div className="aspect-square w-full bg-surface-container-high relative">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        {isMall && (
          <div className="absolute top-0 left-0 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br uppercase tracking-wider flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            Mall
          </div>
        )}
        {discountPct && (
          <div className="absolute top-0 right-0 bg-secondary-container text-on-secondary-container text-[10px] px-1.5 py-0.5 rounded-bl font-bold">
            -{discountPct}%
          </div>
        )}
      </div>

      <div className="p-2 flex flex-col flex-grow gap-1">
        <h3 className="text-body-md line-clamp-2 text-on-surface flex-grow leading-tight">{title}</h3>

        {verified && (
          <span className="px-1.5 py-[2px] bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase rounded-sm w-fit tracking-wide">
            Authenticity Verified
          </span>
        )}

        <div className="flex items-end justify-between mt-auto">
          <div>
            {originalPrice && (
              <span className="text-caption text-on-surface-variant line-through block">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-price-lg text-primary">${price.toFixed(2)}</span>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="flex items-center gap-0.5 justify-end">
              <span
                className="material-symbols-outlined text-secondary-container text-[12px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="text-caption text-on-surface-variant">{rating}</span>
            </div>
            <span className="text-caption text-zinc-400">{sold} sold</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
