'use client';
import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { Product, formatCurrency } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(star => (
        <svg key={star} className={`w-3 h-3 ${star <= Math.round(rating) ? 'text-[#C9A84C]' : 'text-[#3A3A3A]'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="product-card group cursor-pointer flex flex-col overflow-hidden" onClick={() => onProductClick?.(product)}>
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#1A1A1A]">
        <AppImage
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover grayscale-product group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className="px-2 py-0.5 bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-black rounded-full uppercase">{product.badge}</span>
          )}
          {product.isNew && !product.badge && (
            <span className="px-2 py-0.5 bg-[#A8A9AD] text-[#0A0A0A] text-[10px] font-black rounded-full uppercase">New</span>
          )}
          {!product.inStock && (
            <span className="px-2 py-0.5 bg-red-900/80 text-red-300 text-[10px] font-bold rounded-full">Out of Stock</span>
          )}
        </div>
        {/* Quick Add */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            disabled={!product.inStock}
            className="w-8 h-8 bg-[#C9A84C] rounded-full flex items-center justify-center text-[#0A0A0A] hover:bg-[#E8C96A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Icon name="PlusIcon" size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <div className="text-[10px] text-[#6B6B6B] uppercase tracking-wider mb-1">{product.brand}</div>
        <div className="text-sm font-semibold text-foreground line-clamp-2 mb-2 flex-1">{product.name}</div>
        <div className="flex items-center gap-1.5 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-[10px] text-[#6B6B6B]">({product.reviewCount.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <div className="text-[10px] text-[#6B6B6B] line-through">{formatCurrency(product.originalPrice, product.currencySymbol)}</div>
            )}
            <div className="text-base font-black text-[#C9A84C]">{formatCurrency(product.price, product.currencySymbol)}</div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            disabled={!product.inStock}
            className="btn-gold px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}