// Widget components. All read globals from data.jsx.
const { useState, useEffect, useRef, useMemo } = React;

// ─────────────────────────────────────────────────────────────────────
// Pig mascot built from basic shapes
function PigMascot({ size = 96, mood = "happy" }) {
  const eye = mood === "sleep" ? <line x1="-6" y1="0" x2="6" y2="0" stroke="#3a2530" strokeWidth="2" strokeLinecap="round" /> : <circle r="2.4" fill="#3a2530" />;
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" className="bob">
      {/* ears */}
      <circle cx="-22" cy="-22" r="11" fill="var(--pink)" />
      <circle cx="22" cy="-22" r="11" fill="var(--pink)" />
      <circle cx="-22" cy="-22" r="6" fill="var(--pink-deep)" />
      <circle cx="22" cy="-22" r="6" fill="var(--pink-deep)" />
      {/* head */}
      <circle cx="0" cy="2" r="32" fill="var(--pink)" />
      {/* cheeks */}
      <circle cx="-18" cy="10" r="6" fill="var(--coral)" opacity="0.55" />
      <circle cx="18" cy="10" r="6" fill="var(--coral)" opacity="0.55" />
      {/* snout */}
      <ellipse cx="0" cy="8" rx="14" ry="10" fill="var(--pink-deep)" />
      <circle cx="-5" cy="8" r="2.2" fill="#3a2530" />
      <circle cx="5" cy="8" r="2.2" fill="#3a2530" />
      {/* eyes */}
      <g transform="translate(-11 -4)">{eye}</g>
      <g transform="translate(11 -4)">{eye}</g>
    </svg>
  );
}

// little bear face — alt
function BearMascot({ size = 96 }) {
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" className="bob">
      <circle cx="-22" cy="-22" r="11" fill="#C49A78" />
      <circle cx="22" cy="-22" r="11" fill="#C49A78" />
      <circle cx="-22" cy="-22" r="6" fill="#F2C9A1" />
      <circle cx="22" cy="-22" r="6" fill="#F2C9A1" />
      <circle cx="0" cy="2" r="32" fill="#D8AC83" />
      <ellipse cx="0" cy="10" rx="16" ry="13" fill="#F4D7B5" />
      <circle cx="-11" cy="-4" r="2.4" fill="#3a2530" />
      <circle cx="11" cy="-4" r="2.4" fill="#3a2530" />
      <ellipse cx="0" cy="6" rx="3.6" ry="2.4" fill="#3a2530" />
      <circle cx="-18" cy="10" r="5" fill="#F1A6A1" opacity="0.45" />
      <circle cx="18" cy="10" r="5" fill="#F1A6A1" opacity="0.45" />
    </svg>
  );
}

// drag handle (six dots)
function DragHandle() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="4" cy="3" r="1.3" fill="currentColor" />
      <circle cx="10" cy="3" r="1.3" fill="currentColor" />
      <circle cx="4" cy="7" r="1.3" fill="currentColor" />
      <circle cx="10" cy="7" r="1.3" fill="currentColor" />
      <circle cx="4" cy="11" r="1.3" fill="currentColor" />
      <circle cx="10" cy="11" r="1.3" fill="currentColor" />
    </svg>
  );
}

