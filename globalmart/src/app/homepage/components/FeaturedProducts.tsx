'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Icon from '@/components/ui/AppIcon';
import { useApp } from '@/context/AppContext';
import { getFeaturedProducts, Product } from '@/lib/mockData';

export default function FeaturedProducts() {
  const { selectedCountry } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const featured = getFeaturedProducts(selectedCountry.code);
    setProducts(featured.slice(0, 24));
  }, [selectedCountry]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' });

  return (
    <section ref={sectionRef} className="py-12 overflow-hidden">
      <div className="px-4 md:px-8 max-w-[1800px] mx-auto mb-6">
        <div className="reveal flex items-end justify-between">
          <div>
            <div className="text-xs font-black text-[#C9A84C] uppercase tracking-widest mb-2">Featured</div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground">
              Top Picks for <span className="gold-text">{selectedCountry.name}</span>
            </h2>
            <p className="text-sm text-[#6B6B6B] mt-1">
              Prices shown in {selectedCountry.currency} · {selectedCountry.currencySymbol}
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={scrollLeft} className="w-10 h-10 glass rounded-full flex items-center justify-center text-[#A8A9AD] hover:text-[#C9A84C] hover:border-[#C9A84C]/30 transition-all border border-[#2A2A2A]">
              <Icon name="ChevronLeftIcon" size={16} />
            </button>
            <button onClick={scrollRight} className="w-10 h-10 glass rounded-full flex items-center justify-center text-[#A8A9AD] hover:text-[#C9A84C] hover:border-[#C9A84C]/30 transition-all border border-[#2A2A2A]">
              <Icon name="ChevronRightIcon" size={16} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar px-4 md:px-8 pb-4 snap-x snap-mandatory"
      >
        {products.map((product, idx) => (
          <div key={product.id} className={`min-w-[220px] md:min-w-[260px] snap-start shrink-0 reveal delay-${Math.min(idx * 50, 300)}`}>
            <ProductCard product={product} onProductClick={setSelectedProduct} />
          </div>
        ))}
        <div className="min-w-[220px] md:min-w-[260px] snap-start shrink-0 flex items-center justify-center">
          <Link
            href="/products"
            className="glass-gold border border-[#C9A84C]/20 rounded-2xl p-8 flex flex-col items-center gap-3 text-center hover:border-[#C9A84C]/50 transition-all group w-full h-full min-h-[300px] justify-center"
          >
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-[#C9A84C] group-hover:bg-[#C9A84C]/20 transition-colors">
              <Icon name="ArrowRightIcon" size={20} />
            </div>
            <div className="text-sm font-bold text-[#C9A84C]">View All Products</div>
            <div className="text-xs text-[#6B6B6B]">1,000+ items available</div>
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          <div className="relative glass-dark border border-[#2A2A2A] rounded-2xl w-full max-w-lg overflow-hidden animate-scale-in shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
              <span className="text-sm font-bold text-foreground">Quick View</span>
              <button onClick={() => setSelectedProduct(null)} className="w-7 h-7 glass rounded-full flex items-center justify-center text-[#6B6B6B] hover:text-foreground">
                <Icon name="XMarkIcon" size={14} />
              </button>
            </div>
            <div className="p-5">
              <div className="aspect-video rounded-xl overflow-hidden bg-[#1A1A1A] mb-4">
                <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-xs text-[#6B6B6B] uppercase tracking-wider mb-1">{selectedProduct.brand}</div>
              <div className="text-lg font-black text-foreground mb-1">{selectedProduct.name}</div>
              <div className="text-xl font-black text-[#C9A84C] mb-4">{selectedProduct.currencySymbol}{selectedProduct.price.toLocaleString()}</div>
              <div className="flex gap-2">
                <Link href="/products" className="flex-1 btn-gold py-3 rounded-full font-bold text-sm text-center" onClick={() => setSelectedProduct(null)}>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}