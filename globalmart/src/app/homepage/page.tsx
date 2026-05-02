'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import CountryModal from '@/components/CountryModal';
import HeroSection from './components/HeroSection';
import CategoryBento from './components/CategoryBento';
import FeaturedProducts from './components/FeaturedProducts';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const { user } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user) router?.push('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main>
        <HeroSection />
        <CategoryBento />
        <FeaturedProducts />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
      <CartSidebar />
      <CountryModal />
    </div>
  );
}