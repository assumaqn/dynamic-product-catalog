import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { loadMoreProducts } from '@/store/slices/productSlice';
import { Package } from 'lucide-react';

export const ProductGrid = () => {
  const dispatch = useAppDispatch();
  const { 
    filteredProducts, 
    loading, 
    currentPage, 
    itemsPerPage, 
    viewMode,
    totalPages 
  } = useAppSelector(state => state.products);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Load more products when scrolling in infinite mode
  useEffect(() => {
    if (inView && viewMode === 'infinite' && currentPage < totalPages && !loading) {
      dispatch(loadMoreProducts());
    }
  }, [inView, viewMode, currentPage, totalPages, loading, dispatch]);

  // Calculate products to display
  const displayProducts = viewMode === 'pagination'
    ? filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredProducts.slice(0, currentPage * itemsPerPage);

  if (loading && filteredProducts.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!loading && filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Package className="w-20 h-20 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      {viewMode === 'infinite' && currentPage < totalPages && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span>Loading more products...</span>
          </div>
        </div>
      )}
    </>
  );
};