function Widget({ id, title, emoji, span, children, onDragStart, onDragEnd, onDragOver, onDrop, isDragging, isOver, accent }) {
  return (
    <section
      className={`widget ${isDragging ? 'dragging' : ''} ${isOver ? 'drop-target' : ''}`}
      style={{
        gridColumn: `span ${span.col}`,
        gridRow: `span ${span.row}`,
        ...(accent ? { '--widget-accent': accent } : {}),
      }}
      data-widget-id={id}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <header className="widget-head">
        {emoji && <span className="widget-emoji" aria-hidden>{emoji}</span>}
        <div className="widget-title">{title}</div>
        <div
          className="drag-handle"
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          title="끌어서 옮기기"
        >
          <DragHandle />
        </div>
      </header>
      <div className="widget-body">{children}</div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 1. Summary — hero card
function SummaryWidget(props) {
  const { showMascot } = props;
  const isGain = totalPnl >= 0;
  return (
    <Widget {...props} title="아빠 자산" emoji="💰">
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', flex: 1 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="label">총 평가금액</div>
            <div className="big-num num" style={{ marginTop: 4 }}>{fmtKRW(totalAssets)}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <span className={`chip ${isGain ? 'gain' : 'loss'}`}>
                {isGain ? '▲' : '▼'} {fmtKRW(Math.abs(totalPnl))}
              </span>
              <span className={`chip ${isGain ? 'gain' : 'loss'}`}>
                {fmtPct(totalPnlPct)}
              </span>
              <span className="chip neutral">원금 대비</span>
            </div>
          </div>
          <div style={{
            marginTop: 18,
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
            paddingTop: 14, borderTop: '1px dashed var(--line)',
          }}>
            <div>
              <div className="label">원금</div>
              <div className="num" style={{ fontSize: 18, marginTop: 2, fontWeight: 600 }}>{fmtKRW(PORTFOLIO.principal)}</div>
            </div>
            <div>
              <div className="label">예수금</div>
              <div className="num" style={{ fontSize: 18, marginTop: 2, fontWeight: 600 }}>{fmtKRW(PORTFOLIO.cash)}</div>
            </div>
          </div>
        </div>
        {showMascot && (
          <div style={{ flexShrink: 0, paddingTop: 4 }}>
            <PigMascot size={92} />
          </div>
        )}
      </div>
    </Widget>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 2. Today change
function TodayWidget(props) {
  const isGain = PORTFOLIO.todayChange >= 0;
  return (
    <Widget {...props} title="오늘" emoji="✨">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="label">오늘 변동</div>
        <div className={`mid-num num ${isGain ? 'gain' : 'loss'}`} style={{ marginTop: 4 }}>
          {isGain ? '+' : '−'}{fmtKRW(Math.abs(PORTFOLIO.todayChange))}
        </div>
        <div style={{ marginTop: 8 }}>
          <span className={`chip ${isGain ? 'gain' : 'loss'}`}>
            {fmtPct(PORTFOLIO.todayChangePct)} 오늘
          </span>
        </div>
        <div style={{ marginTop: 'auto', fontSize: 12, color: 'var(--ink-soft)' }}>
          5월 27일 · 장중 14:32 기준
        </div>
      </div>
    </Widget>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 3. Equity curve chart
function EquityChartWidget(props) {
  const wRef = useRef(null);
  const [dims, setDims] = useState({ w: 400, h: 180 });
  useEffect(() => {
    if (!wRef.current) return;
    const ro = new ResizeObserver(([e]) => setDims({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(wRef.current);
    return () => ro.disconnect();
  }, []);

  const data = EQUITY_CURVE;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padX = 8, padY = 18;
  const W = Math.max(dims.w, 200);
  const H = Math.max(dims.h - 30, 80);
  const stepX = (W - padX * 2) / (data.length - 1);
  const points = data.map((v, i) => [padX + i * stepX, padY + (H - padY * 2) * (1 - (v - min) / range)]);
  const path = points.map(([x,y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = `${path} L ${points[points.length-1][0].toFixed(1)} ${H - padY} L ${padX} ${H - padY} Z`;

  const isGain = data[data.length-1] > data[0];
  const colorTop = isGain ? 'var(--mint-deep)' : 'var(--coral-deep)';
  const colorBg  = isGain ? 'var(--gain-bg)' : 'var(--loss-bg)';
  const last = points[points.length - 1];

  return (
    <Widget {...props} title="수익률 추이" emoji="📈">
      <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', marginBottom: 6 }}>
        <div>
          <span className="display" style={{ fontSize: 22 }}>{fmtPct(totalPnlPct)}</span>
          <span className="label" style={{ marginLeft: 8 }}>30일</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {['1주', '1달', '3달', '전체'].map((l, i) => (
            <button key={l} className="pill-btn" style={{ height: 26, padding: '0 10px', fontSize: 11, background: i === 1 ? 'var(--bg-soft)' : 'transparent' }}>{l}</button>
          ))}
        </div>
      </div>
      <div ref={wRef} style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={colorTop} stopOpacity="0.28" />
              <stop offset="100%" stopColor={colorTop} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* grid dashes */}
          {[0.25, 0.5, 0.75].map(f => (
            <line key={f} x1={padX} x2={W - padX} y1={padY + (H - padY * 2) * f} y2={padY + (H - padY * 2) * f}
                  stroke="var(--line)" strokeDasharray="2 4" />
          ))}
          <path d={area} fill="url(#grad)" />
          <path d={path} fill="none" stroke={colorTop} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={last[0]} cy={last[1]} r="5" fill={colorTop} stroke="var(--card)" strokeWidth="2.5" />
        </svg>
      </div>
    </Widget>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 4. Allocation donut + legend
function AllocationWidget(props) {
  const items = useMemo(() => {
    const all = [
      ...HOLDINGS.map(h => ({ name: h.name, value: h.value, color: h.accent })),
      { name: '예수금', value: PORTFOLIO.cash, color: 'var(--ink-faint)' },
    ];
    return all;
  }, []);
  const total = items.reduce((s, i) => s + i.value, 0);

  // donut math
  const R = 52, C = 2 * Math.PI * R;
  let cum = 0;
  const segs = items.map(it => {
    const frac = it.value / total;
    const dash = frac * C;
    const offset = -cum;
    cum += dash;
    return { ...it, frac, dash, offset };
  });

  return (
    <Widget {...props} title="자산 배분" emoji="🥧">
      <div style={{ display: 'flex', gap: 18, alignItems: 'center', flex: 1, minHeight: 0 }}>
        <div style={{ flexShrink: 0, position: 'relative', width: 130, height: 130 }}>
          <svg width="130" height="130" viewBox="-65 -65 130 130" style={{ transform: 'rotate(-90deg)' }}>
            <circle r={R} fill="none" stroke="var(--bg-soft)" strokeWidth="14" />
            {segs.map((s, i) => (
              <circle key={i} r={R} fill="none" stroke={s.color} strokeWidth="14"
                      strokeDasharray={`${s.dash} ${C - s.dash}`}
                      strokeDashoffset={s.offset}
                      strokeLinecap="butt" />
            ))}
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="label">종목수</div>
            <div className="display" style={{ fontSize: 22 }}>{HOLDINGS.length}</div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0, overflow: 'auto', maxHeight: '100%' }}>
          {segs.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0', fontSize: 13 }}>
              <span style={{ width: 10, height: 10, borderRadius: 4, background: s.color, flexShrink: 0 }} />
              <span style={{ flex: 1, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</span>
              <span className="num" style={{ color: 'var(--ink-soft)', fontWeight: 600 }}>{(s.frac * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </Widget>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 5. Holdings table
function HoldingsWidget(props) {
  const sorted = useMemo(() => [...HOLDINGS].sort((a, b) => b.value - a.value), []);
  return (
    <Widget {...props} title="보유 종목" emoji="🛒">
      <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        <div className="row head">
          <div>종목</div>
          <div style={{ textAlign: 'right' }}>평가액</div>
          <div style={{ textAlign: 'right' }}>수익률</div>
          <div style={{ textAlign: 'right' }}>비중</div>
        </div>
        {sorted.map(h => {
          const pct = (h.value / holdingsTotal) * 100;
          const isGain = h.pnl >= 0;
          return (
            <div key={h.ticker} className="row">
              <div className="stock-name">
                <span className="stock-avatar" style={{ background: h.color }}>{h.name[0]}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>{h.shares}주 · 평단 {fmt(h.avg)}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }} className="num">
                <div style={{ fontWeight: 600 }}>{fmtCompactKRW(h.value)}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>{fmt(h.price)}원</div>
              </div>
              <div style={{ textAlign: 'right' }} className="num">
                <div className={isGain ? 'gain' : 'loss'} style={{ fontWeight: 700 }}>{fmtPct(h.pnlPct)}</div>
                <div className={`num ${isGain ? 'gain' : 'loss'}`} style={{ fontSize: 11, opacity: 0.85 }}>
                  {isGain ? '+' : '−'}{fmtCompactKRW(Math.abs(h.pnl))}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="num" style={{ fontWeight: 600 }}>{pct.toFixed(1)}%</div>
                <div className="alloc-bar" style={{ marginTop: 4 }}>
                  <div className="alloc-seg" style={{ width: `${pct}%`, background: h.accent }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Widget>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 6. Transactions
function TransactionsWidget(props) {
  return (
    <Widget {...props} title="매매 기록" emoji="📒">
      <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        {TRANSACTIONS.map((t, i) => {
          const total = t.shares * t.price;
          const isBuy = t.type === 'buy';
          return (
            <div key={i} className="tx">
              <span className={`tx-icon ${isBuy ? 'buy' : 'sell'}`}>{isBuy ? '매수' : '매도'}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 600 }}>{t.name}</span>
                  <span className="num" style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{t.shares}주 × {fmt(t.price)}원</span>
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', marginTop: 2 }}>
                  {t.date.slice(5)} {t.note && <span>· {t.note}</span>}
                </div>
              </div>
              <div className="num" style={{ fontWeight: 700, color: isBuy ? 'var(--ink)' : 'var(--loss)', whiteSpace: 'nowrap' }}>
                {isBuy ? '−' : '+'}{fmtCompactKRW(total)}
              </div>
            </div>
          );
        })}
      </div>
    </Widget>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 7. Mascot message
function MascotWidget(props) {
  const msgs = [
    "오늘도 든든하게 +1.21% 올랐어요!",
    "아빠 안심하세요, 분산 잘 되어있어요.",
    "수익실현 한 LG엔솔로 카카오 추가매수 했어요.",
    "다음주 실적 발표 있는 종목이 2개 있어요.",
  ];
  return (
    <Widget {...props} title="딸 한마디" emoji="💌">
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', flex: 1 }}>
        <div style={{ flexShrink: 0 }}>
          <PigMascot size={64} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="bubble">
            {msgs[0]}
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: 'var(--ink-soft)' }}>
            마지막 업데이트 · 오늘 14:32
          </div>
        </div>
      </div>
    </Widget>
  );
}

// 8. Best/worst quick stat
function BestWorstWidget(props) {
  const sorted = [...HOLDINGS].sort((a, b) => b.pnlPct - a.pnlPct);
  const best = sorted[0], worst = sorted[sorted.length - 1];
  return (
    <Widget {...props} title="오늘의 효자/효녀" emoji="🏆">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--gain-bg)', borderRadius: 14 }}>
          <span style={{ fontSize: 20 }}>🥇</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{best.name}</div>
            <div className="label">이번달 최고 효자</div>
          </div>
          <div className="num gain" style={{ fontWeight: 700, fontSize: 16 }}>{fmtPct(best.pnlPct)}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--loss-bg)', borderRadius: 14 }}>
          <span style={{ fontSize: 20 }}>💧</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{worst.name}</div>
            <div className="label">조금 쉬는 중</div>
          </div>
          <div className="num loss" style={{ fontWeight: 700, fontSize: 16 }}>{fmtPct(worst.pnlPct)}</div>
        </div>
      </div>
    </Widget>
  );
}

Object.assign(window, {
  Widget, PigMascot, BearMascot, DragHandle,
  SummaryWidget, TodayWidget, EquityChartWidget, AllocationWidget,
  HoldingsWidget, TransactionsWidget, MascotWidget, BestWorstWidget,
});
