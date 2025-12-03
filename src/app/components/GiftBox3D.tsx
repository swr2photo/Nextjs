'use client';

import { Box, Typography, Button, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import { DESIGN_SYSTEM } from '../theme/designSystem';

interface GiftBoxProps {
  color: string;
  accentColor: string;
  onOpenGift?: () => void;
}

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'รู้มั้ย เราชอบสีอะไร?',
    options: ['สีแดง', 'สีดำ', 'สีเหลือง'],
    correctOption: 1,
    hint: '💚 มันเป็นสีที่ลึกลับและดูดี',
  },
  {
    id: 2,
    question: 'เราชื่นชอบฟังเพลงแบบไหน?',
    options: ['Indie-pop', 'K-pop', 'R&B'],
    correctOption: 0,
    hint: '✨ เพลงที่มีความหมาย',
  },
  {
    id: 3,
    question: 'สิ่งที่เรามักทำเวลาคิดถึงนาย?',
    options: ['มองฟ้า', 'ทำวิตเก่า', 'ฟังเพลง'],
    correctOption: 2,
    hint: '🎵 ใจเราพูดผ่านทางนี้',
  },
  {
    id: 4,
    question: 'สถานที่ที่เราอยากไปกับนาย?',
    options: ['ชายหาด', 'ไปดู sky', 'ทั่วไป'],
    correctOption: 1,
    hint: '⭐ ที่เห็นดวงดาวและหัวใจ',
  },
];

const UNLOCK_CODE = '05122005';

