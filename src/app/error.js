"use client";

import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // 记录错误到控制台
    console.error('应用错误:', error);
    
    // 可选：发送错误到监控服务
    // 例如：Sentry, LogRocket, 或自定义错误追踪服务
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // 示例：发送错误到监控服务
      // sendErrorToMonitoring({
      //   message: error?.message,
      //   stack: error?.stack,
      //   timestamp: new Date().toISOString(),
      //   userAgent: navigator.userAgent,
      //   url: window.location.href
      // });
    }
  }, [error]);

  // 根据错误类型确定状态码和消息
  const getErrorInfo = () => {
    const message = error?.message || "发生了未知错误";
    const lowerMessage = message.toLowerCase();
    
    // 网络相关错误
    if (lowerMessage.includes('fetch') || lowerMessage.includes('network') || lowerMessage.includes('connection refused')) {
      return {
        statusCode: 503,
        statusText: "Service Unavailable",
        reason: "网络连接错误或服务不可用",
        canRetry: true
      };
    }
    
    // 超时错误
    if (lowerMessage.includes('timeout') || lowerMessage.includes('timed out')) {
      return {
        statusCode: 408,
        statusText: "Request Timeout",
        reason: "请求超时",
        canRetry: true
      };
    }
    
    // 认证和授权错误
    if (lowerMessage.includes('unauthorized') || lowerMessage.includes('401') || lowerMessage.includes('authentication')) {
      return {
        statusCode: 401,
        statusText: "Unauthorized",
        reason: "需要身份验证才能访问",
        canRetry: false
      };
    }
    
    if (lowerMessage.includes('forbidden') || lowerMessage.includes('403') || lowerMessage.includes('access denied')) {
      return {
        statusCode: 403,
        statusText: "Forbidden",
        reason: "您没有权限访问此资源",
        canRetry: false
      };
    }
    
    // 数据相关错误
    if (lowerMessage.includes('database') || lowerMessage.includes('db connection') || lowerMessage.includes('connection timeout')) {
      return {
        statusCode: 503,
        statusText: "Database Unavailable",
        reason: "数据库连接失败，请稍后重试",
        canRetry: true
      };
    }
    
    if (lowerMessage.includes('validation') || lowerMessage.includes('invalid data') || lowerMessage.includes('bad request')) {
      return {
        statusCode: 400,
        statusText: "Bad Request",
        reason: "数据格式错误或验证失败",
        canRetry: false
      };
    }
    
    if (lowerMessage.includes('json') || lowerMessage.includes('parse') || lowerMessage.includes('syntax error')) {
      return {
        statusCode: 422,
        statusText: "Unprocessable Entity",
        reason: "数据解析错误",
        canRetry: false
      };
    }
    
    // 文件系统错误
    if (lowerMessage.includes('enoent') || lowerMessage.includes('file not found') || lowerMessage.includes('no such file')) {
      return {
        statusCode: 404,
        statusText: "File Not Found",
        reason: "请求的文件不存在",
        canRetry: false
      };
    }
    
    if (lowerMessage.includes('eacces') || lowerMessage.includes('permission denied') || lowerMessage.includes('access is denied')) {
      return {
        statusCode: 403,
        statusText: "Permission Denied",
        reason: "文件访问权限不足",
        canRetry: false
      };
    }
    
    if (lowerMessage.includes('enospc') || lowerMessage.includes('no space left') || lowerMessage.includes('disk full')) {
      return {
        statusCode: 507,
        statusText: "Insufficient Storage",
        reason: "存储空间不足",
        canRetry: false
      };
    }
    
    // 内存和资源错误
    if (lowerMessage.includes('out of memory') || lowerMessage.includes('heap limit') || lowerMessage.includes('memory exceeded')) {
      return {
        statusCode: 507,
        statusText: "Insufficient Storage",
        reason: "内存不足，请稍后重试",
        canRetry: true
      };
    }
    
    if (lowerMessage.includes('too many') || lowerMessage.includes('resource exhausted') || lowerMessage.includes('limit exceeded')) {
      return {
        statusCode: 429,
        statusText: "Too Many Requests",
        reason: "资源使用超限，请稍后重试",
        canRetry: true
      };
    }
    
    // API和外部服务错误
    if (lowerMessage.includes('rate limit') || lowerMessage.includes('quota exceeded') || lowerMessage.includes('api limit')) {
      return {
        statusCode: 429,
        statusText: "Rate Limited",
        reason: "API调用频率超限，请稍后重试",
        canRetry: true
      };
    }
    
    if (lowerMessage.includes('external service') || lowerMessage.includes('third party') || lowerMessage.includes('upstream')) {
      return {
        statusCode: 502,
        statusText: "Bad Gateway",
        reason: "外部服务不可用",
        canRetry: true
      };
    }
    
    if (lowerMessage.includes('certificate') || lowerMessage.includes('ssl') || lowerMessage.includes('tls') || lowerMessage.includes('handshake')) {
      return {
        statusCode: 495,
        statusText: "SSL Certificate Error",
        reason: "SSL证书错误",
        canRetry: false
      };
    }
    
    // 客户端特定错误
    if (lowerMessage.includes('unsupported') || lowerMessage.includes('not supported') || lowerMessage.includes('incompatible')) {
      return {
        statusCode: 400,
        statusText: "Not Supported",
        reason: "浏览器或功能不支持",
        canRetry: false
      };
    }
    
    if (lowerMessage.includes('offline') || lowerMessage.includes('no internet') || lowerMessage.includes('connection lost')) {
      return {
        statusCode: 503,
        statusText: "Service Unavailable",
        reason: "网络连接已断开",
        canRetry: true
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
              {process.env.NODE_ENV === 'development' && error?.stack && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
                    查看错误堆栈 (仅开发环境)
                  </summary>
                  <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-32 text-red-600">
                    {error.stack}
                  </pre>
                </details>
              )}
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