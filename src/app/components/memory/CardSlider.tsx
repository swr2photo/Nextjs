'use client';

import { Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import type React from 'react';
import MemoryCard from './MemoryCard';

// ← ย้ายมาจากที่เดิม
export interface MemoryImage {
  id: string;
  url: string;
  caption: string;
  title: string;
  text: string;
  timestamp: string;
  showAt: number;
  hiddenAt: number;
  shape?: 'heart' | 'star' | 'bubble' | 'diamond' | 'circle' | 'square';
  layout?: 'left' | 'center' | 'right' | 'full';
  variant?: 'polaroid' | 'card' | 'banner' | 'frame';
  bgGradient?: string;
  accentEmoji?: string;
  animationPreset?: 'slideIn' | 'fadeIn' | 'scaleIn' | 'rotateIn';
  isVideo?: boolean;
}

const heicFallback = (url: string) =>
  /\.heic$/i.test(url) ? url.replace(/\.heic$/i, '.jpg') : url;

interface CardSliderProps {
  items: MemoryImage[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  primaryColor: string;
  primaryAccent: string;
  disabled?: boolean;
  appleGlassStyle: (accent: string) => Record<string, any>;
  isVideoMemory: (m: MemoryImage) => boolean;
}

export const CardSlider: React.FC<CardSliderProps> = ({
  items,
  activeIndex,
  onPrev,
  onNext,
  primaryColor,
  primaryAccent,
  disabled = false,
  appleGlassStyle,
  isVideoMemory,
}) => {
  const radius = 280;
  const cardSize = 220;
  const total = items.length;

  const shimmerKeyframes = `
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
  `;

  return (
    <Box
      id="memory-section"
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 500, md: 600 },
        overflow: 'visible',
        perspective: '1500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{shimmerKeyframes}</style>

      {/* ปุ่ม Prev */}
      <IconButton
        onClick={onPrev}
        disabled={disabled}
        sx={{
          position: 'absolute',
          top: '50%',
          left: { xs: 8, md: 16 },
          transform: 'translateY(-50%)',
          zIndex: 50,
          width: { xs: 40, md: 52 },
          height: { xs: 40, md: 52 },
          color: '#fff',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          border: `1px solid rgba(255, 255, 255, 0.2)`,
          '&:hover': { background: 'rgba(255, 255, 255, 0.15)' },
          '&:disabled': { opacity: 0.4, cursor: 'not-allowed' },
        }}
        aria-label="previous"
      >
        <ChevronLeftRoundedIcon fontSize="large" />
      </IconButton>

      {/* ปุ่ม Next */}
      <IconButton
        onClick={onNext}
        disabled={disabled}
        sx={{
          position: 'absolute',
          top: '50%',
          right: { xs: 8, md: 16 },
          transform: 'translateY(-50%)',
          zIndex: 50,
          width: { xs: 40, md: 52 },
          height: { xs: 40, md: 52 },
          color: '#fff',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          border: `1px solid rgba(255, 255, 255, 0.2)`,
          '&:hover': { background: 'rgba(255, 255, 255, 0.15)' },
          '&:disabled': { opacity: 0.4, cursor: 'not-allowed' },
        }}
        aria-label="next"
      >
        <ChevronRightRoundedIcon fontSize="large" />
      </IconButton>

      {/* Center Circle Light */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${primaryAccent}22, transparent 70%)`,
          filter: 'blur(60px)',
          zIndex: 1,
        }}
      />

      {/* Container 3D */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          pointerEvents: disabled ? 'none' : 'auto',
        }}
      >
        {items.map((m, idx) => {
          const angle = ((idx - activeIndex) * (360 / total)) * (Math.PI / 180);
          const radius3d = radius;

          const x = Math.sin(angle) * radius3d;
          const z = Math.cos(angle) * radius3d;
          const rotateY = ((idx - activeIndex) * (360 / total)) % 360;

          const distance = Math.abs(Math.cos(angle));
          const isActive = idx === activeIndex;
          const scale = isActive ? 1 : 0.6 + distance * 0.3;
          const opacity = isActive ? 1 : 0.15 + distance * 0.3;
          const blurAmount = isActive ? 0 : 3 + (1 - distance) * 8;

          const displayUrl = heicFallback(m.url);

          return (
            <MemoryCard
              key={m.id}
              memory={m}
              isActive={isActive}
              isVideoMemory={isVideoMemory(m)}
              appleGlassStyle={appleGlassStyle}
              primaryAccent={primaryAccent}
              primaryColor={primaryColor}
              displayUrl={displayUrl}
              blurAmount={blurAmount}
              scale={scale}
              opacity={opacity}
              x={x}
              z={z}
              rotateY={rotateY}
              cardSize={cardSize}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default CardSlider;
