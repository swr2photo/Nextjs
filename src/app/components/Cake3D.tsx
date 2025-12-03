'use client';

import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CakeIcon from '@mui/icons-material/Cake';
import StarIcon from '@mui/icons-material/Star';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AirIcon from '@mui/icons-material/Air';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ShareIcon from '@mui/icons-material/Share';

import { useSound } from './hooks/useSound';
import { useFireworks } from './hooks/useFireworks';
import { usePhotoCapture } from './hooks/usePhotoCapture';

interface Cake3DProps {
  name: string;
  age: number;
  color: string;
  accentColor: string;
  onBlowCandles?: () => void;
}

export default function Cake3D({
  name,
  age,
  color,
  accentColor,
  onBlowCandles,
}: Cake3DProps) {
  const [isMounted, setIsMounted] = useState(false);

  // 🎂 สเตตหลัก
  const [candlesBlow, setCandlesBlow] = useState(0);
  const requiredBlows = 3;

  const [cakeCut, setCakeCut] = useState(false);
  const [showWishDialog, setShowWishDialog] = useState(false);
  const [wish, setWish] = useState('');

  const [showFireworks, setShowFireworks] = useState(false);

  // 💨 สเตตสำหรับ wind effect (ให้ animation รันใหม่ทุกครั้งที่เป่า)
  const [showWind, setShowWind] = useState(false);

  // ❤️⭐ Floating items ตอนฉลอง
  const [floatingItems, setFloatingItems] = useState<
    Array<{ id: number; type: 'heart' | 'star' }>
  >([]);
  const floatingIdRef = useRef(0);

  const { play } = useSound();
  const { trigger: triggerFireworks } = useFireworks();
  const { capture, elementRef } = usePhotoCapture();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 🎈 สร้างหัวใจ / ดาวลอย ตอน showFireworks = true
  useEffect(() => {
    if (!showFireworks) return;

    const interval = setInterval(() => {
      setFloatingItems((prev) => [
        ...prev,
        {
          id: floatingIdRef.current++,
          type: Math.random() > 0.5 ? 'heart' : 'star',
        },
      ]);
    }, 300);

    return () => clearInterval(interval);
  }, [showFireworks]);

  // จำกัดจำนวน floating items
  useEffect(() => {
    if (!floatingItems.length) return;
    const timer = setTimeout(() => {
      setFloatingItems((prev) => prev.slice(-20));
    }, 4000);
    return () => clearTimeout(timer);
  }, [floatingItems]);

  if (!isMounted) return null;

  // 🕯 เป่าเทียน 1 ครั้ง
  const handleBlowClick = () => {
    // ถ้าเป่าครบแล้วปุ่มจะหายไป แต่กัน double-click เผื่อไว้
    if (candlesBlow >= requiredBlows) return;

    play('blow');

    // ให้ wind effect รันใหม่ทุกครั้ง
    setShowWind(true);
    setTimeout(() => setShowWind(false), 700);

    const newCount = candlesBlow + 1;
    setCandlesBlow(newCount);

    // เป่าครบจำนวน → ฉลองเลย
    if (newCount >= requiredBlows) {
      play('wow');
      setCakeCut(true);
      setShowFireworks(true);
      triggerFireworks({ x: 0.5, y: 0.3 });
      setShowWishDialog(true);

      setTimeout(() => {
        play('happyBirthday');
      }, 500);

      setTimeout(() => {
        onBlowCandles?.();
      }, 800);
    }
  };

  // 🍰 ปุ่ม "เฉือนเค้ก" (ไว้เผื่ออยากกดซ้ำ/บังคับฉลอง)
  const handleCutCake = () => {
    play('cheer');
    setCakeCut(true);
    setShowFireworks(true);
    triggerFireworks({ x: 0.5, y: 0.3 });
    setShowWishDialog(true);

    setTimeout(() => {
      play('happyBirthday');
    }, 500);
  };

  const handleCapturePhoto = async () => {
    await capture();
    play('wow');
  };

  const handleShareWish = () => {
    if (wish.trim()) {
      play('cheer');
      setShowWishDialog(false);
      console.log('Wish:', wish);
    }
  };

  const blowProgress = Math.min(candlesBlow / requiredBlows, 1);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: `linear-gradient(135deg, #0f172a 0%, #0c0f1b 50%, #1a0f2e 100%)`,
        overflow: 'hidden',
        pt: { xs: 8, md: 4 },
        pb: { xs: 20, md: 12 },
        px: 2,
      }}
    >
      {/* 🔆 Light glow หลักด้านหลังเค้ก */}
      <Box
        sx={{
          position: 'absolute',
          width: { xs: 240, sm: 320, md: 420 },
          height: { xs: 240, sm: 320, md: 420 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}40 0%, ${color}20 40%, transparent 70%)`,
          filter: 'blur(60px)',
          animation: 'pulse 5s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.6 },
            '50%': { transform: 'scale(1.1)', opacity: 0.9 },
          },
          pointerEvents: 'none',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* เอฟเฟกต์ตอนฉลอง + พลุ */}
      {showFireworks && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.5, 0] }}
            transition={{ duration: 2 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 2, delay: 0.4 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle, ${color}18 0%, transparent 60%)`,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* ❤️⭐ Floating Hearts & Stars */}
      <AnimatePresence>
        {floatingItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: '100vh', x: 0, opacity: 1, scale: 1 }}
            animate={{
              y: '-100vh',
              x: Math.sin(item.id) * 120,
              opacity: 0,
              scale: 0.5,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 + Math.random() * 1.5 }}
            style={{
              position: 'fixed',
              left: '50%',
              bottom: 0,
              fontSize: '2rem',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            {item.type === 'heart' ? '❤️' : '⭐'}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 🎉 Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '2rem', zIndex: 10 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mb: 1,
          }}
        >
          <CakeIcon
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              color: accentColor,
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-10px)' },
              },
            }}
          />
          <Typography
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 900,
              background: `linear-gradient(135deg, ${accentColor}, ${color})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Happy Birthday {name}!
          </Typography>
          <EmojiEventsIcon
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              color: accentColor,
              animation: 'bounce 2s infinite 0.2s',
            }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
            fontWeight: 800,
            color: accentColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <StarIcon sx={{ fontSize: '1.4em' }} />
          {age} ปี
          <StarIcon sx={{ fontSize: '1.4em' }} />
        </Typography>
      </motion.div>

      {/* 🎂 3D Cake */}
      <motion.div
        ref={elementRef}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        style={{
          position: 'relative',
          zIndex: 5,
          perspective: '1200px',
          marginBottom: '2rem',
        }}
      >
        <Box
          sx={{
            width: { xs: 260, sm: 340, md: 400 },
            height: { xs: 260, sm: 340, md: 400 },
            position: 'relative',
          }}
        >
          <svg
            viewBox="0 0 400 400"
            style={{
              width: '100%',
              height: '100%',
              filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.55))',
            }}
          >
            <defs>
              <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                <feOffset dx="0" dy="2" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.5" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id="platGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fde8e3" stopOpacity="1" />
                <stop offset="100%" stopColor="#f5d5cc" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="cakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="1" />
                <stop offset="100%" stopColor={`${color}dd`} stopOpacity="0.97" />
              </linearGradient>

              <linearGradient id="frostingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e8898e" stopOpacity="1" />
                <stop offset="100%" stopColor="#d67178" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* เงาใต้จาน */}
            <ellipse cx="200" cy="328" rx="150" ry="24" fill="rgba(0,0,0,0.35)" />
            {/* จาน */}
            <ellipse cx="200" cy="320" rx="150" ry="38" fill="url(#platGradient)" />
            <path
              d="M 60 320 Q 200 285 340 320"
              stroke="#f0e4d9"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />

            {/* เนื้อเค้ก */}
            <motion.g animate={cakeCut ? { opacity: 0.9, y: 4 } : { opacity: 1, y: 0 }}>
              <ellipse cx="200" cy="280" rx="130" ry="30" fill={`${color}33`} />

              <g>
                {/* Top plane */}
                <path
                  d="M 75 200 L 90 180 L 310 180 L 325 200 Z"
                  fill="url(#cakeGradient)"
                  stroke={`${color}aa`}
                  strokeWidth="1.3"
                />
                {/* Left side */}
                <path
                  d="M 75 200 L 75 280 L 90 300 L 90 180 Z"
                  fill={`${color}aa`}
                  stroke={`${color}99`}
                  strokeWidth="0.6"
                  opacity="0.95"
                />
                {/* Right side */}
                <path
                  d="M 325 200 L 325 280 L 310 300 L 310 180 Z"
                  fill={`${color}cc`}
                  stroke={`${color}aa`}
                  strokeWidth="0.6"
                />
                {/* Front face */}
                <path
                  d="M 75 280 L 325 280 L 310 300 L 90 300 Z"
                  fill={`${color}66`}
                  opacity="0.9"
                  stroke={`${color}aa`}
                  strokeWidth="0.6"
                />
                <path
                  d="M 90 180 L 310 180"
                  stroke="rgba(255,255,255,0.24)"
                  strokeWidth="2"
                />
              </g>

              {/* ครีม */}
              <rect
                x="90"
                y="175"
                width="220"
                height="12"
                fill="url(#frostingGradient)"
                opacity="0.97"
                rx="3"
              />
              <rect
                x="90"
                y="240"
                width="220"
                height="8"
                fill="#ea7a82"
                opacity="0.9"
                rx="2"
              />

              {/* สตรอว์เบอร์รี่ ด้านบน */}
              <motion.g
                animate={
                  cakeCut
                    ? { y: 2, scale: 0.98 }
                    : { y: [0, -3, 0], scale: [1, 1.02, 1] }
                }
                transition={{ duration: 2.5, repeat: !cakeCut ? Infinity : 0 }}
              >
                <g>
                  <ellipse cx="130" cy="165" rx="13" ry="15" fill="#e63946" opacity="0.97" />
                  <ellipse cx="130" cy="162" rx="10" ry="8" fill="#d63135" opacity="0.85" />
                  <path
                    d="M 125 155 L 118 145 M 130 152 L 130 142 M 135 155 L 142 145"
                    stroke="#52b788"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
                <g>
                  <ellipse cx="200" cy="160" rx="14" ry="16" fill="#e63946" opacity="0.97" />
                  <ellipse cx="200" cy="156" rx="11" ry="9" fill="#d63135" opacity="0.85" />
                  <path
                    d="M 194 148 L 186 136 M 200 145 L 200 133 M 206 148 L 214 136"
                    stroke="#52b788"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                  />
                </g>
                <g>
                  <ellipse cx="270" cy="168" rx="13" ry="15" fill="#e63946" opacity="0.97" />
                  <ellipse cx="270" cy="165" rx="10" ry="8" fill="#d63135" opacity="0.85" />
                  <path
                    d="M 265 160 L 258 150 M 270 157 L 270 147 M 275 160 L 282 150"
                    stroke="#52b788"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
              </motion.g>
            </motion.g>

            {/* 🕯 Candles (ตัวไฟค่อย ๆ ดับตามรอบเป่า) */}
            <g>
              {Array.from({ length: age > 20 ? 5 : age }).map((_, i) => {
                const positions = [120, 160, 200, 240, 280];
                const x = positions[i % positions.length];

                return (
                  <g key={i}>
                    <defs>
                      <linearGradient
                        id={`candleGrad${i}`}
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#fffdf5"
                          stopOpacity="1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#f7e5b9"
                          stopOpacity="0.9"
                        />
                      </linearGradient>
                    </defs>

                    {/* ตัวเทียนยังอยู่แม้ไฟดับ */}
                    <rect
                      x={x - 3}
                      y="140"
                      width="6"
                      height="38"
                      fill={`url(#candleGrad${i})`}
                      opacity="0.96"
                      rx="2"
                    />
                    <rect
                      x={x - 2}
                      y="140"
                      width="1"
                      height="38"
                      fill="rgba(255,255,255,0.55)"
                      opacity="0.7"
                    />

                    {/* เปลวไฟ: ลด opacity / scale ตามจำนวนการเป่า */}
                    <motion.g
                      animate={{
                        opacity: 1 - blowProgress,
                        scale: 1 - blowProgress * 0.35,
                        y: blowProgress * 6,
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                      <motion.g
                        animate={{
                          y: [0, -4, 0],
                          scale: [1, 1.08, 0.95, 1.05, 1],
                        }}
                        transition={{
                          duration: 0.7 + i * 0.1,
                          repeat: blowProgress < 1 ? Infinity : 0,
                          ease: 'easeInOut',
                        }}
                      >
                        <path
                          d={`M ${x} 140 Q ${x - 3} 125 ${x} 115 Q ${
                            x + 3
                          } 125 ${x} 140`}
                          fill="#ff8c00"
                          opacity="0.9"
                          filter="drop-shadow(0 0 4px #ffaa00)"
                        />
                        <path
                          d={`M ${x} 135 Q ${x - 2} 127 ${x} 120 Q ${
                            x + 2
                          } 127 ${x} 135`}
                          fill="#ffa500"
                          opacity="0.95"
                        />
                        <path
                          d={`M ${x} 130 Q ${x - 1.5} 125 ${x} 122 Q ${
                            x + 1.5
                          } 125 ${x} 130`}
                          fill="#ffff66"
                          opacity="0.98"
                          filter="drop-shadow(0 0 6px #ffff66)"
                        />
                      </motion.g>
                    </motion.g>
                  </g>
                );
              })}
            </g>

            {/* ตัวอักษรบนเค้ก */}
            <text
              x="200"
              y="235"
              textAnchor="middle"
              fontSize="26"
              fontWeight="bold"
              fill="rgba(255,255,255,0.9)"
              fontFamily="'Noto Sans Thai', sans-serif"
              filter="url(#textShadow)"
            >
              {name}
            </text>
            <text
              x="200"
              y="260"
              textAnchor="middle"
              fontSize="18"
              fill="rgba(255,255,255,0.85)"
              fontFamily="'Noto Sans Thai', sans-serif"
              filter="url(#textShadow)"
            >
              {age} ปีเต็ม
            </text>
          </svg>

          {/* เอฟเฟกต์ลมตอนเป่าเทียน */}
          <AnimatePresence>
            {showWind && (
              <motion.div
                key={candlesBlow}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: Math.cos((i / 12) * Math.PI * 2) * 240,
                      y: Math.sin((i / 12) * Math.PI * 2) * 240,
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{ duration: 0.8 }}
                    style={{
                      position: 'absolute',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: accentColor,
                      boxShadow: `0 0 12px ${accentColor}`,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </motion.div>

      {/* ℹ️ Info Card / ปุ่มกด */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        style={{ zIndex: 10, maxWidth: '600px', width: '100%' }}
      >
        <Box
          sx={{
            px: { xs: 2.5, sm: 3, md: 3.5 },
            py: { xs: 2, sm: 2.5, md: 3 },
            borderRadius: { xs: 3, sm: 3.5, md: 4 },
            background: `linear-gradient(135deg, rgba(15,23,42,0.98), rgba(15,118,110,0.95))`,
            border: `2px solid ${accentColor}88`,
            boxShadow: `0 20px 50px rgba(0,0,0,0.95)`,
            backdropFilter: 'blur(10px)',
            textAlign: 'center',
          }}
        >
          {/* Progress text */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mb: 1.2,
            }}
          >
            <LocalFireDepartmentIcon
              sx={{
                color: accentColor,
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: accentColor,
                fontWeight: 800,
              }}
            >
              เป่าเทียน {candlesBlow}/{requiredBlows}
            </Typography>
            <LocalFireDepartmentIcon
              sx={{
                color: accentColor,
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
              }}
            />
          </Box>

          {/* รายละเอียด */}  
          <Typography
            sx={{
              fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' },
              lineHeight: 1.8,
              color: 'rgba(226,232,240,0.95)',
              mb: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            {candlesBlow < requiredBlows ? (
              <>
                <AirIcon sx={{ fontSize: '1.2em' }} />
                <span>หายใจเข้าลึก ๆ แล้วเป่าเทียนให้หมด</span>
                <StarIcon sx={{ fontSize: '1.2em' }} />
              </>
            ) : (
              <>
                <StarIcon sx={{ fontSize: '1.2em' }} />
                <span>ยินดีด้วย! เทียนดับหมดแล้ว 🎉</span>
                <FavoriteBorderIcon sx={{ fontSize: '1.2em' }} />
              </>
            )}
          </Typography>

          {/* ปุ่มเป่า / เฉือน / ถ่ายรูป */}
          <AnimatePresence>
            {candlesBlow < requiredBlows ? (
              <motion.div
                key="blow-button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    fullWidth
                    onClick={handleBlowClick}
                    variant="contained"
                    endIcon={<AirIcon />}
                    sx={{
                      borderRadius: 999,
                      background: `linear-gradient(135deg, ${color}, ${accentColor})`,
                      color: '#fff',
                      textTransform: 'none',
                      fontSize: {
                        xs: '0.85rem',
                        sm: '0.95rem',
                        md: '1.05rem',
                      },
                      py: { xs: 0.9, sm: 1.1, md: 1.3 },
                      fontWeight: 800,
                      boxShadow: `0 12px 32px ${accentColor}66`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 16px 40px ${accentColor}88`,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    เป่าเทียน
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="cut-button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ flex: 1 }}
                  >
                    <Button
                      fullWidth
                      onClick={handleCutCake}
                      variant="contained"
                      startIcon={<RestaurantMenuIcon />}
                      sx={{
                        borderRadius: 999,
                        background: `linear-gradient(135deg, ${accentColor}, ${color})`,
                        color: '#fff',
                        textTransform: 'none',
                        fontSize: {
                          xs: '0.85rem',
                          sm: '0.95rem',
                          md: '1.05rem',
                        },
                        py: { xs: 0.9, sm: 1.1, md: 1.3 },
                        fontWeight: 800,
                        boxShadow: `0 12px 32px ${accentColor}66`,
                      }}
                    >
                      เฉือนเค้ก
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ flex: 1 }}
                  >
                    <Button
                      fullWidth
                      onClick={handleCapturePhoto}
                      variant="contained"
                      startIcon={<CameraAltIcon />}
                      sx={{
                        borderRadius: 999,
                        background: `linear-gradient(135deg, #667eea, #764ba2)`,
                        color: '#fff',
                        textTransform: 'none',
                        fontSize: {
                          xs: '0.85rem',
                          sm: '0.95rem',
                          md: '1.05rem',
                        },
                        py: { xs: 0.9, sm: 1.1, md: 1.3 },
                        fontWeight: 800,
                      }}
                    >
                      ถ่ายรูป
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </motion.div>

      {/* 💭 Wish Dialog */}
      <Dialog
        open={showWishDialog}
        onClose={() => setShowWishDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: `linear-gradient(135deg, rgba(15,23,42,0.98), rgba(20,40,80,0.95))`,
            border: `2px solid ${accentColor}88`,
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <DialogTitle
          sx={{
            background: `linear-gradient(135deg, ${accentColor}, ${color})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 900,
            fontSize: '1.5rem',
            textAlign: 'center',
            py: 2,
          }}
        >
          💭 เขียนความปรารถนา
        </DialogTitle>

        <DialogContent
          sx={{
            pt: 3,
            minWidth: { xs: '320px', sm: '400px' },
            maxWidth: '500px',
          }}
        >
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={4}
            placeholder="เขียนคำอวยพรและความปรารถนาให้คนที่เกิดวันนี้..."
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': {
                  borderColor: accentColor,
                },
                '&:hover fieldset': {
                  borderColor: color,
                },
                '&.Mui-focused fieldset': {
                  borderColor: accentColor,
                },
              },
              '& .MuiOutlinedInput-input': {
                color: '#fff',
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: 'rgba(255,255,255,0.5)',
                opacity: 1,
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Button
              fullWidth
              onClick={() => setShowWishDialog(false)}
              variant="outlined"
              sx={{
                color: accentColor,
                borderColor: accentColor,
                borderWidth: 2,
                '&:hover': {
                  borderColor: color,
                  color: color,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                },
              }}
            >
              ยกเลิก
            </Button>

            <Button
              fullWidth
              onClick={handleShareWish}
              variant="contained"
              endIcon={<ShareIcon />}
              sx={{
                background: `linear-gradient(135deg, ${accentColor}, ${color})`,
                textTransform: 'none',
                fontWeight: 800,
                py: 1.2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: `0 8px 24px ${accentColor}66`,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              ส่งความปรารถนา
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
