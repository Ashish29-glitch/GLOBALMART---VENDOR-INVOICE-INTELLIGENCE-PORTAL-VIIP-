'use client';
import React, { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    icon: '🌍',
    title: 'Choose Your Country',
    description: 'Select from 20 countries. Products automatically display in your local currency.',
    color: '#C9A84C',
  },
  {
    number: '02',
    icon: '🛍️',
    title: 'Browse & Discover',
    description: 'Explore 4,000+ products across electronics, luxury, essentials, and deals.',
    color: '#A8A9AD',
  },
  {
    number: '03',
    icon: '🛒',
    title: 'Add to Cart',
    description: 'Cart shows local prices alongside real-time USD conversion for each item.',
    color: '#C9A84C',
  },
  {
    number: '04',
    icon: '📄',
    title: 'Get Your Invoice',
    description: 'Detailed invoice with line-item local currency and USD totals. Works for guests too.',
    color: '#E8C96A',
  },
];

export default function HowItWorks() {
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
      {/* Dark rounded container */}
      <div className="bg-[#111111] rounded-3xl p-8 md:p-14 overflow-hidden relative">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#A8A9AD]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <div className="reveal mb-10 text-center">
            <div className="text-xs font-black text-[#C9A84C] uppercase tracking-widest mb-3">How It Works</div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
              Global Shopping,<br />
              <span className="gold-text">Zero Friction</span>
            </h2>
          </div>

          {/* Asymmetric layout: 2-col on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps?.map((step, idx) => (
              <div
                key={step?.number}
                className={`reveal delay-${idx * 100} glass rounded-2xl p-6 border border-[#2A2A2A] hover:border-[#C9A84C]/20 transition-all duration-300 group`}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${step?.color}15`, border: `1px solid ${step?.color}30` }}>
                      {step?.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-black uppercase tracking-widest" style={{ color: step?.color }}>{step?.number}</span>
                      <div className="h-px flex-1 bg-[#2A2A2A]" />
                    </div>
                    <h3 className="text-lg font-black text-white mb-2">{step?.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{step?.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Currency note */}
          <div className="reveal mt-8 glass-gold rounded-2xl p-5 border border-[#C9A84C]/20 flex items-start gap-3">
            <span className="text-xl shrink-0">💱</span>
            <div>
              <div className="text-sm font-bold text-[#C9A84C] mb-1">Currency Conversion Note</div>
              <div className="text-sm text-white/60">Product pages display local currency only. USD conversion activates exclusively in your cart and on generated invoices — so you always know exactly what you pay.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}