'use client'

import { useEffect } from 'react';

export default function ExternalLinkInterceptor() {
  useEffect(() => {
    // 为所有外部链接添加安全属性
    const addSecurityAttributes = () => {
      const allLinks = Array.from(document.querySelectorAll('a[href]'));
      const currentHost = window.location.hostname;
      
      allLinks.forEach(link => {
        try {
          const url = new URL(link.href);
          
          // 检查是否为外部链接
          if (url.hostname !== currentHost && url.protocol.startsWith('http')) {
            // 添加 target="_blank"
            if (!link.hasAttribute('target')) {
              link.setAttribute('target', '_blank');
            }
            
            // 添加或更新 rel 属性
            const existingRel = link.getAttribute('rel') || '';
            const relParts = existingRel.split(' ').filter(part => part.trim());
            
            if (!relParts.includes('noopener')) relParts.push('noopener');
            if (!relParts.includes('noreferrer')) relParts.push('noreferrer');
            if (!relParts.includes('nofollow')) relParts.push('nofollow');
            
            link.setAttribute('rel', relParts.join(' '));
          }
        } catch (error) {
          // 忽略无效链接
        }
      });
    };

    // 页面加载时立即执行
    addSecurityAttributes();

    // 监听DOM变化，为动态添加的链接也添加属性
    const observer = new MutationObserver(() => {
      addSecurityAttributes();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

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
          
          // 跳转到安全确认页面
          const encodedUrl = encodeURIComponent(link.href);
          window.location.href = `/file-conventions/external-redirect?url=${encodedUrl}`;
        }
      } catch (error) {
        // URL解析失败，让默认行为继续
        console.warn('URL解析失败:', link.href);
      }
    };

    // 添加全局点击监听器
    document.addEventListener('click', handleClick);

    return () => {
      // 清理监听器和观察器
      document.removeEventListener('click', handleClick);
      observer.disconnect();
    };
  }, []);

  return null; // 这个组件不渲染任何内容
}