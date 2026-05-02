'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/context/CartContext';
import { useApp } from '@/context/AppContext';
import { COUNTRIES, convertToUSD, formatCurrency } from '@/lib/mockData';
import InvoiceModal from './InvoiceModal';

export default function CartSidebar() {
  const { items, removeFromCart, updateQuantity, totalUSD, isCartOpen, setIsCartOpen, totalItems } = useCart();
  const { user } = useApp();
  const [showInvoice, setShowInvoice] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[80]">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-full max-w-md glass-dark border-l border-[#2A2A2A] flex flex-col animate-slide-in-right shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <Icon name="ShoppingCartIcon" size={18} className="text-[#C9A84C]" />
              <span className="font-black text-foreground">Your Cart</span>
              {totalItems > 0 && (
                <span className="px-2 py-0.5 bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-bold rounded-full">{totalItems}</span>
              )}
            </div>
            <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 glass rounded-full flex items-center justify-center text-[#6B6B6B] hover:text-foreground transition-colors">
              <Icon name="XMarkIcon" size={16} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {items?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                <div className="w-16 h-16 glass rounded-full flex items-center justify-center">
                  <Icon name="ShoppingCartIcon" size={28} className="text-[#2A2A2A]" />
                </div>
                <div>
                  <div className="text-foreground font-semibold">Your cart is empty</div>
                  <div className="text-[#6B6B6B] text-sm mt-1">Add some products to get started</div>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="btn-gold px-6 py-2.5 rounded-full text-sm font-bold">
                  Browse Products
                </button>
              </div>
            ) : (
              items?.map(item => {
                const country = COUNTRIES?.find(c => c?.code === item?.product?.countryCode);
                const rate = country?.exchangeRate || 1;
                const usdPrice = convertToUSD(item?.product?.price, rate);
                return (
                  <div key={`${item?.product?.id}-${item?.selectedColor}-${item?.selectedSize}`} className="glass rounded-xl p-3 flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#1A1A1A]">
                      <AppImage src={item?.product?.images?.[0]} alt={item?.product?.name} width={64} height={64} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">{item?.product?.name}</div>
                      <div className="text-xs text-[#6B6B6B] mt-0.5">{item?.product?.brand}</div>
                      {item?.selectedColor && <div className="text-xs text-[#A8A9AD]">{item?.selectedColor}</div>}
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <div className="text-xs text-[#6B6B6B]">{formatCurrency(item?.product?.price, item?.product?.currencySymbol)}</div>
                          <div className="text-sm font-bold text-[#C9A84C]">${(usdPrice * item?.quantity)?.toFixed(2)} USD</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item?.product?.id, item?.quantity - 1)}
                            className="w-6 h-6 glass rounded-full flex items-center justify-center text-[#A8A9AD] hover:text-[#C9A84C] transition-colors text-xs font-bold"
                          >-</button>
                          <span className="text-sm font-bold text-foreground w-5 text-center">{item?.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item?.product?.id, item?.quantity + 1)}
                            className="w-6 h-6 glass rounded-full flex items-center justify-center text-[#A8A9AD] hover:text-[#C9A84C] transition-colors text-xs font-bold"
                          >+</button>
                          <button
                            onClick={() => removeFromCart(item?.product?.id)}
                            className="w-6 h-6 glass rounded-full flex items-center justify-center text-[#6B6B6B] hover:text-red-400 transition-colors ml-1"
                          >
                            <Icon name="TrashIcon" size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {items?.length > 0 && (
            <div className="p-4 border-t border-[#2A2A2A] space-y-3">
              <div className="glass rounded-xl p-3">
                <div className="flex justify-between text-xs text-[#6B6B6B] mb-1">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>Multi-currency</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-foreground">Total (USD)</span>
                  <span className="text-xl font-black text-[#C9A84C]">${totalUSD?.toFixed(2)}</span>
                </div>
                <div className="text-xs text-[#6B6B6B] mt-1 flex items-center gap-1">
                  <Icon name="TruckIcon" size={10} />
                  Free worldwide shipping
                </div>
              </div>
              <button
                onClick={() => setShowInvoice(true)}
                className="w-full btn-gold py-3.5 rounded-full font-black text-sm uppercase tracking-wider"
              >
                Generate Invoice
              </button>
              <div className="text-center text-xs text-[#6B6B6B]">
                {user?.isGuest ? '📋 Guest checkout — no account required' : '✓ Signed in as ' + user?.name}
              </div>
            </div>
          )}
        </div>
      </div>
      {showInvoice && <InvoiceModal onClose={() => setShowInvoice(false)} />}
    </>
  );
}