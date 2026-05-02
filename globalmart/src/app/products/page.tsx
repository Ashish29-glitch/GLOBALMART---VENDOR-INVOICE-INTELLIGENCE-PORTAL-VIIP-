'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import CountryModal from '@/components/CountryModal';
import ProductsContent from './components/ProductsContent';
import { useApp } from '@/context/AppContext';

export default function ProductsPage() {
  const { user } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user) router?.push('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <ProductsContent />
      </main>
      <Footer />
      <CartSidebar />
      <CountryModal />
    </div>
  );
}