"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Image as ImageIcon,
  BarChart,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: {
    title: string;
    href: string;
  }[];
}

const navigation: NavItem[] = [
  {
    title: "仪表盘",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "内容管理",
    icon: FileText,
    children: [
      { title: "文章管理", href: "/content/articles" },
      { title: "分类管理", href: "/content/categories" },
      { title: "标签管理", href: "/content/tags" },
    ],
  },
  {
    title: "用户管理",
    icon: Users,
    children: [
      { title: "用户列表", href: "/users" },
      { title: "角色管理", href: "/users/roles" },
      { title: "权限管理", href: "/users/permissions" },
    ],
  },
  {
    title: "媒体库",
    icon: ImageIcon,
    href: "/media",
  },
  {
    title: "数据分析",
    icon: BarChart,
    href: "/analytics",
  },
  {
    title: "系统设置",
    icon: Settings,
    href: "/settings",
  },
];

// 导航内容组件（桌面端和移动端共用）
function NavigationContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(["内容管理", "用户管理"]);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (children?: { href: string }[]) =>
    children?.some((child) => pathname.startsWith(child.href));

  return (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center space-x-2" onClick={onLinkClick}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">咏</span>
          </div>
          <span className="font-semibold text-lg">后台管理</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <div key={item.title}>
            {item.href ? (
              // 单级菜单
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={onLinkClick}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            ) : (
              // 多级菜单
              <div>
                <button
                  onClick={() => toggleExpand(item.title)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    isParentActive(item.children)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                  {expandedItems.includes(item.title) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {expandedItems.includes(item.title) && item.children && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive(child.href)
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                        onClick={onLinkClick}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}

// 主组件
export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* 桌面端侧边栏 */}
      <aside className="hidden lg:block w-64 bg-card border-r border-border flex-shrink-0 overflow-y-auto">
        <NavigationContent />
      </aside>

      {/* 移动端菜单按钮 */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="h-full bg-card overflow-y-auto">
            <NavigationContent onLinkClick={() => setMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}



