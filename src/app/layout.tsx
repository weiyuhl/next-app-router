import type { Metadata } from "next";
import "./globals.css";
import ExternalLinkInterceptor from "@/components/ExternalLinkInterceptor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";

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
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <ExternalLinkInterceptor />
        <Header />
        <main className="pt-20 flex-1">
          {children}
        </main>
        <Footer />
        <MusicPlayer />
      </body>
    </html>
  );
}
