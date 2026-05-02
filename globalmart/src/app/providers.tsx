'use client';
import React, { ReactNode } from 'react';
import { AppProvider } from '@/context/AppContext';
import { CartProvider } from '@/context/CartContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AppProvider>
  );
}