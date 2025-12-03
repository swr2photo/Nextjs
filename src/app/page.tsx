// src/app/page.tsx
import { Suspense } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import CountdownClient from './CountdownClient';

// ✅ ตั้งเวลาวันเกิด (5 ธ.ค. 2025 เวลา 03:00 น. ตามเวลาไทย)
const BIRTHDAY_TARGET = new Date('2025-12-04T05:01:00+07:00');

export default function Page() {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            minHeight: '100vh',
            width: '100%',
            background:
              'linear-gradient(135deg, #022c22 0%, #064e3b 40%, #020617 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography
            variant="subtitle1"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
            }}
          >
            กำลังเตรียมเซอร์ไพรส์ให้จอม... 💚
          </Typography>
        </Box>
      }
    >
      <CountdownClient birthdayTarget={BIRTHDAY_TARGET} />
    </Suspense>
  );
}
