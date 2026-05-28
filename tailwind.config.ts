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
        'border-strong': 'var(--color-border-strong)',
        profit: 'var(--color-profit)',
        'profit-background': 'var(--color-profit-background)',
        loss: 'var(--color-loss)',
        'loss-background': 'var(--color-loss-background)',
        pink: 'var(--color-pink)',
        'pink-strong': 'var(--color-pink-strong)',
        mint: 'var(--color-mint)',
        'mint-strong': 'var(--color-mint-strong)',
        coral: 'var(--color-coral)',
        'coral-strong': 'var(--color-coral-strong)',
        yellow: 'var(--color-yellow)',
        'yellow-strong': 'var(--color-yellow-strong)',
        lavender: 'var(--color-lavender)',
        'lavender-strong': 'var(--color-lavender-strong)',
        sky: 'var(--color-sky)',
        'sky-strong': 'var(--color-sky-strong)',
      },
      borderRadius: {
        soft: 'var(--radius-soft)',
        card: 'var(--radius-card)',
        panel: 'var(--radius-panel)',
        pill: 'var(--radius-pill)',
      },
      spacing: {
        'widget-x': 'var(--space-widget-x)',
        'widget-y': 'var(--space-widget-y)',
        'shell-x': 'var(--space-shell-x)',
        'section-gap': 'var(--space-section-gap)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        card: 'var(--shadow-card)',
        panel: 'var(--shadow-panel)',
        lifted: 'var(--shadow-lifted)',
      },
      fontSize: {
        caption: ['var(--font-size-caption)', { lineHeight: 'var(--line-height-body)' }],
        body: ['var(--font-size-body)', { lineHeight: 'var(--line-height-body)' }],
        'body-lg': ['var(--font-size-body-lg)', { lineHeight: 'var(--line-height-body)' }],
        title: ['var(--font-size-title)', { lineHeight: 'var(--line-height-tight)' }],
        display: ['var(--font-size-display)', { lineHeight: 'var(--line-height-tight)' }],
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
