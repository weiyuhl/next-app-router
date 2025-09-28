import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | 公开页面",
    default: "公开页面"
  },
  description: "这是我们的公开访问页面，包含关于我们等信息",
    keywords: ["公司信息", "关于我们", "帮助中心"],
  authors: [{ name: "Next.js App Router Demo" }],
  creator: "Next.js App Router Demo Team",
  publisher: "Next.js App Router Demo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "Next.js App Router Demo",
    title: "公开页面",
    description: "这是我们的公开访问页面，包含关于我们等信息",
  },
  twitter: {
    card: "summary_large_image",
    title: "公开页面",
    description: "这是我们的公开访问页面，包含关于我们等信息",
  },
  alternates: {
    canonical: "/layouts/route-groups",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 公开页面的统一布局容器 */}
      <div className="flex flex-col min-h-screen">
        {/* 主要内容区域 */}
        <main className="flex-1" role="main">
          {children}
        </main>
        
        {/* 公开页面底部信息 */}
        <footer className="border-t border-border/20 bg-muted/30 py-6 mt-auto" role="contentinfo">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Next.js App Router Demo. 这是一个演示项目，展示了公开访问页面的实现方式。
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              遵循Web无障碍访问标准 | 响应式设计 | SEO优化
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}