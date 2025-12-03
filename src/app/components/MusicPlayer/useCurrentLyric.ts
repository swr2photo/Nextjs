// components/MusicPlayer/hooks/useCurrentLyric.ts
import { useMemo } from 'react';

interface LyricsData {
  text: string;
  startTime: number;
  endTime: number;
  type: 'verse' | 'chorus' | 'bridge';
}

export const useCurrentLyric = (
  lyrics: LyricsData[] | undefined,
  currentTime: number
) => {
  return useMemo(() => {
    if (!lyrics || lyrics.length === 0) {
      return { currentLyric: null, prevLyric: null, nextLyric: null, currentIndex: -1 };
    }

    // 🔍 หา lyric ปัจจุบัน
    const currentIndex = lyrics.findIndex(
      (l) => currentTime >= l.startTime && currentTime < l.endTime
    );

    const currentLyric = currentIndex >= 0 ? lyrics[currentIndex] : null;
    const prevLyric = currentIndex > 0 ? lyrics[currentIndex - 1] : null;
    const nextLyric =
      currentIndex >= 0 && currentIndex < lyrics.length - 1
        ? lyrics[currentIndex + 1]
        : null;

    return {
      currentLyric,
      prevLyric,
      nextLyric,
      currentIndex,
    };
  }, [lyrics, currentTime]);
};
