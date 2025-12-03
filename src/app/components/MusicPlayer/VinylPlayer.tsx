'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';

interface VinylPlayerProps {
  songTitle: string;
  coverImage: string;
  isPlaying: boolean;
  primaryColor: string;
}

export default function VinylPlayer({
  songTitle,
  coverImage,
  isPlaying,
  primaryColor,
}: VinylPlayerProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 4,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 260,
          height: 220,
        }}
      >
        {/* Vinyl Record */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={
            isPlaying
              ? { duration: 8, repeat: Infinity, ease: 'linear' }
              : { duration: 0.3 }
          }
          style={{
            position: 'absolute',
            right: -40,
            top: 10,
            width: 190,
            height: 190,
            borderRadius: '50%',
            zIndex: 0,
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 30% 20%, #0f172a, #020617 60%, #000 100%)',
              boxShadow: '0 18px 35px rgba(0,0,0,0.7)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Vinyl grooves */}
            {[...Array(7)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  inset: `${16 + i * 8}px`,
                  borderRadius: '50%',
                  border: '1px solid rgba(148,163,184,0.12)',
                }}
              />
            ))}

            {/* Vinyl shine */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 20% 20%, rgba(148,163,184,0.35), transparent 55%)',
                mixBlendMode: 'screen',
                opacity: 0.5,
              }}
            />

            {/* Center label */}
            <Box
              sx={{
                position: 'absolute',
                inset: '34%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #f97316, #b91c1c)',
                boxShadow: '0 0 15px rgba(248,113,113,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: '#fff',
                textAlign: 'center',
                px: 1,
              }}
            >
              <Box
                sx={{
                  fontSize: '0.55rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  opacity: 0.85,
                }}
              >
                SIDE A
              </Box>
              <Box
                sx={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                {songTitle.length > 16
                  ? songTitle.slice(0, 16) + '…'
                  : songTitle}
              </Box>
            </Box>

            {/* Center dot */}
            <Box
              sx={{
                position: 'absolute',
                inset: '49%',
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#020617',
                boxShadow: '0 0 4px rgba(15,23,42,0.9)',
              }}
            />
          </Box>
        </motion.div>

        {/* Album Cover */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: 210,
            height: 210,
            borderRadius: 3,
            overflow: 'hidden',
            backgroundImage: `url(${coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 16px 40px rgba(0,0,0,0.75)',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.12), transparent 40%, rgba(15,23,42,0.85))',
              mixBlendMode: 'overlay',
              opacity: 0.65,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
