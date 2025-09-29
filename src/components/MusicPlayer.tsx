"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward
} from "lucide-react";
import { Button } from "@/components/ui/button";

// 音乐数据接口
interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
}

// 音乐数据
const sampleSongs: Song[] = [
  {
    id: 1,
    title: "网易云音乐",
    artist: "在线音乐",
    src: "http://music.163.com/song/media/outer/url?id=2655793300.mp3"
  }
];

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs] = useState<Song[]>(sampleSongs);

  const currentSong = songs[currentSongIndex];

  // 播放/暂停控制
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 上一首
  const playPrevious = () => {
    const newIndex = currentSongIndex > 0 ? currentSongIndex - 1 : songs.length - 1;
    setCurrentSongIndex(newIndex);
  };

  // 下一首
  const playNext = () => {
    const newIndex = currentSongIndex < songs.length - 1 ? currentSongIndex + 1 : 0;
    setCurrentSongIndex(newIndex);
  };

  // 音频事件处理
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex]);

  // 当歌曲切换时自动播放
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex]);

  return (
    <div className="fixed bottom-6 right-6 bg-background/95 backdrop-blur-sm border border-border rounded-xl shadow-lg z-50 p-3">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={playPrevious}
          className="w-7 h-7 p-0"
        >
          <SkipBack className="w-3 h-3" />
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={togglePlay}
          className="w-8 h-8 p-0 rounded-full"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={playNext}
          className="w-7 h-7 p-0"
        >
          <SkipForward className="w-3 h-3" />
        </Button>
      </div>

      {/* 音频元素 */}
      <audio
        ref={audioRef}
        src={currentSong?.src}
        preload="metadata"
      />
    </div>
  );
}