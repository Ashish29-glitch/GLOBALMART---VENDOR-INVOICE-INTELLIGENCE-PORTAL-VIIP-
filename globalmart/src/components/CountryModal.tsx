'use client';
import React, { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { COUNTRIES } from '@/lib/mockData';
import Icon from '@/components/ui/AppIcon';

export default function CountryModal() {
  const { isCountryModalOpen, setIsCountryModalOpen, selectedCountry, setSelectedCountry } = useApp();

  useEffect(() => {
    if (isCountryModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isCountryModalOpen]);

  if (!isCountryModalOpen) return null;

  const regions = Array.from(new Set(COUNTRIES.map(c => c.region)));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCountryModalOpen(false)} />
      <div className="relative glass-dark rounded-2xl border border-[#2A2A2A] w-full max-w-2xl max-h-[85vh] overflow-hidden animate-scale-in shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-[#2A2A2A]">
          <div>
            <h3 className="text-lg font-black text-foreground">Select Your Country</h3>
            <p className="text-xs text-[#6B6B6B] mt-0.5">Products will display in local currency</p>
          </div>
          <button onClick={() => setIsCountryModalOpen(false)} className="w-8 h-8 glass rounded-full flex items-center justify-center text-[#6B6B6B] hover:text-foreground transition-colors">
            <Icon name="XMarkIcon" size={16} />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-5 scrollbar-thin">
          {regions?.map(region => (
            <div key={region} className="mb-5">
              <div className="text-xs font-black text-[#C9A84C] uppercase tracking-widest mb-2">{region}</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COUNTRIES?.filter(c => c?.region === region)?.map(country => (
                  <button
                    key={country?.code}
                    onClick={() => { setSelectedCountry(country); setIsCountryModalOpen(false); }}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all text-left ${
                      selectedCountry?.code === country?.code
                        ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-foreground'
                        : 'border-[#2A2A2A] hover:border-[#C9A84C]/40 hover:bg-white/5 text-[#A8A9AD]'
                    }`}
                  >
                    <span className="text-xl">{country?.flag}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-foreground truncate">{country?.name}</div>
                      <div className="text-[10px] text-[#6B6B6B]">{country?.currency} · {country?.currencySymbol}</div>
                    </div>
                    {selectedCountry?.code === country?.code && (
                      <Icon name="CheckCircleIcon" size={14} className="ml-auto text-[#C9A84C] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}