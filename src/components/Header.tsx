'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [mobileExpandedGroups, setMobileExpandedGroups] = useState<string[]>([]);

  useEffect(() => {
    // 标记客户端已挂载
    setIsClient(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupTitle) 
        ? prev.filter(title => title !== groupTitle)
        : [...prev, groupTitle]
    );
  };

  const toggleMobileGroup = (groupTitle: string) => {
    setMobileExpandedGroups(prev => 
      prev.includes(groupTitle) 
        ? prev.filter(title => title !== groupTitle)
        : [...prev, groupTitle]
    );
  };

  // 添加首页和关于的独立链接
  const staticLinks = [
    { href: "/", label: "首页" },
    { href: "/about", label: "关于" },
    { href: "/code-snap", label: "A" },
    { href: "/qingyu", label: "轻语" },
  ];

  const navigationGroups = [
    {
      title: "布局系统",
      links: [
        { href: "/layouts/nested-layouts", label: "嵌套布局" },
        { href: "/layouts/route-groups", label: "路由组" },
        { href: "/layouts/parallel-routes", label: "并行路由" },
      ],
    },
    {
      title: "文件约定",
      links: [
        { href: "/file-conventions/loading", label: "加载状态" },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          {/* 左侧标题 */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold">咏雪轩阁</h1>
              </div>
            </Link>
          </div>
          
          {/* 居中菜单 - 静态链接 + 可展开的导航组 */}
          <div className="flex items-center space-x-8">
            {/* 静态链接 */}
            {staticLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground"
              >
                {link.label}
              </Link>
            ))}
            
            {/* 可展开的导航组 */}
            {navigationGroups.map((group) => (
              <div key={group.title} className="relative inline-block">
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="flex items-center space-x-1 text-foreground whitespace-nowrap"
                >
                  <span>{group.title}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      expandedGroups.includes(group.title) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* 下拉菜单 */}
                {expandedGroups.includes(group.title) && (
                  <div className="absolute top-full left-0 mt-2 bg-card border border-border/20 rounded-md shadow-lg z-50 min-w-full whitespace-nowrap">
                    <div className="py-2">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2 text-sm text-foreground"
                          onClick={() => setExpandedGroups([])}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* 右侧占位，保持菜单居中 */}
          <div className="flex items-center">
            {/* 可以在这里添加右侧内容，如用户头像、设置按钮等 */}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex items-center justify-center relative">
          <Link href="/">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold">咏雪轩阁</h1>
            </div>
          </Link>

          <div className="absolute right-0 flex items-center space-x-3">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border/20">
            <div className="flex flex-col space-y-6 pt-4">
              {/* 静态链接 */}
              {staticLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* 导航组 */}
              {navigationGroups.map((group) => (
                <div key={group.title} className="flex flex-col space-y-2">
                  <button
                    onClick={() => toggleMobileGroup(group.title)}
                    className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    <span>{group.title}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileExpandedGroups.includes(group.title) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileExpandedGroups.includes(group.title) && (
                    <div className="flex flex-col space-y-1 pl-4">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2 text-sm text-foreground hover:text-muted-foreground transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
