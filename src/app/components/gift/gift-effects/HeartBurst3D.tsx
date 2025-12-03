'use client';

import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface HeartBurst3DProps {
  angle: number;
  distance: number;
  delay: number;
  color: string;
}

export default function HeartBurst3D({
  angle,
  distance,
  delay,
  color,
}: HeartBurst3DProps) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * distance;
  const y = Math.sin(rad) * distance * -1;
  const z = (Math.random() - 0.5) * 150;

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0, z: 0, scale: 0.4 }}
      animate={{
        opacity: [0, 1, 0],
        x,
        y,
        z,
        scale: [0.7, 1.3, 0.5],
        rotateX: [0, 720],
        rotateY: [0, 360],
        rotateZ: [0, 180],
      }}
      transition={{ delay, duration: 1.8, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        pointerEvents: 'none',
      }}
    >
      <FavoriteIcon
        sx={{
          fontSize: { xs: 20, sm: 26 },
          color,
          filter: `drop-shadow(0 0 12px ${color}88)`,
        }}
      />
    </motion.div>
  );
}
