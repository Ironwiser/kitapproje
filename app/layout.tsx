import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ayşe Kara — Yazar',
  description: 'Yazar Ayşe Kara’nın kitapları, hikâyesi ve güncel çalışmaları.',
  openGraph: {
    title: 'Ayşe Kara — Yazar',
    description: 'Kelimeler, hatırlamanın başka bir yolu.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayşe Kara — Yazar',
    description: 'Kelimeler, hatırlamanın başka bir yolu.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
