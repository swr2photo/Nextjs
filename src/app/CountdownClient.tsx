'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import HomeClient from './HomeClient';

interface CountdownClientProps {
  birthdayTarget: Date;
}

function getTimeParts(totalSeconds: number) {
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

// ✅ ส่งกลับเฉพาะเวลาที่ > 0
function getDisplayTimeParts(totalSeconds: number) {
  const { days, hours, minutes, seconds } = getTimeParts(totalSeconds);
  
  return [
    { label: 'วัน', value: days },
    { label: 'ชั่วโมง', value: hours },
    { label: 'นาที', value: minutes },
    { label: 'วินาที', value: seconds },
  ].filter(part => part.value > 0);
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <motion.div
      key={`${label}-${value}`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.4 }}
      layout
    >
      <Box
        sx={{
          minWidth: 76,
          px: 2,
          py: 1.5,
          borderRadius: 3,
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.16)',
        }}
      >
        <motion.div
          key={`value-${value}`}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Typography
            sx={{
              fontSize: '1.8rem',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
            }}
          >
            {value.toString().padStart(2, '0')}
          </Typography>
        </motion.div>
        <Typography
          sx={{
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          {label}
        </Typography>
      </Box>
    </motion.div>
  );
}

export default function CountdownClient({
  birthdayTarget,
}: CountdownClientProps) {
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const [showApp, setShowApp] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const targetTime = birthdayTarget.getTime();

    const tick = () => {
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        setRemainingMs(0);
        setShowApp(true);
        return;
      }
      setRemainingMs(diff);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [birthdayTarget]);

  if (showApp) {
    return <HomeClient />;
  }

  if (!isMounted || remainingMs === null) {
    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        sx={{
          minHeight: '100vh',
          width: '100%',
          background:
            'linear-gradient(135deg, #022c22 0%, #064e3b 40%, #020617 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontFamily: 'var(--font-noto-sans-thai), system-ui, sans-serif',
        }}
      >
        กำลังเตรียมเซอร์ไพรส์ให้แป๊บนะ 💚
      </Box>
    );
  }

  const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
  const isLastFive = remainingSeconds <= 5;
  const displayParts = getDisplayTimeParts(remainingSeconds);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        minHeight: '100vh',
        width: '100%',
        background:
          'linear-gradient(135deg, #022c22 0%, #064e3b 40%, #020617 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-noto-sans-thai), system-ui, sans-serif',
      }}
    >
      {/* Glow circle */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0.7 }}
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(34,197,94,0.5) 0%, transparent 70%)',
          filter: 'blur(40px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.2, y: 0 }}
          animate={{ opacity: [0.2, 0.8, 0.2], y: [-10, 10, -10] }}
          transition={{
            duration: 4 + i * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.7)',
              boxShadow: '0 0 10px rgba(255,255,255,0.6)',
            }}
          />
        </motion.div>
      ))}

      {/* Main countdown box */}
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 700,
          width: '90%',
        }}
      >
        <Box
          sx={{
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 6 },
            borderRadius: 5,
            background: 'rgba(0,0,0,0.45)',
            border: '1px solid rgba(34,197,94,0.45)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(18px)',
            textAlign: 'center',
          }}
        >
          <Typography
            component={motion.p}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            sx={{
              fontSize: '0.9rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              mb: 1,
            }}
          >
            BIRTHDAY COUNTDOWN
          </Typography>

          <Typography
            component={motion.h1}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            sx={{
              fontSize: { xs: '1.6rem', md: '2.2rem' },
              fontWeight: 800,
              background:
                'linear-gradient(135deg, #22c55e 0%, #10b981 40%, #ffffff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            นับถอยหลังวันเกิดวัวที่ไหนไม่รู้ 
          </Typography>

          {!isLastFive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  color: 'rgba(255,255,255,0.82)',
                  mb: 3,
                }}
              >
                ทุก ๆ วินาทีที่ไหลไป คืออีกหนึ่งก้าวที่เข้าใกล้วันสำคัญของใครไม่รู้ อิอิ
                <br />
                ขอให้วันที่กำลังจะมาถึง เต็มไปด้วยรอยยิ้มและความรู้สึกดี ๆ นะ 
              </Typography>

              {/* ✅ TimeBox - Responsive wrap หากหลายค่า */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: { xs: 1.5, md: 2.5 },
                  flexWrap: 'wrap',
                  mb: 3,
                }}
              >
                <AnimatePresence mode="popLayout">
                  {displayParts.map(part => (
                    <TimeBox key={part.label} label={part.label} value={part.value} />
                  ))}
                </AnimatePresence>
              </Box>

            </motion.div>
          )}

          {isLastFive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  color: 'rgba(255,255,255,0.8)',
                  mb: 2,
                }}
              >
                อีกไม่กี่วินาที… ทุกอย่างที่เตรียมไว้ให้เธอจะเริ่มต้นขึ้นแล้ว 💫
              </Typography>

              <motion.div
                key={remainingSeconds}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '4rem', md: '5rem' },
                    fontWeight: 900,
                    mb: 1,
                    lineHeight: 1,
                    background:
                      'linear-gradient(135deg, #22c55e 0%, #10b981 50%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 22px rgba(0,0,0,0.6)',
                  }}
                >
                  {remainingSeconds}
                </Typography>
              </motion.div>

              <Typography
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  color: 'rgba(255,255,255,0.9)',
                  mb: 3,
                  fontWeight: 600,
                }}
              >
                พร้อมมั้ยๆ ที่จะให้พาเข้าไปในอะไรสักอย่าง 💚
              </Typography>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97, y: 0 }}
              >
                <Button
                  onClick={() => setShowApp(true)}
                  variant="contained"
                  sx={{
                    px: 5,
                    py: 1.3,
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: '1rem',
                    textTransform: 'none',
                    background:
                      'linear-gradient(135deg, #22c55e, #10b981)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                    '&:hover': {
                      boxShadow: '0 16px 40px rgba(0,0,0,0.75)',
                    },
                  }}
                >
                  เริ่มเลย 💫
                </Button>
              </motion.div>

              <Typography
                sx={{
                  mt: 1.5,
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                (ถ้าจอมไม่กด เดี๋ยวเวลาเป็นศูนย์ มันบังคับให้กดเองแหละ 😆)
              </Typography>
            </motion.div>
          )}
        </Box>
      </motion.div>
    </Box>
  );
}
