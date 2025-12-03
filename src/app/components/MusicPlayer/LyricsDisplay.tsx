'use client';

import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';

interface LyricsData {
  text: string;
  startTime: number;
  endTime: number;
  type: 'verse' | 'chorus' | 'bridge';
}

interface LyricsDisplayProps {
  currentLyric: LyricsData | null;
  prevLyric: LyricsData | null;
  nextLyric: LyricsData | null;
  isPlaying: boolean;
  hasEnded: boolean;
  primaryColor: string;
  accentColor: string;
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

export default function LyricsDisplay({
  currentLyric,
  prevLyric,
  nextLyric,
  isPlaying,
  hasEnded,
  primaryColor,
  accentColor,
}: LyricsDisplayProps) {
  return (
    <Box
      sx={{
        ...appleGlassStyle(accentColor),
        borderRadius: { xs: 3, md: 4 },
        p: { xs: 3.5, md: 5 },
        minHeight: { xs: 260, md: 320 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2.5,
        mb: 4,
        overflow: 'hidden',
        position: 'relative',
        perspective: '1200px',
      }}
    >
      {/* Background Gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${primaryColor}15, transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Previous Lyric */}
      <AnimatePresence mode="wait">
        {isPlaying && prevLyric ? (
          <motion.div
            key={`prev-${prevLyric.startTime}`}
            initial={{
              opacity: 0,
              y: 80,
              scale: 0.8,
              rotateX: 60,
              z: -200,
            }}
            animate={{
              opacity: 0.3,
              y: 0,
              scale: 0.82,
              rotateX: 0,
              z: -100,
            }}
            exit={{
              opacity: 0,
              y: -80,
              scale: 0.8,
              rotateX: -60,
              z: -200,
            }}
            transition={{
              duration: 0.6,
              type: 'spring',
              stiffness: 100,
              damping: 25,
              mass: 1,
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              transformStyle: 'preserve-3d',
              minHeight: 'auto',
            }}
          >
            <Box
              sx={{
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                color: 'rgba(255, 255, 255, 0.3)',
                fontWeight: 600,
                fontStyle: 'italic',
                textAlign: 'center',
                lineHeight: 1.6,
                filter: 'blur(2px)',
                maxWidth: '90%',
                opacity: 0.5,
                wordBreak: 'break-word',
              }}
            >
              {prevLyric.text}
            </Box>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Current Lyric */}
      <AnimatePresence mode="wait">
        {isPlaying && currentLyric ? (
          <motion.div
            key={`current-${currentLyric.startTime}`}
            initial={{
              opacity: 0,
              y: 80,
              scale: 0.85,
              rotateX: -60,
              rotateY: -15,
              z: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              z: 0,
            }}
            exit={{
              opacity: 0,
              y: -80,
              scale: 0.85,
              rotateX: 60,
              rotateY: 15,
              z: 0,
            }}
            transition={{
              duration: 0.7,
              type: 'spring',
              stiffness: 120,
              damping: 20,
              mass: 0.9,
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
              flex: 1,
              transformStyle: 'preserve-3d',
              minHeight: 80,
            }}
          >
            <motion.div
              animate={{
                rotateX: [0, 3, -3, 0],
                rotateY: [-1, 1, -1, 0],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.33, 0.66, 1],
              }}
              style={{
                transformStyle: 'preserve-3d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  fontWeight: 900,
                  color: '#fff',
                  textAlign: 'center',
                  lineHeight: 1.7,
                  background: `linear-gradient(135deg, #fff, ${accentColor}ff)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  maxWidth: '95%',
                  wordBreak: 'break-word',
                  textShadow: `
                    0 0 40px ${accentColor}40,
                    0 0 80px ${accentColor}20
                  `,
                  filter:
                    'drop-shadow(0 0 25px rgba(255, 255, 255, 0.15))',
                }}
              >
                {currentLyric.text}
              </Box>
            </motion.div>
          </motion.div>
        ) : (
          // 🟣 Fallback state – เปลี่ยนอิโมจิเป็น MUI Icons
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, type: 'spring' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              zIndex: 2,
              flex: 1,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `radial-gradient(circle, ${accentColor}55, transparent 65%)`,
                  boxShadow: `0 0 24px ${accentColor}66`,
                }}
              >
                {hasEnded ? (
                  <ReplayRoundedIcon sx={{ fontSize: 32, color: '#fff' }} />
                ) : isPlaying ? (
                  <MusicNoteRoundedIcon sx={{ fontSize: 32, color: '#fff' }} />
                ) : (
                  <PlayArrowRoundedIcon sx={{ fontSize: 32, color: '#fff' }} />
                )}
              </Box>
            </motion.div>

            <Box
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center',
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontStyle: 'italic',
              }}
            >
              {isPlaying
                ? 'ยังไม่มีเนื้อเพลงในช่วงนี้'
                : hasEnded
                ? 'กดเล่นอีกครั้งเพื่อเริ่มใหม่จากต้นเพลง'
                : 'กดปุ่มเล่นเพื่อเริ่มเพลงพร้อมเนื้อร้องเลยน้า'}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Lyric */}
      <AnimatePresence mode="wait">
        {isPlaying && nextLyric ? (
          <motion.div
            key={`next-${nextLyric.startTime}`}
            initial={{
              opacity: 0,
              y: -80,
              scale: 0.8,
              rotateX: -60,
              z: -200,
            }}
            animate={{
              opacity: 0.3,
              y: 0,
              scale: 0.82,
              rotateX: 0,
              z: -100,
            }}
            exit={{
              opacity: 0,
              y: 80,
              scale: 0.8,
              rotateX: 60,
              z: -200,
            }}
            transition={{
              duration: 0.6,
              type: 'spring',
              stiffness: 100,
              damping: 25,
              mass: 1,
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              transformStyle: 'preserve-3d',
              minHeight: 'auto',
            }}
          >
            <Box
              sx={{
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                color: 'rgba(255, 255, 255, 0.3)',
                fontWeight: 600,
                fontStyle: 'italic',
                textAlign: 'center',
                lineHeight: 1.6,
                filter: 'blur(2px)',
                maxWidth: '90%',
                opacity: 0.5,
                wordBreak: 'break-word',
              }}
            >
              {nextLyric.text}
            </Box>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Box>
  );
}
