'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [mobileExpandedGroups, setMobileExpandedGroups] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // 页面标题映射
  const getPageTitle = (path: string) => {
    const titleMap: { [key: string]: string } = {
      '/': '咏雪轩阁',
      '/about': '关于',
      '/code-snap': 'A',
      '/qingyu': '轻语',
      '/layouts/nested-layouts': '嵌套布局',
      '/layouts/route-groups': '路由组',
      '/layouts/parallel-routes': '并行路由',
      '/file-conventions/loading': '加载状态',
      '/layouts': '布局系统',
      '/file-conventions': '文件约定',
    };
    return titleMap[path] || '咏雪轩阁';
  };

  const currentPageTitle = getPageTitle(pathname);
  const isHomePage = pathname === '/';
  
  // 判断是否为错误页面或未定义页面
  const isErrorOrUndefinedPage = currentPageTitle === '咏雪轩阁' && !isHomePage;
  
  // 首页和错误页面始终显示居中，其他页面根据滚动状态决定
  const shouldShowCentered = isHomePage || isErrorOrUndefinedPage || !isScrolled;

  useEffect(() => {
    // 滚动监听
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 100; // 滚动阈值
      setIsScrolled(scrollY > threshold);
    };

    // 添加滚动监听
    window.addEventListener('scroll', handleScroll);
    
    // 清理函数
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
                className="text-foreground hover:text-blue-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            {/* 可展开的导航组 */}
            {navigationGroups.map((group) => (
              <div key={group.title} className="relative inline-block">
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="flex items-center space-x-1 text-foreground hover:text-blue-500 transition-colors whitespace-nowrap"
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
        <div className="lg:hidden flex items-center relative">
          {shouldShowCentered ? (
            // 居中布局：网站名称居中显示
            <div className="flex-1 flex items-center justify-center">
              <Link href="/">
                <div className="flex items-center">
                  <h1 className="text-lg font-semibold">咏雪轩阁</h1>
                </div>
              </Link>
            </div>
          ) : (
            // 滚动后布局：网站名称在左边，页面标题居中
            <>
               {/* 左侧网站名称 */}
               <div className="flex items-center">
                 <Link href="/">
                   <div className="flex items-center">
                     <h1 className="text-lg font-semibold">咏雪轩阁</h1>
                   </div>
                 </Link>
               </div>
               
               {/* 中间页面标题 */}
               <div className="flex-1 flex items-center justify-center">
                 <h2 className="text-lg font-semibold">
                   {currentPageTitle}
                 </h2>
               </div>
             </>
          )}

          {/* 右侧菜单按钮 */}
          <div className="flex items-center">
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
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:text-blue-500 transition-colors"
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
                    className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-foreground hover:text-blue-500 transition-colors text-left"
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
                          className="block px-4 py-2 text-sm text-foreground hover:text-blue-500 transition-colors"
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
