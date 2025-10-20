'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExternalLinkInterceptor() {
  const router = useRouter();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link || !link.href) return;
      
      try {
        const url = new URL(link.href);
        const currentHost = window.location.hostname;
        
        // 检查是否为外部链接
        if (url.hostname !== currentHost && url.protocol.startsWith('http')) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          
          // 使用router.push而不是window.location.href来避免页面重新加载
          const encodedUrl = encodeURIComponent(link.href);
          router.push(`/file-conventions/external-redirect?url=${encodedUrl}`);
        }
      } catch (error) {
        // URL解析失败，让默认行为继续
        console.warn('URL解析失败:', link.href, error);
      }
    };

    // 添加全局点击监听器，使用捕获阶段确保在其他事件处理器之前执行
    document.addEventListener('click', handleClick, true);

    return () => {
      // 清理监听器
      document.removeEventListener('click', handleClick, true);
    };
  }, [router]);

  return null; // 这个组件不渲染任何内容
}