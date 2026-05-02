import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A2A] mt-16">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/homepage" className="flex items-center gap-2">
          <AppLogo size={28} />
          <span className="font-black text-base tracking-tighter text-foreground">
            Global<span className="gold-text">Mart</span>
          </span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-[#6B6B6B]">
          <Link href="/homepage" className="hover:text-[#C9A84C] transition-colors">Home</Link>
          <Link href="/products" className="hover:text-[#C9A84C] transition-colors">Products</Link>
          <a href="#" className="hover:text-[#C9A84C] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#C9A84C] transition-colors">Terms</a>
        </div>

        <div className="text-sm text-[#6B6B6B]">
          © 2026 GlobalMart Inc.
        </div>
      </div>
    </footer>
  );
}