'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/context/CartContext';
import { useApp } from '@/context/AppContext';
import { COUNTRIES, convertToUSD, formatCurrency } from '@/lib/mockData';

interface InvoiceModalProps {
  onClose: () => void;
}

export default function InvoiceModal({ onClose }: InvoiceModalProps) {
  const { items, totalUSD, clearCart } = useCart();
  const { user, selectedCountry } = useApp();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const invoiceNumber = `GM-${Date.now().toString().slice(-8)}`;
  const invoiceDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in flex flex-col">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-[#C9A84C]">GlobalMart Invoice</span>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className="btn-ghost px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5">
              <Icon name="PrinterIcon" size={14} />
              Print
            </button>
            <button onClick={onClose} className="w-8 h-8 glass rounded-full flex items-center justify-center text-[#6B6B6B] hover:text-foreground transition-colors">
              <Icon name="XMarkIcon" size={16} />
            </button>
          </div>
        </div>

        {/* Invoice Document */}
        <div ref={invoiceRef} className="glass-dark border border-[#2A2A2A] rounded-2xl overflow-y-auto scrollbar-thin flex-1">
          {/* Invoice Header */}
          <div className="p-6 border-b border-[#2A2A2A]">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-2xl font-black text-foreground">Global<span className="gold-text">Mart</span></div>
                <div className="text-xs text-[#6B6B6B] mt-1">Global E-Commerce Marketplace</div>
                <div className="text-xs text-[#6B6B6B]">globalmart.com · Free Worldwide Shipping</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-black text-[#C9A84C] uppercase tracking-widest">Invoice</div>
                <div className="text-lg font-black text-foreground mt-1">#{invoiceNumber}</div>
                <div className="text-xs text-[#6B6B6B] mt-1">{invoiceDate}</div>
                {user?.isGuest && (
                  <span className="inline-block mt-2 px-2 py-0.5 bg-[#A8A9AD]/20 text-[#A8A9AD] text-[10px] font-bold rounded-full uppercase">Guest Order</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-black text-[#C9A84C] uppercase tracking-widest mb-1">Bill To</div>
                <div className="text-sm font-semibold text-foreground">{user?.isGuest ? 'Guest Customer' : user?.name}</div>
                <div className="text-xs text-[#6B6B6B]">{user?.email}</div>
              </div>
              <div>
                <div className="text-[10px] font-black text-[#C9A84C] uppercase tracking-widest mb-1">Ship To</div>
                <div className="text-sm font-semibold text-foreground">{selectedCountry.name}</div>
                <div className="text-xs text-[#6B6B6B]">Free Worldwide Shipping</div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="p-6">
            <div className="grid grid-cols-12 gap-2 text-[10px] font-black text-[#C9A84C] uppercase tracking-widest mb-3 pb-2 border-b border-[#2A2A2A]">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-right">Local Price</div>
              <div className="col-span-2 text-right">USD Price</div>
              <div className="col-span-1 text-center">Qty</div>
              <div className="col-span-2 text-right">Total USD</div>
            </div>

            <div className="space-y-3">
              {items.map(item => {
                const country = COUNTRIES.find(c => c.code === item.product.countryCode);
                const rate = country?.exchangeRate || 1;
                const usdPrice = convertToUSD(item.product.price, rate);
                const lineTotal = usdPrice * item.quantity;
                return (
                  <div key={`${item.product.id}-${item.selectedColor}`} className="grid grid-cols-12 gap-2 items-center py-2 border-b border-[#1E1E1E]">
                    <div className="col-span-5 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-[#1A1A1A]">
                        <AppImage src={item.product.images[0]} alt={item.product.name} width={32} height={32} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-foreground truncate">{item.product.name}</div>
                        <div className="text-[10px] text-[#6B6B6B]">{item.product.brand}</div>
                        {item.selectedColor && <div className="text-[10px] text-[#A8A9AD]">{item.selectedColor}</div>}
                      </div>
                    </div>
                    <div className="col-span-2 text-right">
                      <div className="text-xs text-[#A8A9AD]">{formatCurrency(item.product.price, item.product.currencySymbol)}</div>
                      <div className="text-[10px] text-[#6B6B6B]">{item.product.currency}</div>
                    </div>
                    <div className="col-span-2 text-right text-xs text-foreground">${usdPrice.toFixed(2)}</div>
                    <div className="col-span-1 text-center text-xs text-foreground">{item.quantity}</div>
                    <div className="col-span-2 text-right text-xs font-bold text-[#C9A84C]">${lineTotal.toFixed(2)}</div>
                  </div>
                );
              })}
            </div>

            {/* Totals */}
            <div className="mt-4 pt-4 border-t border-[#2A2A2A]">
              <div className="flex justify-between text-xs text-[#6B6B6B] mb-2">
                <span>Subtotal</span>
                <span>${totalUSD.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#6B6B6B] mb-2">
                <span>Shipping</span>
                <span className="text-[#C9A84C] font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-xs text-[#6B6B6B] mb-3">
                <span>Tax (0%)</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#2A2A2A]">
                <span className="text-base font-black text-foreground">Total</span>
                <span className="text-2xl font-black text-[#C9A84C]">${totalUSD.toFixed(2)} USD</span>
              </div>
            </div>

            <div className="mt-4 p-3 glass rounded-xl text-center">
              <div className="text-xs text-[#6B6B6B]">All prices converted to USD at current exchange rates</div>
              <div className="text-[10px] text-[#2A2A2A] mt-0.5">Powered by GlobalMart Currency Engine · Free worldwide shipping on all orders</div>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="mt-3 flex gap-2">
          <button onClick={onClose} className="flex-1 btn-ghost py-3 rounded-full font-bold text-sm">
            Continue Shopping
          </button>
          <button
            onClick={() => { clearCart(); onClose(); }}
            className="flex-1 btn-gold py-3 rounded-full font-black text-sm"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}