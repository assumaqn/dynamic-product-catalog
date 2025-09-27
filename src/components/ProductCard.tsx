import { Product } from '@/types/product';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1">
      {/* Badge */}
      {product.rating.rate >= 4.5 && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
          Best Seller
        </div>
      )}

      {/* Like Button */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-all duration-200"
      >
        <Heart
          className={cn(
            "w-5 h-5 transition-all",
            isLiked ? "fill-destructive text-destructive" : "text-muted-foreground"
          )}
        />
      </button>

      {/* Image Container */}
      <div className="relative h-64 bg-muted overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-muted to-muted-foreground/10 animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.title}
          className={cn(
            "w-full h-full object-contain p-4 transition-all duration-500 group-hover:scale-110",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="mt-1 font-semibold text-foreground line-clamp-2 min-h-[3rem]">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < Math.floor(product.rating.rate)
                    ? "fill-warning text-warning"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.rating.count})
          </span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <button className="p-2 bg-gradient-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick View Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-12 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
        <button className="text-primary-foreground font-semibold text-sm">
          Quick View
        </button>
      </div>
    </div>
  );
};