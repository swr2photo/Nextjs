'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { DESIGN_SYSTEM } from '../../theme/designSystem';

interface GiftMessageProps {
  primaryColor: string;
  accentColor: string;
  isMobile: boolean;
}

export default function GiftMessage({
  primaryColor,
  accentColor,
  isMobile,
}: GiftMessageProps) {
  return (
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
          background: DESIGN_SYSTEM.cardBg(accentColor),
          border: `2px solid ${accentColor}88`,
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
            background: `linear-gradient(90deg, transparent, ${accentColor}33, transparent)`,
            animation: 'shimmer 3s infinite',
            '@keyframes shimmer': {
              '0%': { left: '-100%' },
              '100%': { left: '100%' },
            },
            pointerEvents: 'none',
          }}
        />

        <Box
          component="p"
          sx={{
            ...DESIGN_SYSTEM.typography.label,
            color: accentColor,
            mb: 1.2,
            position: 'relative',
            zIndex: 1,
          }}
        >
          ✉️ จากใจของฉัน
        </Box>

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
          ขอบคุณที่เกิดมาในวันนี้ ขอบคุณที่ยอมให้เราได้อยู่ในชีวิตของนาย
          ต่อให้ตอนนี้เรายังเป็นแค่ "เพื่อนผู้ชาย" คนหนึ่ง แต่ในใจลึก ๆ…
        </Box>

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
            "ถ้าวันแรกของเธอกับฉัน เริ่มวันนี้เลยดีไหม 💚"
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
