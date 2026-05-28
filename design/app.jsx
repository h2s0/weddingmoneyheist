// Main app — theme, drag-to-reorder, tweaks
const { useState, useEffect, useRef, useCallback } = React;

// Widget catalog. Each entry: render fn, default span (cols × rows on the 12-col grid).
const WIDGET_CATALOG = {
  summary:     { render: SummaryWidget,     span: { col: 6, row: 3 }, label: "자산 요약" },
  today:       { render: TodayWidget,       span: { col: 3, row: 2 }, label: "오늘 변동" },
  bestworst:   { render: BestWorstWidget,   span: { col: 3, row: 3 }, label: "효자/효녀" },
  chart:       { render: EquityChartWidget, span: { col: 6, row: 3 }, label: "수익률 추이" },
  allocation:  { render: AllocationWidget,  span: { col: 6, row: 3 }, label: "자산 배분" },
  holdings:    { render: HoldingsWidget,    span: { col: 7, row: 4 }, label: "보유 종목" },
  transactions:{ render: TransactionsWidget,span: { col: 5, row: 4 }, label: "매매 기록" },
  mascot:      { render: MascotWidget,      span: { col: 6, row: 2 }, label: "딸 한마디" },
};

const DEFAULT_ORDER = [
  "summary", "today", "bestworst",
  "chart", "allocation",
  "holdings", "transactions",
  "mascot",
];

const LS_ORDER = "abangi.widgetOrder.v1";
const LS_THEME = "abangi.theme";

function App() {
  // theme
  const [theme, setTheme] = useState(() => localStorage.getItem(LS_THEME) || 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(LS_THEME, theme);
  }, [theme]);

  // widget order
  const [order, setOrder] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_ORDER));
      if (Array.isArray(saved) && saved.every(id => WIDGET_CATALOG[id])) return saved;
    } catch {}
    return DEFAULT_ORDER;
  });
  useEffect(() => {
    localStorage.setItem(LS_ORDER, JSON.stringify(order));
  }, [order]);

  // tweaks
  const [tweaks, setTweak] = useTweaks(window.TWEAK_DEFAULTS);

  // drag state
  const [draggingId, setDraggingId] = useState(null);
  const [overId, setOverId] = useState(null);

  const handleDragStart = (id) => (e) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = 'move';
    // try setting drag image to the parent widget for better UX
    const widgetEl = e.currentTarget.closest('.widget');
    if (widgetEl) {
      const rect = widgetEl.getBoundingClientRect();
      e.dataTransfer.setDragImage(widgetEl, rect.width / 2, 30);
    }
    // required for some browsers
    try { e.dataTransfer.setData('text/plain', id); } catch {}
  };
  const handleDragEnd = () => { setDraggingId(null); setOverId(null); };
  const handleDragOver = (id) => (e) => {
    e.preventDefault();
    if (draggingId && draggingId !== id) setOverId(id);
  };
  const handleDrop = (id) => (e) => {
    e.preventDefault();
    if (!draggingId || draggingId === id) return;
    setOrder(curr => {
      const next = [...curr];
      const from = next.indexOf(draggingId);
      const to   = next.indexOf(id);
      if (from < 0 || to < 0) return curr;
      next.splice(from, 1);
      next.splice(to, 0, draggingId);
      return next;
    });
    setDraggingId(null);
    setOverId(null);
  };

  const resetLayout = () => {
    if (confirm('레이아웃을 처음 상태로 되돌릴까요?')) setOrder(DEFAULT_ORDER);
  };

  // accent override based on tweak
  const accentMap = {
    pink:     { mark: 'linear-gradient(135deg, #FFB6C8, #C9B8FF)' },
    mint:     { mark: 'linear-gradient(135deg, #8AD6B5, #A8D5FF)' },
    yellow:   { mark: 'linear-gradient(135deg, #FFD978, #FFB6C8)' },
    lavender: { mark: 'linear-gradient(135deg, #C9B8FF, #A8D5FF)' },
  };
  const accent = accentMap[tweaks.accent] || accentMap.pink;

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" style={{ background: accent.mark }}>
            <PigMascot size={32} />
          </div>
          <div>
            <div className="brand-name">아방이</div>
            <div className="brand-sub">아빠 위해 만든 포트폴리오</div>
          </div>
        </div>

        <div className="topbar-actions">
          <button className="pill-btn" onClick={resetLayout} title="레이아웃 초기화">
            <span style={{ fontSize: 14 }}>↺</span> 레이아웃 초기화
          </button>
          <div
            className="theme-toggle"
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            role="button" aria-label="다크모드 전환"
          >
            <div className="knob">{theme === 'light' ? '☀️' : '🌙'}</div>
          </div>
        </div>
      </header>

      <main className="shell">
        <div className="hint">
          <span>✋</span>
          <span>위젯 우측 상단 <strong style={{ color: 'var(--ink)' }}>⋮⋮</strong> 핸들을 잡고 다른 위젯에 놓으면 자리가 바뀌어요</span>
        </div>

        <div className="grid">
          {order.map(id => {
            const def = WIDGET_CATALOG[id];
            if (!def) return null;
            // hide mascot widget if tweak off
            if (id === 'mascot' && !tweaks.showMascot) return null;
            const W = def.render;
            return (
              <W
                key={id}
                id={id}
                span={def.span}
                isDragging={draggingId === id}
                isOver={overId === id && draggingId !== id}
                onDragStart={handleDragStart(id)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver(id)}
                onDrop={handleDrop(id)}
                showMascot={tweaks.showMascot}
                compactNumbers={tweaks.compactNumbers}
              />
            );
          })}
        </div>

        <footer style={{ marginTop: 40, textAlign: 'center', color: 'var(--ink-faint)', fontSize: 12 }}>
          <span>키움 OpenAPI 연동 · 5분마다 자동 새로고침</span>
        </footer>
      </main>

      {/* Tweaks panel — only shown when host toggle is on */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="외관">
          <TweakRadio
            label="포인트"
            value={tweaks.accent}
            options={[
              { value: 'pink',     label: '핑크' },
              { value: 'mint',     label: '민트' },
              { value: 'yellow',   label: '노랑' },
              { value: 'lavender', label: '라벤더' },
            ]}
            onChange={v => setTweak('accent', v)}
          />
          <TweakToggle
            label="마스코트 표시"
            value={tweaks.showMascot}
            onChange={v => setTweak('showMascot', v)}
          />
          <TweakRadio
            label="시작 테마"
            value={theme}
            options={[
              { value: 'light', label: '라이트' },
              { value: 'dark',  label: '다크' },
            ]}
            onChange={v => setTheme(v)}
          />
        </TweakSection>
        <TweakSection label="레이아웃">
          <TweakButton label="레이아웃 초기화" onClick={resetLayout} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// TweakColor in starter expects flat colors; we passed palettes (arrays). The
// starter handles both shapes, but its label list is derived from the colors —
// override below by using a custom value remap if necessary. We pass `labels`
// optionally; if the starter ignores it that's fine — swatches still render.

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
