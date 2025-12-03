'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, createContext, useContext, useEffect } from 'react';

export const colorThemes = {
  emerald: {
    primary: '#10b981',
    primaryRgb: '16, 185, 129',
    secondary: '#6ee7b7',
    secondaryRgb: '110, 231, 183',
    dark: '#0f766e',
    darkRgb: '15, 118, 110',
    paper: '#134e4a',
    accent: '#059669',
    accentRgb: '5, 150, 105',
    name: '🌿 Emerald Green',
  },
  purple: {
    primary: '#a855f7',
    primaryRgb: '168, 85, 247',
    secondary: '#d8b4fe',
    secondaryRgb: '216, 180, 254',
    dark: '#581c87',
    darkRgb: '88, 28, 135',
    paper: '#6b21a8',
    accent: '#c084fc',
    accentRgb: '192, 132, 252',
    name: '💜 Royal Purple',
  },
  blue: {
    primary: '#0ea5e9',
    primaryRgb: '14, 165, 233',
    secondary: '#06b6d4',
    secondaryRgb: '6, 182, 212',
    dark: '#0c4a6e',
    darkRgb: '12, 74, 110',
    paper: '#0e7490',
    accent: '#0284c7',
    accentRgb: '2, 132, 199',
    name: '💙 Ocean Blue',
  },
  rose: {
    primary: '#f43f5e',
    primaryRgb: '244, 63, 94',
    secondary: '#fb7185',
    secondaryRgb: '251, 113, 133',
    dark: '#881337',
    darkRgb: '136, 19, 55',
    paper: '#a11043',
    accent: '#e11d48',
    accentRgb: '225, 29, 72',
    name: '💗 Rose Pink',
  },
  orange: {
    primary: '#f59e0b',
    primaryRgb: '245, 158, 11',
    secondary: '#fbbf24',
    secondaryRgb: '251, 191, 36',
    dark: '#78350f',
    darkRgb: '120, 53, 15',
    paper: '#92400e',
    accent: '#ea580c',
    accentRgb: '234, 88, 12',
    name: '🧡 Sunset Orange',
  },
  cyan: {
    primary: '#06b6d4',
    primaryRgb: '6, 182, 212',
    secondary: '#22d3ee',
    secondaryRgb: '34, 211, 238',
    dark: '#164e63',
    darkRgb: '22, 78, 99',
    paper: '#155e75',
    accent: '#0891b2',
    accentRgb: '8, 145, 178',
    name: '🩵 Cyan Teal',
  },
};

// Theme Context
const ThemeContext = createContext<{
  currentTheme: keyof typeof colorThemes;
  setCurrentTheme: (theme: keyof typeof colorThemes) => void;
}>({
  currentTheme: 'emerald',
  setCurrentTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<keyof typeof colorThemes>(
    'emerald'
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const colors = colorThemes[currentTheme];
    const root = document.documentElement;

    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-primary-rgb', colors.primaryRgb);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-secondary-rgb', colors.secondaryRgb);
    root.style.setProperty('--color-dark', colors.dark);
    root.style.setProperty('--color-dark-rgb', colors.darkRgb);
    root.style.setProperty('--color-paper', colors.paper);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-accent-rgb', colors.accentRgb);

    if (mounted) {
      localStorage.setItem('theme', currentTheme);
    }
  }, [currentTheme, mounted]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as
      | keyof typeof colorThemes
      | null;
    if (savedTheme && colorThemes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const colors = colorThemes[currentTheme];

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
      background: {
        default: colors.dark,
        paper: colors.paper,
      },
    },
    typography: {
      fontFamily: 'var(--font-noto-sans-thai), sans-serif',
    },
  });

  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
