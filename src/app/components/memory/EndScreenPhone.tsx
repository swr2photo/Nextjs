'use client';

import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';

// MUI Icons แทนอิโมจิ
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

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
        key="end-screen-overlay"
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
              {/* ไอคอนเฉลิมฉลองแทน 🎉 */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    mx: 'auto',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `radial-gradient(circle, ${accentColor}55, transparent 65%)`,
                    boxShadow: `0 0 30px ${accentColor}66`,
                  }}
                >
                  <CelebrationRoundedIcon
                    sx={{
                      fontSize: 42,
                      color: '#fff',
                    }}
                  />
                </Box>
              </motion.div>

              {/* หัวข้อใหญ่แทน "เพลงจบแล้ว! 💚" */}
              <Typography
                sx={{
                  fontSize: { xs: '1.9rem', md: '2.6rem' },
                  fontWeight: 900,
                  background: `linear-gradient(135deg, ${themeColor}, ${accentColor})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 1.5,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                เพลงจบแล้วแล้วนะ
                <FavoriteRoundedIcon
                  sx={{ fontSize: { xs: 22, md: 26 }, color: accentColor }}
                />
              </Typography>

              {/* ข้อความกลางแทนที่มี 🫶 */}
              <Typography
                sx={{
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  opacity: 0.88,
                  mb: 4,
                  lineHeight: 1.8,
                }}
              >
                ขอบคุณที่ฟังเรื่องราวทั้งหมดจนจบ
                <br />
                ทุกโมเมนต์ ทุกจังหวะของหัวใจ
                <br />
                มีความหมายมากสำหรับฉันจริง ๆ
              </Typography>

              {/* รูปหรือวิดีโอท้าย */}
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
                      playsInline
                      sx={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '400px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '4/3',
                      }}
                    >
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

              {/* กล่องข้อความ quote ใช้ glass style */}
              <Box
                sx={{
                  mb: 4,
                  p: { xs: 2, md: 3 },
                  borderRadius: 3,
                  ...appleGlassStyle(accentColor),
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    fontStyle: 'italic',
                    lineHeight: 1.8,
                    opacity: 0.9,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.75,
                    alignItems: 'center',
                  }}
                >
                  <FavoriteBorderRoundedIcon
                    sx={{ fontSize: 20, color: accentColor, mb: 0.5 }}
                  />
                  <span>
                    &quot;ขอบคุณที่เกิดมาเป็นเธอ
                    ขอบคุณที่เดินเข้ามาในชีวิตฉัน
                    <br />
                    และทำให้วันธรรมดากลายเป็นวันพิเศษเสมอ&quot;
                  </span>
                </Typography>
              </Box>

              {/* ปุ่มแอ็กชันสองปุ่ม แทน 🎁 และ ปิด */}
              <Stack
                spacing={2}
                direction={{ xs: 'column', md: 'row' }}
                sx={{ justifyContent: 'center' }}
              >
                <Button
                  onClick={onGoToGift}
                  variant="contained"
                  startIcon={<CardGiftcardRoundedIcon />}
                  sx={{
                    flex: 1,
                    px: 4,
                    py: 1.6,
                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                    fontWeight: 700,
                    borderRadius: 999,
                    textTransform: 'none',
                    background: `linear-gradient(135deg, ${themeColor}, ${accentColor})`,
                    boxShadow: `0 0 30px ${accentColor}66`,
                    '&:hover': {
                      boxShadow: `0 0 45px ${accentColor}aa`,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.25s ease',
                  }}
                >
                  ไปดูของขวัญต่อ
                </Button>

                <Button
                  onClick={onClose}
                  variant="outlined"
                  startIcon={<CloseRoundedIcon />}
                  sx={{
                    flex: 1,
                    px: 4,
                    py: 1.6,
                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                    fontWeight: 700,
                    borderRadius: 999,
                    textTransform: 'none',
                    borderWidth: 2,
                    borderColor: accentColor,
                    color: accentColor,
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: `${accentColor}22`,
                      borderColor: accentColor,
                      boxShadow: `0 0 30px ${accentColor}55`,
                    },
                    transition: 'all 0.25s ease',
                  }}
                >
                  ปิดหน้านี้
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default EndScreenPhone;
