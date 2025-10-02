'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoHidden, setIsAutoHidden] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 监听滚动事件
  useEffect(() => {
    const toggleVisibility = () => {
      // 当页面滚动超过300px时显示按钮
      if (window.pageYOffset > 300) {
        setIsVisible(true);
        setIsAutoHidden(false);
        
        // 清除之前的计时器
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        // 设置新的5秒计时器
        timeoutRef.current = setTimeout(() => {
          setIsAutoHidden(true);
        }, 5000);
      } else {
        setIsVisible(false);
        setIsAutoHidden(false);
        // 清除计时器
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      // 清理计时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 滚动到顶部的函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 鼠标悬停时显示按钮并重置计时器
  const handleMouseEnter = () => {
    setIsAutoHidden(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // 鼠标离开后重新开始计时
    timeoutRef.current = setTimeout(() => {
      setIsAutoHidden(true);
    }, 5000);
  };

  return (
    <>
      {isVisible && !isAutoHidden && (
        <button
          onClick={scrollToTop}
          onMouseEnter={handleMouseEnter}
          className="fixed bottom-16 right-8 z-40 p-3 bg-white text-gray-600 hover:text-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 backdrop-blur-sm border border-gray-200 hover:border-gray-300"
          aria-label="返回顶部"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}