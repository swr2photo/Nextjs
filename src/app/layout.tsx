// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Noto_Sans_Thai } from 'next/font/google';
import Script from 'next/script';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Providers from './providers';
import './globals.css';

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-noto-sans-thai',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'สุขสันวันเกิด น้าาเจ้าจอม 💚',
  description: 'เรื่องราวของเรา เต็มไปด้วยเพลงและความรัก',
  icons: {
    icon: '/favicon.ico', // ใช้ไฟล์ใน public
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={notoSansThai.variable}>
      {/* suppressHydrationWarning กัน warning จุกจิกของ emotion */}
      <body suppressHydrationWarning>
        {/* ✅ ตัวสำคัญสำหรับแก้ MUI + Emotion hydration */}
        <AppRouterCacheProvider options={{ key: 'mui' }}>
          {/* โหลด Lordicon แบบไม่บล็อก first paint */}
          <Script
            src="https://cdn.lordicon.com/lordicon.js"
            strategy="afterInteractive"
          />
          {/* MUI Theme + CssBaseline + ThemeContext */}
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
