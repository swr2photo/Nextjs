// 📁 src/app/theme/designSystem.ts
export const DESIGN_SYSTEM = {
  // ✅ Breakpoints
  breakpoints: {
    xs: 600,
    sm: 960,
    md: 1280,
    lg: 1920,
  },

  // ✅ Spacing
  spacing: {
    section: {
      pt: { xs: 8, sm: 12, md: 8 },
      pb: { xs: 20, sm: 20, md: 12 },
      px: { xs: 2, sm: 3, md: 4 },
    },
    card: {
      px: { xs: 2.5, sm: 3, md: 3.5 },
      py: { xs: 2, sm: 2.5, md: 3 },
    },
    button: {
      py: { xs: 0.9, sm: 1.1, md: 1.3 },
    },
  },

  // ✅ Typography - UNIFIED
  typography: {
    heading: {
      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
      fontWeight: 900,
      letterSpacing: '-0.02em',
    },
    subheading: {
      fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
      fontWeight: 800,
    },
    label: {
      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
      letterSpacing: '0.1em',
      textTransform: 'uppercase' as const,
      fontWeight: 800,
    },
    body: {
      fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' },
      lineHeight: 1.8,
    },
    bodySmall: {
      fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.05rem' },
      lineHeight: 1.7,
    },
  },

  // ✅ Border Radius
  borderRadius: {
    card: { xs: 3, sm: 3.5, md: 4 },
    button: 999,
  },

  // ✅ Colors & Gradients
  background: 'linear-gradient(135deg, #0f172a 0%, #0c0f1b 50%, #1a0f2e 100%)',
  cardBg: (accentColor: string) =>
    `linear-gradient(135deg, rgba(15,23,42,0.98), rgba(15,118,110,0.95))`,

  // ✅ Shadows
  shadows: {
    lifted: (color: string) => `
      0 40px 80px rgba(0,0,0,0.8),
      0 20px 40px ${color}44,
      inset -2px -2px 8px rgba(0,0,0,0.3),
      inset 2px 2px 8px rgba(255,255,255,0.2)
    `,
    card: `0 20px 50px rgba(0,0,0,0.95)`,
    button: (color: string) => `0 12px 32px ${color}66`,
    buttonHover: (color: string) => `0 16px 40px ${color}88`,
  },

  // ✅ Transitions
  transitions: {
    fast: 'all 0.2s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.6s ease',
  },

  // ✅ Animations
  animations: {
    pulse: `@keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.1); opacity: 0.9; }
    }`,
  },
};
