import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setFilters } from '@/store/slices/productSlice';
import { ArrowUpDown } from 'lucide-react';

export const SortDropdown = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(state => state.products);

  const handleSortChange = (value: string) => {
    dispatch(setFilters({ sortBy: value as any }));
  };

  return (
    <Select value={filters.sortBy} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[200px] bg-card">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4" />
          <SelectValue placeholder="Sort by" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-card">
        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="rating-desc">Highest Rated</SelectItem>
      </SelectContent>
    </Select>
  );
};