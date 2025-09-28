import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle, Play, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Next.js App Router - Error UI
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Error UI is a powerful feature in Next.js. By creating an error.js file,
            you can automatically catch errors in pages or components and provide a custom fallback UI.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-4">
            When an error occurs in a route segment, Next.js automatically displays the nearest error.js boundary,
            allowing users to see a friendly error message instead of a crashed page.
          </p>
        </div>

        <div className="space-y-8">
          {/* Error Handling Information */}
          <Card className="bg-gradient-to-br from-blue-500/10 to-green-500/10 border-blue-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-600">
                ✅ 错误处理系统已就绪
              </CardTitle>
              <p className="text-muted-foreground">
                Next.js error.js 文件约定已配置完成
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-muted-foreground mb-4">
                  错误处理系统已经配置完成，包含智能错误分析、中文化界面和重试功能。
                </p>
              </div>

              <div className="text-center">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 cursor-pointer">
                  <Link href="/test-error">
                    <Play className="w-5 h-5 mr-2" />
                    测试错误处理功能
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  访问测试页面体验完整的错误处理功能
                </p>
              </div>
            </CardContent>
          </Card>


          {/* File Structure */}
          <Card className="bg-muted/30 border-border/20">
            <CardHeader>
              <CardTitle>当前文件结构</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-background/50 p-4 rounded-lg border border-border/20">
                <div className="font-mono text-sm text-muted-foreground space-y-1">
                  <div>app/file-conventions/error/</div>
                  <div>├── error.js          ← 定义错误处理界面</div>
                  <div>└── page.tsx          ← 当前介绍页面</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-green-600 font-medium">
                  ✅ 错误处理系统已配置完成，具备生产环境使用条件。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

      </main>
    </div>
  );
}