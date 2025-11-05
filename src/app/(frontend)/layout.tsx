import type { Metadata } from "next";
import ExternalLinkInterceptor from "@/components/ExternalLinkInterceptor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "咏雪轩阁",
  description: "咏雪轩阁 - 一个优雅的文学与艺术空间",
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ExternalLinkInterceptor />
      <Header />
      <main className="pt-20 flex-1">
        {children}
      </main>
      <Footer />
      <MusicPlayer />
      <BackToTop />
    </>
  );
}



