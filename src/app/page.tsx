// src/app/page.tsx
import CountdownClient from './CountdownClient';
import { Suspense } from 'react';
import { Box } from '@mui/material';

// ✅ ตั้งเวลาวันเกิด (แก้ตรงนี้ได้)
// ตัวอย่าง: 5 ธ.ค. 2025 เวลา 00:00 น.
const BIRTHDAY_TARGET = new Date('2025-12-05T00:00:00+07:00');
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
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      }
    >
      <CountdownClient birthdayTarget={BIRTHDAY_TARGET} />
    </Suspense>
  );
}
