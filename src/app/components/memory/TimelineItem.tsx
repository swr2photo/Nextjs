'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';
import type { MemoryImage } from './MemoryGallery';

interface TimelineItemProps {
  memory: MemoryImage;
  isVideoMemory: boolean;
  appleGlassStyle: (accent: string) => Record<string, any>;
  primaryAccent: string;
  displayUrl: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  memory: m,
  isVideoMemory,
  appleGlassStyle,
  primaryAccent,
  displayUrl,
}) => {
  const smallSnippet = m.text.length > 50 ? `${m.text.slice(0, 50)}…` : m.text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          position: 'relative',
          gap: { xs: 1, md: 1.2 },
        }}
      >
        {/* Dot */}
        <Box sx={{ position: 'absolute', left: { xs: '-26px', md: '-32px' }, top: '16px', zIndex: 2 }}>
          <motion.div animate={{ scale: 1.5 }} transition={{ duration: 0.25 }}>
            <Box
              sx={{
                width: { xs: 13, md: 13 },
                height: { xs: 13, md: 13 },
                borderRadius: '50%',
                background: `linear-gradient(135deg, #fff, ${primaryAccent})`,
                boxShadow: `0 0 15px ${primaryAccent}cc`,
              }}
            />
          </motion.div>
        </Box>

        {/* Card */}
        <Box
          sx={{
            borderRadius: { xs: 2, md: 3 },
            ...appleGlassStyle(primaryAccent),
            p: { xs: 1, md: 1.4 },
            display: 'flex',
            gap: { xs: 0.8, md: 1.2 },
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: { xs: 36, md: 40 },
              height: { xs: 36, md: 40 },
              borderRadius: '999px',
              overflow: 'hidden',
              flexShrink: 0,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            {isVideoMemory ? (
              <Box
                component="video"
                src={displayUrl}
                autoPlay
                muted
                loop
                playsInline
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Image
                src={displayUrl}
                alt={m.caption}
                width={40}
                height={40}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: { xs: '0.65rem', md: '0.75rem' },
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                opacity: 0.7,
                mb: 0.2,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              {m.timestamp ?? 'โมเมนต์'}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.82rem', md: '0.9rem' },
                fontWeight: 700,
                mb: 0.2,
                color: '#fff',
              }}
            >
              {m.caption}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.75rem', md: '0.82rem' },
                lineHeight: { xs: 1.5, md: 1.6 },
                opacity: 0.85,
                color: 'rgba(255,255,255,0.9)',
              }}
            >
              {smallSnippet}
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default TimelineItem;
