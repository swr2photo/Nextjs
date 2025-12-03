'use client';

import type React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { colorThemes, useThemeContext } from '../../providers';
import LyricsNotification from '../lyrics/LyricsNotification';
import CardSlider from './CardSlider';
import TimelineItem from './TimelineItem';
import EndScreenPhone from './EndScreenPhone';

export interface MemoryImage {
  id: string;
  url: string;
  caption: string;
  title: string;
  text: string;
  timestamp: string;
  showAt: number;
  hiddenAt: number;
  shape?: 'heart' | 'star' | 'bubble' | 'diamond' | 'circle' | 'square';
  layout?: 'left' | 'center' | 'right' | 'full';
  variant?: 'polaroid' | 'card' | 'banner' | 'frame';
  bgGradient?: string;
  accentEmoji?: string;
  animationPreset?: 'slideIn' | 'fadeIn' | 'scaleIn' | 'rotateIn';
  isVideo?: boolean;
}

interface MemoryGalleryProps {
  memories?: MemoryImage[];
  color?: string;
  accentColor?: string;
  currentTime?: number;
  duration?: number;
  isPlaying?: boolean;
  songEnded?: boolean;
  musicUrl?: string;
  onClose?: () => void;
  onGoToGift?: () => void;
  endVideoUrl?: string;
  endImageUrl?: string;
  themeKey?: keyof typeof colorThemes;
}

/* ----------------------- Lyrics timing ----------------------- */

const lyricMoments = [
  { startTime: 31, endTime: 37, text: 'จะรอเที่ยงคืนในวันเกิดเธอทุกทุกปี' },
  { startTime: 37, endTime: 40, text: 'อยากจะเป็นคนแรกที่อวยพร' },
  { startTime: 40, endTime: 44, text: 'ตั้งแต่นาทีที่เริ่มวันใหม่' },
  { startTime: 44, endTime: 51, text: 'จะจองที่นั่งข้างคนขับให้เธอทุกวัน' },
  { startTime: 51, endTime: 54, text: 'ไม่ว่าจะไกลเท่าไรไม่หวั่น' },
  { startTime: 54, endTime: 57, text: 'ถ้ามีเธอไปด้วยกันคงดี' },
  { startTime: 57, endTime: 64, text: 'ปฏิทินจะมีอีกหลายวันสำคัญให้เราใช้ด้วยกัน' },
  { startTime: 64, endTime: 71, text: 'หากว่าเธอตกลง วันนี้คงเป็นวันแรกของทุกวัน' },
  { startTime: 71, endTime: 78, text: 'เธอว่าวันครบรอบเราจะเป็นวันที่เท่าไร' },
  { startTime: 78, endTime: 85, text: 'วันใดที่ได้สวมกอด พูดว่ารักตลอดไป' },
  { startTime: 85, endTime: 93, text: 'เมื่อไรที่รักยาวนาน จนมอบแหวนแทนรักนิรันดร์' },
  { startTime: 93, endTime: 100, text: 'ถ้าวันแรกของเธอกับฉัน เริ่มวันนี้เลยดีไหม' },
];

/* ----------------------- Background per theme ----------------------- */

const themeBackgrounds: Record<keyof typeof colorThemes, string> = {
  emerald:
    'linear-gradient(135deg, #022c22 0%, #0f4c3a 40%, #051919 70%, #020617 100%)',
  purple:
    'linear-gradient(135deg, #1e1030 0%, #4c1d95 40%, #2e1065 70%, #020617 100%)',
  blue:
    'linear-gradient(135deg, #0b1220 0%, #0f172a 40%, #051a34 70%, #020617 100%)',
  rose:
    'linear-gradient(135deg, #3b0820 0%, #9f1239 40%, #5b1a2f 70%, #020617 100%)',
  orange:
    'linear-gradient(135deg, #3b1803 0%, #9a3412 40%, #6b2810 70%, #020617 100%)',
  cyan:
    'linear-gradient(135deg, #022c3a 0%, #0e7490 40%, #064e5a 70%, #020617 100%)',
};

/* ----------------------- Helpers ----------------------- */

const isVideoMemory = (m: MemoryImage): boolean =>
  m.isVideo || m.url.endsWith('.mp4') || m.url.endsWith('.webm');

const heicFallback = (url: string) =>
  /\.heic$/i.test(url) ? url.replace(/\.heic$/i, '.jpg') : url;

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

/* ----------------------- Animated background blobs ----------------------- */

