// src/app/components/hooks/usePhotoCapture.ts

import { useCallback, useRef } from 'react';
import html2canvas from 'html2canvas';

export const usePhotoCapture = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  const capture = useCallback(async () => {
    if (!elementRef.current) return;

    try {
      const canvas = await html2canvas(elementRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });

      // ดาวน์โหลด
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `birthday-${new Date().toISOString().split('T')[0]}.png`;
      link.click();

      // Share
      if (navigator.share) {
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((b: Blob | null) => {
            if (b) resolve(b);
          }, 'image/png');
        });

        const file = new File([blob], 'birthday.png', { type: 'image/png' });
        await navigator.share({
          files: [file],
          title: 'My Birthday',
          text: 'Check out my birthday celebration!',
        });
      }
    } catch (error) {
      console.error('Capture error:', error);
    }
  }, []);

  return { capture, elementRef };
};
