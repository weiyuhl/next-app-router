'use client';

import { Shield, ExternalLink, Home } from "lucide-react";
import Header from "@/components/Header";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ExternalRedirectContent() {
  const [targetUrl, setTargetUrl] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const url = searchParams.get('url');
    if (url) {
      // 验证URL格式
      try {
        new URL(url);
        setTargetUrl(url);
      } catch {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

  const handleGoHome = () => {
    router.push('/');
  };

  const getDomainFromUrl = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center space-y-6 w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto px-4">
          {/* Main Security Icon */}
          <div className="w-20 md:w-24 lg:w-28 h-20 md:h-24 lg:h-28 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 text-orange-500" />
          </div>
          
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-600 mb-2">安全提醒</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              您即将离开当前网站，跳转到外部链接
            </p>
          </div>

          {/* Target URL Info */}
          {targetUrl && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 md:p-4 lg:p-5 space-y-2">
              <div className="flex items-center justify-center space-x-2 text-orange-700">
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-medium">目标网站</span>
              </div>
              <div className="text-orange-800 font-mono text-xs md:text-sm break-all">
                {getDomainFromUrl(targetUrl)}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-3">
            {targetUrl ? (
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 md:py-3 lg:py-3.5 px-4 md:px-5 lg:px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm md:text-base"
              >
                <ExternalLink className="w-4 h-4" />
                <span>确认跳转</span>
              </a>
            ) : (
              <div className="flex-1 bg-gray-400 text-white font-medium py-2.5 md:py-3 lg:py-3.5 px-4 md:px-5 lg:px-6 rounded-lg flex items-center justify-center space-x-2 text-sm md:text-base">
                <ExternalLink className="w-4 h-4" />
                <span>加载中...</span>
              </div>
            )}
            
            <button
              onClick={handleGoHome}
              className="flex-1 bg-muted hover:bg-muted/80 text-muted-foreground font-medium py-2.5 md:py-3 lg:py-3.5 px-4 md:px-5 lg:px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm md:text-base"
            >
              <Home className="w-4 h-4" />
              <span>返回首页</span>
            </button>
          </div>

          {/* Security Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4">
            <p className="text-xs md:text-sm text-yellow-700">
              ⚠️ 请确认您信任即将访问的网站。外部网站的内容和安全性不受本站控制。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ExternalRedirectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>正在加载...</p>
        </div>
      </div>
    }>
      <ExternalRedirectContent />
    </Suspense>
  );
}