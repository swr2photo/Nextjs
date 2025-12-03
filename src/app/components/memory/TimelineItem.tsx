'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';
import type { MemoryImage } from './MemoryGallery';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import MovieRoundedIcon from '@mui/icons-material/MovieRounded';
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';

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
  const smallSnippet =
    m.text.length > 50 ? `${m.text.slice(0, 50)}…` : m.text;

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
        {/* จุดบนเส้น Timeline */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: '-26px', md: '-32px' },
            top: 18,
            zIndex: 2,
          }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <Box
              sx={{
                width: { xs: 13, md: 14 },
                height: { xs: 13, md: 14 },
                borderRadius: '50%',
                background: `linear-gradient(135deg, #ffffff, ${primaryAccent})`,
                boxShadow: `0 0 16px ${primaryAccent}cc`,
                border: '2px solid rgba(15,23,42,0.9)',
              }}
            />
          </motion.div>
        </Box>

        {/* Card หลักของ Timeline Item */}
        <Box
          sx={{
            borderRadius: { xs: 2, md: 3 },
            ...appleGlassStyle(primaryAccent),
            p: { xs: 1.1, md: 1.4 },
            display: 'flex',
            gap: { xs: 0.8, md: 1.2 },
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          {/* Thumbnail */}
          <Box
            sx={{
              width: { xs: 40, md: 44 },
              height: { xs: 40, md: 44 },
              borderRadius: '999px',
              overflow: 'hidden',
              flexShrink: 0,
              border: '1px solid rgba(255, 255, 255, 0.35)',
              background: 'rgba(15,23,42,0.7)',
              position: 'relative',
            }}
          >
            {isVideoMemory ? (
              <>
                <Box
                  component="video"
                  src={displayUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* icon movie overlay เล็ก ๆ */}
                <Box
                  sx={{
                    position: 'absolute',
                    right: 2,
                    bottom: 2,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MovieRoundedIcon
                    sx={{ fontSize: 12, color: primaryAccent }}
                  />
                </Box>
              </>
            ) : (
              <>
                <Image
                  src={displayUrl}
                  alt={m.caption}
                  width={44}
                  height={44}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* icon photo overlay เล็ก ๆ */}
                <Box
                  sx={{
                    position: 'absolute',
                    right: 2,
                    bottom: 2,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PhotoRoundedIcon
                    sx={{ fontSize: 12, color: primaryAccent }}
                  />
                </Box>
              </>
            )}
          </Box>

          {/* Text ขวา */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* timestamp */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                mb: 0.2,
              }}
            >
              <AccessTimeRoundedIcon
                sx={{
                  fontSize: { xs: 11, md: 12 },
                  color: 'rgba(255,255,255,0.7)',
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: '0.65rem', md: '0.75rem' },
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  opacity: 0.7,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.85)',
                  whiteSpace: 'nowrap',
                }}
              >
                {m.timestamp ?? 'MOment'}
              </Typography>
            </Box>

            {/* caption */}
            <Typography
              sx={{
                fontSize: { xs: '0.82rem', md: '0.9rem' },
                fontWeight: 700,
                mb: 0.2,
                color: '#ffffff',
                lineHeight: 1.4,
              }}
            >
              {m.caption}
            </Typography>

            {/* snippet */}
            <Typography
              sx={{
                fontSize: { xs: '0.75rem', md: '0.82rem' },
                lineHeight: { xs: 1.5, md: 1.6 },
                opacity: 0.9,
                color: 'rgba(255,255,255,0.92)',
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
