export const ProductSkeleton = () => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card animate-pulse">
      <div className="h-64 bg-muted"></div>
      <div className="p-4">
        <div className="h-3 bg-muted rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-muted rounded w-full mb-1"></div>
        <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-muted rounded-full"></div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-muted rounded w-24"></div>
          <div className="h-10 w-10 bg-muted rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};