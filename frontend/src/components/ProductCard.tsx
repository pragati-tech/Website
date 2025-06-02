import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../types";
import { cn } from "../lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const [imgError, setImgError] = useState(false);
  const displayImage = product.variants[0]?.imageUrl || product.imageUrl;

  const variantPrices = product.variants
    .map(v => v.price)
    .filter((p): p is number => p != null);

  const lowestPrice = variantPrices.length
    ? Math.min(...variantPrices)
    : product.price;

  const hasPriceRange = variantPrices.some(price => price !== lowestPrice);

// Removed duplicate ProductCard function declaration

    return (
      <Link to={`/products/${product.slug}`} aria-label={`View details for ${product.name}`}>
      <div
        className={cn(
          "bg-[#1f1f1f] border border-gray-700 rounded-2xl group cursor-pointer h-full flex flex-col transition-transform transform hover:scale-[1.01] hover:shadow-lg",
          className
        )}
      >
        <div className="relative h-52 sm:h-64 overflow-hidden rounded-t-2xl">
          {displayImage && !imgError ? (
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <span className="text-gray-400">No image available</span>
            </div>
          )}

          {product.featured && (
            <div className="absolute top-2 left-2">
              <span className="bg-gaming-purple px-2 py-1 text-xs font-bold rounded text-white animate-pulse">
                Featured
              </span>
            </div>
          )}
        </div>

        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white text-xl group-hover:text-gaming-purple transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{product.description}</p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-gaming-purple font-semibold text-lg">
              ₹{lowestPrice.toLocaleString()}
              {hasPriceRange && <span className="text-gray-400 text-sm"> +</span>}
            </div>
            <div className="text-gray-400 text-xs">
              {product.variants.length} {product.variants.length === 1 ? "variant" : "variants"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
