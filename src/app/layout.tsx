import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ExternalLinkInterceptor from "@/components/ExternalLinkInterceptor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js App Router Playground",
  description: "Interactively demonstrates the core features of Next.js App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/eo-logo-blue.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ExternalLinkInterceptor />
        <Header />
        <main className="pt-20 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
