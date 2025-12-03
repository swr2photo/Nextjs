// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Noto_Sans_Thai } from 'next/font/google';
import Script from 'next/script';
import Providers from './providers';
import './globals.css';

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-noto-sans-thai',
  display: 'swap', // ✅ ให้ใช้ฟอนต์ fallback ก่อน ลด FOUT
});

export const metadata: Metadata = {
  title: 'สุขสันวันเกิด น้าาเจ้าจอม 💚',
  description: 'เรื่องราวของเรา เต็มไปด้วยเพลงและความรัก',
  icons: {
    // แนะนำให้ใช้ไฟล์จริงใน /public เช่น /favicon.ico
    // ถ้าคุณมี icon เป็นไฟล์แล้ว เปลี่ยนตรงนี้ได้เลย
    icon: '/favicon.ico',
  },
};

// ✅ ให้ Next จัดการ viewport (แทน <meta> manual)
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
      <body>
        {/* โหลด Lordicon แบบไม่บล็อกการ render แรก */}
        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="afterInteractive" // เดิมใช้ beforeInteractive → ช้ากว่า
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
