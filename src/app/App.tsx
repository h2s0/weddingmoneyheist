import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/common/Card';
import { WidgetCard } from '@/components/widgets/WidgetCard';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'abangi.theme';
const colorSwatches = [
  { label: '핑크', className: 'bg-pink' },
  { label: '민트', className: 'bg-mint' },
  { label: '코랄', className: 'bg-coral' },
  { label: '노랑', className: 'bg-yellow' },
  { label: '라벤더', className: 'bg-lavender' },
  { label: '하늘', className: 'bg-sky' },
] as const;

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

        <div className="grid gap-section-gap lg:grid-cols-[1fr_360px]">
          <WidgetCard title="자산 요약" eyebrow="포트폴리오" icon="💰">
            <div className="flex flex-1 flex-col justify-between gap-8">
              <div>
                <p className="text-caption font-semibold text-muted">총 평가금액</p>
                <p className="mt-2 font-display text-display text-foreground">-- 원</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-pill bg-profit-background px-3 py-1 text-caption font-semibold text-profit">
                    수익 준비 중
                  </span>
                  <span className="rounded-pill bg-background-soft px-3 py-1 text-caption font-semibold text-muted">
                    목데이터 연결 전
                  </span>
                </div>
              </div>
              <div className="grid gap-3 border-t border-dashed border-border pt-4 sm:grid-cols-2">
                <div>
                  <p className="text-caption text-muted">원금</p>
                  <p className="mt-1 text-body-lg font-semibold text-foreground">-- 원</p>
                </div>
                <div>
                  <p className="text-caption text-muted">예수금</p>
                  <p className="mt-1 text-body-lg font-semibold text-foreground">-- 원</p>
                </div>
              </div>
            </div>
          </WidgetCard>

          <Card variant="soft">
            <CardHeader>
              <CardTitle>디자인 토큰</CardTitle>
              <CardDescription>레퍼런스의 부드러운 색감과 카드 질감을 기준으로 잡았습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {colorSwatches.map((swatch) => (
                  <div key={swatch.label} className="flex flex-col gap-2">
                    <span className={`h-10 rounded-soft shadow-soft ${swatch.className}`} />
                    <span className="text-caption font-semibold text-muted">{swatch.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>공통 컴포넌트</CardTitle>
              <CardDescription>버튼과 카드의 기본 상태를 같은 토큰 위에서 공유합니다.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button variant="primary">주요 버튼</Button>
              <Button variant="secondary">보조 버튼</Button>
              <Button variant="ghost">가벼운 버튼</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
