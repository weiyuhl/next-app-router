"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="text-center space-y-6 max-w-md mx-auto">
            {/* Error Icon */}
            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-red-500 mb-2">
                应用程序错误
              </h2>
              <p className="text-gray-600 mb-4">
                抱歉，应用程序遇到了严重错误
              </p>
            </div>

            {/* Error Details */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-left">
              <h4 className="font-medium mb-2">错误信息</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <div><strong>状态码：</strong>500 Internal Server Error</div>
                <div><strong>错误原因：</strong>应用程序发生严重错误</div>
                <div><strong>错误详情：</strong><span className="font-mono text-red-600 break-all">{error?.message || "未知的全局错误"}</span></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={reset}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                重新加载应用
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                返回首页
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}