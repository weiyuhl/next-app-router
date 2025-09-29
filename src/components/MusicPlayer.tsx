'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
}

const sampleSongs: Song[] = [
  {
    id: 2,
    title: '网易云音乐 2',
    artist: '在线音乐',
    src: 'http://music.163.com/song/media/outer/url?id=2693613520.mp3'
  }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true); // 默认收缩
  const audioRef = useRef<HTMLAudioElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      
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
    const nextIndex = (currentSong + 1) % sampleSongs.length;
    setCurrentSong(nextIndex);
    
    // 重置3秒定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsCollapsed(true);
    }, 3000);
  };

  const prevSong = () => {
    const prevIndex = currentSong === 0 ? sampleSongs.length - 1 : currentSong - 1;
    setCurrentSong(prevIndex);
    
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

  const handleEnded = () => {
    nextSong();
  };

  const handleLoadedData = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = sampleSongs[currentSong].src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong]);

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
    <div className="fixed bottom-8 right-4 z-50" ref={playerRef}>
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onLoadedData={handleLoadedData}
      />
      
      <div className={`bg-white/90 backdrop-blur-sm border rounded-lg shadow-lg transition-all duration-300 ${
        isCollapsed ? 'p-1 opacity-40' : 'p-2'
      }`}>
        {isCollapsed ? (
          <button
            onClick={handleCollapsedClick}
            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        ) : (
          <div className="flex items-center space-x-1.5">
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
  );
}