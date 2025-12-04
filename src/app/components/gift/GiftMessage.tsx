'use client';

import { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { DESIGN_SYSTEM } from '../../theme/designSystem';

interface GiftMessageProps {
  primaryColor: string;
  accentColor: string;
  isMobile: boolean;
  /** วิดีโอที่อยากให้เล่นก่อนแสดงการ์ด */
  videoUrl?: string;
}

export default function GiftMessage({
  primaryColor,
  accentColor,
  isMobile,
  videoUrl,
}: GiftMessageProps) {
  const hasVideo = !!videoUrl;
  // ถ้าไม่มีวิดีโอ ให้เปิดการ์ดทันที
  const [hasVideoFinished, setHasVideoFinished] = useState(!hasVideo);
  const [isMuted, setIsMuted] = useState(false); // พยายามเริ่มแบบไม่ mute
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /** พยายาม autoplay พร้อมเสียงตั้งแต่เริ่ม */
  useEffect(() => {
    if (!hasVideo || !videoRef.current) return;

    const video = videoRef.current;

    const tryAutoplayWithSound = async () => {
      try {
        video.muted = false;
        await video.play();
        setIsMuted(false);
      } catch {
        // ถ้า autoplay พร้อมเสียงไม่ผ่าน ให้กลับไปเป็น mute และรอให้ user กดปุ่มเปิดเสียงเอง
        video.muted = true;
        setIsMuted(true);
      }
    };

    void tryAutoplayWithSound();
  }, [hasVideo]);

  const handleEnableSound = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    try {
      video.muted = false;
      await video.play();
      setIsMuted(false);
    } catch {
      // ถ้าเล่นไม่ได้ก็ปล่อยเงียบ ๆ
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: isMobile ? 2 : 4,
      }}
    >
      {/* ---------- 1) วิดีโอเปิดตัว ---------- */}
      <AnimatePresence>
        {hasVideo && !hasVideoFinished && (
          <motion.div
            key="gift-video"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              width: isMobile ? '100%' : 420,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: isMobile ? '90vw' : 360,
                maxWidth: 380,
                aspectRatio: '9 / 16',
                borderRadius: '40px',
                overflow: 'hidden',
                border: '3px solid rgba(15,23,42,0.85)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.65)',
                backgroundColor: '#020617',
              }}
            >
              {/* notch ด้านบน (mockup iPhone) */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 120,
                  height: 18,
                  borderRadius: 999,
                  bgcolor: 'rgba(15,23,42,0.96)',
                  zIndex: 3,
                }}
              />

              {/* วิดีโอ */}
              <Box
                component="video"
                ref={videoRef}
                src={videoUrl}
                autoPlay
                muted={isMuted}
                playsInline
                onEnded={() => setHasVideoFinished(true)}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* ปุ่มเปิดเสียง (จะเห็นเฉพาะกรณี autoplay พร้อมเสียงไม่ผ่าน) */}
              {isMuted && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 14,
                    left: 14,
                    zIndex: 4,
                  }}
                >
                  <Box
                    component="button"
                    onClick={handleEnableSound}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.6,
                      px: 1.8,
                      py: 0.7,
                      borderRadius: 999,
                      border: 'none',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: 'rgba(15,23,42,0.9)',
                      color: '#e5e7eb',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.55)',
                      cursor: 'pointer',
                      '&:hover': {
                        background: 'rgba(15,23,42,1)',
                      },
                    }}
                  >
                    <VolumeUpRoundedIcon sx={{ fontSize: 18 }} />
                    เปิดเสียง
                  </Box>
                </Box>
              )}

              {/* ปุ่มข้ามไปดูข้อความเลย */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 14,
                  right: 14,
                  zIndex: 4,
                }}
              >
                <Box
                  component="button"
                  onClick={() => setHasVideoFinished(true)}
                  sx={{
                    px: 1.8,
                    py: 0.7,
                    borderRadius: 999,
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: 'rgba(15,23,42,0.85)',
                    color: '#e5e7eb',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.55)',
                    cursor: 'pointer',
                    '&:hover': {
                      background: 'rgba(15,23,42,0.95)',
                    },
                  }}
                >
                  ข้ามไปดูข้อความ
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- 2) การ์ดข้อความ popup แบบ iPhone ---------- */}
      <AnimatePresence>
        {hasVideoFinished && (
          <motion.div
            key="gift-card"
            initial={{
              opacity: 0,
              y: isMobile ? 120 : 60,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: isMobile ? 120 : 60,
              scale: 0.8,
            }}
            transition={{
              duration: 0.65,
              ease: 'easeInOut',
            }}
            style={{
              position: hasVideo ? 'absolute' : 'relative',
              inset: hasVideo ? 0 : undefined,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              pointerEvents: 'auto',
            }}
          >
            {hasVideo && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'rgba(15,23,42,0.65)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 0,
                }}
              />
            )}

            <Box
              sx={{
                position: 'relative',
                width: isMobile ? '88vw' : 360,
                maxWidth: 380,
                borderRadius: '40px',
                p: 1.5,
                background:
                  'linear-gradient(145deg, rgba(15,23,42,0.95), rgba(15,23,42,0.85))',
                boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
                zIndex: 1,
              }}
            >
              {/* notch ด้านบน */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 120,
                  height: 18,
                  borderRadius: 999,
                  bgcolor: 'rgba(15,23,42,0.96)',
                  zIndex: 3,
                }}
              />

              {/* เนื้อหาการ์ด */}
              <Box
                sx={{
                  mt: 3,
                  borderRadius: DESIGN_SYSTEM.borderRadius.card,
                  background: DESIGN_SYSTEM.cardBg(accentColor),
                  border: `2px solid ${accentColor}88`,
                  boxShadow: DESIGN_SYSTEM.shadows.card,
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                  ...DESIGN_SYSTEM.spacing.card,
                }}
              >
                {/* shimmer */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(90deg, transparent, ${accentColor}33, transparent)`,
                    animation: 'shimmer 3s infinite',
                    '@keyframes shimmer': {
                      '0%': { left: '-100%' },
                      '100%': { left: '100%' },
                    },
                    pointerEvents: 'none',
                  }}
                />

                {/* Header */}
                <Box
                  sx={{
                    ...DESIGN_SYSTEM.typography.label,
                    color: accentColor,
                    mb: 1.2,
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                  }}
                >
                  <MailOutlineRoundedIcon
                    sx={{ fontSize: { xs: 18, sm: 20 } }}
                  />
                  ถึง... จอม (คนขี้เซา)
                </Box>

                {/* Main text */}
                <Box
                  component="p"
                  sx={{
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    lineHeight: { xs: 1.7, sm: 1.9, md: 2 },
                    color: 'rgba(226,232,240,0.99)',
                    mb: 1.5,
                    fontWeight: 500,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      mb: 0.5,
                    }}
                  >
                    <CakeRoundedIcon
                      sx={{
                        fontSize: { xs: 18, sm: 20 },
                        color: accentColor,
                      }}
                    />
                    <span>สุขสันต์วันเกิดนะ</span>
                  </Box>
                  <br />
                  ดีใจจริง ๆ ที่ได้รู้จักจอม ขอบคุณที่เป็นความสบายใจให้เรา{' '}
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.4,
                    }}
                  >
                    <span>(ในวันที่งานเดือด</span>
                    <WhatshotRoundedIcon
                      sx={{
                        fontSize: { xs: 16, sm: 18 },
                        color: '#fb7185',
                      }}
                    />
                    <span>)</span>
                  </Box>{' '}
                  และขอบคุณที่ทนความขี้บ่นของเราได้เสมอ...
                </Box>

                {/* Highlight quote box */}
                <Box
                  sx={{
                    py: { xs: 1, sm: 1.3, md: 1.8 },
                    px: { xs: 1.2, sm: 1.5, md: 2.2 },
                    borderRadius: DESIGN_SYSTEM.borderRadius.card,
                    background: `linear-gradient(135deg, ${primaryColor}33, ${accentColor}33)`,
                    borderLeft: `4px solid ${accentColor}`,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1,
                    }}
                  >
                    <FavoriteRoundedIcon
                      sx={{
                        mt: 0.2,
                        fontSize: { xs: 18, sm: 20 },
                        color: accentColor,
                        filter: `drop-shadow(0 0 8px ${accentColor}aa)`,
                      }}
                    />
                    <Box
                      component="p"
                      sx={{
                        fontSize: {
                          xs: '0.92rem',
                          sm: '1.05rem',
                          md: '1.18rem',
                        },
                        fontWeight: 900,
                        background: `linear-gradient(135deg, ${accentColor}, ${primaryColor})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '-0.01em',
                        m: 0,
                      }}
                    >
                      "ปีนี้ไม่มีของขวัญแพง ๆ ให้... มีแต่ &quot;ตัวเรา&quot;
                      ที่จะคอยป่วนแชทจอมไปทุกปี... ห้ามเบื่อกันก่อนนะ!"
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
