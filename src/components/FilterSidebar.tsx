import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setFilters, resetFilters } from '@/store/slices/productSlice';
import { Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterSidebar = ({ isOpen, onClose }: FilterSidebarProps) => {
  const dispatch = useAppDispatch();
  const { filters, categories } = useAppSelector(state => state.products);
  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice]);

  const handleCategoryChange = (category: string) => {
    dispatch(setFilters({ category }));
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const applyPriceFilter = () => {
    dispatch(setFilters({ minPrice: priceRange[0], maxPrice: priceRange[1] }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setPriceRange([0, 1000]);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen lg:h-auto bg-card lg:bg-transparent p-6 lg:p-0 w-80 lg:w-64 z-50 lg:z-0 transform transition-transform duration-300 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="bg-card rounded-xl p-6 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <Label className="text-base font-semibold mb-4 block">Category</Label>
            <RadioGroup value={filters.category} onValueChange={handleCategoryChange}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label
                    htmlFor="all"
                    className="font-normal cursor-pointer hover:text-primary transition-colors"
                  >
                    All Products
                  </Label>
                </div>
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <RadioGroupItem value={category} id={category} />
                    <Label
                      htmlFor={category}
                      className="font-normal capitalize cursor-pointer hover:text-primary transition-colors"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <Label className="text-base font-semibold mb-4 block">
              Price Range
            </Label>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                min={0}
                max={1000}
                step={10}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <Button
                onClick={applyPriceFilter}
                className="w-full mt-4 bg-gradient-primary hover:shadow-lg transition-all"
                size="sm"
              >
                Apply Price Filter
              </Button>
            </div>
          </div>

          {/* Reset Button */}
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full"
          >
            Reset All Filters
          </Button>
        </div>
      </aside>
    </>
  );
};