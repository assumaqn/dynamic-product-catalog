export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductFilters {
  category: string;
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc';
}

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  viewMode: 'pagination' | 'infinite';
  categories: string[];
}