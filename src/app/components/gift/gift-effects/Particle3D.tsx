'use client';

import { motion } from 'framer-motion';

interface Particle3DProps {
  delay: number;
  angle: number;
  distance: number;
  color: string;
}

export default function Particle3D({
  delay,
  angle,
  distance,
  color,
}: Particle3DProps) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * distance;
  const y = Math.sin(rad) * distance * -1;
  const z = (Math.random() - 0.5) * 200;

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0, z: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 1, 0],
        x,
        y,
        z,
        scale: [0.5, 1.2, 0.3],
        rotateX: [0, 360],
        rotateY: [0, 180],
      }}
      transition={{ delay, duration: 2, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}, ${color}dd)`,
          boxShadow: `0 0 20px ${color}cc`,
        }}
      />
    </motion.div>
  );
}
