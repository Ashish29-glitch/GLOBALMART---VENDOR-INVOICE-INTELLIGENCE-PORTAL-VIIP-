'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useApp } from '@/context/AppContext';

export default function HeroSection() {
  const { selectedCountry, setIsCountryModalOpen } = useApp();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      const scrollY = window.scrollY;
      const bg = hero.querySelector('.hero-parallax-bg') as HTMLElement;
      if (bg) bg.style.transform = `translateY(${scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative w-full min-h-screen flex items-end px-4 md:px-8 pb-16 pt-24 overflow-hidden">
      {/* Full-bleed cinematic background */}
      <div className="hero-parallax-bg absolute inset-0 w-full h-[120%] -top-[10%]">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_178ad84c6-1772267377898.png"
          alt="Dark premium shopping environment with luxury products displayed on sleek surfaces, dramatic low-key lighting, deep shadows"
          fill
          priority
          sizes="100vw"
          className="object-cover" />

      </div>

      {/* Gradient scrim — dark overlay for white text */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/60 to-[#0A0A0A]/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-transparent to-transparent z-10" />

      {/* Rotating Badge */}
      <div className="absolute top-28 right-6 md:right-12 z-30 hidden md:block">
        <div className="relative w-24 h-24">
          <svg className="animate-rotate-badge w-full h-full" viewBox="0 0 100 100">
            <path id="heroBadgePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
            <text fontSize="9" fontFamily="DM Sans" fontWeight="700" letterSpacing="3px" fill="#C9A84C">
              <textPath href="#heroBadgePath" startOffset="0%">FREE SHIPPING · 20 COUNTRIES ·</textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="GlobeAltIcon" size={20} className="text-[#C9A84C]" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        {/* Left */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#C9A84C]/30 rounded-full text-xs uppercase tracking-widest text-[#C9A84C] mb-5 font-bold glass-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              Now Shopping in {selectedCountry.name}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-white mb-4">
              SHOP THE<br />
              <span className="gold-text">WORLD.</span><br />
              PAY IN USD.
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl font-medium">
              1000+ products across 20 countries. Browse in local currency — cart converts to USD automatically.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-3 max-w-lg">
            <div className="glass-dark rounded-2xl p-4 border border-[#2A2A2A]">
              <div className="text-2xl font-black text-[#C9A84C]">4K+</div>
              <div className="text-xs text-white/60 mt-0.5 font-medium">Products</div>
            </div>
            <div className="glass-dark rounded-2xl p-4 border border-[#2A2A2A]">
              <div className="text-2xl font-black text-[#A8A9AD]">20</div>
              <div className="text-xs text-white/60 mt-0.5 font-medium">Countries</div>
            </div>
            <div className="glass-dark rounded-2xl p-4 border border-[#2A2A2A]">
              <div className="text-2xl font-black text-white">FREE</div>
              <div className="text-xs text-white/60 mt-0.5 font-medium">Shipping</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/products"
              className="btn-gold px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl">

              <Icon name="ShoppingBagIcon" size={16} />
              Start Shopping
            </Link>
            <button
              onClick={() => setIsCountryModalOpen(true)}
              className="btn-ghost px-8 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2">

              <span className="text-base">{selectedCountry.flag}</span>
              Change Country
            </button>
          </div>
        </div>

        {/* Right: Glass Info Card */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="glass rounded-3xl p-6 border border-white/10 backdrop-blur-xl">
            <div className="text-xs font-black text-[#C9A84C] uppercase tracking-widest mb-4">Currently Browsing</div>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
              <span className="text-4xl">{selectedCountry.flag}</span>
              <div>
                <div className="text-lg font-black text-white">{selectedCountry.name}</div>
                <div className="text-sm text-white/60">{selectedCountry.currency} · {selectedCountry.currencySymbol}</div>
              </div>
            </div>
            <div className="space-y-3">
              {[
              { label: 'Electronics', count: '1,000+', icon: '⚡' },
              { label: 'Luxury Goods', count: '1,000+', icon: '💎' },
              { label: 'Daily Essentials', count: '1,000+', icon: '🛒' },
              { label: 'Deals & Offers', count: '1,000+', icon: '🏷️' }].
              map((cat) =>
              <div key={cat.label} className="flex items-center justify-between py-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{cat.icon}</span>
                    <span className="text-sm font-medium text-white/80">{cat.label}</span>
                  </div>
                  <span className="text-xs font-bold text-[#C9A84C]">{cat.count}</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsCountryModalOpen(true)}
              className="w-full mt-4 btn-ghost py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5">

              <Icon name="ArrowsRightLeftIcon" size={12} />
              Switch Country
            </button>
          </div>
        </div>
      </div>
    </section>);

}