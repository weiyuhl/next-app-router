'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface Song {
  id: number;
  src: string;
}

const sampleSongs: Song[] = [
  {
    id: 1,
    src: '/xg.wav'
  },
  {
    id: 2,
    src: '/l.wav'
  }
];

// 全局音频实例，避免页面导航时重置
let globalAudio: HTMLAudioElement | null = null;
let globalIsPlaying = false;
let globalCurrentSong = 0;

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(globalIsPlaying);
  const [currentSong, setCurrentSong] = useState(globalCurrentSong);
  const [isCollapsed, setIsCollapsed] = useState(true); // 默认收缩
  const audioRef = useRef<HTMLAudioElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // 初始化全局音频实例
  useEffect(() => {
    if (!globalAudio && typeof window !== 'undefined' && sampleSongs.length > 0) {
      globalAudio = new Audio();
      globalAudio.src = sampleSongs[globalCurrentSong].src;
      
      // 监听音频事件
      globalAudio.addEventListener('ended', () => {
        const nextIndex = (globalCurrentSong + 1) % sampleSongs.length;
        globalCurrentSong = nextIndex;
        globalAudio!.src = sampleSongs[nextIndex].src;
        if (globalIsPlaying) {
          globalAudio!.play();
        }
        // 更新所有实例的状态
        window.dispatchEvent(new CustomEvent('musicPlayerUpdate', {
          detail: { isPlaying: globalIsPlaying, currentSong: globalCurrentSong }
        }));
      });

      globalAudio.addEventListener('loadeddata', () => {
        if (globalIsPlaying) {
          globalAudio!.play();
        }
      });
    }

    // 监听全局状态更新
    const handleUpdate = (event: CustomEvent) => {
      setIsPlaying(event.detail.isPlaying);
      setCurrentSong(event.detail.currentSong);
    };

    window.addEventListener('musicPlayerUpdate', handleUpdate as EventListener);

    return () => {
      window.removeEventListener('musicPlayerUpdate', handleUpdate as EventListener);
    };
  }, []);

  const togglePlay = () => {
    if (globalAudio && sampleSongs.length > 0) {
      if (globalIsPlaying) {
        globalAudio.pause();
        globalIsPlaying = false;
      } else {
        globalAudio.play();
        globalIsPlaying = true;
      }
      setIsPlaying(globalIsPlaying);
      
      // 通知其他实例更新状态
      window.dispatchEvent(new CustomEvent('musicPlayerUpdate', {
        detail: { isPlaying: globalIsPlaying, currentSong: globalCurrentSong }
      }));
      
      // 重置3秒定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsCollapsed(true);
      }, 3000);
    }
  };

  const nextSong = () => {
    if (sampleSongs.length === 0) return;
    
    const nextIndex = (globalCurrentSong + 1) % sampleSongs.length;
    globalCurrentSong = nextIndex;
    setCurrentSong(nextIndex);
    
    if (globalAudio) {
      globalAudio.src = sampleSongs[nextIndex].src;
      if (globalIsPlaying) {
        globalAudio.play();
      }
    }

    // 通知其他实例更新状态
    window.dispatchEvent(new CustomEvent('musicPlayerUpdate', {
      detail: { isPlaying: globalIsPlaying, currentSong: globalCurrentSong }
    }));
    
    // 重置3秒定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsCollapsed(true);
    }, 3000);
  };

  const prevSong = () => {
    if (sampleSongs.length === 0) return;
    
    const prevIndex = globalCurrentSong === 0 ? sampleSongs.length - 1 : globalCurrentSong - 1;
    globalCurrentSong = prevIndex;
    setCurrentSong(prevIndex);
    
    if (globalAudio) {
      globalAudio.src = sampleSongs[prevIndex].src;
      if (globalIsPlaying) {
        globalAudio.play();
      }
    }

    // 通知其他实例更新状态
    window.dispatchEvent(new CustomEvent('musicPlayerUpdate', {
      detail: { isPlaying: globalIsPlaying, currentSong: globalCurrentSong }
    }));
    
    // 重置3秒定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsCollapsed(true);
    }, 3000);
  };

  const handleCollapsedClick = () => {
    // 收缩状态下点击：只展开，不播放
    setIsCollapsed(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsCollapsed(true);
    }, 3000);
  };

  // 点击播放器外部区域收缩
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (playerRef.current && !playerRef.current.contains(event.target as Node) && !isCollapsed) {
        setIsCollapsed(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCollapsed]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {sampleSongs.length > 0 && (
        <div className="fixed bottom-8 right-4 z-50" ref={playerRef}>
          {/* 移除本地audio元素，使用全局音频实例 */}
          
          <div className={`bg-white/90 backdrop-blur-sm border rounded-lg shadow-lg transition-all duration-300 ${
            isCollapsed ? 'p-1 opacity-40' : 'p-2'
          }`}>
            {isCollapsed ? (
              <button
                onClick={handleCollapsedClick}
                className="w-8 h-8 rounded-full flex items-center justify-center relative overflow-hidden"
                style={{
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {/* 旋转的彩虹背景 */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea)',
                    animation: isPlaying ? 'spin 3s linear infinite' : 'none'
                  }}
                />
                
                {/* 固定的音符图标 */}
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="text-white relative z-10"
                >
                  <path 
                    d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" 
                    fill="currentColor"
                  />
                </svg>
              </button>
            ) : (
              <div className="flex items-center space-x-1">
                <button
                  onClick={prevSong}
                  className="w-7 h-7 p-0 rounded-full flex items-center justify-center"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>
                
                <button
                  onClick={togglePlay}
                  className="w-7 h-7 p-0 rounded-full flex items-center justify-center"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                
                <button
                  onClick={nextSong}
                  className="w-7 h-7 p-0 rounded-full flex items-center justify-center"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}