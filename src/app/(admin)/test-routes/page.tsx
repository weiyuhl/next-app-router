import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function TestRoutesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">路由组测试页面</h1>
        <p className="text-muted-foreground mt-2">
          验证三个路由组是否正常工作
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 前台路由组 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
              前台路由组 (frontend)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground mb-4">
              包含完整的前台布局（Header、Footer、MusicPlayer）
            </p>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-primary hover:underline">
                → 首页 (/)
              </Link>
              <Link href="/about" className="block text-sm text-primary hover:underline">
                → 关于 (/about)
              </Link>
              <Link href="/qingyu" className="block text-sm text-primary hover:underline">
                → 轻语 (/qingyu)
              </Link>
              <Link href="/code-snap" className="block text-sm text-primary hover:underline">
                → 代码快照 (/code-snap)
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 后台路由组 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
              后台路由组 (admin)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground mb-4">
              包含管理后台布局（Sidebar、TopBar）
            </p>
            <div className="space-y-2">
              <Link href="/dashboard" className="block text-sm text-primary hover:underline">
                → 仪表盘 (/dashboard)
              </Link>
              <Link href="/test-routes" className="block text-sm text-primary hover:underline">
                → 测试页面 (/test-routes) - 当前页
              </Link>
              <p className="text-xs text-muted-foreground">
                * 其他后台页面将在后续阶段开发
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 认证路由组 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
              认证路由组 (auth)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground mb-4">
              包含简洁的认证页面布局
            </p>
            <div className="space-y-2">
              <Link href="/login" className="block text-sm text-primary hover:underline">
                → 登录 (/login)
              </Link>
              <Link href="/register" className="block text-sm text-primary hover:underline">
                → 注册 (/register)
              </Link>
              <Link href="/forgot-password" className="block text-sm text-primary hover:underline">
                → 忘记密码 (/forgot-password)
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 技术说明 */}
      <Card>
        <CardHeader>
          <CardTitle>路由组技术说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">什么是路由组？</h4>
              <p className="text-muted-foreground">
                路由组使用 <code className="bg-muted px-2 py-1 rounded">(groupName)</code> 语法创建，
                括号中的名称不会出现在 URL 中。这允许我们为不同的路由组使用完全不同的布局。
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">文件结构示例</h4>
              <div className="bg-muted/50 p-4 rounded-lg font-mono text-xs space-y-1">
                <div>app/</div>
                <div>├── (frontend)/          # 前台路由组</div>
                <div>│   ├── layout.tsx      # 前台专用布局</div>
                <div>│   ├── page.tsx        # URL: /</div>
                <div>│   └── about/page.tsx  # URL: /about</div>
                <div>├── (admin)/            # 后台路由组</div>
                <div>│   ├── layout.tsx      # 后台专用布局</div>
                <div>│   └── dashboard/      # URL: /dashboard</div>
                <div>└── (auth)/             # 认证路由组</div>
                <div>    ├── layout.tsx      # 认证专用布局</div>
                <div>    └── login/          # URL: /login</div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">优势</h4>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>不同区域使用完全不同的布局</li>
                <li>可以为每个组设置独立的 middleware</li>
                <li>URL 保持简洁，不包含路由组名称</li>
                <li>便于权限控制和代码组织</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



