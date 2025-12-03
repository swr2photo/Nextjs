// src/app/components/hooks/useFireworks.ts

import { useCallback } from 'react';
import confetti from 'canvas-confetti';

export const useFireworks = () => {
  const trigger = useCallback((origin: { x: number; y: number } = { x: 0.5, y: 0.3 }) => {
    // Fireworks 1
    confetti({
      particleCount: 100,
      spread: 70,
      origin,
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa502', '#ff6b9d'],
    });

    // Fireworks 2
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { x: origin.x + 0.1, y: origin.y - 0.1 },
        colors: ['#ffd700', '#ff69b4', '#00bfff'],
      });
    }, 300);

    // Fireworks 3
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { x: origin.x - 0.1, y: origin.y },
        colors: ['#ff1493', '#00ff00', '#ff8c00'],
      });
    }, 600);
  }, []);

  return { trigger };
};
