'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useApp } from '@/context/AppContext';

export default function CTASection() {
  const { setIsCountryModalOpen, selectedCountry } = useApp();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
      { threshold: 0.1 }
    );
    sectionRef?.current?.querySelectorAll('.reveal')?.forEach(el => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 px-4 md:px-8 max-w-[1800px] mx-auto">
      <div className="relative rounded-3xl bg-[#0D0D0D] border border-[#1E1E1E] overflow-hidden px-6 py-16 md:py-24 text-center reveal">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A84C]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#A8A9AD]/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Decorative grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-[#C9A84C]" />
          <div className="absolute left-2/4 top-0 bottom-0 w-px bg-[#C9A84C]" />
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-[#C9A84C]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-gold border border-[#C9A84C]/20 rounded-full text-xs font-bold text-[#C9A84C] uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            Shopping in {selectedCountry?.flag} {selectedCountry?.name}
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
            Ready to<br />
            <span className="gold-text">Shop Global?</span>
          </h2>

          <p className="text-[#A8A9AD] text-lg mb-10 leading-relaxed max-w-lg mx-auto">
            4,000+ products waiting. Browse in {selectedCountry?.currency}, pay in USD. Free shipping everywhere.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link
              href="/products"
              className="btn-gold px-10 py-4 rounded-full font-black text-base uppercase tracking-wider min-w-[200px] flex items-center justify-center gap-2"
            >
              <Icon name="ShoppingBagIcon" size={18} />
              Browse Products
            </Link>
            <button
              onClick={() => setIsCountryModalOpen(true)}
              className="btn-ghost px-10 py-4 rounded-full font-bold text-base min-w-[200px] flex items-center justify-center gap-2"
            >
              <Icon name="GlobeAltIcon" size={18} />
              Change Country
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[#6B6B6B]">
            <span className="flex items-center gap-1.5"><Icon name="TruckIcon" size={12} className="text-[#C9A84C]" /> Free Shipping</span>
            <span className="flex items-center gap-1.5"><Icon name="ShieldCheckIcon" size={12} className="text-[#C9A84C]" /> Secure Checkout</span>
            <span className="flex items-center gap-1.5"><Icon name="DocumentTextIcon" size={12} className="text-[#C9A84C]" /> Invoice Generated</span>
          </div>
        </div>
      </div>
    </section>
  );
}