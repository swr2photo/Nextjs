'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface BirthdayCardProps {
  name: string;
  color: string;
  accentColor: string;
  onCardEnd?: () => void;
}

export default function BirthdayCard({
  name,
  color,
  accentColor,
  onCardEnd,
}: BirthdayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{
        duration: 1,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      onAnimationComplete={() => {
        setTimeout(() => {
          onCardEnd?.();
        }, 3000);
      }}
      style={{
        width: '100%',
        maxWidth: '700px',
        perspective: '1200px',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: '600px',
          borderRadius: { xs: 3, sm: 4, md: 5 },
          background: `linear-gradient(135deg, ${color}22, ${accentColor}22)`,
          border: `3px solid ${accentColor}`,
          boxShadow: `
            0 40px 100px rgba(0,0,0,0.8),
            0 0 60px ${accentColor}66,
            inset 0 1px 3px rgba(255,255,255,0.15)
          `,
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 2.5, sm: 3.5, md: 4.5 },
          py: { xs: 3, sm: 4, md: 6 },
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: '3rem',
          }}
        >
          🎂
        </motion.div>

        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.2,
          }}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            fontSize: '3rem',
          }}
        >
          🎉
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            fontSize: '2.5rem',
          }}
        >
          💚
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.3,
          }}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            fontSize: '2.5rem',
          }}
        >
          ✨
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
          style={{ zIndex: 10, position: 'relative' }}
        >
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 900,
              background: `linear-gradient(135deg, ${accentColor}, ${color})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 2,
              letterSpacing: '-0.02em',
            }}
          >
            Happy Birthday
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 800,
              color: accentColor,
              mb: 3,
            }}
          >
            {name}
          </Typography>

          <Box
            sx={{
              py: { xs: 2, sm: 2.5, md: 3 },
              px: { xs: 1.5, sm: 2, md: 3 },
              borderLeft: `4px solid ${accentColor}`,
              borderRadius: 1,
              background: `rgba(255,255,255,0.05)`,
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
                lineHeight: 2,
                color: 'rgba(226,232,240,0.98)',
                fontWeight: 500,
              }}
            >
              ขอให้ปีนี้เต็มไปด้วยความสุข ความรัก และสิ่งที่ดีงาม
              <br />
              <br />
              อยากให้วันนี้เป็นวันที่นายจำได้นาน ๆ
              <br />
              เพราะมันคือวันพิเศษของคนพิเศษ 💚
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.35rem' },
              fontStyle: 'italic',
              color: accentColor,
              fontWeight: 700,
              mt: 3,
            }}
          >
            "ถ้าวันแรกของเธอกับฉัน เริ่มวันนี้เลยดีไหม 💌"
          </Typography>
        </motion.div>
      </Box>
    </motion.div>
  );
}
