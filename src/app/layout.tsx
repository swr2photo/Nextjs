import type { Metadata } from 'next';
import { Noto_Sans_Thai } from 'next/font/google';
import Script from 'next/script';
import Providers from './providers';
import './globals.css';

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-noto-sans-thai',
});

export const metadata: Metadata = {
  title: 'สุขสันวันเกิด น้าาเจ้าจอม 💚',
  description: 'เรื่องราวของเรา เต็มไปด้วยเพลงและความรัก',
  icons: {
    icon: '🎵',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={notoSansThai.variable}>
        {/* โหลด Lordicon script */}
        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="beforeInteractive"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
