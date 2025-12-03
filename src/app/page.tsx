// src/app/page.tsx
import CountdownClient from './CountdownClient';
import { Box } from '@mui/material';

// ตั้งเวลานับถอยหลัง (ตัวอย่าง: 5 ธ.ค. 2025 ตี 3 ตามเวลาไทย)
const BIRTHDAY_TARGET = new Date('2025-12-04T05:00:00+07:00');

export default function Page() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        width: '100%',
        background:
          'linear-gradient(135deg, #022c22 0%, #064e3b 40%, #020617 100%)',
      }}
    >
      <CountdownClient birthdayTarget={BIRTHDAY_TARGET} />
    </Box>
  );
}
