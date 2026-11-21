import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PokoAds — Copilot Untuk Media Buyer Berpengalaman',
  description:
    'Laporan Harian Via WhatsApp • Auto-Rules Iklan • Variasi Kreatif Dari Iklan Pemenang. Meta Ads & TikTok Ads terintegrasi.',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#f8fafc',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased bg-[#f8fafc]">
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900">
        {children}
      </body>
    </html>
  );
}
