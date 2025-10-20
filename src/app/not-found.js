"use client";

import { FileQuestion, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function NotFoundContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [errorInfo, setErrorInfo] = useState({
    statusCode: 404,
    statusText: "Not Found",
    reason: "请求的页面不存在"
  });

  useEffect(() => {
    // 检查URL参数中是否有错误信息
    const status = searchParams.get('status');
    const error = searchParams.get('error');
    
    if (status) {
      const statusCode = parseInt(status);
      let statusText = "Unknown Error";
      let reason = "发生了未知错误";
      
      switch (statusCode) {
        case 400:
          statusText = "Bad Request";
          reason = "请求格式错误或参数无效";
          break;
        case 401:
          statusText = "Unauthorized";
          reason = "需要身份验证才能访问此页面";
          break;
        case 403:
          statusText = "Forbidden";
          reason = "您没有权限访问此页面";
          break;
        case 404:
          statusText = "Not Found";
          reason = "请求的页面不存在";
          break;
        case 405:
          statusText = "Method Not Allowed";
          reason = "请求方法不被允许";
          break;
        case 408:
          statusText = "Request Timeout";
          reason = "请求超时";
          break;
        case 429:
          statusText = "Too Many Requests";
          reason = "请求过于频繁，请稍后再试";
          break;
        case 500:
          statusText = "Internal Server Error";
          reason = "服务器内部错误";
          break;
        case 502:
          statusText = "Bad Gateway";
          reason = "网关错误";
          break;
        case 503:
          statusText = "Service Unavailable";
          reason = "服务暂时不可用";
          break;
        case 504:
          statusText = "Gateway Timeout";
          reason = "网关超时";
          break;
        default:
          if (statusCode >= 400 && statusCode < 500) {
            statusText = "Client Error";
            reason = "客户端请求错误";
          } else if (statusCode >= 500) {
            statusText = "Server Error";
            reason = "服务器错误";
          }
      }
      
      setErrorInfo({
        statusCode,
        statusText,
        reason: error || reason
      });
    }
  }, [searchParams]);
  
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          {/* Error Icon */}
          <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
            <FileQuestion className="w-12 h-12 text-yellow-500" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">
              {errorInfo.statusCode === 404 ? "页面未找到" : "访问错误"}
            </h2>
            <p className="text-muted-foreground mb-4">
              抱歉，{errorInfo.reason}
            </p>
          </div>

          {/* Error Details */}
          <div className="bg-background/50 p-4 rounded-lg border border-border/20 text-left">
            <h4 className="font-medium mb-2">错误信息</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <div><strong>状态码：</strong>{errorInfo.statusCode} {errorInfo.statusText}</div>
              <div><strong>错误原因：</strong>{errorInfo.reason}</div>
              <div><strong>当前路径：</strong><span className="font-mono text-yellow-600">{pathname}</span></div>
              {searchParams.get('original_path') && (
                <div><strong>原始请求：</strong><span className="font-mono text-red-600">{searchParams.get('original_path')}</span></div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回首页
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">加载中...</p>
        </div>
      </div>
    }>
      <NotFoundContent />
    </Suspense>
  );
}