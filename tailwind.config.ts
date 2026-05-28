import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'background-soft': 'var(--color-background-soft)',
        card: 'var(--color-card)',
        'card-soft': 'var(--color-card-soft)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        faint: 'var(--color-faint)',
        border: 'var(--color-border)',
        profit: 'var(--color-profit)',
        loss: 'var(--color-loss)',
        pink: 'var(--color-pink)',
        mint: 'var(--color-mint)',
        coral: 'var(--color-coral)',
        yellow: 'var(--color-yellow)',
        lavender: 'var(--color-lavender)',
        sky: 'var(--color-sky)',
      },
      borderRadius: {
        soft: 'var(--radius-soft)',
        card: 'var(--radius-card)',
        panel: 'var(--radius-panel)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        lifted: 'var(--shadow-lifted)',
      },
      fontFamily: {
        sans: [
          'Pretendard',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        display: ['ui-rounded', 'Pretendard', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