const AnimatedBackgroundElements = ({
  themeKey,
}: {
  themeKey: keyof typeof colorThemes;
}) => {
  const theme = colorThemes[themeKey];
  return (
    <>
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.secondary}25, transparent 70%)`,
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{
          position: 'absolute',
          bottom: -300,
          left: -300,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.primary}20, transparent 70%)`,
          filter: 'blur(120px)',
          zIndex: 0,
        }}
      />
    </>
  );
};

/* ----------------------- Main component ----------------------- */

export default function MemoryGallery({
  memories,
  color,
  accentColor,
  onClose,
  onGoToGift,
  currentTime: externalCurrentTime = 0,
  duration: externalDuration = 0,
  isPlaying: externalIsPlaying = false,
  endVideoUrl,
  endImageUrl,
  songEnded = false,
  musicUrl,
  themeKey: themeKeyProp,
}: MemoryGalleryProps) {
  const { currentTheme } = useThemeContext();
  const themeKey =
    themeKeyProp ?? ((currentTheme as keyof typeof colorThemes) || 'emerald');
  const themeColors = colorThemes[themeKey];

  const primaryColor = color ?? themeColors.primary;
  const primaryAccent = accentColor ?? themeColors.accent;

  const currentTime = externalCurrentTime || 0;
  const duration = externalDuration || 0;
  const isPlaying = !!externalIsPlaying;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEndScreen, setShowEndScreen] = useState(false);

  const memoryList = memories && memories.length > 0 ? memories : [];

  /* ----- sync currentIndex กับเวลาที่เพลงเล่นอยู่ ----- */
  useEffect(() => {
    if (!duration || !memoryList.length) return;
    const idx = memoryList.findIndex(
      (m) =>
        currentTime >= (m.showAt ?? 0) &&
        currentTime < (m.hiddenAt ?? Infinity),
    );
    if (idx !== -1 && idx !== currentIndex && isPlaying) {
      setCurrentIndex(idx);
    }
  }, [currentTime, duration, memoryList, currentIndex, isPlaying]);

  useEffect(() => {
    setShowEndScreen(!!songEnded);
  }, [songEnded]);

  const onPrev = () => {
    if (isPlaying || !memoryList.length) return;
    setCurrentIndex((i) => (i - 1 + memoryList.length) % memoryList.length);
  };

  const onNext = () => {
    if (isPlaying || !memoryList.length) return;
    setCurrentIndex((i) => (i + 1) % memoryList.length);
  };

  /* ----- progress bar ด้านบน (ตามเพลงจริง) ----- */
  const progress =
    duration && currentTime >= 0
      ? Math.max(0, Math.min(100, (currentTime / duration) * 100))
      : 0;

  /* ----- progress ของเส้น timeline ด้านขวา (ตาม memories.ts) ----- */
  const timelineProgress = useMemo(() => {
    if (!memoryList.length) return 0;

    const showTimes = memoryList.map((m) => m.showAt ?? 0);
    const hideTimes = memoryList.map(
      (m) => m.hiddenAt ?? m.showAt ?? 0,
    );

    const start = Math.min(...showTimes);
    const end = Math.max(...hideTimes);
    if (end <= start) return 0;

    const clamped = Math.min(Math.max(currentTime, start), end);
    return ((clamped - start) / (end - start)) * 100;
  }, [memoryList, currentTime]);

  const currentMemory = memoryList[currentIndex] ?? memoryList[0];

  const currentLyric = useMemo(
    () =>
      lyricMoments.find(
        (l) => currentTime >= l.startTime && currentTime < l.endTime,
      ),
    [currentTime],
  );

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && currentLyric) {
      console.log('Current Lyric:', {
        text: currentLyric.text,
        startTime: currentLyric.startTime,
        endTime: currentLyric.endTime,
        currentTime: currentTime.toFixed(2),
      });
    }
  }, [currentLyric, currentTime]);

  const galleryBackground = themeBackgrounds[themeKey];

  const storySnippet =
    currentMemory?.text?.length > 160
      ? `${currentMemory.text.slice(0, 160)}…`
      : currentMemory?.text || '';

  if (!memoryList.length) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: galleryBackground,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.8)',
        }}
      >
        <Typography>ไม่มีข้อมูลโมเมนต์</Typography>
      </Box>
    );
  }

  // ✅ รูปพื้นหลังจาง ๆ ตามโมเมนต์ปัจจุบัน
  const backgroundImageUrl = useMemo(
    () => (currentMemory ? heicFallback(currentMemory.url) : undefined),
    [currentMemory],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.6, staggerChildren: 0.05, delayChildren: 0.1 },
      }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      style={{ width: '100%', minHeight: '100vh', position: 'relative' }}
    >
      {/* blobs ตามธีม (เลเยอร์ 0) */}
      <AnimatedBackgroundElements themeKey={themeKey} />

      {/* รูปพื้นหลังเบลอจาง ๆ (เลเยอร์ 1) */}
      {backgroundImageUrl && (
        <motion.div
          key={backgroundImageUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }} // ปรับความจางคือจุดนี้
          transition={{ duration: 0.6 }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(8px)',
            transform: 'scale(1.08)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* ชั้นใหญ่ครอบทั้งหมด (เลเยอร์ 2+) */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        {/* gradient มืดทับรูป (เลเยอร์ 2) */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: galleryBackground,
            opacity: 0.1, // ลดถ้าอยากเห็นรูปชัดขึ้น
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* เนื้อหาจริง (เลเยอร์ 3) */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 3,
            py: { xs: 6, md: 8 },
            color: 'rgba(255,255,255,0.94)',
          }}
        >
          {/* 🔔 pop-up เนื้อเพลง */}
          <LyricsNotification
            lyric={currentLyric?.text ?? null}
            primaryColor={primaryColor}
            accentColor={primaryAccent}
            startTime={currentLyric?.startTime}
            endTime={currentLyric?.endTime}
          />

          {/* End screen มือถือ */}
          <EndScreenPhone
            isVisible={showEndScreen}
            videoUrl={endVideoUrl}
            imageUrl={endImageUrl ?? '/images/นับหนึ่ง.jpg'}
            themeColor={primaryColor}
            accentColor={primaryAccent}
            onClose={() => setShowEndScreen(false)}
            onGoToGift={() => {
              if (typeof window !== 'undefined') {
                const el = document.getElementById('gift-section');
                if (el)
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              onGoToGift?.();
            }}
          />

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  justifyContent: 'space-between',
                  mb: { xs: 3, md: 4 },
                  gap: { xs: 2, md: 3 },
                  flexWrap: { xs: 'wrap', md: 'nowrap' },
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}
                >
                  <Box
                    sx={{
                      width: { xs: 36, md: 40 },
                      height: { xs: 36, md: 40 },
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${primaryAccent} 0%, ${primaryColor} 60%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 18px ${primaryAccent}66`,
                      flexShrink: 0,
                    }}
                  >
                    <AutoAwesomeIcon
                      sx={{ fontSize: { xs: 18, md: 22 }, color: '#fff' }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      component="h2"
                      sx={{
                        fontSize: { xs: '1.1rem', md: '1.6rem' },
                        fontWeight: 800,
                        lineHeight: 1.2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.75,
                      }}
                    >
                      เส้นเรื่องของเรา
                      <StarRoundedIcon
                        sx={{
                          fontSize: { xs: 18, md: 22 },
                          color: primaryAccent,
                        }}
                      />
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: '0.75rem', md: '0.9rem' },
                        opacity: 0.78,
                        lineHeight: 1.4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <AutoAwesomeIcon
                        sx={{
                          fontSize: { xs: 14, md: 16 },
                          color: primaryAccent,
                        }}
                      />
                      แต่ละโมเมนต์คือเนื้อเรื่องของเรา
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    <Chip
                      icon={<FavoriteRoundedIcon />}
                      label={`${currentIndex + 1}/${memoryList.length}`}
                      sx={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(10px)',
                        color: '#fff',
                        border: `1px solid rgba(255, 255, 255, 0.2)`,
                        '& .MuiChip-icon': { color: primaryAccent },
                        fontSize: { xs: '0.75rem', md: '0.9rem' },
                      }}
                    />
                  </motion.div>

                  {onClose && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        onClick={onClose}
                        sx={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          backdropFilter: 'blur(10px)',
                          border: `1px solid rgba(255, 255, 255, 0.2)`,
                          color: '#fff',
                          transition: 'all 0.3s ease',
                          width: { xs: 36, md: 40 },
                          height: { xs: 36, md: 40 },
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.15)',
                            boxShadow: `0 0 20px ${primaryAccent}66`,
                          },
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </motion.div>
                  )}
                </Box>
              </Box>
            </motion.div>

            {/* Progress bar บนสุด */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Box
                sx={{
                  mb: { xs: 4, md: 5 },
                  width: '100%',
                  height: { xs: 4, md: 6 },
                  borderRadius: 999,
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.15 }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${primaryColor}, ${primaryAccent})`,
                    boxShadow: `0 0 20px ${primaryAccent}aa, inset 0 0 10px rgba(255,255,255,0.2)`,
                  }}
                />
              </Box>
            </motion.div>

            {/* 2-column layout */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 3, md: 5 },
                alignItems: 'start',
              }}
            >
              {/* LEFT: Card slider */}
              <Box sx={{ width: '100%' }}>
                <CardSlider
                  items={memoryList}
                  activeIndex={currentIndex}
                  onPrev={onPrev}
                  onNext={onNext}
                  primaryColor={primaryColor}
                  primaryAccent={primaryAccent}
                  disabled={isPlaying}
                  appleGlassStyle={appleGlassStyle}
                  isVideoMemory={isVideoMemory}
                />
              </Box>

              {/* RIGHT: Timeline */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ width: '100%' }}
              >
                <Box
                  sx={{
                    mb: { xs: 2, md: 2.5 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '0.75rem', md: '0.9rem' },
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    MEMORY TIMELINE
                  </Typography>
                </Box>

                <Box
                  sx={{
                    position: 'relative',
                    ...appleGlassStyle(primaryAccent),
                    borderRadius: { xs: 3, md: 4 },
                    p: { xs: 2, md: 3 },
                    minHeight: 'auto',
                    overflow: 'visible',
                  }}
                >
                  {/* เส้น timeline แนวตั้ง */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: { xs: 22, md: 28 },
                      top: 16,
                      bottom: 16,
                      width: { xs: 2, md: 3 },
                      borderRadius: 999,
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05))',
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      animate={{ height: `${timelineProgress}%` }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        background: `linear-gradient(180deg, ${primaryColor}, ${primaryAccent})`,
                        boxShadow: `0 0 16px ${primaryAccent}aa`,
                      }}
                    />
                  </Box>

                  {/* รายการ timeline ปัจจุบัน */}
                  <Box
                    sx={{
                      position: 'relative',
                      ml: { xs: 5, md: 6 },
                      display: 'flex',
                      flexDirection: 'column',
                      gap: { xs: 1.5, md: 2 },
                      pt: { xs: 0.5, md: 1 },
                      pb: { xs: 0.5, md: 1 },
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {memoryList.map((m, idx) => {
                        if (idx !== currentIndex) return null;
                        const displayUrl = heicFallback(m.url);
                        return (
                          <TimelineItem
                            key={m.id}
                            memory={m}
                            isVideoMemory={isVideoMemory(m)}
                            appleGlassStyle={appleGlassStyle}
                            primaryAccent={primaryAccent}
                            displayUrl={displayUrl}
                          />
                        );
                      })}
                    </AnimatePresence>
                  </Box>

                  {/* Footer ใน timeline */}
                  <Box
                    sx={{
                      mt: { xs: 1.5, md: 2 },
                      ml: { xs: 5, md: 6 },
                      pt: { xs: 1.5, md: 2 },
                      borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '0.7rem', md: '0.82rem' },
                        opacity: 0.8,
                        fontStyle: 'italic',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        lineHeight: 1.4,
                      }}
                    >
                      {isPlaying ? (
                        <>
                          <StarRoundedIcon
                            sx={{
                              fontSize: { xs: 14, md: 16 },
                              color: primaryAccent,
                            }}
                          />
                          กำลังเล่นโมเมนต์นี้อยู่
                        </>
                      ) : (
                        <>
                          <ChatBubbleOutlineRoundedIcon
                            sx={{
                              fontSize: { xs: 14, md: 16 },
                              color: primaryAccent,
                            }}
                          />
                          กดปุ่มลูกศรซ้ายขวาเพื่อเลื่อนดูโมเมนต์
                        </>
                      )}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Box>

            {/* Story snippet ด้านล่าง */}
            {storySnippet && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <Box sx={{ mt: { xs: 3, md: 4 }, textAlign: 'center' }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.75rem', md: '0.85rem' },
                      opacity: 0.78,
                      maxWidth: 520,
                      mx: 'auto',
                      lineHeight: { xs: 1.5, md: 1.7 },
                    }}
                  >
                    {storySnippet}
                  </Typography>
                </Box>
              </motion.div>
            )}
          </Container>
        </Box>
      </Box>
    </motion.div>
  );
}
