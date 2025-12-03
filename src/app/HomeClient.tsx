'use client';

import {
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import HappyBirthday from './components/HappyBirthday';
import MusicPlayer from './components/MusicPlayer';
import Cake3D from './components/Cake3D';
import GiftBox from './components/GiftBox3D';
import { useThemeContext, colorThemes } from './providers';
import Palette from '@mui/icons-material/Palette';
import type { StoryScene } from './components/MusicPlayer';
import { MemoryGallery, type MemoryImage } from './components/memory';

// ==================== LYRICS DATA ====================
const lyrics = [
  {
    text: 'จะรอเที่ยงคืนในวันเกิดเธอทุกทุกปี',
    startTime: 31,
    endTime: 37,
    type: 'verse' as const,
  },
  {
    text: 'อยากจะเป็นคนแรกที่อวยพร',
    startTime: 37,
    endTime: 40,
    type: 'verse' as const,
  },
  {
    text: 'ตั้งแต่นาทีที่เริ่มวันใหม่',
    startTime: 40,
    endTime: 44,
    type: 'verse' as const,
  },
  {
    text: 'จะจองที่นั่งข้างคนขับให้เธอทุกวัน',
    startTime: 44,
    endTime: 51,
    type: 'verse' as const,
  },
  {
    text: 'ไม่ว่าจะไกลเท่าไรไม่หวั่น',
    startTime: 51,
    endTime: 54,
    type: 'verse' as const,
  },
  {
    text: 'ถ้ามีเธอไปด้วยกันคงดี',
    startTime: 54,
    endTime: 57,
    type: 'verse' as const,
  },
  {
    text: 'ปฏิทินจะมีอีกหลายวันสำคัญให้เราใช้ด้วยกัน',
    startTime: 57,
    endTime: 64,
    type: 'chorus' as const,
  },
  {
    text: 'หากว่าเธอตกลง วันนี้คงเป็นวันแรกของทุกวัน',
    startTime: 64,
    endTime: 71,
    type: 'chorus' as const,
  },
  {
    text: 'เธอว่าวันครบรอบเราจะเป็นวันที่เท่าไร',
    startTime: 71,
    endTime: 78,
    type: 'chorus' as const,
  },
  {
    text: 'วันใดที่ได้สวมกอด พูดว่ารักตลอดไป',
    startTime: 78,
    endTime: 85,
    type: 'chorus' as const,
  },
  {
    text: 'เมื่อไรที่รักยาวนาน จนมอบแหวนแทนรักนิรันดร์',
    startTime: 85,
    endTime: 93,
    type: 'bridge' as const,
  },
  {
    text: 'ถ้าวันแรกของเธอกับฉัน เริ่มวันนี้เลยดีไหม',
    startTime: 93,
    endTime: 100,
    type: 'bridge' as const,
  },
];

// ==================== MEMORY IMAGES DATA ====================
const memoryImages: MemoryImage[] = [
  {
    id: '1',
    url: '/images/7.png',
    caption: 'วันธรรมดาที่เริ่มไม่ธรรมดา',
    title: 'โมเมนต์ที่ 1 · วันแรกที่เราได้คุยกัน',
    text: 'เป็นแค่แชททักธรรมดา ๆ แต่สำหรับเรา มันคือวันแรกที่ชื่อของนายเข้ามาอยู่ในความทรงจำจริง ๆ 💚',
    timestamp: 'วันแรกที่เริ่มทัก',
    showAt: 30,
    hiddenAt: 36,
    shape: 'heart',
    layout: 'center',
    variant: 'polaroid',
  },
  {
    id: '2',
    url: '/images/8.png',
    caption: 'ข้อความแรกที่ทำให้ยิ้มทั้งวัน',
    title: 'โมเมนต์ที่ 2 · แชทสั้น ๆ ที่วนอยู่ในหัว',
    text: 'หลังจากคุยกับนายจบ… เราเผลอเปิดแชทกลับไปอ่านซ้ำหลายรอบมาก 😊',
    timestamp: 'เริ่มสนิทกัน',
    showAt: 36,
    hiddenAt: 42,
    shape: 'star',
    layout: 'left',
    variant: 'card',
  },
  {
    id: '3',
    url: '/images/9.png',
    caption: 'หัวเราะสดใสไปด้วยกัน',
    title: 'โมเมนต์ที่ 3 · หัวเราะสุดหัว',
    text: 'ไม่รู้ว่าเรากำลังไม่เข้าใจอะไร แต่เราหัวเราะตั้งแต่ก่อนจะอ่านจบ 😂',
    timestamp: 'สักพักหน้า',
    showAt: 42,
    hiddenAt: 48,
    shape: 'bubble',
    layout: 'right',
    variant: 'banner',
  },
  {
    id: '4',
    url: '/images/10.heic',
    caption: 'วันพิเศษของเธอ',
    title: 'โมเมนต์ที่ 4 · วันเกิดของนาย',
    text: 'ตั้งตัวไว้ตั้งแต่หลายวันก่อน เตรียมสิ่งของอยากจะทำให้นายประทับใจ 💚',
    timestamp: '05 ธันวาคม 2568',
    showAt: 48,
    hiddenAt: 54,
    shape: 'diamond',
    layout: 'full',
    variant: 'frame',
  },
  {
    id: '5',
    url: '/images/11.heic',
    caption: 'วันที่สัญญาว่าจะเป็นเบื้องต้น',
    title: 'โมเมนต์ที่ 5 · ขอบคุณที่เชื่อใจ',
    text: 'ถ้างั้นนายอยากให้ฉันจำเก็บโมเมนต์นี้ไว้ตลอดไป ฉันตอบได้ง่ายมาก "ค่อนข้างแน่นอน" 💕',
    timestamp: 'เป็นอยู่ถึงตอนนี้',
    showAt: 54,
    hiddenAt: 60,
    shape: 'circle',
    layout: 'center',
    variant: 'polaroid',
  },
  {
    id: '6',
    url: '/images/12.heic',
    caption: 'ความรู้สึกตอนได้รู้จัก',
    title: 'โมเมนต์ที่ 6 · เวลาที่เปลี่ยนไป',
    text: 'จากที่เป็นแค่คนปกติ ตอนนี้กลายมาเป็นคนที่สำคัญกับฉันแล้ว ทุกอย่างเปลี่ยนไป 🌟',
    timestamp: 'ประมาณ 2 เดือน',
    showAt: 60,
    hiddenAt: 66,
    shape: 'square',
    layout: 'left',
    variant: 'card',
  },
  {
    id: '7',
    url: '/images/13.heic',
    caption: 'โทรสายพูดคุยเรื่องเล็กน้อย',
    title: 'โมเมนต์ที่ 7 · เสียงของเธอ',
    text: 'ได้ยินเสียงของนายจากหน้าจออื่นเป็นครั้งแรก ทำให้ฉันรู้ว่าเราใกล้ชิดกันขึ้นเยอะเลย 📞',
    timestamp: '15 มกราคม 2568',
    showAt: 66,
    hiddenAt: 72,
    shape: 'heart',
    layout: 'right',
    variant: 'banner',
  },
  {
    id: '8',
    url: '/images/14.png',
    caption: 'หนึ่งคืนที่เหมือนฝันดี',
    title: 'โมเมนต์ที่ 8 · ความฟลุ้งหากทำใจ',
    text: 'ปล่อยหัวใจออกไป แล้วก็รู้ว่ามันไม่ได้เจ็บเลย เพราะมันกำลังจะบินไปหาเธอ 🦋',
    timestamp: '02 กุมภาพันธ์ 2568',
    showAt: 72,
    hiddenAt: 78,
    shape: 'star',
    layout: 'full',
    variant: 'frame',
  },
  {
    id: '9',
    url: '/images/15.png',
    caption: 'สนใจอะไรของเธอเยอะขึ้น',
    title: 'โมเมนต์ที่ 9 · สิ่งเล็ก ๆ ที่ทำให้รู้เธอมากขึ้น',
    text: 'ยิ้ม วิธีพูด ท่าทาง ทั้งหมดมันทำให้ฉันรู้ว่า ฉันชอบเธออย่างแท้จริง 😍',
    timestamp: '14 กุมภาพันธ์ 2568',
    showAt: 78,
    hiddenAt: 85,
    shape: 'bubble',
    layout: 'center',
    variant: 'card',
  },
  {
    id: '10',
    url: '/images/นับสิบ.jpg',
    caption: 'ครั้งแรกที่คิดถึงเธออย่างช่ำชอง',
    title: 'โมเมนต์ที่ 10 · ความคิดถึง',
    text: 'ตื่นนอนแล้วคิดถึงเธอ กลางวันก็คิดถึง ก่อนนอนก็ยังคิดถึง ดูเหมือนฉันมีปัญหาสิ 💭',
    timestamp: '20 กุมภาพันธ์ 2568',
    showAt: 85,
    hiddenAt: 93,
    shape: 'diamond',
    layout: 'right',
    variant: 'polaroid',
  },
  {
    id: '11',
    url: '/images/นับสิบเอ็ด.jpg',
    caption: 'ความกลัวและความหวัง',
    title: 'โมเมนต์ที่ 11 · ก่อนที่จะบอก',
    text: 'กลัวว่าเธออาจจะไม่รู้สึกเหมือนฉัน แต่หวังว่าเธออาจจะสัมผัสรู้บ้างสักหน่อย 😰💕',
    timestamp: '28 กุมภาพันธ์ 2568',
    showAt: 93,
    hiddenAt: 102,
    shape: 'circle',
    layout: 'center',
    variant: 'frame',
  },
];

// ==================== MAIN COMPONENT ====================
export default function HomeClient() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSongFinished, setHasSongFinished] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [cakeBlewCandles, setCakeBlewCandles] = useState(false);

  const themeContext = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // ✅ Refs for smooth scrolling
  const memorySectionRef = useRef<HTMLElement>(null);
  const cakeSectionRef = useRef<HTMLElement>(null);
  const giftSectionRef = useRef<HTMLElement>(null);

  // ✅ Mount check
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ AUTO SCROLL - Improved
  useEffect(() => {
    if (isPlaying && memorySectionRef.current) {
      const scrollTimer = requestAnimationFrame(() => {
        memorySectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });

      return () => cancelAnimationFrame(scrollTimer);
    }
  }, [isPlaying]);

  // ✅ AUTO SCROLL - หลังจบ Memory ไปที่ Cake
  useEffect(() => {
    if (hasSongFinished && cakeSectionRef.current) {
      const scrollTimer = setTimeout(() => {
        cakeSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 500);

      return () => clearTimeout(scrollTimer);
    }
  }, [hasSongFinished]);

  // ✅ AUTO SCROLL - หลังเป่าเทียนไปที่ Gift
  useEffect(() => {
    if (cakeBlewCandles && giftSectionRef.current) {
      const scrollTimer = setTimeout(() => {
        giftSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 800);

      return () => clearTimeout(scrollTimer);
    }
  }, [cakeBlewCandles]);

  // 🔍 Debug logs
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎵 Current Time:', currentTime.toFixed(2));
      console.log('⏱️ Duration:', duration.toFixed(2));
      console.log('▶️ Is Playing:', isPlaying);
      console.log('🏁 Song Finished:', hasSongFinished);
      console.log('🎂 Cake Blew:', cakeBlewCandles);
    }
  }, [currentTime, duration, isPlaying, hasSongFinished, cakeBlewCandles]);

  if (!isMounted) {
    return null;
  }

  const currentColors = colorThemes[themeContext.currentTheme];

  // ==================== SCENE DATA ====================
  const sceneData: StoryScene = {
    id: 'scene-1',
    chapter: 1,
    title: 'อยากให้ทุกวันเป็นวันพิเศษ สำหรับจอม',
    story:
      'สำหรับคนอื่น แกอาจเป็นแค่เพื่อนคนหนึ่ง…แต่สำหรับเรา จอมคือคนที่ทำให้วันธรรมดา ๆ ดูมีอะไรให้รอคอยมากขึ้นทุกวัน',
    songTitle: 'นับหนึ่ง - Billkin',
    artist: 'Billkin',
    url: '/music/billkin-nabhong.mp3',
    meaning:
      'เพลงนี้สำหรับเรา สื่อถึงใครสักคนที่อยากให้เปิดวันเกิด ลองฟังดู 💚',
    color: currentColors.primary,
    accentColor: currentColors.accent,
    restrictedStart: 30,
    restrictedEnd: 102,
    lyrics,
    coverUrl: '/images/นับหนึ่ง.jpg',
  };

  // ==================== EVENT HANDLERS ====================
  const handlePlayStart = () => {
    console.log('✅ Play Start');
    setIsPlaying(true);
    setHasSongFinished(false);
  };

  const handlePlayEnd = () => {
    console.log('🏁 Play End');
    setIsPlaying(false);
    setHasSongFinished(true);
  };

  const handleTimeUpdate = (current: number, dur: number) => {
    setCurrentTime(current);
    setDuration(dur);
  };

  const handleThemeClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleThemeSelect = (theme: keyof typeof colorThemes) => {
    themeContext.setCurrentTheme(theme);
    setAnchorEl(null);
  };

  const handleMemoryClose = () => {
    setIsPlaying(false);
    setHasSongFinished(false);
  };

  // ✅ เป่าเทียนเสร็จ → scroll ไป Gift
  const handleBlowCandlesComplete = () => {
    console.log('🎂 เป่าเทียนเสร็จ → ไปที่ Gift');
    setCakeBlewCandles(true);
  };

  const handleGoToGift = () => {
    if (giftSectionRef.current) {
      giftSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  // ==================== RENDER ====================
  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        m: 0,
        p: 0,
        '& > *': {
          margin: 0,
          padding: 0,
        },
      }}
    >
      {/* ==================== THEME SWITCHER ==================== */}
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 2000,
        }}
      >
        <IconButton
          onClick={handleThemeClick}
          aria-label="เลือกธีม"
          title="เปลี่ยนธีมสี"
          sx={{
            background: `${currentColors.primary}20`,
            border: `2px solid ${currentColors.primary}`,
            color: currentColors.primary,
            transition: 'all 0.3s ease',
            '&:hover': {
              background: `${currentColors.primary}40`,
            },
          }}
        >
          <Palette />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            sx: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
            },
          }}
        >
          {Object.entries(colorThemes).map(([key, color]) => (
            <MenuItem
              key={key}
              onClick={() => handleThemeSelect(key as keyof typeof colorThemes)}
              selected={themeContext.currentTheme === key}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: `${color.primary}20`,
                  '&:hover': {
                    backgroundColor: `${color.primary}40`,
                  },
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: color.primary,
                  }}
                />
                {color.name}
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* ==================== BIRTHDAY SECTION ==================== */}
      <Box
        component="section"
        id="birthday-section"
        sx={{
          width: '100%',
          display: 'block',
          m: 0,
          p: 0,
        }}
      >
        <HappyBirthday />
      </Box>

      {/* ==================== MUSIC PLAYER SECTION ==================== */}
      <Box
        component="section"
        id="music-section"
        sx={{
          width: '100%',
          display: 'block',
          m: 0,
          p: 0,
        }}
      >
        <MusicPlayer
          scene={sceneData}
          onPlayStart={handlePlayStart}
          onPlayEnd={handlePlayEnd}
          onTimeUpdate={handleTimeUpdate}
        />
      </Box>

      {/* ==================== MEMORY GALLERY SECTION ==================== */}
      {isPlaying && (
        <Box
          ref={memorySectionRef}
          component="section"
          id="memory-section"
          sx={{
            width: '100%',
            display: 'block',
            m: 0,
            p: 0,
            animation: 'fadeInUp 0.6s ease-out',
            '@keyframes fadeInUp': {
              from: {
                opacity: 0,
                transform: 'translateY(30px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          <MemoryGallery
            memories={memoryImages}
            color={currentColors.primary}
            accentColor={currentColors.accent}
            currentTime={currentTime}
            duration={duration}
            isPlaying={isPlaying}
            songEnded={hasSongFinished}
            musicUrl={sceneData.url}
            onClose={handleMemoryClose}
            onGoToGift={handleGoToGift}
          />
        </Box>
      )}

      {/* ==================== CAKE SECTION (NEW) ==================== */}
      {hasSongFinished && (
        <Box
          ref={cakeSectionRef}
          component="section"
          id="cake-section"
          sx={{
            width: '100%',
            display: 'block',
            m: 0,
            p: 0,
            animation: 'fadeInUp 0.6s ease-out',
            '@keyframes fadeInUp': {
              from: {
                opacity: 0,
                transform: 'translateY(30px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          <Cake3D
            name="จอม"
            age={20}
            color={currentColors.primary}
            accentColor={currentColors.accent}
            onBlowCandles={handleBlowCandlesComplete}
          />
        </Box>
      )}

      {/* ==================== GIFT BOX SECTION ==================== */}
      {cakeBlewCandles && (
        <Box
          ref={giftSectionRef}
          component="section"
          id="gift-section"
          sx={{
            width: '100%',
            display: 'block',
            m: 0,
            p: 0,
            mt: 2,
            animation: 'fadeInUp 0.7s ease-out',
            '@keyframes fadeInUp': {
              from: {
                opacity: 0,
                transform: 'translateY(30px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          <GiftBox
            color={currentColors.primary}
            accentColor={currentColors.accent}
          />
        </Box>
      )}
    </Box>
  );
}
