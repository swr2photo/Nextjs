// components/MusicPlayer/index.tsx
'use client';

import {
  Box,
  Container,
  Card,
  CardContent,
  IconButton,
  Stack,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

import StoryHeader from './StoryHeader';
import LyricsDisplay from './LyricsDisplay';
import VinylPlayer from './VinylPlayer';
import { useCurrentLyric } from './useCurrentLyric';

export interface StoryScene {
  id: string;
  chapter: number;
  title: string;
  story: string;
  songTitle: string;
  artist: string;
  url: string;
  meaning: string;
  color: string;
  accentColor: string;
  lyrics?: Array<{
    text: string;
    startTime: number;
    endTime: number;
    type: 'verse' | 'chorus' | 'bridge';
  }>;
  restrictedStart?: number;
  restrictedEnd?: number;
  coverUrl?: string;
}

interface MusicPlayerProps {
  scene: StoryScene;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
}

const appleGlassStyle = (primaryAccent: string) => ({
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: `1px solid rgba(255, 255, 255, 0.15)`,
  boxShadow: `
    inset 0 0 30px rgba(255, 255, 255, 0.08),
    0 0 30px rgba(0, 0, 0, 0.3),
    0 0 60px ${primaryAccent}33
  `,
});

export default function MusicPlayer({
  scene,
  onPlayStart,
  onPlayEnd,
  onTimeUpdate,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const primaryColor = scene.color;
  const accentColor = scene.accentColor;
  const restrictedStart = scene.restrictedStart ?? 0;
  const restrictedEnd = scene.restrictedEnd ?? duration;
  const coverImage = scene.coverUrl || '/images/นับหนึ่ง.jpg';

  // ใช้ custom hook เพื่อหา current lyric
  const { currentLyric, prevLyric, nextLyric } = useCurrentLyric(
    scene.lyrics,
    currentTime
  );

  // Setup audio on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setIsAudioReady(true);
      setDuration(audio.duration);
      onTimeUpdate?.(0, audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
      onPlayEnd?.();
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onTimeUpdate, onPlayEnd]);

  // Update time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      const newTime = audio.currentTime;
      setCurrentTime(newTime);
      onTimeUpdate?.(newTime, audio.duration);

      if (newTime >= restrictedEnd) {
        audio.pause();
        setIsPlaying(false);
        setHasEnded(true);
        onPlayEnd?.();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    return () => audio.removeEventListener('timeupdate', updateTime);
  }, [restrictedEnd, onPlayEnd, onTimeUpdate]);

  // ▶️ Play
  const handlePlay = async () => {
    const audio = audioRef.current;
    if (!audio || isPlaying) return;

    try {
      if (!hasUserInteracted) {
        audio.currentTime = restrictedStart;
        setHasUserInteracted(true);
      }
      setHasEnded(false);
      await audio.play();
      setIsPlaying(true);
      onPlayStart?.();
    } catch {
      setIsPlaying(false);
    }
  };

  // 🔁 Replay
  const handleReplay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.currentTime = restrictedStart;
      setHasEnded(false);
      await audio.play();
      setIsPlaying(true);
      onPlayStart?.();
    } catch {
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, var(--color-dark) 0%, var(--color-paper) 50%, #020617 100%)',
        py: 8,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* glow */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          background:
            'radial-gradient(circle, rgba(var(--color-primary-rgb), 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />

      <Container maxWidth="md">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <Box
            component="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 800,
              background: `linear-gradient(135deg, ${accentColor} 0%, ${primaryColor} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              m: 0,
              letterSpacing: '0.03em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            ฟังเพลงก่อนนะ
            <FavoriteRoundedIcon
              sx={{ fontSize: { xs: 24, md: 28 }, color: accentColor }}
            />
          </Box>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Card
            sx={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              borderRadius: '30px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <StoryHeader
              chapter={scene.chapter}
              title={scene.title}
              story={scene.story}
              primaryColor={primaryColor}
              accentColor={accentColor}
            />

            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              {/* Song Info */}
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Box
                  sx={{
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    fontWeight: 700,
                    color: '#fff',
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  <VolumeUpIcon
                    sx={{ color: primaryColor, fontSize: '1.5rem' }}
                  />
                  {scene.songTitle}
                </Box>
                <Box
                  sx={{
                    fontSize: '0.95rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 4,
                  }}
                >
                  {scene.artist}
                </Box>

                {/* Vinyl Player */}
                <VinylPlayer
                  songTitle={scene.songTitle}
                  coverImage={coverImage}
                  isPlaying={isPlaying}
                  primaryColor={primaryColor}
                />

                {/* Lyrics Display */}
                <LyricsDisplay
                  currentLyric={currentLyric}
                  prevLyric={prevLyric}
                  nextLyric={nextLyric}
                  isPlaying={isPlaying}
                  hasEnded={hasEnded}
                  primaryColor={primaryColor}
                  accentColor={accentColor}
                />

                {/* Meaning */}
                <Box
                  sx={{
                    ...appleGlassStyle(accentColor),
                    borderRadius: '15px',
                    p: 2.5,
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontStyle: 'italic',
                    lineHeight: 1.8,
                    mb: 4,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.2,
                    justifyContent: 'center',
                  }}
                >
                  <ChatBubbleOutlineRoundedIcon
                    sx={{ fontSize: 20, color: accentColor, mt: 0.3 }}
                  />
                  <span>{scene.meaning}</span>
                </Box>
              </Box>

              {/* Audio Element */}
              <audio
                ref={audioRef}
                src={scene.url}
                crossOrigin="anonymous"
                preload="metadata"
              />

              {/* Progress Bar */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    width: '100%',
                    height: 10,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50px',
                    overflow: 'hidden',
                    mb: 2,
                  }}
                >
                  <motion.div
                    animate={{
                      width:
                        duration && restrictedEnd > restrictedStart
                          ? `${Math.max(
                              0,
                              Math.min(
                                ((currentTime - restrictedStart) /
                                  (restrictedEnd - restrictedStart)) *
                                  100,
                                100
                              )
                            )}%`
                          : '0%',
                    }}
                    transition={{ type: 'tween', duration: 0.1 }}
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                      boxShadow: `0 0 20px ${primaryColor}80`,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: 500,
                  }}
                >
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(restrictedEnd || duration)}</span>
                </Box>
              </Box>

              {/* Controls */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {!isPlaying && !hasEnded && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      onClick={handlePlay}
                      disabled={!isAudioReady}
                      sx={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                        color: '#fff',
                        width: 80,
                        height: 80,
                        border: `3px solid ${primaryColor}`,
                        boxShadow: `0 8px 32px ${primaryColor}40`,
                        '&:hover': {
                          boxShadow: `0 12px 40px ${primaryColor}60`,
                        },
                        '&:disabled': { opacity: 0.5 },
                        fontSize: '2rem',
                      }}
                    >
                      <PlayArrowIcon fontSize="inherit" />
                    </IconButton>
                  </motion.div>
                )}

                {isPlaying && (
                  <IconButton
                    disabled
                    sx={{
                      background: 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      width: 80,
                      height: 80,
                      border: `3px solid ${primaryColor}`,
                      opacity: 0.6,
                    }}
                  >
                    <PlayArrowIcon fontSize="inherit" />
                  </IconButton>
                )}

                {!isPlaying && hasEnded && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      onClick={handleReplay}
                      sx={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                        color: '#fff',
                        width: 80,
                        height: 80,
                        border: `3px solid ${primaryColor}`,
                        boxShadow: `0 8px 32px ${primaryColor}40`,
                        '&:hover': {
                          boxShadow: `0 12px 40px ${primaryColor}60`,
                        },
                        fontSize: '2rem',
                      }}
                    >
                      <ReplayIcon fontSize="inherit" />
                    </IconButton>
                  </motion.div>
                )}
              </Box>

              {!isAudioReady && (
                <Box
                  sx={{
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    color: accentColor,
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  <HourglassEmptyRoundedIcon sx={{ fontSize: 18 }} />
                  <span>กำลังโหลดเพลง...</span>
                </Box>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          style={{ textAlign: 'center', marginTop: 50 }}
        >
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              color: 'rgba(255, 255, 255, 0.75)',
              fontStyle: 'italic',
            }}
          >
            <MusicNoteRoundedIcon sx={{ fontSize: 20, color: accentColor }} />
            <span>เพลงเพราะมั้ย ฟังต่อให้จบหนาา</span>
            <FavoriteRoundedIcon sx={{ fontSize: 20, color: primaryColor }} />
          </Stack>
        </motion.div>
      </Container>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
        }
      `}</style>
    </Box>
  );
}
