import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* 移动端布局 - 独立容器 */}
        <div className="block md:hidden">
          {/* 品牌信息容器 */}
          <div className="mb-8">
            <div className="space-y-4">
              <div className="flex justify-left">
                 <Image
                   src="/yongxue-xuange-logo.svg"
                   alt="咏雪轩阁"
                   width={160}
                   height={40}
                 />
               </div>
              <p className="text-sm text-muted-foreground text-left">
                咏雪轩阁 - 一个优雅的文学与艺术空间。
              </p>
            </div>
          </div>

          {/* 快速链接和功能特性容器 */}
          <div className="mb-8">
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-8 max-w-md w-full">
                {/* 快速链接 */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-foreground text-center">快速链接</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors block text-center">
                        首页
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors block text-center">
                        关于
                      </Link>
                    </li>
                    <li>
                      <Link href="/file-conventions" className="text-muted-foreground hover:text-foreground transition-colors block text-center">
                        文件约定
                      </Link>
                    </li>
                    <li>
                      <Link href="/layouts" className="text-muted-foreground hover:text-foreground transition-colors block text-center">
                        布局系统
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* 功能特性 */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-foreground text-center">功能特性</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/layouts/nested-layouts" className="text-muted-foreground hover:text-foreground transition-colors block text-center">
                        嵌套布局
                      </Link>
                    </li>
                    <li>
                      <Link href="/layouts/parallel-routes" className="text-muted-foreground hover:text-foreground transition-colors block text-center">
                        并行路由
                      </Link>
                    </li>
                    <li>
                      <Link href="/layouts/route-groups" className="text-muted-foreground hover:text-foreground transition-colors block text-center">
                        路由组
                      </Link>
                    </li>
                    <li>
                      <Link href="/file-conventions/loading" className="text-muted-foreground hover:text-foreground transition-colors block text-center">
                        加载状态
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 社交链接容器 */}
          <div className="mb-8">
            <div className="text-center">
              <h4 className="text-sm font-semibold text-foreground mb-4">联系我们</h4>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 桌面端布局 - 四列网格 */}
        <div className="hidden md:flex md:justify-center">
          <div className="grid grid-cols-4 gap-8 max-w-6xl w-full text-center">
            {/* 品牌信息 */}
            <div className="space-y-4">
              <div className="flex justify-center">
                 <Image
                   src="/yongxue-xuange-logo.svg"
                   alt="咏雪轩阁"
                   width={160}
                   height={40}
                 />
               </div>
              <p className="text-sm text-muted-foreground text-left">
                咏雪轩阁 - 一个优雅的文学与艺术空间。
              </p>
            </div>

            {/* 快速链接 */}
             <div className="space-y-4">
               <h4 className="text-sm font-semibold text-foreground">快速链接</h4>
               <ul className="space-y-2 text-sm">
                 <li>
                   <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors block">
                     首页
                   </Link>
                 </li>
                 <li>
                   <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors block">
                     关于
                   </Link>
                 </li>
                 <li>
                   <Link href="/file-conventions" className="text-muted-foreground hover:text-foreground transition-colors block">
                     文件约定
                   </Link>
                 </li>
                 <li>
                   <Link href="/layouts" className="text-muted-foreground hover:text-foreground transition-colors block">
                     布局系统
                   </Link>
                 </li>
               </ul>
             </div>

             {/* 功能特性 */}
             <div className="space-y-4">
               <h4 className="text-sm font-semibold text-foreground">功能特性</h4>
               <ul className="space-y-2 text-sm">
                 <li>
                   <Link href="/layouts/nested-layouts" className="text-muted-foreground hover:text-foreground transition-colors block">
                     嵌套布局
                   </Link>
                 </li>
                 <li>
                   <Link href="/layouts/parallel-routes" className="text-muted-foreground hover:text-foreground transition-colors block">
                     并行路由
                   </Link>
                 </li>
                 <li>
                   <Link href="/layouts/route-groups" className="text-muted-foreground hover:text-foreground transition-colors block">
                     路由组
                   </Link>
                 </li>
                 <li>
                   <Link href="/file-conventions/loading" className="text-muted-foreground hover:text-foreground transition-colors block">
                     加载状态
                   </Link>
                 </li>
               </ul>
             </div>

            {/* 社交链接 */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">联系我们</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="border-t border-border pt-8 mt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> using 咏雪轩阁
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © 2024 咏雪轩阁. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}