"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bug, Wifi, Clock, Lock, Ban } from "lucide-react";

export default function TestErrorPage() {
  const [loading, setLoading] = useState(false);

  const triggerError = async (errorType) => {
    setLoading(true);
    
    try {
      switch (errorType) {
        case 'network':
          // 模拟网络错误
          throw new Error('fetch failed: network error occurred');
          
        case 'timeout':
          // 模拟超时错误
          throw new Error('request timeout: operation took too long');
          
        case 'unauthorized':
          // 模拟401错误
          throw new Error('unauthorized: authentication required');
          
        case 'forbidden':
          // 模拟403错误
          throw new Error('forbidden: access denied');
          
        case 'server':
          // 模拟服务器错误
          throw new Error('Internal server error occurred');
          
        case 'generic':
        default:
          // 模拟通用错误
          throw new Error('Something went wrong');
      }
    } catch (error) {
      setLoading(false);
      throw error; // 重新抛出错误让error.js处理
    }
  };

  const redirectToNotFound = (statusCode) => {
    const params = new URLSearchParams({
      status: statusCode.toString(),
      error: getErrorMessage(statusCode)
    });
    window.location.href = `/non-existent-page?${params.toString()}`;
  };

  const getErrorMessage = (statusCode) => {
    switch (statusCode) {
      case 400: return "请求参数错误";
      case 401: return "需要登录验证";
      case 403: return "访问被拒绝";
      case 405: return "请求方法不允许";
      case 408: return "请求超时";
      case 429: return "请求过于频繁";
      case 500: return "服务器内部错误";
      case 502: return "网关错误";
      case 503: return "服务不可用";
      case 504: return "网关超时";
      default: return "未知错误";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">错误处理测试页面</h1>
            <p className="text-muted-foreground">
              点击下面的按钮来测试不同类型的错误处理
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 运行时错误测试 */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Bug className="w-5 h-5" />
                运行时错误测试
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                这些错误会被 error.js 捕获并处理
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => triggerError('network')} 
                  disabled={loading}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Wifi className="w-4 h-4 mr-2" />
                  网络错误 (503)
                </Button>
                
                <Button 
                  onClick={() => triggerError('timeout')} 
                  disabled={loading}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  超时错误 (408)
                </Button>
                
                <Button 
                  onClick={() => triggerError('unauthorized')} 
                  disabled={loading}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  未授权错误 (401)
                </Button>
                
                <Button 
                  onClick={() => triggerError('forbidden')} 
                  disabled={loading}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Ban className="w-4 h-4 mr-2" />
                  禁止访问错误 (403)
                </Button>
                
                <Button 
                  onClick={() => triggerError('server')} 
                  disabled={loading}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  服务器错误 (500)
                </Button>
                
                <Button 
                  onClick={() => triggerError('generic')} 
                  disabled={loading}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Bug className="w-4 h-4 mr-2" />
                  通用错误 (500)
                </Button>
              </div>
            </div>

            {/* HTTP状态码测试 */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                HTTP状态码测试
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                这些会跳转到 not-found.js 并显示相应的状态码
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => redirectToNotFound(400)} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  400 - 请求错误
                </Button>
                
                <Button 
                  onClick={() => redirectToNotFound(401)} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  401 - 未授权
                </Button>
                
                <Button 
                  onClick={() => redirectToNotFound(403)} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  403 - 禁止访问
                </Button>
                
                <Button 
                  onClick={() => redirectToNotFound(405)} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  405 - 方法不允许
                </Button>
                
                <Button 
                  onClick={() => redirectToNotFound(429)} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  429 - 请求过多
                </Button>
                
                <Button 
                  onClick={() => redirectToNotFound(502)} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  502 - 网关错误
                </Button>
                
                <Button 
                  onClick={() => redirectToNotFound(503)} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  503 - 服务不可用
                </Button>
                
                <Button 
                  onClick={() => redirectToNotFound(504)} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  504 - 网关超时
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <h3 className="font-semibold mb-2">说明：</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>运行时错误</strong>：会被 error.js 捕获，显示错误页面并提供重试选项</li>
              <li>• <strong>HTTP状态码</strong>：会跳转到 not-found.js，根据URL参数显示相应的状态码和错误信息</li>
              <li>• <strong>404错误</strong>：直接访问不存在的页面会显示默认的404页面</li>
              <li>• <strong>全局错误</strong>：严重的应用程序错误会被 global-error.js 处理</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}