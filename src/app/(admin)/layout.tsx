"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航栏 */}
      <AdminTopBar 
        onMenuClick={() => setMobileOpen(!mobileOpen)} 
        isMobileMenuOpen={mobileOpen}
      />
      
      {/* 侧边栏和主内容区 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 侧边栏 */}
        <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        
        {/* 页面内容 */}
        <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}



