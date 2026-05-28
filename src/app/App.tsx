import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'abangi.theme';

const getInitialTheme = (): Theme => {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return 'light';
};

export function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <main className="min-h-screen bg-background px-5 py-6 text-foreground transition-colors duration-300 md:px-shell-x">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-soft bg-gradient-to-br from-pink to-lavender shadow-card">
              <span className="font-display text-xl" aria-hidden="true">
                아
              </span>
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold text-foreground">아방이</h1>
              <p className="mt-1 text-sm text-muted">아빠 위해 만든 포트폴리오</p>
            </div>
          </div>

          <Button onClick={toggleTheme} aria-label="라이트 모드와 다크 모드 전환">
            {theme === 'light' ? '다크 모드' : '라이트 모드'}
          </Button>
        </header>

        <DashboardGrid />
      </div>
    </main>
  );
}
