'use client';

import { Box, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DESIGN_SYSTEM } from '../../theme/designSystem';
import GiftChallenge1 from './GiftChallenge1';
import GiftChallenge2 from './GiftChallenge2';
import GiftChallenge3 from './GiftChallenge3';
import GiftMessage from './GiftMessage';
import { HeartBurst3D, Particle3D } from './gift-effects';

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
    correctOption: 3,
  },
  {
    id: 2,
    question: 'เราชื่นชอบฟังเพลงแบบไหน?',
    options: ['Indie-pop', 'K-pop', 'R&B'],
    correctOption: 0,
  },
  {
    id: 3,
    question: 'สิ่งที่เรามักทำเวลาคิดถึงนาย?',
    options: ['มองฟ้า', 'ทำวิตเก่า', 'ฟังเพลง'],
    correctOption: 2,
  },
  {
    id: 4,
    question: 'สถานที่ที่เราอยากไปกับนาย?',
    options: ['ชายหาด', 'ไปดู sky', 'ทั่วไป'],
    correctOption: 1,
  },
];

const UNLOCK_CODE = '05122005';

export default function GiftBox3D({
  color,
  accentColor,
  onOpenGift,
}: GiftBoxProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [opened, setOpened] = useState(false);
  const [hasEverOpened, setHasEverOpened] = useState(false);
  const [stage, setStage] = useState<'tap' | 'quiz' | 'code-lock' | 'ready' | 'completed'>('tap');
  const [screenSize, setScreenSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('md');
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shake, setShake] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  // Challenge states
  const [tapCount, setTapCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');

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
  };

  return (
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
        fontFamily: 'var(--font-noto-sans-thai), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
          zIndex: 10,
          width: '100%',
          maxWidth: 540,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <Box
          component="h1"
          sx={{
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.6rem' },
            fontWeight: 900,
            background: `linear-gradient(135deg, ${accent}, ${primary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: { xs: 0.5, sm: 1 },
            m: 0,
          }}
        >
          🎁 กล่องพิเศษจากใจ 💚
        </Box>
        <Box
          component="p"
          sx={{
            ...DESIGN_SYSTEM.typography.body,
            color: 'rgba(226,232,240,0.8)',
            maxWidth: 520,
            mx: 'auto',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            mt: 1,
            m: 0,
          }}
        >
          ต้องผ่านชาเล้นพิเศษ ถึงจะเปิดได้ ✨
        </Box>
      </motion.div>

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
          px: 2,
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
              transition: 'transform 0.1s ease-out',
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
                boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${accent}66`,
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
                />
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
            <GiftMessage
              primaryColor={primary}
              accentColor={accent}
              isMobile={isMobile}
            />
          )}
        </AnimatePresence>
      </Box>

      {/* Info Box - Challenge Component */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 560,
          px: 2,
          mb: { xs: 4, sm: 6, md: 8 },
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {stage === 'tap' && (
            <GiftChallenge1
              tapCount={tapCount}
              primaryColor={primary}
              accentColor={accent}
            />
          )}

          {stage === 'quiz' && (
            <GiftChallenge2
              question={QUIZ_QUESTIONS[currentQuestionIndex].question}
              options={QUIZ_QUESTIONS[currentQuestionIndex].options}
              currentIndex={currentQuestionIndex}
              totalQuestions={QUIZ_QUESTIONS.length}
              onAnswer={handleQuizAnswer}
              error={codeError}
              primaryColor={primary}
              accentColor={accent}
            />
          )}

          {stage === 'code-lock' && (
            <GiftChallenge3
              codeInput={codeInput}
              onCodeChange={setCodeInput}
              onCodeSubmit={handleCodeSubmit}
              correctAnswers={correctAnswersCount}
              totalQuestions={QUIZ_QUESTIONS.length}
              error={codeError}
              primaryColor={primary}
              accentColor={accent}
            />
          )}

          {stage === 'ready' && (
            <Box
              sx={{
                ...DESIGN_SYSTEM.spacing.card,
                borderRadius: DESIGN_SYSTEM.borderRadius.card,
                background: DESIGN_SYSTEM.cardBg(accent),
                border: `2px solid ${accent}66`,
                boxShadow: DESIGN_SYSTEM.shadows.card,
                backdropFilter: 'blur(10px)',
              }}
            >
              <Box
                component="p"
                sx={{
                  ...DESIGN_SYSTEM.typography.label,
                  color: accent,
                  mb: 1,
                  m: 0,
                }}
              >
                ✨ ชาเล้นสุดท้าย · เปิดกล่อง
              </Box>
              <Box
                component="p"
                sx={{
                  ...DESIGN_SYSTEM.typography.body,
                  color: 'rgba(226,232,240,0.96)',
                  m: 0,
                }}
              >
                🎉 ยินดีด้วย! รหัสถูกแล้ว
                <br />
                ตอนนี้ลองแตะกล่องด้านบนได้เลย 💌
              </Box>
            </Box>
          )}

          {stage === 'completed' && !opened && (
            <Box
              sx={{
                ...DESIGN_SYSTEM.spacing.card,
                borderRadius: DESIGN_SYSTEM.borderRadius.card,
                background: DESIGN_SYSTEM.cardBg(accent),
                border: `2px solid ${accent}66`,
                boxShadow: DESIGN_SYSTEM.shadows.card,
                backdropFilter: 'blur(10px)',
              }}
            >
              <Box
                component="p"
                sx={{
                  ...DESIGN_SYSTEM.typography.label,
                  color: accent,
                  mb: 1,
                  m: 0,
                }}
              >
                💌 เปิดได้เสมอ
              </Box>
              <Box
                component="p"
                sx={{
                  ...DESIGN_SYSTEM.typography.body,
                  color: 'rgba(226,232,240,0.96)',
                  m: 0,
                }}
              >
                กล่องนี้อยู่กับนายตลอด
                <br />
                ถ้าอยากอ่านอีก แค่แตะกล่อง 💚
              </Box>
            </Box>
          )}
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
      {stage !== 'completed' && (
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
            {stage === 'tap' &&
              `✨ ชาเล้นที่ 1: แตะกล่องเบา ๆ อีก ${Math.max(0, 3 - tapCount)} ครั้ง 💚`}
            {stage === 'quiz' &&
              `✨ ชาเล้นที่ 2: ตอบคำถามให้ถูกทั้งหมด 🎯`}
            {stage === 'code-lock' &&
              `✨ ใส่รหัส (${correctAnswersCount}/${QUIZ_QUESTIONS.length} ✓)`}
            {stage === 'ready' &&
              `✨ ชาเล้นที่ 3: แตะกล่องอีกครั้งเพื่อเปิด 💌`}
          </Box>
        </motion.div>
      )}
    </Box>
  );
}
