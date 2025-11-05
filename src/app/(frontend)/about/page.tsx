import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Heart, Users, Target, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于我们",
  description: "了解我们的使命、愿景和团队，我们致力于提供优质的技术解决方案",
  keywords: ["关于我们", "公司介绍", "团队", "使命", "愿景"],
  openGraph: {
    title: "关于我们 | Next.js App Router Demo",
    description: "了解我们的使命、愿景和团队，我们致力于提供优质的技术解决方案",
  },
};

export default function AboutPage() {
  const features = [
    {
      title: "创新技术",
      description: "采用最新的 Next.js 和现代前端技术栈",
      icon: Target,
      color: "text-blue-600"
    },
    {
      title: "用户体验",
      description: "专注于提供卓越的用户体验和界面设计",
      icon: Heart,
      color: "text-red-600"
    },
    {
      title: "团队协作",
      description: "拥有专业的开发团队和完整的协作流程",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "全球服务",
      description: "致力于为全球用户提供稳定可靠的服务",
      icon: Globe,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="outline" size="sm" className="cursor-pointer">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Link>
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-4">
            关于我们
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            这个页面位于前台路由组，可以直接通过 <code className="bg-muted px-2 py-1 rounded text-primary">/about</code> 路径访问
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* 公司介绍 */}
          <Card className="bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">我们的使命</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                致力于通过创新的技术解决方案提供卓越的数字体验。
                我们专注于 Next.js 应用开发，追求代码质量与用户体验的完美平衡。
              </p>
              <p className="text-muted-foreground">
                我们相信技术的力量能够改变世界，让每个人都能享受到技术带来的便利。
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/80 border-border/30 hover:bg-card/90 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Company Information */}
          <Card className="bg-muted/30 border-border/20">
            <CardHeader>
              <CardTitle>公司信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">成立时间</p>
                    <p className="text-sm text-muted-foreground">成立于 2020 年</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">团队规模</p>
                    <p className="text-sm text-muted-foreground">团队规模：50+ 人</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">服务范围</p>
                    <p className="text-sm text-muted-foreground">服务全球客户</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}



