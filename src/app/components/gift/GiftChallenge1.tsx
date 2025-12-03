'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { DESIGN_SYSTEM } from '../../theme/designSystem';

interface GiftChallenge1Props {
  tapCount: number;
  primaryColor: string;
  accentColor: string;
}

export default function GiftChallenge1({
  tapCount,
  primaryColor,
  accentColor,
}: GiftChallenge1Props) {
  return (
    <Box
      sx={{
        ...DESIGN_SYSTEM.spacing.card,
        borderRadius: DESIGN_SYSTEM.borderRadius.card,
        background: DESIGN_SYSTEM.cardBg(accentColor),
        border: `2px solid ${accentColor}66`,
        boxShadow: DESIGN_SYSTEM.shadows.card,
        backdropFilter: 'blur(10px)',
        minHeight: 160,
      }}
    >
      <Box
        component="p"
        sx={{
          ...DESIGN_SYSTEM.typography.label,
          color: accentColor,
          mb: 1,
        }}
      >
        🎮 ชาเล้นที่ 1 · เติมหัวใจให้เต็ม
      </Box>

      <Box
        component="p"
        sx={{
          ...DESIGN_SYSTEM.typography.body,
          mb: 1.2,
          color: 'rgba(226,232,240,0.96)',
        }}
      >
        ลองแตะกล่องด้านบนเบา ๆ 3 ครั้ง 💚
      </Box>

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
                    ? accentColor
                    : 'rgba(148,163,184,0.5)',
                filter:
                  i < tapCount
                    ? `drop-shadow(0 0 12px ${accentColor}99)`
                    : 'none',
                transition: DESIGN_SYSTEM.transitions.normal,
              }}
            />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
