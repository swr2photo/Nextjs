'use client';

import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

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

      {/* Previous Lyric (slide up + blur + fade) */}
      <AnimatePresence mode="wait">
        {isPlaying && prevLyric ? (
          <motion.div
            key={`prev-${prevLyric.startTime}`}
            initial={{ 
              opacity: 0, 
              y: 80, 
              scale: 0.8, 
              rotateX: 60,
              z: -200 
            }}
            animate={{ 
              opacity: 0.3, 
              y: 0, 
              scale: 0.82, 
              rotateX: 0,
              z: -100 
            }}
            exit={{ 
              opacity: 0, 
              y: -80, 
              scale: 0.8, 
              rotateX: -60,
              z: -200 
            }}
            transition={{ 
              duration: 0.6, 
              type: 'spring',
              stiffness: 100,
              damping: 25,
              mass: 1
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

      {/* Current Lyric (main 3D focus) */}
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
              z: 0 
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              rotateX: 0,
              rotateY: 0,
              z: 0 
            }}
            exit={{ 
              opacity: 0, 
              y: -80, 
              scale: 0.85, 
              rotateX: 60,
              rotateY: 15,
              z: 0 
            }}
            transition={{ 
              duration: 0.7, 
              type: 'spring',
              stiffness: 120,
              damping: 20,
              mass: 0.9
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
                y: [0, -8, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: 'easeInOut',
                times: [0, 0.33, 0.66, 1]
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
                  filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.15))',
                }}
              >
                {currentLyric.text}
              </Box>
            </motion.div>
          </motion.div>
        ) : (
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
              gap: 2,
              zIndex: 2,
              flex: 1,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '2.5rem' }}
            >
              🎵
            </motion.div>
            <Box
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                textAlign: 'center',
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontStyle: 'italic',
              }}
            >
              {isPlaying
                ? 'ไม่มีเนื้อเพลงในตอนนี้'
                : hasEnded
                ? 'กดรีเพลเพื่อเล่นอีกครั้ง'
                : 'กดเล่นเพลงเลยน้า...'}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Lyric (slide down + blur + fade) */}
      <AnimatePresence mode="wait">
        {isPlaying && nextLyric ? (
          <motion.div
            key={`next-${nextLyric.startTime}`}
            initial={{ 
              opacity: 0, 
              y: -80, 
              scale: 0.8, 
              rotateX: -60,
              z: -200 
            }}
            animate={{ 
              opacity: 0.3, 
              y: 0, 
              scale: 0.82, 
              rotateX: 0,
              z: -100 
            }}
            exit={{ 
              opacity: 0, 
              y: 80, 
              scale: 0.8, 
              rotateX: 60,
              z: -200 
            }}
            transition={{ 
              duration: 0.6, 
              type: 'spring',
              stiffness: 100,
              damping: 25,
              mass: 1
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

      <style jsx>{`
        @keyframes float3d {
          0%, 100% {
            transform: translateY(-8px) rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: translateY(-12px) rotateX(2deg) rotateY(-1deg);
          }
          50% {
            transform: translateY(-4px) rotateX(0deg) rotateY(1.5deg);
          }
          75% {
            transform: translateY(-10px) rotateX(-2deg) rotateY(0deg);
          }
        }
      `}</style>
    </Box>
  );
}
