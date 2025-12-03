'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';

interface StoryHeaderProps {
  chapter: number;
  title: string;
  story: string;
  primaryColor: string;
  accentColor: string;
}

export default function StoryHeader({
  chapter,
  title,
  story,
  primaryColor,
  accentColor,
}: StoryHeaderProps) {
  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${primaryColor}40, ${accentColor}40)`,
        p: { xs: 3, md: 4 },
        borderBottom: `2px solid ${primaryColor}`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Box
          sx={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: primaryColor,
            mb: 2,
            letterSpacing: '1px',
          }}
        >
          บท {chapter}
        </Box>

        <Box
          component="h2"
          sx={{
            fontSize: { xs: '1.5rem', md: '2.2rem' },
            fontWeight: 800,
            color: '#fff',
            mb: 3,
            margin: 0,
          }}
        >
          {title}
        </Box>

        <Box
          sx={{
            fontSize: { xs: '0.95rem', md: '1rem' },
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.8,
            fontStyle: 'italic',
          }}
        >
          "{story}"
        </Box>
      </motion.div>
    </Box>
  );
}
