import { useEffect, useState } from 'react';

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
    <main className="min-h-screen bg-background px-5 py-6 text-foreground transition-colors duration-300 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-soft bg-gradient-to-br from-pink to-lavender shadow-card">
              <span className="text-xl" aria-hidden="true">
                돼
              </span>
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold text-foreground">아방이</h1>
              <p className="mt-1 text-sm text-muted">아빠 위해 만든 포트폴리오</p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-4 text-sm font-semibold text-foreground shadow-card transition hover:bg-card-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
            onClick={toggleTheme}
            aria-label="라이트 모드와 다크 모드 전환"
          >
            {theme === 'light' ? '다크 모드' : '라이트 모드'}
          </button>
        </header>

        <section className="rounded-panel border border-dashed border-border bg-card p-6 shadow-card">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-muted">Phase 1</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-foreground">
              프로젝트 기반 설정 완료 대기
            </h2>
            <p className="mt-3 leading-7 text-muted">
              이 화면은 React, TypeScript, Vite, Tailwind CSS, CSS variable 기반 테마
              구조가 연결되었는지 확인하기 위한 최소 셸입니다. 위젯 구현은 다음 Phase에서
              진행합니다.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
