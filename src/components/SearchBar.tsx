import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setFilters } from '@/store/slices/productSlice';
import { Input } from '@/components/ui/input';

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(setFilters({ searchQuery: searchValue }));
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchValue, dispatch]);

  const clearSearch = () => {
    setSearchValue('');
    dispatch(setFilters({ searchQuery: '' }));
  };

  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <Input
        type="text"
        placeholder="Search products..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="pl-10 pr-10 h-11 bg-card border-border focus:border-primary transition-colors"
      />
      {searchValue && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};