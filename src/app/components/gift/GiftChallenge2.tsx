'use client';

import { Box, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { DESIGN_SYSTEM } from '../../theme/designSystem';

interface GiftChallenge2Props {
  question: string;
  options: string[];
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (option: number) => void;
  error: string;
  primaryColor: string;
  accentColor: string;
}

export default function GiftChallenge2({
  question,
  options,
  currentIndex,
  totalQuestions,
  onAnswer,
  error,
  primaryColor,
  accentColor,
}: GiftChallenge2Props) {
  const [shake, setShake] = useState(false);

  const handleAnswer = (idx: number) => {
    onAnswer(idx);
  };

  return (
    <Box
      sx={{
        ...DESIGN_SYSTEM.spacing.card,
        borderRadius: DESIGN_SYSTEM.borderRadius.card,
        background: DESIGN_SYSTEM.cardBg(accentColor),
        border: `2px solid ${accentColor}66`,
        boxShadow: DESIGN_SYSTEM.shadows.card,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box
        component="p"
        sx={{
          ...DESIGN_SYSTEM.typography.label,
          color: accentColor,
          mb: 0.8,
        }}
      >
        🎯 ชาเล้นที่ 2 · ตอบคำถาม{' '}
        <span style={{ opacity: 0.7 }}>
          ({currentIndex + 1}/{totalQuestions})
        </span>
      </Box>

      <motion.div
        animate={shake ? { x: [-8, 8, -6, 6, 0] } : {}}
        transition={{ duration: 0.4 }}
        onAnimationComplete={() => setShake(false)}
      >
        <Box
          component="p"
          sx={{
            ...DESIGN_SYSTEM.typography.body,
            mb: 1.5,
            color: 'rgba(226,232,240,0.98)',
          }}
        >
          {question}
        </Box>
      </motion.div>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: { xs: 0.8, sm: 1, md: 1.2 },
        }}
      >
        {options.map((option, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleAnswer(idx)}
              sx={{
                borderRadius: DESIGN_SYSTEM.borderRadius.card,
                borderColor: `${accentColor}44`,
                color: 'rgba(226,232,240,0.9)',
                textTransform: 'none',
                ...DESIGN_SYSTEM.typography.bodySmall,
                ...DESIGN_SYSTEM.spacing.button,
                transition: DESIGN_SYSTEM.transitions.normal,
                '&:hover': {
                  borderColor: `${accentColor}77`,
                  backgroundColor: `${accentColor}11`,
                },
              }}
            >
              {option}
            </Button>
          </motion.div>
        ))}
      </Box>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Box
              component="p"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                mt: 1.2,
                color: '#fb7185',
                fontWeight: 600,
              }}
            >
              {error}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
