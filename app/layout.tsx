import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Project 1788382773104',
  description: 'An artisan bakery website showcasing handcrafted sourdough breads, butter croissants, and custom pastries with Spanish-language content, featuring a product catalog, subscription tiers, custom order requests, and an owner dashboard for inventory and order management.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#FBF8F3', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
