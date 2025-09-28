"use client";

import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // 记录错误到控制台
    console.error('应用错误:', error);
  }, [error]);

  // 根据错误类型确定状态码和消息
  const getErrorInfo = () => {
    const message = error?.message || "发生了未知错误";
    
    // 检查常见的错误类型
    if (message.includes('fetch') || message.includes('network')) {
      return {
        statusCode: 503,
        statusText: "Service Unavailable",
        reason: "网络连接错误或服务不可用",
        canRetry: true
      };
    }
    
    if (message.includes('timeout')) {
      return {
        statusCode: 408,
        statusText: "Request Timeout",
        reason: "请求超时",
        canRetry: true
      };
    }
    
    if (message.includes('unauthorized') || message.includes('401')) {
      return {
        statusCode: 401,
        statusText: "Unauthorized",
        reason: "需要身份验证才能访问",
        canRetry: false
      };
    }
    
    if (message.includes('forbidden') || message.includes('403')) {
      return {
        statusCode: 403,
        statusText: "Forbidden",
        reason: "您没有权限访问此资源",
        canRetry: false
      };
    }
    
    // 默认为500内部服务器错误
    return {
      statusCode: 500,
      statusText: "Internal Server Error",
      reason: "服务器内部错误",
      canRetry: true
    };
  };

  const errorInfo = getErrorInfo();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          {/* Error Icon */}
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-red-500 mb-2">
              出现错误
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
              <div><strong>错误详情：</strong><span className="font-mono text-red-600 break-all">{error?.message || "未知错误"}</span></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {errorInfo.canRetry && (
              <Button 
                onClick={reset}
                className="bg-red-500 hover:bg-red-600 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                重试
              </Button>
            )}
            <Button asChild variant="outline" className="cursor-pointer">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回首页
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}