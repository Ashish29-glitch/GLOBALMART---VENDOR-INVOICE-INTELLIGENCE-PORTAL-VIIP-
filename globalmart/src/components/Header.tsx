'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/context/CartContext';
import { useApp } from '@/context/AppContext';

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, selectedCountry, setIsCountryModalOpen, logout } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#2A2A2A]' : 'bg-transparent'}`}>
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/homepage" className="flex items-center gap-2 shrink-0">
          <AppLogo size={32} />
          <span className="font-black text-xl tracking-tighter text-foreground hidden sm:block">
            Global<span className="gold-text">Mart</span>
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
          <div className="relative w-full group">
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-5 py-2.5 text-sm text-foreground placeholder-[#6B6B6B] focus:outline-none focus:border-[#C9A84C] transition-colors pr-12"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#C9A84C] transition-colors">
              <Icon name="MagnifyingGlassIcon" size={18} />
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Country Selector */}
          <button
            onClick={() => setIsCountryModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 glass px-3 py-2 rounded-full text-xs font-semibold text-[#C9A84C] hover:border-[#C9A84C]/40 transition-all"
          >
            <span className="text-sm">{selectedCountry?.flag}</span>
            <span className="hidden md:block">{selectedCountry?.currency}</span>
            <Icon name="ChevronDownIcon" size={12} />
          </button>

          {/* Search Mobile */}
          <button
            className="md:hidden w-9 h-9 glass rounded-full flex items-center justify-center text-[#A8A9AD] hover:text-[#C9A84C] transition-colors"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Icon name="MagnifyingGlassIcon" size={16} />
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-9 h-9 glass rounded-full flex items-center justify-center text-[#A8A9AD] hover:text-[#C9A84C] transition-colors"
          >
            <Icon name="ShoppingCartIcon" size={16} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-black rounded-full flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>

          {/* User */}
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 glass px-3 py-2 rounded-full text-xs font-semibold text-foreground hover:border-[#C9A84C]/40 transition-all">
                <div className="w-5 h-5 rounded-full gold-gradient flex items-center justify-center text-[10px] font-black text-[#0A0A0A]">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <span className="hidden md:block max-w-[80px] truncate">{user?.isGuest ? 'Guest' : user?.name}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 glass-dark rounded-xl border border-[#2A2A2A] overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl">
                <div className="p-3 border-b border-[#2A2A2A]">
                  <div className="text-xs text-[#6B6B6B]">{user?.isGuest ? 'Guest Account' : 'Signed in as'}</div>
                  <div className="text-sm font-semibold text-foreground truncate">{user?.email}</div>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2.5 text-sm text-[#A8A9AD] hover:text-foreground hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <Icon name="ArrowRightOnRectangleIcon" size={14} />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="btn-gold px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu */}
          <button
            className="md:hidden w-9 h-9 glass rounded-full flex items-center justify-center text-[#A8A9AD]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={16} />
          </button>
        </div>
      </div>
      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 bg-[#0A0A0A]/95 border-b border-[#2A2A2A]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-5 py-2.5 text-sm text-foreground placeholder-[#6B6B6B] focus:outline-none focus:border-[#C9A84C] transition-colors pr-10"
              autoFocus
            />
            <Icon name="MagnifyingGlassIcon" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
          </div>
        </div>
      )}
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0A0A]/98 border-b border-[#2A2A2A] px-4 py-4 space-y-2">
          <Link href="/homepage" className="block py-2.5 text-sm font-medium text-foreground hover:text-[#C9A84C] transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/products" className="block py-2.5 text-sm font-medium text-foreground hover:text-[#C9A84C] transition-colors" onClick={() => setMenuOpen(false)}>Products</Link>
          <button
            onClick={() => { setIsCountryModalOpen(true); setMenuOpen(false); }}
            className="flex items-center gap-2 py-2.5 text-sm font-medium text-[#C9A84C]"
          >
            <span>{selectedCountry?.flag}</span>
            <span>{selectedCountry?.name} ({selectedCountry?.currency})</span>
          </button>
        </div>
      )}
    </header>
  );
}