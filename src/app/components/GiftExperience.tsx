'use client';

import { Box } from '@mui/material';
import { useState, useRef, useEffect } from 'react'; // ✅ Import hooks ที่นี่
import type { MemoryImage } from './memory/CardSlider';
import MemoryGallery from './memory/MemoryGallery';
import GiftBox from './GiftBox3D';
import Cake3D from './Cake3D';
import BirthdayCard from './BirthdayCard';
import { useThemeContext, colorThemes } from '../providers';

interface GiftExperienceProps {
  memoriesData?: MemoryImage[];
  musicUrl?: string;
  endVideoUrl?: string;
  endImageUrl?: string;
  personName?: string;
  personAge?: number;
  personBirthDate?: string; // DDMMYYYY
}

export default function GiftExperience({
  memoriesData,
  musicUrl,
  endVideoUrl,
  endImageUrl,
  personName = 'จอม',
  personAge = 22,
  personBirthDate = '05122005',
}: GiftExperienceProps) {
  const { currentTheme } = useThemeContext();
  const themeColors = colorThemes[currentTheme ?? 'emerald'];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const giftRef = useRef<HTMLDivElement | null>(null);
  const cakeRef = useRef<HTMLDivElement | null>(null);

  // ✅ State for flow
  const [currentStage, setCurrentStage] = useState<
    'cake' | 'card' | 'gift' | 'memory'
  >('cake');

  const handleScrollToGift = () => {
    if (typeof window === 'undefined') return;
    const target = giftRef.current;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const offset = window.scrollY + rect.top - 80;

    window.scrollTo({
      top: offset,
      behavior: 'smooth',
    });
  };

  const handleCakeBlown = () => {
    setCurrentStage('card');
  };

  const handleCardEnd = () => {
    setCurrentStage('gift');
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        m: 0,
        p: 0,
        boxSizing: 'border-box',
      }}
    >
      {/* Stage 1: Cake */}
      {currentStage === 'cake' && (
        <Cake3D
          name={personName}
          age={personAge}
          color={themeColors.primary}
          accentColor={themeColors.accent}
          onBlowCandles={handleCakeBlown}
        />
      )}

      {/* Stage 2: Birthday Card */}
      {currentStage === 'card' && (
        <Box
          sx={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'linear-gradient(135deg, #0f172a 0%, #0c0f1b 50%, #1a0f2e 100%)',
            position: 'relative',
            overflow: 'hidden',
            py: { xs: 8, md: 4 },
            px: 2,
          }}
        >
          <BirthdayCard
            name={personName}
            color={themeColors.primary}
            accentColor={themeColors.accent}
            onCardEnd={handleCardEnd}
          />
        </Box>
      )}

      {/* Stage 3: Gift Box */}
      {currentStage === 'gift' && (
        <Box
          ref={giftRef}
          sx={{
            width: '100%',
            minHeight: '100vh',
            position: 'relative',
          }}
        >
          <GiftBox
            color={themeColors.primary}
            accentColor={themeColors.accent}
            onOpenGift={() => setCurrentStage('memory')}
          />
        </Box>
      )}

      {/* Stage 4: Memory Gallery */}
      {currentStage === 'memory' && (
        <Box
          component="section"
          sx={{
            width: '100%',
            minHeight: '100vh',
            p: 0,
            m: 0,
          }}
        >
          <MemoryGallery
            memories={memoriesData}
            color={themeColors.primary}
            accentColor={themeColors.accent}
            onGoToGift={handleScrollToGift}
          />
        </Box>
      )}
    </Box>
  );
}
