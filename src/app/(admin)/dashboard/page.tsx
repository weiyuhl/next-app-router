import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Eye, MessageSquare, TrendingUp, User, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    {
      title: "总用户数",
      value: "2,543",
      change: "+12.5%",
      changeText: "较上月",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "文章总数",
      value: "1,234",
      change: "+8.2%",
      changeText: "较上月",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      title: "总浏览量",
      value: "45.2K",
      change: "+23.1%",
      changeText: "较上月",
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      title: "评论总数",
      value: "892",
      change: "+5.4%",
      changeText: "较上月",
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
  ];

  const quickActions = [
    {
      title: "新建文章",
      description: "创建一篇新的文章",
      icon: FileText,
      href: "/content/articles/new",
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "用户管理",
      description: "管理系统用户",
      icon: Users,
      href: "/users",
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      title: "数据分析",
      description: "查看详细数据",
      icon: Eye,
      href: "/analytics",
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
    },
  ];

  const activities = [
    { user: "张三", action: "发布了新文章", time: "5分钟前", avatar: "Z" },
    { user: "李四", action: "评论了文章", time: "15分钟前", avatar: "L" },
    { user: "王五", action: "更新了个人资料", time: "1小时前", avatar: "W" },
    { user: "赵六", action: "上传了新图片", time: "2小时前", avatar: "Z" },
  ];

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">仪表盘</h1>
        <p className="text-muted-foreground mt-2">
          欢迎回来！这是您的数据概览
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                  <div className="flex items-center mt-3">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                    <span className="text-xs text-muted-foreground ml-2">{stat.changeText}</span>
                  </div>
                </div>
                <div className={`w-14 h-14 ${stat.bgColor} ${stat.borderColor} border rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 快速操作 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">快速操作</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="group p-5 border border-border rounded-xl hover:border-primary/50 hover:shadow-md transition-all duration-200 bg-card"
              >
                <div className={`w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{action.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                <div className="flex items-center text-sm text-primary font-medium">
                  <span>开始</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 最近活动 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">最近活动</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {activity.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



