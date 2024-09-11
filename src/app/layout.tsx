import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ColorModeScript } from '@chakra-ui/react';
import TanstackProvider from '../../providers/TanstackProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'myMelody',
  description: 'show your memory on the street',
  manifest: '/manifest.json',
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'icon', url: '/icons/pwa-icons/logo-192x192.png', sizes: '192x192' },
    // 추가 아이콘 정보
  ],
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export const viewport: Viewport = {
  themeColor: '#f36ee8',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <ColorModeScript />
          <div>{children}</div>
        </TanstackProvider>
      </body>
    </html>
  );
}
