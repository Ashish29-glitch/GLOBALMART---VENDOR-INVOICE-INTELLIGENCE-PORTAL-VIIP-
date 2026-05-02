'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from './ProductDetailModal';
import Icon from '@/components/ui/AppIcon';
import { useApp } from '@/context/AppContext';
import { getProductsByCountry, Product } from '@/lib/mockData';

type CategoryType = 'electronics' | 'luxury' | 'essentials' | 'deals';

const CATEGORIES: { id: CategoryType; label: string; icon: string }[] = [
  { id: 'electronics', label: 'Electronics', icon: '⚡' },
  { id: 'luxury', label: 'Luxury Goods', icon: '💎' },
  { id: 'essentials', label: 'Daily Essentials', icon: '🛒' },
  { id: 'deals', label: 'Deals & Offers', icon: '🏷️' },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const { selectedCountry } = useApp();
  const initialCategory = (searchParams.get('category') as CategoryType) || 'electronics';

  const [activeCategory, setActiveCategory] = useState<CategoryType>(initialCategory);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 999999]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 40;
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = getProductsByCountry(selectedCountry.code, activeCategory);
    setProducts(data);
    setPage(1);
  }, [selectedCountry, activeCategory]);

  useEffect(() => {
    let result = [...products];
    if (searchQuery) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    if (inStockOnly) result = result.filter(p => p.inStock);
    if (minRating > 0) result = result.filter(p => p.rating >= minRating);
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    setFilteredProducts(result);
    setPage(1);
  }, [products, searchQuery, sortBy, priceRange, minRating, inStockOnly]);

  const visibleProducts = filteredProducts.slice(0, page * ITEMS_PER_PAGE);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && visibleProducts.length < filteredProducts.length) {
        setPage(p => p + 1);
      }
    }, { threshold: 0.1 });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [visibleProducts.length, filteredProducts.length]);

  const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 999999;

  return (
    <div className="max-w-[1800px] mx-auto px-4 md:px-8 pb-16">
      {/* Category Tabs */}
      <div className="py-6 border-b border-[#2A2A2A]">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#C9A84C] text-[#0A0A0A]'
                  : 'glass border border-[#2A2A2A] text-[#A8A9AD] hover:text-foreground hover:border-[#C9A84C]/30'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6 mt-6">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <FilterSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            maxPrice={maxPrice}
            minRating={minRating}
            setMinRating={setMinRating}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            currency={selectedCountry.currencySymbol}
            resultCount={filteredProducts.length}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-5 gap-3">
            <div className="text-sm text-[#6B6B6B]">
              <span className="text-foreground font-bold">{filteredProducts.length}</span> products in {selectedCountry.name}
            </div>
            <div className="flex items-center gap-2">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-1.5 glass border border-[#2A2A2A] px-3 py-2 rounded-full text-xs font-bold text-[#A8A9AD]"
              >
                <Icon name="FunnelIcon" size={14} />
                Filters
              </button>
              {/* Sort */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-4 py-2 text-xs font-bold text-foreground focus:outline-none focus:border-[#C9A84C] transition-colors"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {visibleProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <div className="text-lg font-bold text-foreground mb-2">No products found</div>
              <div className="text-sm text-[#6B6B6B]">Try adjusting your filters or search query</div>
            </div>
          )}

          {/* Infinite scroll loader */}
          <div ref={loaderRef} className="py-8 flex justify-center">
            {visibleProducts.length < filteredProducts.length && (
              <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                <div className="w-4 h-4 border-2 border-[#2A2A2A] border-t-[#C9A84C] rounded-full animate-spin" />
                Loading more...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80 glass-dark border-r border-[#2A2A2A] overflow-y-auto p-5 scrollbar-thin animate-slide-in-right">
            <div className="flex items-center justify-between mb-5">
              <span className="font-black text-foreground">Filters</span>
              <button onClick={() => setSidebarOpen(false)} className="w-7 h-7 glass rounded-full flex items-center justify-center text-[#6B6B6B]">
                <Icon name="XMarkIcon" size={14} />
              </button>
            </div>
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              maxPrice={maxPrice}
              minRating={minRating}
              setMinRating={setMinRating}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              currency={selectedCountry.currencySymbol}
              resultCount={filteredProducts.length}
            />
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  maxPrice: number;
  minRating: number;
  setMinRating: (v: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (v: boolean) => void;
  currency: string;
  resultCount: number;
}

function FilterSidebar({
  searchQuery, setSearchQuery, priceRange, setPriceRange, maxPrice,
  minRating, setMinRating, inStockOnly, setInStockOnly, currency, resultCount
}: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="text-xs font-black text-[#C9A84C] uppercase tracking-widest">
        {resultCount} results
      </div>

      {/* Search */}
      <div>
        <div className="text-xs font-bold text-[#A8A9AD] uppercase tracking-wider mb-2">Search</div>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Product name or brand..."
            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-[#3A3A3A] focus:outline-none focus:border-[#C9A84C] transition-colors pr-8"
          />
          <Icon name="MagnifyingGlassIcon" size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="text-xs font-bold text-[#A8A9AD] uppercase tracking-wider mb-2">
          Price Range ({currency})
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-[#C9A84C]"
            placeholder="Min"
          />
          <span className="text-[#6B6B6B] text-xs">–</span>
          <input
            type="number"
            value={priceRange[1] === 999999 ? '' : priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], e.target.value ? Number(e.target.value) : 999999])}
            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-[#C9A84C]"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Min Rating */}
      <div>
        <div className="text-xs font-bold text-[#A8A9AD] uppercase tracking-wider mb-2">Min Rating</div>
        <div className="flex gap-1.5">
          {[0, 3, 3.5, 4, 4.5].map(r => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                minRating === r ? 'bg-[#C9A84C] text-[#0A0A0A]' : 'glass border border-[#2A2A2A] text-[#A8A9AD] hover:border-[#C9A84C]/30'
              }`}
            >
              {r === 0 ? 'All' : `${r}★`}
            </button>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div>
        <button
          onClick={() => setInStockOnly(!inStockOnly)}
          className={`flex items-center gap-2 w-full p-3 rounded-xl border transition-all ${
            inStockOnly ? 'border-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#2A2A2A] hover:border-[#C9A84C]/30'
          }`}
        >
          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${inStockOnly ? 'border-[#C9A84C] bg-[#C9A84C]' : 'border-[#3A3A3A]'}`}>
            {inStockOnly && <Icon name="CheckIcon" size={10} className="text-[#0A0A0A]" />}
          </div>
          <span className="text-sm font-medium text-foreground">In Stock Only</span>
        </button>
      </div>

      {/* Reset */}
      <button
        onClick={() => { setSearchQuery(''); setPriceRange([0, 999999]); setMinRating(0); setInStockOnly(false); }}
        className="w-full btn-ghost py-2.5 rounded-full text-xs font-bold"
      >
        Reset Filters
      </button>
    </div>
  );
}