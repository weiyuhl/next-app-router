"use client";

import { Bell, Search, User, LogOut, Settings, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AdminTopBarProps {
  onMenuClick?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function AdminTopBar({ onMenuClick, isMobileMenuOpen = false }: AdminTopBarProps) {
  const handleLogout = async () => {
    // 这里后续会添加登出逻辑
    alert("登出功能将在认证系统完成后实现");
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      {/* 左侧：移动端菜单按钮 */}
      <div className="flex items-center space-x-4">
        {/* 移动端菜单按钮 */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* 搜索栏 - 桌面端显示 */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索..."
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* 右侧操作 */}
      <div className="flex items-center space-x-2 lg:space-x-4">
        {/* 返回前台 - 桌面端显示 */}
        <Link href="/" className="hidden lg:block">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Home className="w-4 h-4 mr-2" />
            返回前台
          </Button>
        </Link>

        {/* 返回前台 - 移动端图标 */}
        <Link href="/" className="lg:hidden">
          <Button variant="ghost" size="icon" title="返回前台">
            <Home className="w-5 h-5" />
          </Button>
        </Link>

        {/* 通知 */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* 设置 - 桌面端显示 */}
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <Settings className="w-5 h-5" />
        </Button>

        {/* 用户菜单 */}
        <div className="flex items-center space-x-2 lg:space-x-3 pl-2 lg:pl-3 border-l border-border">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium">管理员</p>
            <p className="text-xs text-muted-foreground">admin@example.com</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleLogout}
            title="退出登录"
            className="hidden md:inline-flex"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}



