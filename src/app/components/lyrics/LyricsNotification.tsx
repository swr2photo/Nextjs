'use client';

import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import type React from 'react';

interface LyricsNotificationProps {
  lyric: string | null;
  primaryColor: string;
  accentColor: string;
  startTime?: number; // ✅ เพิ่ม unique identifier
  endTime?: number;
}

export const LyricsNotification: React.FC<LyricsNotificationProps> = ({
  lyric,
  primaryColor,
  accentColor,
  startTime = 0,
  endTime = 0,
}) => {
  // ✅ Generate unique key
  const uniqueKey = lyric 
    ? `lyric-${startTime}-${endTime}-${lyric.substring(0, 10)}`
    : null;

  return (
    <AnimatePresence mode="wait">
      {lyric && (
        <motion.div
          key={uniqueKey} // ✅ แก้ไขจาก key={lyric}
          initial={{ 
            opacity: 0, 
            x: 120, 
            y: -60,
            scale: 0.7,
            rotateX: -30,
            rotateZ: -5,
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
            x: -120, 
            y: 60,
            scale: 0.7,
            rotateX: 30,
            rotateZ: 5,
          }}
          transition={{ 
            duration: 0.6, 
            type: 'spring',
            stiffness: 120,
            damping: 18,
            mass: 0.8,
          }}
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            zIndex: 1000,
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: 300, md: 420 },
              px: { xs: 4, md: 5 },
              py: { xs: 3.5, md: 4 },
              borderRadius: { xs: '16px', md: '20px' },
              
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.15) 0%,
                  rgba(255, 255, 255, 0.05) 100%
                )
              `,
              backdropFilter: 'blur(30px) brightness(1.1)',
              WebkitBackdropFilter: 'blur(30px) brightness(1.1)',
              
              border: `1px solid rgba(255, 255, 255, 0.3)`,
              
              boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.4),
                inset 0 -1px 20px rgba(0, 0, 0, 0.1),
                0 8px 32px rgba(0, 0, 0, 0.1),
                0 0 50px ${accentColor}44,
                0 0 100px ${accentColor}22
              `,
              
              color: '#fff',
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              fontWeight: 700,
              letterSpacing: '0.5px',
              lineHeight: 1.7,
              textAlign: 'center',
              position: 'relative',
              overflow: 'visible',
              
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.5),
                  inset 0 -1px 20px rgba(0, 0, 0, 0.15),
                  0 12px 48px rgba(0, 0, 0, 0.15),
                  0 0 60px ${accentColor}55,
                  0 0 120px ${accentColor}33
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
                opacity: 0.7,
                pointerEvents: 'none',
              }}
            />

            {/* Top Glow Effect */}
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '40px',
                background: `radial-gradient(ellipse at center, ${accentColor}44, transparent 70%)`,
                filter: 'blur(12px)',
                pointerEvents: 'none',
              }}
            />

            {/* Side Glow Effects */}
            <Box
              sx={{
                position: 'absolute',
                right: -20,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '60px',
                height: '100%',
                background: `radial-gradient(ellipse at center, ${accentColor}33, transparent 70%)`,
                filter: 'blur(15px)',
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
                  ${primaryColor}88 50%,
                  transparent 100%
                )`,
                opacity: 0.8,
                filter: 'blur(1px)',
              }}
            />

            {/* Animated Border Glow */}
            <motion.div
              animate={{
                boxShadow: [
                  `inset 0 0 20px ${accentColor}22`,
                  `inset 0 0 40px ${accentColor}44`,
                  `inset 0 0 20px ${accentColor}22`,
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
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}
              >
                {/* Music Icon Animation */}
                <motion.span
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    fontSize: '1.3em',
                    textShadow: `0 0 10px ${accentColor}88`,
                  }}
                >
                  🎵
                </motion.span>

                {/* Lyric Text with Shimmer */}
                <motion.span
                  animate={{
                    textShadow: [
                      `0 0 10px ${accentColor}44, 0 0 20px ${accentColor}22`,
                      `0 0 20px ${accentColor}66, 0 0 40px ${accentColor}44`,
                      `0 0 10px ${accentColor}44, 0 0 20px ${accentColor}22`,
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {lyric}
                </motion.span>

                {/* Right Music Icon Animation */}
                <motion.span
                  animate={{
                    y: [0, 3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.3,
                  }}
                  style={{
                    fontSize: '1.3em',
                    textShadow: `0 0 10px ${accentColor}88`,
                  }}
                >
                  🎶
                </motion.span>
              </motion.div>
            </Box>

            {/* Bottom Accent Line - Animated */}
            <motion.div
              animate={{
                width: ['0%', '100%', '100%', '0%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '3px',
                background: `linear-gradient(90deg, 
                  transparent 0%,
                  ${accentColor}ff 50%,
                  transparent 100%
                )`,
                filter: 'blur(1px)',
              }}
            />

            {/* Corner Accent - Top Left */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '30px',
                height: '30px',
                borderTop: `2px solid ${accentColor}77`,
                borderLeft: `2px solid ${accentColor}77`,
                borderRadius: '16px 0 0 0',
                opacity: 0.6,
              }}
            />

            {/* Corner Accent - Bottom Right */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '30px',
                height: '30px',
                borderBottom: `2px solid ${accentColor}77`,
                borderRight: `2px solid ${accentColor}77`,
                borderRadius: '0 0 16px 0',
                opacity: 0.6,
              }}
            />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LyricsNotification;
