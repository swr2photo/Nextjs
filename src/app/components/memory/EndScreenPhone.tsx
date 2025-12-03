'use client';

import { Box, Container, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';

interface EndScreenPhoneProps {
  isVisible: boolean;
  videoUrl?: string;
  imageUrl?: string;
  themeColor: string;
  accentColor: string;
  onClose: () => void;
  onGoToGift: () => void;
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

export const EndScreenPhone: React.FC<EndScreenPhoneProps> = ({
  isVisible,
  videoUrl,
  imageUrl,
  themeColor,
  accentColor,
  onClose,
  onGoToGift,
}) => {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(2, 6, 23, 0.95)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <motion.div
                animate={{ y: [-20, 20, -20] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Typography sx={{ fontSize: '5rem', mb: 2 }}>🎉</Typography>
              </motion.div>

              <Typography
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 900,
                  background: `linear-gradient(135deg, ${themeColor}, ${accentColor})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 2,
                }}
              >
                เพลงจบแล้ว! 💚
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  opacity: 0.85,
                  mb: 4,
                  lineHeight: 1.8,
                }}
              >
                ขอบคุณที่ติดตามเส้นเรื่องของเรา
                <br />
                ทุกโมเมนต์ใจ ทุกหนึ่งวินาทีกับเธอ
                <br />
                มันมีค่าต่อฉันมากกว่ารู้ 🫶
              </Typography>

              {(videoUrl || imageUrl) && (
                <Box
                  sx={{
                    mb: 4,
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: `2px solid ${accentColor}`,
                    boxShadow: `0 0 30px ${accentColor}66`,
                  }}
                >
                  {videoUrl ? (
                    <Box
                      component="video"
                      src={videoUrl}
                      autoPlay
                      muted
                      loop
                      sx={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '400px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Box sx={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
                      <Image
                        src={imageUrl!}
                        alt="End screen"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                  )}
                </Box>
              )}

              <Box sx={{ mb: 4, ...appleGlassStyle(accentColor), p: { xs: 2, md: 3 }, borderRadius: 3 }}>
                <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, fontStyle: 'italic', lineHeight: 1.8, opacity: 0.9 }}>
                  "ขอบคุณที่เกิดมาเป็นจอม ขอบคุณที่เข้ามาในชีวิตฉัน ขอบคุณที่ทำให้วันัๆ เป็นพิเศษ"
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                <Box
                  component="button"
                  onClick={onGoToGift}
                  sx={{
                    flex: 1,
                    px: 4,
                    py: 2,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    fontWeight: 700,
                    borderRadius: 50,
                    border: 'none',
                    background: `linear-gradient(135deg, ${themeColor}, ${accentColor})`,
                    color: '#fff',
                    boxShadow: `0 0 30px ${accentColor}66`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      boxShadow: `0 0 50px ${accentColor}99`, 
                      transform: 'translateY(-2px)' 
                    },
                  }}
                >
                  🎁 ดูของขวัญ
                </Box>
                <Box
                  component="button"
                  onClick={onClose}
                  sx={{
                    flex: 1,
                    px: 4,
                    py: 2,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    fontWeight: 700,
                    borderRadius: 50,
                    border: `2px solid ${accentColor}`,
                    background: 'transparent',
                    color: accentColor,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      background: `${accentColor}22`, 
                      boxShadow: `0 0 30px ${accentColor}44` 
                    },
                  }}
                >
                  ปิด
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default EndScreenPhone;