const Particle3D = ({
  delay,
  angle,
  distance,
  color,
}: {
  delay: number;
  angle: number;
  distance: number;
  color: string;
}) => {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * distance;
  const y = Math.sin(rad) * distance * -1;
  const z = (Math.random() - 0.5) * 200;

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0, z: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 1, 0],
        x,
        y,
        z,
        scale: [0.5, 1.2, 0.3],
        rotateX: [0, 360],
        rotateY: [0, 180],
      }}
      transition={{ delay, duration: 2, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}, ${color}dd)`,
          boxShadow: `0 0 20px ${color}cc`,
        }}
      />
    </motion.div>
  );
};

const HeartBurst3D = ({
  angle,
  distance,
  delay,
  color,
}: {
  angle: number;
  distance: number;
  delay: number;
  color: string;
}) => {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * distance;
  const y = Math.sin(rad) * distance * -1;
  const z = (Math.random() - 0.5) * 150;

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0, z: 0, scale: 0.4 }}
      animate={{
        opacity: [0, 1, 0],
        x,
        y,
        z,
        scale: [0.7, 1.3, 0.5],
        rotateX: [0, 720],
        rotateY: [0, 360],
        rotateZ: [0, 180],
      }}
      transition={{ delay, duration: 1.8, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        pointerEvents: 'none',
      }}
    >
      <FavoriteIcon
        sx={{
          fontSize: { xs: 20, sm: 26 },
          color,
          filter: `drop-shadow(0 0 12px ${color}88)`,
        }}
      />
    </motion.div>
  );
};

export default function GiftBox3D({
  color,
  accentColor,
  onOpenGift,
}: GiftBoxProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [opened, setOpened] = useState(false);
  const [hasEverOpened, setHasEverOpened] = useState(false);
  const [stage, setStage] = useState<
    'tap' | 'quiz' | 'code-lock' | 'ready' | 'completed'
  >('tap');
  const [tapCount, setTapCount] = useState(0);
  const [shake, setShake] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [screenSize, setScreenSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('md');
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');
  const [quizShake, setQuizShake] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) setScreenSize('xs');
      else if (width < 960) setScreenSize('sm');
      else if (width < 1280) setScreenSize('md');
      else setScreenSize('lg');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) return null;

  const primary = color || '#22c55e';
  const accent = accentColor || '#22c55e';
  const isMobile = screenSize === 'xs' || screenSize === 'sm';

  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        angle: i * 30,
        distance: 100 + (i % 3) * 15,
        delay: 0.06 * i,
      })),
    [],
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        angle: (360 / 16) * i,
        distance: 120 + (i % 3) * 25,
        delay: 0.04 * i,
        color: [primary, accent, '#fbbf24', '#fb7185'][i % 4],
      })),
    [primary, accent],
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (opened || isMobile || stage !== 'tap') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = ((y - rect.height / 2) / rect.height) * 15;
    const rotY = ((x - rect.width / 2) / rect.width) * 15;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleQuizAnswer = (selectedIndex: number) => {
    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correctOption) {
      setCorrectAnswersCount((prev) => prev + 1);
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1500);

      setTimeout(() => {
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          setStage('code-lock');
        }
      }, 1200);
    } else {
      setQuizShake(true);
      setTimeout(() => setQuizShake(false), 500);
      setCodeError('❌ ตอบผิด ลองใหม่นะ');
      setTimeout(() => setCodeError(''), 2000);
    }
  };

  const handleCodeSubmit = () => {
    if (codeInput === UNLOCK_CODE) {
      setCodeError('');
      setStage('ready');
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 2200);
    } else {
      setCodeError('❌ รหัสไม่ถูกต้อง ลองใหม่');
      setQuizShake(true);
      setTimeout(() => setQuizShake(false), 500);
      setTimeout(() => setCodeError(''), 3000);
    }
  };

  const toggleOpen = () => {
    if (stage === 'tap') {
      const next = tapCount + 1;
      setTapCount(next);
      setShake(true);
      setTimeout(() => setShake(false), 300);
      if (next >= 3) {
        setStage('quiz');
        setTapCount(0);
      }
      return;
    }

    if (stage === 'quiz' || stage === 'code-lock') {
      return;
    }

    if (stage === 'ready' || stage === 'completed') {
      if (!opened) {
        setHasEverOpened(true);
        setStage('completed');
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 2500);
      }
      setOpened((prev) => !prev);
    }
  };

  const handleOpenRealGift = () => {
    onOpenGift?.();
    setOpened(false);
    setHasEverOpened(false);
    setStage('tap');
    setTapCount(0);
    setCurrentQuestionIndex(0);
    setCorrectAnswersCount(0);
    setCodeInput('');
    setCodeError('');
    setShake(false);
    setShowParticles(false);
  };

  const hintText = (() => {
    if (stage === 'tap') {
      const left = Math.max(0, 3 - tapCount);
      return `✨ ชาเล้นที่ 1: แตะกล่องเบา ๆ อีก ${left} ครั้ง 💚`;
    }
    if (stage === 'quiz') return '✨ ชาเล้นที่ 2: ตอบคำถามให้ถูกทั้งหมด 🎯';
    if (stage === 'code-lock') {
      return `✨ ใส่รหัส (${correctAnswersCount}/${QUIZ_QUESTIONS.length} ✓)`;
    }
    if (stage === 'ready') return '✨ ชาเล้นที่ 3: แตะกล่องอีกครั้งเพื่อเปิด 💌';
    if (stage === 'completed') {
      return hasEverOpened
        ? '✨ ถ้าอยากอ่านอีก แตะกล่องได้เสมอ 💚'
        : '✨ แตะกล่องเพื่อเปิด 💌';
    }
    return null;
  })();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ width: '100%', minHeight: '100vh' }}
    >
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: isMobile ? 'flex-start' : 'center',
          position: 'relative',
          background: DESIGN_SYSTEM.background,
          overflow: 'hidden',
          perspective: '1200px',
          fontFamily:
            'var(--font-noto-sans-thai), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          ...DESIGN_SYSTEM.spacing.section,
        }}
      >
        {/* Background glow */}
        <Box
          sx={{
            position: 'absolute',
            width: { xs: 250, sm: 350, md: 450 },
            height: { xs: 250, sm: 350, md: 450 },
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accent}40 0%, ${primary}20 40%, transparent 70%)`,
            filter: 'blur(60px)',
            animation: 'pulse 5s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)', opacity: 0.6 },
              '50%': { transform: 'scale(1.1)', opacity: 0.9 },
            },
            pointerEvents: 'none',
            top: isMobile ? '15%' : '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Ring glow */}
        <Box
          sx={{
            position: 'absolute',
            width: { xs: 150, sm: 200, md: 280 },
            height: { xs: 150, sm: 200, md: 280 },
            borderRadius: '50%',
            border: `2px solid ${accent}22`,
            top: isMobile ? '20%' : '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'rotate 20s linear infinite',
            '@keyframes rotate': {
              '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
              '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
            },
            pointerEvents: 'none',
          }}
        />

        {/* Title */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 4, sm: 6, md: 8 },
            px: 2,
            zIndex: 1,
            width: '100%',
            maxWidth: 540,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Typography
              sx={{
                ...DESIGN_SYSTEM.typography.heading,
                background: `linear-gradient(135deg, ${accent}, ${primary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: { xs: 0.5, sm: 1 },
              }}
            >
              🎁 กล่องพิเศษจากใจ 💚
            </Typography>
            <Typography
              sx={{
                ...DESIGN_SYSTEM.typography.body,
                color: 'rgba(226,232,240,0.8)',
                maxWidth: 520,
                mx: 'auto',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                mt: 1,
              }}
            >
              ต้องผ่านชาเล้นพิเศษ ถึงจะเปิดได้ ✨
            </Typography>
          </motion.div>
        </Box>

        {/* Main Container */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 0, sm: 3, md: 6 },
            width: '100%',
            mb: { xs: 4, sm: 0, md: 0 },
            position: 'relative',
            zIndex: 2,
            minHeight: isMobile ? 'auto' : 450,
            perspective: '1200px',
          }}
        >
          {/* 3D Gift Box */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={toggleOpen}
            whileHover={{
              scale: stage === 'quiz' || stage === 'code-lock' ? 1.0 : 1.08,
            }}
            whileTap={{ scale: 0.94 }}
            animate={shake ? { x: [-10, 10, -8, 8, 0] } : { x: 0 }}
            transition={shake ? { duration: 0.4 } : { duration: 0.8 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: isMobile ? 240 : 320,
              aspectRatio: '1 / 1',
              cursor:
                stage === 'quiz' || stage === 'code-lock'
                  ? 'not-allowed'
                  : 'pointer',
              opacity:
                stage === 'quiz' || stage === 'code-lock' ? 0.9 : 1,
              perspective: '1200px',
            }}
          >
            {/* 3D Box Container */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: DESIGN_SYSTEM.transitions.fast,
              }}
            >
              {/* Front Face */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, ${primary}ff, ${accent}dd)`,
                  borderRadius: { xs: '20px', sm: '28px', md: '32px' },
                  boxShadow: DESIGN_SYSTEM.shadows.lifted(accent),
                  backfaceVisibility: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transformStyle: 'preserve-3d',
                  overflow: 'hidden',
                }}
              >
                {/* Ribbon - Vertical */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    width: '20%',
                    height: '100%',
                    transform: 'translateX(-50%) translateZ(2px)',
                    background: `linear-gradient(90deg, rgba(254,249,195,0.9), rgba(251,191,36,0.95))`,
                    mixBlendMode: 'screen',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
                  }}
                />

                {/* Ribbon - Horizontal */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '45%',
                    left: 0,
                    width: '100%',
                    height: '24%',
                    transform: 'translateY(-50%) translateZ(2px)',
                    background: `linear-gradient(180deg, rgba(254,202,202,0.9), rgba(252,165,165,0.95))`,
                    mixBlendMode: 'screen',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
                  }}
                />

                {/* Bow */}
                <motion.div
                  whileHover={{ scale: 1.15, rotateZ: 10 }}
                  style={{
                    position: 'absolute',
                    top: '22%',
                    left: '50%',
                    transform: 'translateX(-50%) translateZ(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMobile ? 6 : 8,
                    zIndex: 10,
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 10, sm: 14, md: 16 },
                      height: { xs: 14, sm: 18, md: 22 },
                      borderRadius: '12px 0 12px 0',
                      background: 'linear-gradient(135deg, #fef3c7, #f97316)',
                      boxShadow: `0 8px 20px rgba(249, 115, 22, 0.5)`,
                    }}
                  />
                  <Box
                    sx={{
                      width: { xs: 14, sm: 18, md: 22 },
                      height: { xs: 16, sm: 20, md: 26 },
                      borderRadius: '8px',
                      background: `radial-gradient(circle at 30% 30%, #fef9c3, #facc15)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 12px 28px rgba(250, 204, 21, 0.6)`,
                    }}
                  >
                    <CardGiftcardIcon
                      sx={{
                        fontSize: { xs: 9, sm: 12, md: 16 },
                        color: '#1a1a1a',
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: { xs: 10, sm: 14, md: 16 },
                      height: { xs: 14, sm: 18, md: 22 },
                      borderRadius: '0 12px 0 12px',
                      background: 'linear-gradient(135deg, #fee2e2, #fb7185)',
                      boxShadow: `0 8px 20px rgba(251, 113, 133, 0.5)`,
                    }}
                  />
                </motion.div>
              </Box>

              {/* Lid */}
              <motion.div
                animate={
                  opened
                    ? { rotateX: -90, y: -120 }
                    : { rotateX: 0, y: 0 }
                }
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '40%',
                  top: 0,
                  transformOrigin: 'bottom center',
                  transformStyle: 'preserve-3d',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${accent}ff, ${primary}dd)`,
                    borderRadius: { xs: '20px', sm: '28px', md: '32px' },
                    boxShadow: `0 30px 60px rgba(0,0,0,0.75)`,
                    backfaceVisibility: 'hidden',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                />
              </motion.div>

              {/* Inside Glow */}
              <AnimatePresence>
                {opened && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6 }}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '55%',
                      transform: 'translate(-50%, -50%) translateZ(3px)',
                      width: '90%',
                      height: '50%',
                      borderRadius: 28,
                      background: `radial-gradient(circle at top, rgba(248,250,252,0.95), ${accent}40 50%, transparent 80%)`,
                      filter: 'blur(2px)',
                      pointerEvents: 'none',
                      boxShadow: `0 0 60px ${accent}77`,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Hearts Burst */}
              <AnimatePresence>
                {opened &&
                  hearts.map((h, i) => (
                    <HeartBurst3D
                      key={`heart-${i}`}
                      angle={h.angle}
                      distance={h.distance}
                      delay={0.1 + h.delay}
                      color={
                        i % 3 === 0 ? '#fb7185' : i % 3 === 1 ? accent : primary
                      }
                    />
                  ))}
              </AnimatePresence>

              {/* Particles */}
              <AnimatePresence>
                {showParticles &&
                  particles.map((p, i) => (
                    <Particle3D
                      key={`particle-${i}`}
                      angle={p.angle}
                      distance={p.distance}
                      delay={0.05 + p.delay}
                      color={p.color}
                    />
                  ))}
              </AnimatePresence>
            </Box>
          </motion.div>

          {/* Message Card */}
          <AnimatePresence>
            {opened && (stage === 'ready' || stage === 'completed') && (
              <motion.div
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
                  width: isMobile ? '100%' : 'auto',
                  maxWidth: isMobile ? '100%' : 340,
                  zIndex: 3,
                }}
              >
                <Box
                  sx={{
                    ...DESIGN_SYSTEM.spacing.card,
                    borderRadius: DESIGN_SYSTEM.borderRadius.card,
                    background: DESIGN_SYSTEM.cardBg(accent),
                    border: `2px solid ${accent}88`,
                    boxShadow: DESIGN_SYSTEM.shadows.card,
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(90deg, transparent, ${accent}33, transparent)`,
                      animation: 'shimmer 3s infinite',
                      '@keyframes shimmer': {
                        '0%': { left: '-100%' },
                        '100%': { left: '100%' },
                      },
                      pointerEvents: 'none',
                    }}
                  />

                  <Typography
                    sx={{
                      ...DESIGN_SYSTEM.typography.label,
                      color: accent,
                      mb: 1.2,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    ✉️ จากใจของฉัน
                  </Typography>

                  <Typography
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
                    ขอบคุณที่เกิดมาในวันนี้ ขอบคุณที่ยอมให้เราได้อยู่ในชีวิตของนาย
                    ต่อให้ตอนนี้เรายังเป็นแค่ "เพื่อนผู้ชาย" คนหนึ่ง แต่ในใจลึก
                    ๆ…
                  </Typography>

                  <Box
                    sx={{
                      py: { xs: 1, sm: 1.3, md: 1.8 },
                      px: { xs: 1.2, sm: 1.5, md: 2.2 },
                      borderRadius: DESIGN_SYSTEM.borderRadius.card,
                      background: `linear-gradient(135deg, ${primary}33, ${accent}33)`,
                      borderLeft: `4px solid ${accent}`,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: '0.92rem',
                          sm: '1.05rem',
                          md: '1.18rem',
                        },
                        fontWeight: 900,
                        background: `linear-gradient(135deg, ${accent}, ${primary})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      "ถ้าวันแรกของเธอกับฉัน เริ่มวันนี้เลยดีไหม 💚"
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Info Box */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 560,
            px: 2,
            zIndex: 2,
            mt: { xs: 4, sm: 6, md: 8 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Box
              sx={{
                ...DESIGN_SYSTEM.spacing.card,
                borderRadius: DESIGN_SYSTEM.borderRadius.card,
                background: DESIGN_SYSTEM.cardBg(accent),
                border: `2px solid ${accent}66`,
                boxShadow: DESIGN_SYSTEM.shadows.card,
                backdropFilter: 'blur(10px)',
                minHeight: 160,
              }}
            >
              {/* TAP */}
              {stage === 'tap' && (
                <>
                  <Typography sx={{ ...DESIGN_SYSTEM.typography.label, color: accent, mb: 1 }}>
                    🎮 ชาเล้นที่ 1 · เติมหัวใจให้เต็ม
                  </Typography>
                  <Typography sx={{ ...DESIGN_SYSTEM.typography.body, mb: 1.2, color: 'rgba(226,232,240,0.96)' }}>
                    ลองแตะกล่องด้านบนเบา ๆ 3 ครั้ง 💚
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.2 }}>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={i < tapCount ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <FavoriteIcon
                          sx={{
                            fontSize: { xs: 24, sm: 28, md: 32 },
                            color:
                              i < tapCount
                                ? accent
                                : 'rgba(148,163,184,0.5)',
                            filter:
                              i < tapCount
                                ? `drop-shadow(0 0 12px ${accent}99)`
                                : 'none',
                            transition: DESIGN_SYSTEM.transitions.normal,
                          }}
                        />
                      </motion.div>
                    ))}
                  </Box>
                </>
              )}

              {/* QUIZ */}
              {stage === 'quiz' && (
                <>
                  <Typography sx={{ ...DESIGN_SYSTEM.typography.label, color: accent, mb: 0.8 }}>
                    🎯 ชาเล้นที่ 2 · ตอบคำถาม{' '}
                    <span style={{ opacity: 0.7 }}>
                      ({currentQuestionIndex + 1}/{QUIZ_QUESTIONS.length})
                    </span>
                  </Typography>

                  <motion.div
                    animate={quizShake ? { x: [-8, 8, -6, 6, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <Typography
                      sx={{
                        ...DESIGN_SYSTEM.typography.body,
                        mb: 1.5,
                        color: 'rgba(226,232,240,0.98)',
                      }}
                    >
                      {QUIZ_QUESTIONS[currentQuestionIndex].question}
                    </Typography>
                  </motion.div>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                      gap: { xs: 0.8, sm: 1, md: 1.2 },
                    }}
                  >
                    {QUIZ_QUESTIONS[currentQuestionIndex].options.map(
                      (option, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => handleQuizAnswer(idx)}
                            sx={{
                              borderRadius: DESIGN_SYSTEM.borderRadius.card,
                              borderColor: `${accent}44`,
                              color: 'rgba(226,232,240,0.9)',
                              textTransform: 'none',
                              ...DESIGN_SYSTEM.typography.bodySmall,
                              ...DESIGN_SYSTEM.spacing.button,
                              transition: DESIGN_SYSTEM.transitions.normal,
                              '&:hover': {
                                borderColor: `${accent}77`,
                                backgroundColor: `${accent}11`,
                              },
                            }}
                          >
                            {option}
                          </Button>
                        </motion.div>
                      ),
                    )}
                  </Box>

                  <AnimatePresence>
                    {codeError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: '0.75rem', sm: '0.85rem' },
                            mt: 1.2,
                            color: '#fb7185',
                            fontWeight: 600,
                          }}
                        >
                          {codeError}
                        </Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}

              {/* CODE LOCK */}
              {stage === 'code-lock' && (
                <>
                  <Typography sx={{ ...DESIGN_SYSTEM.typography.label, color: accent, mb: 1 }}>
                    🔐 ชาเล้นที่ 3 · ใส่รหัสปลดล็ก
                  </Typography>

                  <Typography sx={{ ...DESIGN_SYSTEM.typography.body, mb: 1.5, color: 'rgba(226,232,240,0.95)' }}>
                    💡 ใบ้: วันเกิดของผู้ชายคนนี้ (DDMMYYYY)
                  </Typography>

                  <motion.div
                    animate={quizShake ? { x: [-6, 6, -4, 4, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <TextField
                      fullWidth
                      type="password"
                      placeholder="ใส่รหัส 8 ตัวเลข"
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && codeInput.length === 8) {
                          handleCodeSubmit();
                        }
                      }}
                      sx={{
                        mb: 1.2,
                        '& .MuiOutlinedInput-root': {
                          color: 'rgba(226,232,240,0.9)',
                          fontSize: {
                            xs: '0.9rem',
                            sm: '1rem',
                            md: '1.1rem',
                          },
                          letterSpacing: '0.2em',
                          '& fieldset': {
                            borderColor: `${accent}44`,
                          },
                          '&:hover fieldset': {
                            borderColor: `${accent}77`,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: accent,
                            boxShadow: `0 0 16px ${accent}44`,
                          },
                        },
                      }}
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleCodeSubmit}
                      disabled={codeInput.length !== 8}
                      sx={{
                        borderRadius: DESIGN_SYSTEM.borderRadius.button,
                        background:
                          codeInput.length === 8
                            ? `linear-gradient(135deg, ${primary}, ${accent})`
                            : 'rgba(148,163,184,0.2)',
                        textTransform: 'none',
                        ...DESIGN_SYSTEM.typography.bodySmall,
                        ...DESIGN_SYSTEM.spacing.button,
                        fontWeight: 800,
                        boxShadow:
                          codeInput.length === 8
                            ? DESIGN_SYSTEM.shadows.button(accent)
                            : 'none',
                        transition: DESIGN_SYSTEM.transitions.normal,
                        '&:hover:not(:disabled)': {
                          boxShadow: DESIGN_SYSTEM.shadows.buttonHover(accent),
                          transform: 'translateY(-2px)',
                        },
                        '&:disabled': {
                          cursor: 'not-allowed',
                        },
                      }}
                    >
                      {codeInput.length === 8 ? '✓ ยืนยัน' : 'ใส่รหัส 8 ตัว'}
                    </Button>
                  </motion.div>

                  <AnimatePresence>
                    {codeError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: '0.75rem', sm: '0.85rem' },
                            mt: 1.2,
                            color: '#fb7185',
                            fontWeight: 600,
                            textAlign: 'center',
                          }}
                        >
                          {codeError}
                        </Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}

              {/* READY */}
              {stage === 'ready' && (
                <>
                  <Typography sx={{ ...DESIGN_SYSTEM.typography.label, color: accent, mb: 1 }}>
                    ✨ ชาเล้นสุดท้าย · เปิดกล่อง
                  </Typography>
                  <Typography sx={{ ...DESIGN_SYSTEM.typography.body, color: 'rgba(226,232,240,0.96)' }}>
                    🎉 ยินดีด้วย! รหัสถูกแล้ว
                    <br />
                    ตอนนี้ลองแตะกล่องด้านบนได้เลย 💌
                  </Typography>
                </>
              )}

              {/* COMPLETED */}
              {stage === 'completed' && !opened && (
                <>
                  <Typography sx={{ ...DESIGN_SYSTEM.typography.label, color: accent, mb: 1 }}>
                    💌 เปิดได้เสมอ
                  </Typography>
                  <Typography sx={{ ...DESIGN_SYSTEM.typography.body, color: 'rgba(226,232,240,0.96)' }}>
                    กล่องนี้อยู่กับนายตลอด
                    <br />
                    ถ้าอยากอ่านอีก แค่แตะกล่อง 💚
                  </Typography>
                </>
              )}
            </Box>
          </motion.div>
        </Box>

        {/* Button - Open Real Gift */}
        <AnimatePresence>
          {stage === 'completed' && opened && onOpenGift && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 20,
              }}
            >
              <Box
                sx={{
                  pb: { xs: 3, sm: 4, md: 6 },
                  px: 2,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -6 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleOpenRealGift}
                    endIcon={<ChevronRightIcon />}
                    sx={{
                      px: { xs: 2.5, sm: 3.5, md: 5 },
                      ...DESIGN_SYSTEM.spacing.button,
                      borderRadius: DESIGN_SYSTEM.borderRadius.button,
                      background: `linear-gradient(135deg, ${accent}, ${primary})`,
                      color: '#fff',
                      textTransform: 'none',
                      ...DESIGN_SYSTEM.typography.bodySmall,
                      fontWeight: 900,
                      letterSpacing: '0.06em',
                      boxShadow: `0 20px 50px ${accent}88`,
                      transition: DESIGN_SYSTEM.transitions.normal,
                      '&:hover': {
                        boxShadow: `0 28px 60px ${accent}bb`,
                        transform: 'translateY(-6px)',
                      },
                    }}
                  >
                    ไปเปิดของขวัญจริง 🎁
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint */}
        {hintText && stage !== 'completed' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              bottom: isMobile ? 100 : 130,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: isMobile ? '0.75rem' : '0.9rem',
              opacity: 0.75,
              textAlign: 'center',
              maxWidth: 'calc(100% - 30px)',
              zIndex: 5,
            }}
          >
            <Box
              sx={{
                color: accent,
                px: 2.5,
                py: 1.2,
                borderRadius: 999,
                background: 'rgba(15,23,42,0.8)',
                border: `1px solid ${accent}44`,
                backdropFilter: 'blur(10px)',
              }}
            >
              {hintText}
            </Box>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
}
