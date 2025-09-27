import { ShoppingBag, Menu, Grid3x3, List } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { SortDropdown } from './SortDropdown';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setViewMode } from '@/store/slices/productSlice';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { filteredProducts, viewMode } = useAppSelector(state => state.products);

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ShopCatalog
              </h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <SearchBar />
          </div>

          <div className="flex items-center gap-4">
            <SortDropdown />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mb-4">
          <SearchBar />
        </div>

        {/* Results Bar */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
          </p>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <div className="flex gap-1 border rounded-lg p-1">
              <Toggle
                pressed={viewMode === 'pagination'}
                onPressedChange={() => dispatch(setViewMode('pagination'))}
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                size="sm"
              >
                <Grid3x3 className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={viewMode === 'infinite'}
                onPressedChange={() => dispatch(setViewMode('infinite'))}
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                size="sm"
              >
                <List className="h-4 w-4" />
              </Toggle>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};