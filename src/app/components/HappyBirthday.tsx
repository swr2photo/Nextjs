// components/HappyBirthday.tsx
'use client';

import { Box, Container } from '@mui/material';
import { motion, easeInOut } from 'framer-motion';
import CakeIcon from '@mui/icons-material/Cake';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GradeIcon from '@mui/icons-material/Grade';

export default function HappyBirthday() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  const particleVariants = {
    animate: (i: number) => ({
      y: [0, -100, 0],
      x: [0, Math.sin(i) * 50, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        delay: i * 0.2,
      },
    }),
  };

  const globVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, var(--color-dark) 0%, var(--color-paper) 50%, #020617 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: 4,
      }}
    >
      {/* Glowing Orbs ใช้สีตามธีม */}
      <motion.div
        variants={globVariants}
        animate="animate"
        style={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(var(--color-secondary-rgb), 0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <motion.div
        variants={globVariants}
        animate="animate"
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: easeInOut,
          delay: 1,
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(var(--color-primary-rgb), 0.35) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Glow กลางจอ */}
      <motion.div
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: easeInOut,
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(var(--color-secondary-rgb), 0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* วงกลมพื้นหลัง */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          background:
            'radial-gradient(circle, rgba(var(--color-primary-rgb), 0.18) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 250,
          height: 250,
          background:
            'radial-gradient(circle, rgba(var(--color-secondary-rgb), 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 5s ease-in-out infinite reverse',
        }}
      />

      {/* Floating Particles Left */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`left-${i}`}
          custom={i}
          variants={particleVariants}
          animate="animate"
          style={{
            position: 'absolute',
            left: `${10 + i * 5}%`,
            bottom: 0,
          }}
        >
          <Box
            sx={{
              width: 8 + i * 2,
              height: 8 + i * 2,
              borderRadius: '50%',
              background: `rgba(var(--color-secondary-rgb), ${
                0.6 + i * 0.05
              })`,
              boxShadow: `0 0 ${12 + i * 4}px rgba(var(--color-secondary-rgb), 0.9)`,
            }}
          />
        </motion.div>
      ))}

      {/* Floating Particles Right */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`right-${i}`}
          custom={i + 5}
          variants={particleVariants}
          animate="animate"
          style={{
            position: 'absolute',
            right: `${10 + i * 5}%`,
            bottom: 0,
          }}
        >
          <Box
            sx={{
              width: 8 + i * 2,
              height: 8 + i * 2,
              borderRadius: '50%',
              background: `rgba(var(--color-primary-rgb), ${
                0.6 + i * 0.05
              })`,
              boxShadow: `0 0 ${12 + i * 4}px rgba(var(--color-primary-rgb), 0.9)`,
            }}
          />
        </motion.div>
      ))}

      {/* Floating confetti icons */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
        }}
      >
        <AutoAwesomeIcon
          sx={{
            fontSize: '3rem',
            color: 'var(--color-secondary)',
            opacity: 0.75,
            filter:
              'drop-shadow(0 4px 12px rgba(var(--color-secondary-rgb), 0.4))',
          }}
        />
      </motion.div>

      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{
          position: 'absolute',
          top: '20%',
          right: '8%',
        }}
      >
        <FavoriteTwoToneIcon
          sx={{
            fontSize: '2.5rem',
            color: 'var(--color-primary)',
            opacity: 0.7,
            filter:
              'drop-shadow(0 4px 12px rgba(var(--color-primary-rgb), 0.45))',
          }}
        />
      </motion.div>

      {/* ดาวลอยเพิ่มความฟรุ้งฟริ้ง */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 360] }}
        transition={{ duration: 5, repeat: Infinity, ease: easeInOut }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '8%',
        }}
      >
        <GradeIcon
          sx={{
            fontSize: '2rem',
            color: 'var(--color-secondary)',
            opacity: 0.5,
            filter:
              'drop-shadow(0 2px 8px rgba(var(--color-secondary-rgb), 0.6))',
          }}
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -360] }}
        transition={{ duration: 6, repeat: Infinity, ease: easeInOut, delay: 0.5 }}
        style={{
          position: 'absolute',
          top: '70%',
          right: '10%',
        }}
      >
        <GradeIcon
          sx={{
            fontSize: '1.8rem',
            color: 'var(--color-primary)',
            opacity: 0.4,
            filter:
              'drop-shadow(0 2px 8px rgba(var(--color-primary-rgb), 0.6))',
          }}
        />
      </motion.div>

      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Header Section */}
          <Box sx={{ mb: 6 }}>
            {/* ไอคอนด้านบน */}
            <motion.div
              variants={itemVariants}
              style={{ textAlign: 'center', marginBottom: 20 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CakeIcon
                      sx={{
                        fontSize: '2.5rem',
                        color: 'var(--color-secondary)',
                        filter:
                          'drop-shadow(0 4px 12px rgba(var(--color-secondary-rgb), 0.4))',
                      }}
                    />
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border:
                          '2px solid rgba(var(--color-secondary-rgb), 0.9)',
                      }}
                    />
                  </Box>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <LocalFireDepartmentIcon
                      sx={{
                        fontSize: '2.5rem',
                        color: 'var(--color-accent)',
                        filter:
                          'drop-shadow(0 4px 12px rgba(var(--color-accent-rgb), 0.4))',
                      }}
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      style={{
                        position: 'absolute',
                        inset: -10,
                        borderRadius: '50%',
                        background:
                          'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.35) 0%, transparent 70%)',
                      }}
                    />
                  </Box>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CakeIcon
                      sx={{
                        fontSize: '2.5rem',
                        color: 'var(--color-secondary)',
                        filter:
                          'drop-shadow(0 4px 12px rgba(var(--color-secondary-rgb), 0.4))',
                      }}
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border:
                          '2px solid rgba(var(--color-secondary-rgb), 0.9)',
                      }}
                    />
                  </Box>
                </motion.div>
              </Box>
            </motion.div>

            {/* Main Title */}
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  fontSize: { xs: '2rem', md: '3.5rem' },
                  fontWeight: 800,
                  textAlign: 'center',
                  background:
                    'linear-gradient(135deg, var(--color-secondary) 0%, #e0fcef 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  position: 'relative',
                }}
              >
                สุขสันต์วันเกิดน้าา 💚
                <Box
                  sx={{
                    position: 'absolute',
                    inset: -20,
                    background:
                      'radial-gradient(circle, rgba(var(--color-secondary-rgb), 0.25) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(30px)',
                    zIndex: -1,
                  }}
                />
              </Box>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                  fontWeight: 700,
                  textAlign: 'center',
                  background:
                    'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                เจ้าจอมคนเก่ง 💫
              </Box>
            </motion.div>

            {/* Date */}
            <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
              <Box
                sx={{
                  fontSize: '1.05rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 3,
                  fontStyle: 'italic',
                }}
              >
                05 ธันวาคม 2568 · วันเกิดของคนพิเศษที่สุดคนหนึ่งในโลกใบนี้ (20ปีแล้วแก่ขึ้นอีกปีแล้วนะ)
              </Box>
            </motion.div>

            {/* Heart animated */}
            <motion.div
              variants={itemVariants}
              style={{ textAlign: 'center', marginBottom: 30 }}
            >
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <FavoriteTwoToneIcon
                    sx={{
                      fontSize: '5rem',
                      color: 'var(--color-primary)',
                      filter:
                        'drop-shadow(0 4px 20px rgba(var(--color-primary-rgb), 0.5))',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.1, 0.4],
                    }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      inset: -30,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle, rgba(var(--color-primary-rgb), 0.45) 0%, transparent 70%)',
                      filter: 'blur(20px)',
                    }}
                  />
                </Box>
              </motion.div>
            </motion.div>

            {/* Description / ข้อความน่ารัก ๆ */}
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(var(--color-primary-rgb), 0.35)',
                  borderRadius: '20px',
                  p: { xs: 2.5, md: 3.5 },
                  mb: 6,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Gradient วิ่งรอบกรอบ */}
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '20px',
                    background:
                      'linear-gradient(90deg, rgba(var(--color-secondary-rgb), 0.14) 0%, rgba(var(--color-primary-rgb), 0.16) 50%, rgba(var(--color-secondary-rgb), 0.14) 100%)',
                    backgroundSize: '200% 200%',
                    opacity: 0.5,
                    pointerEvents: 'none',
                  }}
                />

                <Box
                  sx={{
                    fontSize: { xs: '0.98rem', md: '1.1rem' },
                    color: 'rgba(255, 255, 255, 0.92)',
                    lineHeight: 1.9,
                    mb: 1.5,
                    fontWeight: 500,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  ขอให้วันนี้เป็นวันที่หัวใจของแกเบาสบายที่สุดเลยนะ 💭
                </Box>
                <Box
                  sx={{
                    fontSize: { xs: '0.98rem', md: '1.1rem' },
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.9,
                    mb: 1.5,
                    fontWeight: 400,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  ไม่ว่าแกจะผ่านเรื่องเหนื่อย ๆ อะไรมาบ้าง
                  วันนี้อยากให้รู้ไว้ว่า ยังมีคนคนนึงแอบใจกำลังอยู่ข้าง ๆ เสมอ 💚
                </Box>
                <Box
                  sx={{
                    fontSize: { xs: '0.98rem', md: '1.1rem' },
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.9,
                    fontWeight: 400,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  ขอให้ปีนี้เต็มไปด้วยเสียงหัวเราะ เรื่องดี ๆ แบบงง ๆ
                  และโมเมนต์ที่ทำให้แกยิ้มจนลืมเหนื่อยไปเลยนะ คนเก่งของเค้า 🌿
                </Box>
              </Box>
            </motion.div>
          </Box>

          {/* Quote สั้น ๆ ท้าย section */}
          <motion.div
            variants={itemVariants}
            style={{ textAlign: 'center', marginBottom: 50 }}
          >
            <Box
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: 'rgba(255, 255, 255, 0.78)',
                fontStyle: 'italic',
                letterSpacing: '0.5px',
              }}
            >
              "ขอบคุณที่เกิดมาเป็นจอม... มีความสุขมาก ๆ นะจร๊ะน้อนจอม" 🫶
            </Box>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: easeInOut }}
        style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.2,
            px: { xs: 1.8, md: 2.4 },
            py: { xs: 0.7, md: 0.9 },
            borderRadius: 999,
            background: 'rgba(15,23,42,0.78)',
            border: '1px solid rgba(var(--color-secondary-rgb), 0.6)',
            boxShadow:
              '0 14px 30px rgba(15,23,42,0.9), 0 0 18px rgba(var(--color-secondary-rgb), 0.4)',
            backdropFilter: 'blur(14px)',
          }}
        >
          {/* ข้อความ */}
          <Box
            sx={{
              fontSize: { xs: '0.75rem', md: '0.85rem' },
              color: 'rgba(248, 250, 252, 0.8)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            ยางงมีข้างล่งต่อน้าาา 🫶
          </Box>

          {/* เส้นแบ่งเล็ก ๆ */}
          <Box
            sx={{
              width: 1,
              height: 20,
              bgcolor: 'rgba(148,163,184,0.4)',
            }}
          />

          {/* จุด + ลูกศร */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.2,
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '999px',
                background: 'rgba(var(--color-secondary-rgb), 0.9)',
                boxShadow:
                  '0 0 10px rgba(var(--color-secondary-rgb), 0.9), 0 0 18px rgba(var(--color-secondary-rgb), 0.6)',
                mb: 0.1,
              }}
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: easeInOut }}
            >
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: '1.6rem',
                  color: 'var(--color-secondary)',
                  filter:
                    'drop-shadow(0 2px 10px rgba(var(--color-secondary-rgb), 0.8))',
                }}
              />
            </motion.div>
          </Box>
        </Box>
      </motion.div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
        }
      `}</style>
    </Box>
  );
}
