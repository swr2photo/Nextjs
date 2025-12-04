'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
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
        {/* shimmer light */}
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

        {/* Header: icon + text */}
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
              sx={{ fontSize: { xs: 18, sm: 20 }, color: accentColor }}
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
              sx={{ fontSize: { xs: 16, sm: 18 }, color: '#fb7185' }}
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
              "ปีนี้ไม่มีของขวัญแพง ๆ ให้... มีแต่ &quot;ตัวเรา&quot; ที่จะคอยป่วนแชทจอมไปทุกปี... ห้ามเบื่อกันก่อนนะ!"
            </Box>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
