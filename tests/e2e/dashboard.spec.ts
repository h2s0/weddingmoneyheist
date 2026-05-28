import { expect, test } from '@playwright/test';

const widgetNames = ['아빠 자산', '수익률 추이', '보유 종목', '매매 기록'] as const;

test.describe('portfolio dashboard QA', () => {
  test('renders core widgets without page-level overflow', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: '아방이' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '대시보드' })).toBeVisible();

    for (const name of widgetNames) {
      await expect(page.getByRole('heading', { name })).toBeVisible();
    }

    await expect(page.getByText('11,247,500원')).toBeVisible();
    await expect(page.getByText('삼성전자').first()).toBeVisible();
    await expect(page.getByText('조정 구간 추가 매수')).toBeVisible();
    await expect(page.locator('.recharts-wrapper')).toBeVisible();

    const overflow = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));
    expect(overflow.documentWidth).toBeLessThanOrEqual(overflow.viewportWidth + 1);
  });

  test('supports dark mode persistence', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByRole('button', { name: '라이트 모드와 다크 모드 전환' });
    await toggle.click();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('keeps keyboard focus visible for primary controls', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: '라이트 모드와 다크 모드 전환' })).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: '레이아웃 초기화' })).toBeFocused();
  });

  test('can reset persisted dashboard layout', async ({ page }) => {
    await page.goto('/');

    await page.evaluate(() => {
      window.localStorage.setItem(
        'abangi.dashboardLayout.v1',
        JSON.stringify({
          state: {
            layout: {
              desktop: [
                { widgetId: 'portfolio-summary', x: 0, y: 10, width: 6, height: 3, minWidth: 4, minHeight: 3 },
                { widgetId: 'equity-curve', x: 6, y: 0, width: 6, height: 3, minWidth: 4, minHeight: 3 },
                { widgetId: 'holdings', x: 0, y: 3, width: 7, height: 4, minWidth: 5, minHeight: 3 },
                { widgetId: 'transactions', x: 7, y: 3, width: 5, height: 4, minWidth: 4, minHeight: 3 },
              ],
              tablet: [
                { widgetId: 'portfolio-summary', x: 0, y: 0, width: 6, height: 3, minWidth: 4, minHeight: 3 },
                { widgetId: 'equity-curve', x: 0, y: 3, width: 6, height: 3, minWidth: 4, minHeight: 3 },
                { widgetId: 'holdings', x: 0, y: 6, width: 6, height: 4, minWidth: 4, minHeight: 3 },
                { widgetId: 'transactions', x: 0, y: 10, width: 6, height: 4, minWidth: 4, minHeight: 3 },
              ],
              mobile: [
                { widgetId: 'portfolio-summary', x: 0, y: 0, width: 1, height: 3, minWidth: 1, minHeight: 3 },
                { widgetId: 'equity-curve', x: 0, y: 3, width: 1, height: 3, minWidth: 1, minHeight: 3 },
                { widgetId: 'holdings', x: 0, y: 6, width: 1, height: 4, minWidth: 1, minHeight: 3 },
                { widgetId: 'transactions', x: 0, y: 10, width: 1, height: 4, minWidth: 1, minHeight: 3 },
              ],
            },
          },
          version: 0,
        }),
      );
    });
    await page.reload();
    await page.getByRole('button', { name: '레이아웃 초기화' }).click();

    const summaryY = await page.evaluate(() => {
      const value = window.localStorage.getItem('abangi.dashboardLayout.v1');

      if (!value) {
        return null;
      }

      const parsed = JSON.parse(value) as {
        state?: {
          layout?: {
            desktop?: { widgetId: string; y: number }[];
          };
        };
      };

      return (
        parsed.state?.layout?.desktop?.find((item) => item.widgetId === 'portfolio-summary')?.y ??
        null
      );
    });
    expect(summaryY).toBe(0);
  });
});
