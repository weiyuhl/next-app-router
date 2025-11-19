import type { Metadata } from "next";
import "./globals.css";
import { Noto_Serif_SC } from "next/font/google";

const notoSerifSC = Noto_Serif_SC({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-serif-sc',
});

export const metadata: Metadata = {
  title: "咏雪轩阁",
  description: "咏雪轩阁 - 一个优雅的文学与艺术空间",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={notoSerifSC.variable} suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
