'use client';

import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import type React from 'react';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';

interface LyricsNotificationProps {
  lyric: string | null;
  primaryColor: string;
  accentColor: string;
  startTime?: number;
  endTime?: number;
}

export const LyricsNotification: React.FC<LyricsNotificationProps> = ({
  lyric,
  primaryColor,
  accentColor,
  startTime = 0,
  endTime = 0,
}) => {
  const uniqueKey = lyric
    ? `lyric-${startTime}-${endTime}-${lyric.substring(0, 10)}`
    : null;

  return (
    <AnimatePresence mode="wait">
      {lyric && (
        <motion.div
          key={uniqueKey}
          initial={{
            opacity: 0,
            x: 80,
            y: -40,
            scale: 0.7,
            rotateX: -20,
            rotateZ: -4,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateZ: 0,
          }}
          exit={{
            opacity: 0,
            x: -80,
            y: 40,
            scale: 0.7,
            rotateX: 20,
            rotateZ: 4,
          }}
          transition={{
            duration: 0.45,
            type: 'spring',
            stiffness: 130,
            damping: 18,
            mass: 0.7,
          }}
          style={{
            position: 'fixed',
            top: '64px',
            right: '12px',
            zIndex: 1000,
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: 260, md: 340 },
              px: { xs: 2.5, md: 3 },
              py: { xs: 2, md: 2.5 },
              borderRadius: { xs: '12px', md: '14px' },

              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.14) 0%,
                  rgba(255, 255, 255, 0.04) 100%
                )
              `,
              backdropFilter: 'blur(20px) brightness(1.05)',
              WebkitBackdropFilter: 'blur(20px) brightness(1.05)',

              border: `1px solid rgba(255, 255, 255, 0.25)`,

              boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.35),
                0 6px 24px rgba(0, 0, 0, 0.4),
                0 0 26px ${accentColor}33
              `,

              color: '#fff',
              fontSize: { xs: '0.85rem', md: '0.95rem' },
              fontWeight: 600,
              letterSpacing: '0.4px',
              lineHeight: 1.5,
              textAlign: 'center',
              position: 'relative',
              overflow: 'visible',

              transition: 'all 0.25s ease',
              '&:hover': {
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.4),
                  0 8px 28px rgba(0, 0, 0, 0.45),
                  0 0 32px ${accentColor}44
                `,
              },
            }}
          >
            {/* Animated Gradient Background */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                background: `
                  linear-gradient(
                    -45deg,
                    ${primaryColor}22 0%,
                    ${accentColor}22 50%,
                    ${primaryColor}11 100%
                  )
                `,
                backgroundSize: '200% 200%',
                opacity: 0.6,
                pointerEvents: 'none',
              }}
            />

            {/* Top Glow Effect */}
            <Box
              sx={{
                position: 'absolute',
                top: -14,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70%',
                height: '28px',
                background: `radial-gradient(ellipse at center, ${accentColor}33, transparent 70%)`,
                filter: 'blur(10px)',
                pointerEvents: 'none',
              }}
            />

            {/* Side Glow Effect */}
            <Box
              sx={{
                position: 'absolute',
                right: -14,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '80%',
                background: `radial-gradient(ellipse at center, ${accentColor}22, transparent 70%)`,
                filter: 'blur(12px)',
                pointerEvents: 'none',
              }}
            />

            {/* Shimmer Line Top */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: `linear-gradient(90deg, 
                  transparent 0%,
                  ${primaryColor}77 50%,
                  transparent 100%
                )`,
                opacity: 0.7,
                filter: 'blur(0.5px)',
              }}
            />

            {/* Animated Border Glow */}
            <motion.div
              animate={{
                boxShadow: [
                  `inset 0 0 14px ${accentColor}22`,
                  `inset 0 0 20px ${accentColor}33`,
                  `inset 0 0 14px ${accentColor}22`,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                pointerEvents: 'none',
              }}
            />

            {/* Main Content */}
            <Box sx={{ position: 'relative', zIndex: 2 }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.35 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {/* Left Icon */}
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MusicNoteRoundedIcon
                    sx={{
                      fontSize: '1.3rem',
                      color: accentColor,
                      textShadow: `0 0 8px ${accentColor}77`,
                    }}
                  />
                </motion.div>

                {/* Lyric Text */}
                <motion.span
                  animate={{
                    textShadow: [
                      `0 0 8px ${accentColor}33, 0 0 16px ${accentColor}22`,
                      `0 0 14px ${accentColor}55, 0 0 24px ${accentColor}33`,
                      `0 0 8px ${accentColor}33, 0 0 16px ${accentColor}22`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {lyric}
                </motion.span>

                {/* Right Icon */}
                <motion.div
                  animate={{ y: [0, 2, 0] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.25,
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <QueueMusicRoundedIcon
                    sx={{
                      fontSize: '1.3rem',
                      color: accentColor,
                      textShadow: `0 0 8px ${accentColor}77`,
                    }}
                  />
                </motion.div>
              </motion.div>
            </Box>

            {/* Bottom Accent Line */}
            <motion.div
              animate={{
                width: ['0%', '100%', '100%', '0%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '2px',
                background: `linear-gradient(90deg, 
                  transparent 0%,
                  ${accentColor}ff 50%,
                  transparent 100%
                )`,
                filter: 'blur(0.7px)',
              }}
            />

            {/* Corner Accent - Top Left */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '22px',
                height: '22px',
                borderTop: `2px solid ${accentColor}66`,
                borderLeft: `2px solid ${accentColor}66`,
                borderRadius: '12px 0 0 0',
                opacity: 0.55,
              }}
            />

            {/* Corner Accent - Bottom Right */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '22px',
                height: '22px',
                borderBottom: `2px solid ${accentColor}66`,
                borderRight: `2px solid ${accentColor}66`,
                borderRadius: '0 0 12px 0',
                opacity: 0.55,
              }}
            />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LyricsNotification;
