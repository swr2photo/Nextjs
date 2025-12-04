'use client';

import { Box, Button, TextField, Stack } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DESIGN_SYSTEM } from '../../theme/designSystem';

interface GiftChallenge3Props {
  codeInput: string;
  onCodeChange: (value: string) => void;
  onCodeSubmit: () => void;
  correctAnswers: number;
  totalQuestions: number;
  error: string;
  primaryColor: string;
  accentColor: string;
}

export default function GiftChallenge3({
  codeInput,
  onCodeChange,
  onCodeSubmit,
  correctAnswers,
  totalQuestions,
  error,
  primaryColor,
  accentColor,
}: GiftChallenge3Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && codeInput.length === 8) {
      onCodeSubmit();
    }
  };

  // ให้รับเฉพาะตัวเลข + ความยาวไม่เกิน 8
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 8);
    onCodeChange(onlyDigits);
  };

  const isValid = codeInput.length === 8;

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
      {/* Title + Icon */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ mb: 1 }}
      >
        <LockOutlinedIcon
          sx={{ color: accentColor, fontSize: { xs: 18, sm: 20, md: 22 } }}
        />
        <Box
          component="p"
          sx={{
            ...DESIGN_SYSTEM.typography.label,
            color: accentColor,
            mb: 0,
          }}
        >
          ชาเล้นที่ 3 · ใส่รหัสปลดล็อก
        </Box>
      </Stack>

      {/* Hint */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ mb: 1.5 }}
      >
        <CalendarMonthIcon
          sx={{ color: 'rgba(226,232,240,0.9)', fontSize: { xs: 18, sm: 20 } }}
        />
        <Box
          component="p"
          sx={{
            ...DESIGN_SYSTEM.typography.bodySmall,
            mb: 0,
            color: 'rgba(226,232,240,0.95)',
          }}
        >
          ใบ้: วันเกิดของผู้ชายคนนี้ (DDMMYYYY)
        </Box>
      </Stack>

      {/* Input (numeric keypad ทุกอุปกรณ์) */}
      <motion.div
        animate={error ? { x: [-6, 6, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <TextField
          fullWidth
          // สำคัญ: ใช้ type="tel" + inputMode="numeric" ให้เด้งแป้นเลขบนมือถือ
          type="tel"
          placeholder="ใส่รหัส 8 ตัวเลข"
          value={codeInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            maxLength: 8,
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
                borderColor: `${accentColor}44`,
              },
              '&:hover fieldset': {
                borderColor: `${accentColor}77`,
              },
              '&.Mui-focused fieldset': {
                borderColor: accentColor,
                boxShadow: `0 0 16px ${accentColor}44`,
              },
            },
            '& .MuiOutlinedInput-input': {
              textAlign: 'center',
            },
          }}
        />
      </motion.div>

      {/* Submit button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={onCodeSubmit}
          disabled={!isValid}
          sx={{
            borderRadius: DESIGN_SYSTEM.borderRadius.button,
            background: isValid
              ? `linear-gradient(135deg, ${primaryColor}, ${accentColor})`
              : 'rgba(148,163,184,0.2)',
            textTransform: 'none',
            ...DESIGN_SYSTEM.typography.bodySmall,
            ...DESIGN_SYSTEM.spacing.button,
            fontWeight: 800,
            boxShadow: isValid
              ? DESIGN_SYSTEM.shadows.button(accentColor)
              : 'none',
            transition: DESIGN_SYSTEM.transitions.normal,
            '&:hover:not(:disabled)': {
              boxShadow: DESIGN_SYSTEM.shadows.buttonHover(accentColor),
              transform: 'translateY(-2px)',
            },
            '&:disabled': {
              cursor: 'not-allowed',
            },
          }}
        >
          {isValid ? '✓ ยืนยัน' : 'ใส่รหัส 8 ตัว'}
        </Button>
      </motion.div>

      {/* Error message */}
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
                textAlign: 'center',
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
