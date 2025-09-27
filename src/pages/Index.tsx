import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchProducts } from "@/store/slices/productSlice";
import { Header } from "@/components/Header";
import { FilterSidebar } from "@/components/FilterSidebar";
import { ProductGrid } from "@/components/ProductGrid";
import { Pagination } from "@/components/Pagination";
import { Hero } from "@/components/Hero";

const Index = () => {
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Hero />
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex gap-6 px-4 sm:px-6 lg:px-8 py-6">
        <FilterSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1">
          <ProductGrid />
          <Pagination />
        </main>
      </div>
    </div>
  );
};

export default Index;
