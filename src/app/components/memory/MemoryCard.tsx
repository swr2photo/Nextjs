'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';
import type { MemoryImage } from './MemoryGallery';

interface MemoryCardProps {
  memory: MemoryImage;
  isActive: boolean;
  isVideoMemory: boolean;
  appleGlassStyle: (accent: string) => Record<string, any>;
  primaryAccent: string;
  primaryColor: string;
  displayUrl: string;
  blurAmount: number;
  scale: number;
  opacity: number;
  x: number;
  z: number;
  rotateY: number;
  cardSize: number;
}

const shimmerKeyframes = `
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
`;

export const MemoryCard: React.FC<MemoryCardProps> = ({
  memory: m,
  isActive,
  isVideoMemory,
  appleGlassStyle,
  primaryAccent,
  primaryColor,
  displayUrl,
  blurAmount,
  scale,
  opacity,
  x,
  z,
  rotateY,
  cardSize,
}) => {
  const snippet = m.text.length > 80 ? `${m.text.slice(0, 80)}…` : m.text;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        x,
        z,
        rotateY,
        scale,
        opacity,
        filter: `blur(${blurAmount}px)`,
      }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 15,
        mass: 1,
      }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: cardSize,
        height: 340,
        translateX: '-50%',
        translateY: '-50%',
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      } as React.CSSProperties}
    >
      <style>{shimmerKeyframes}</style>

      <Box
        sx={{
          width: '100%',
          height: '100%',
          background: isActive 
            ? 'rgba(255, 255, 255, 0.18)' 
            : 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid rgba(255, 255, 255, ${isActive ? 0.25 : 0.1})`,
          boxShadow: isActive
            ? `
                inset 0 0 40px rgba(255, 255, 255, 0.15),
                0 0 40px ${primaryAccent}55,
                0 0 80px ${primaryAccent}33
              `
            : `
                inset 0 0 20px rgba(255, 255, 255, 0.05),
                0 0 20px rgba(0, 0, 0, 0.3)
              `,
          borderRadius: '24px',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'all .3s ease',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: isActive
              ? 'linear-gradient(180deg, rgba(255,255,255,0.25), transparent)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.08), transparent)',
            pointerEvents: 'none',
            zIndex: 10,
            borderRadius: '24px',
          },
          '&:hover': {
            background: isActive
              ? 'rgba(255, 255, 255, 0.22)'
              : 'rgba(255, 255, 255, 0.1)',
            boxShadow: isActive
              ? `
                  inset 0 0 50px rgba(255, 255, 255, 0.2),
                  0 0 60px ${primaryAccent}77
                `
              : `
                  inset 0 0 30px rgba(255, 255, 255, 0.08),
                  0 0 30px ${primaryAccent}33
                `,
          },
        }}
      >
        {/* Image Container */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 170,
            flexShrink: 0,
            overflow: 'hidden',
            borderRadius: '20px 20px 0 0',
            opacity: isActive ? 1 : 0.85,
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
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: isActive
                  ? 'saturate(1.15) brightness(1.1)'
                  : 'saturate(0.9) brightness(0.95)',
              }}
            />
          ) : (
            <Image
              src={displayUrl}
              alt={m.caption}
              fill
              style={{
                objectFit: 'cover',
                filter: isActive
                  ? 'saturate(1.15) brightness(1.1)'
                  : 'saturate(0.9) brightness(0.95)',
              }}
              sizes="(max-width: 600px) 220px, 260px"
              priority={isActive}
            />
          )}

          {/* Liquid Light Reflection */}
          {isActive && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: 'shimmer 3s infinite',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Timestamp Badge */}
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              px: 1.5,
              py: 0.5,
              borderRadius: '50px',
              fontSize: 11,
              fontWeight: 700,
              color: '#fff',
              background: isActive
                ? `linear-gradient(135deg, ${primaryColor}dd, ${primaryAccent}dd)`
                : `linear-gradient(135deg, ${primaryColor}99, ${primaryAccent}99)`,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
            }}
          >
            {m.timestamp}
          </Box>
        </Box>

        {/* Content */}
        <Box
          sx={{
            p: 2.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            flex: 1,
            opacity: isActive ? 1 : 0.8,
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 800,
              color: '#fff',
              background: `linear-gradient(135deg, #fff, ${primaryAccent}ee)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {m.title}
          </Typography>
          <Typography
            sx={{
              fontSize: 11.5,
              opacity: isActive ? 0.95 : 0.85,
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.95)',
            }}
          >
            {snippet}
          </Typography>
          <Typography
            sx={{
              fontSize: 11,
              mt: 'auto',
              opacity: isActive ? 0.85 : 0.7,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            {m.caption}
          </Typography>
        </Box>

        {/* Glow Bottom Border */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, transparent, ${primaryAccent}, transparent)`,
            opacity: isActive ? 1 : 0.4,
          }}
        />
      </Box>
    </motion.div>
  );
};

export default MemoryCard;
