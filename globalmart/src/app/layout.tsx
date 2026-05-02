import React from 'react';
import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';
import { Providers } from './providers';
import { VIIPButton } from '@/components/VIIPButton';
import '../styles/tailwind.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'GlobalMart — Shop the World, Pay in Dollars',
  description: 'Premium dark marketplace with 1000+ products across 20 countries. Browse in local currency, checkout in USD. Free shipping on all orders.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={dmSans.className}>
        <Providers>
          {children}
        </Providers>
        <div style={{ position: 'fixed', bottom: '0', right: '0', zIndex: '9999', pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto' }}>
            <VIIPButton />
          </div>
        </div>
      </body>
    </html>
  );
}