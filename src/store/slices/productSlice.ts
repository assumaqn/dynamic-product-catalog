import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, ProductState, ProductFilters } from '@/types/product';

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  filters: {
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    searchQuery: '',
    sortBy: 'name-asc',
  },
  currentPage: 1,
  itemsPerPage: 12,
  totalPages: 1,
  viewMode: 'pagination',
  categories: [],
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data as Product[];
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
      applyFiltersAndSort(state);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'pagination' | 'infinite'>) => {
      state.viewMode = action.payload;
      state.currentPage = 1;
    },
    loadMoreProducts: (state) => {
      if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
      }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.currentPage = 1;
      applyFiltersAndSort(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        
        // Extract unique categories
        const categories = [...new Set(action.payload.map(p => p.category))];
        state.categories = categories;
        
        applyFiltersAndSort(state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

// Helper function to apply filters and sorting
function applyFiltersAndSort(state: ProductState) {
  let filtered = [...state.products];

  // Apply category filter
  if (state.filters.category !== 'all') {
    filtered = filtered.filter(p => p.category === state.filters.category);
  }

  // Apply price filter
  filtered = filtered.filter(
    p => p.price >= state.filters.minPrice && p.price <= state.filters.maxPrice
  );

  // Apply search filter
  if (state.filters.searchQuery) {
    const query = state.filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      p => p.title.toLowerCase().includes(query) || 
           p.description.toLowerCase().includes(query)
    );
  }

  // Apply sorting
  switch (state.filters.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'name-desc':
      filtered.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'rating-desc':
      filtered.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
  }

  state.filteredProducts = filtered;
  state.totalPages = Math.ceil(filtered.length / state.itemsPerPage);
}

export const { setFilters, setPage, setViewMode, loadMoreProducts, resetFilters } = productSlice.actions;
export default productSlice.reducer;