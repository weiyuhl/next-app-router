import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Eye, MessageSquare, TrendingUp, User } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "总用户数",
      value: "2,543",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "文章总数",
      value: "1,234",
      change: "+8.2%",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "总浏览量",
      value: "45.2K",
      change: "+23.1%",
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: "评论总数",
      value: "892",
      change: "+5.4%",
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold">仪表盘</h1>
        <p className="text-muted-foreground mt-2">
          欢迎回来！这是您的数据概览
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">{stat.change}</span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 快速操作 */}
      <Card>
        <CardHeader>
          <CardTitle>快速操作</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
              <FileText className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-medium mb-1">新建文章</h3>
              <p className="text-sm text-muted-foreground">创建一篇新的文章</p>
            </button>
            <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
              <Users className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-medium mb-1">用户管理</h3>
              <p className="text-sm text-muted-foreground">管理系统用户</p>
            </button>
            <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
              <Eye className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-medium mb-1">数据分析</h3>
              <p className="text-sm text-muted-foreground">查看详细数据</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* 最近活动 */}
      <Card>
        <CardHeader>
          <CardTitle>最近活动</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: "张三", action: "发布了新文章", time: "5分钟前" },
              { user: "李四", action: "评论了文章", time: "15分钟前" },
              { user: "王五", action: "更新了个人资料", time: "1小时前" },
              { user: "赵六", action: "上传了新图片", time: "2小时前" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



