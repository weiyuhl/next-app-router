"use client";

import { Bell, Search, User, LogOut, Settings, Home, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AdminTopBarProps {
  onMenuClick?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function AdminTopBar({ onMenuClick, isMobileMenuOpen = false }: AdminTopBarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    // 这里后续会添加登出逻辑
    alert("登出功能将在认证系统完成后实现");
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 shadow-sm">
      {/* 左侧：移动端菜单按钮 + 搜索 */}
      <div className="flex items-center space-x-4 flex-1">
        {/* 移动端菜单按钮 */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* 搜索栏 - 桌面端显示 */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索内容、用户或设置..."
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* 右侧操作 */}
      <div className="flex items-center space-x-2">
        {/* 移动端搜索按钮 */}
        <button className="md:hidden p-2 cursor-pointer">
          <Search className="w-5 h-5" />
        </button>

        {/* 通知 */}
        <button className="relative p-2 cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-card"></span>
        </button>

        {/* 用户菜单 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 px-3 py-2 cursor-pointer">
              <User className="w-5 h-5" />
              <span className="hidden lg:block text-sm font-medium">管理员</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">管理员</p>
                <p className="text-xs text-muted-foreground">admin@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/" className="flex items-center cursor-pointer">
                <Home className="w-4 h-4 mr-2" />
                返回前台
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                系统设置
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}



