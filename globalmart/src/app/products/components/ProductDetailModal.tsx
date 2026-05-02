'use client';
import React, { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { Product, formatCurrency, COUNTRIES, convertToUSD } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';

interface Props {
  product: Product;
  onClose: () => void;
}

type TabType = 'overview' | 'specs' | 'reviews' | 'shipping';

const mockReviews = [
  { name: 'James Whitfield', rating: 5, date: 'Apr 10, 2026', comment: 'Absolutely premium quality. Exceeded my expectations in every way. Fast delivery and perfect packaging.', location: 'New York, US' },
  { name: 'Priya Krishnamurthy', rating: 4, date: 'Apr 8, 2026', comment: 'Great product overall. Minor scratches on arrival but the quality is top notch. Would buy again.', location: 'Mumbai, India' },
  { name: 'Takashi Yamamoto', rating: 5, date: 'Apr 5, 2026', comment: 'Exactly as described. The build quality is exceptional. GlobalMart made it so easy to shop internationally.', location: 'Tokyo, Japan' },
  { name: 'Sofia Andersson', rating: 4, date: 'Apr 2, 2026', comment: 'Love the product. Currency conversion at checkout was seamless — knew exactly what I was paying in USD.', location: 'Stockholm, Sweden' },
  { name: 'Marcus Okafor', rating: 5, date: 'Mar 29, 2026', comment: 'Best purchase this year. Free shipping to Nigeria was a pleasant surprise. Will definitely order again.', location: 'Lagos, Nigeria' },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(star => (
        <svg key={star} className={`${star <= Math.round(rating) ? 'text-[#C9A84C]' : 'text-[#3A3A3A]'}`} width={size} height={size} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetailModal({ product, onClose }: Props) {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [added, setAdded] = useState(false);

  const country = COUNTRIES.find(c => c.code === product.countryCode);
  const rate = country?.exchangeRate || 1;
  const usdPrice = convertToUSD(product.price, rate);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoom) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const TABS: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: 'Specs' },
    { id: 'reviews', label: `Reviews (${product.reviewCount.toLocaleString()})` },
    { id: 'shipping', label: 'Shipping' },
  ];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 md:p-6">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
      <div className="relative glass-dark border border-[#2A2A2A] rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden animate-scale-in shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A] shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
            <span>{product.category}</span>
            <span>/</span>
            <span>{product.subcategory}</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 glass rounded-full flex items-center justify-center text-[#6B6B6B] hover:text-foreground transition-colors">
            <Icon name="XMarkIcon" size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left: Image Gallery */}
            <div className="p-5 border-b md:border-b-0 md:border-r border-[#2A2A2A]">
              {/* Main Image with Zoom */}
              <div
                className="relative aspect-square rounded-xl overflow-hidden bg-[#1A1A1A] mb-3 cursor-zoom-in"
                onMouseEnter={() => setZoom(true)}
                onMouseLeave={() => setZoom(false)}
                onMouseMove={handleMouseMove}
              >
                <AppImage
                  src={product.images[activeImage]}
                  alt={`${product.name} - view ${activeImage + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover transition-transform duration-200 ${zoom ? 'scale-150' : 'scale-100'}`}
                  style={zoom ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
                  priority
                />
                {zoom && (
                  <div className="absolute top-2 right-2 glass px-2 py-1 rounded-full text-[10px] text-[#C9A84C] font-bold">
                    Zoomed
                  </div>
                )}
                {/* Stock badge */}
                <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-[10px] font-bold ${product.inStock ? 'bg-green-900/80 text-green-300' : 'bg-red-900/80 text-red-300'}`}>
                  {product.inStock ? `${product.stockCount} in stock` : 'Out of Stock'}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${activeImage === i ? 'border-[#C9A84C]' : 'border-[#2A2A2A] hover:border-[#C9A84C]/40'}`}
                  >
                    <AppImage src={img} alt={`Thumbnail ${i + 1}`} width={64} height={64} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="p-5 flex flex-col gap-4">
              <div>
                <div className="text-xs text-[#6B6B6B] uppercase tracking-wider mb-1">{product.brand}</div>
                <h2 className="text-xl md:text-2xl font-black text-foreground leading-tight mb-2">{product.name}</h2>
                <div className="flex items-center gap-2">
                  <StarRating rating={product.rating} size={14} />
                  <span className="text-sm text-[#A8A9AD]">{product.rating}</span>
                  <span className="text-xs text-[#6B6B6B]">({product.reviewCount.toLocaleString()} reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="glass-gold rounded-xl p-4 border border-[#C9A84C]/20">
                <div className="flex items-end justify-between">
                  <div>
                    {product.originalPrice && (
                      <div className="text-sm text-[#6B6B6B] line-through">{formatCurrency(product.originalPrice, product.currencySymbol)}</div>
                    )}
                    <div className="text-3xl font-black text-[#C9A84C]">{formatCurrency(product.price, product.currencySymbol)}</div>
                    <div className="text-xs text-[#6B6B6B] mt-1">{product.currency} · {country?.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#6B6B6B] mb-1">Cart & Invoice</div>
                    <div className="text-lg font-black text-[#A8A9AD]">${usdPrice.toFixed(2)} USD</div>
                  </div>
                </div>
                {product.discount && (
                  <div className="mt-2 text-xs font-bold text-[#C9A84C]">🏷️ {product.discount}% OFF applied</div>
                )}
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && product.colors[0] !== 'Default' && (
                <div>
                  <div className="text-xs font-bold text-[#A8A9AD] uppercase tracking-wider mb-2">
                    Color: <span className="text-foreground">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                          selectedColor === color
                            ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-foreground'
                            : 'border-[#2A2A2A] text-[#A8A9AD] hover:border-[#C9A84C]/30'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-[#A8A9AD] uppercase tracking-wider mb-2">Size</div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 rounded-lg text-xs font-bold transition-all border flex items-center justify-center ${
                          selectedSize === size
                            ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-foreground'
                            : 'border-[#2A2A2A] text-[#A8A9AD] hover:border-[#C9A84C]/30'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <div className="text-xs font-bold text-[#A8A9AD] uppercase tracking-wider mb-2">Quantity</div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-9 h-9 glass rounded-full flex items-center justify-center text-foreground font-bold hover:text-[#C9A84C] transition-colors border border-[#2A2A2A]">-</button>
                  <span className="text-lg font-black text-foreground w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-9 h-9 glass rounded-full flex items-center justify-center text-foreground font-bold hover:text-[#C9A84C] transition-colors border border-[#2A2A2A]">+</button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3.5 rounded-full font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    added ? 'bg-green-600 text-white' : 'btn-gold'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {added ? (
                    <><Icon name="CheckIcon" size={16} /> Added to Cart</>
                  ) : (
                    <><Icon name="ShoppingCartIcon" size={16} /> Add to Cart</>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-[#6B6B6B]">
                <span className="flex items-center gap-1"><Icon name="TruckIcon" size={10} className="text-[#C9A84C]" /> Free Shipping</span>
                <span className="flex items-center gap-1"><Icon name="ShieldCheckIcon" size={10} className="text-[#C9A84C]" /> Secure</span>
                <span className="flex items-center gap-1"><Icon name="DocumentTextIcon" size={10} className="text-[#C9A84C]" /> Invoice</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-[#2A2A2A]">
            <div className="flex overflow-x-auto no-scrollbar border-b border-[#2A2A2A]">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-[#C9A84C] text-[#C9A84C]'
                      : 'border-transparent text-[#6B6B6B] hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-5">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-sm text-[#A8A9AD] leading-relaxed">{product.description}</p>
                  <div>
                    <div className="text-xs font-black text-[#C9A84C] uppercase tracking-widest mb-3">Key Features</div>
                    <ul className="space-y-2">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <Icon name="CheckCircleIcon" size={14} className="text-[#C9A84C] mt-0.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Brand', value: product.brand },
                    { label: 'Category', value: product.subcategory },
                    { label: 'Origin', value: product.countryCode },
                    { label: 'Weight', value: product.weight || '—' },
                    { label: 'Stock', value: product.inStock ? `${product.stockCount} units` : 'Out of Stock' },
                    { label: 'Rating', value: `${product.rating}/5 (${product.reviewCount.toLocaleString()} reviews)` },
                  ].map(spec => (
                    <div key={spec.label} className="glass rounded-xl p-3">
                      <div className="text-[10px] font-black text-[#C9A84C] uppercase tracking-widest mb-1">{spec.label}</div>
                      <div className="text-sm font-semibold text-foreground">{spec.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl font-black text-[#C9A84C]">{product.rating}</div>
                    <div>
                      <StarRating rating={product.rating} size={18} />
                      <div className="text-xs text-[#6B6B6B] mt-1">{product.reviewCount.toLocaleString()} verified reviews</div>
                    </div>
                  </div>
                  {mockReviews.map((review, i) => (
                    <div key={i} className="glass rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-sm font-bold text-foreground">{review.name}</div>
                          <div className="text-xs text-[#6B6B6B]">{review.location} · {review.date}</div>
                        </div>
                        <StarRating rating={review.rating} size={12} />
                      </div>
                      <p className="text-sm text-[#A8A9AD] leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-3">
                  {[
                    { icon: '🚚', title: 'Free Worldwide Shipping', desc: 'All GlobalMart orders ship free to 20+ countries. No minimum order required.' },
                    { icon: '⏱️', title: 'Delivery Timeline', desc: 'Standard: 7-14 business days. Express available at checkout for select regions.' },
                    { icon: '💱', title: 'USD Billing', desc: 'All orders are billed in USD regardless of the local currency shown on product pages.' },
                    { icon: '📄', title: 'Invoice', desc: 'Detailed invoice generated instantly with local currency and USD breakdown per item.' },
                    { icon: '↩️', title: 'Returns', desc: '30-day return policy on all products. Contact support for return labels.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 glass rounded-xl p-4">
                      <span className="text-xl shrink-0">{item.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-foreground mb-1">{item.title}</div>
                        <div className="text-xs text-[#A8A9AD] leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}