// Mock data approximating 키움 API responses
const PORTFOLIO = {
  principal: 10_000_000, // 원금 (아빠가 입금하신 돈)
  current: 11_247_500,   // 현재 평가액
  cash: 506_180,         // 예수금
  todayChange: 134_200,
  todayChangePct: 1.21,
  startedAt: "2026-02-12",
};

const HOLDINGS = [
  { ticker: "005930", name: "삼성전자",          shares: 70, avg: 65_000, price: 72_300, color: "var(--sky)",    accent: "var(--sky-deep)" },
  { ticker: "000660", name: "SK하이닉스",        shares: 15, avg: 135_000, price: 148_500, color: "var(--mint)",   accent: "var(--mint-deep)" },
  { ticker: "035420", name: "NAVER",            shares: 12, avg: 195_000, price: 178_500, color: "var(--lav)",    accent: "var(--lav-deep)" },
  { ticker: "035720", name: "카카오",            shares: 30, avg: 52_000, price: 58_400, color: "var(--yellow)", accent: "var(--yellow-deep)" },
  { ticker: "005380", name: "현대차",            shares: 8,  avg: 240_000, price: 268_000, color: "var(--pink)",   accent: "var(--pink-deep)" },
];

const TRANSACTIONS = [
  { date: "2026-05-26", type: "buy",  ticker: "005930", name: "삼성전자",     shares: 10, price: 72_000,  note: "조정 들어와서 추가매수" },
  { date: "2026-05-24", type: "sell", ticker: "373220", name: "LG에너지솔루션", shares: 5,  price: 380_000, note: "+18% 익절" },
  { date: "2026-05-22", type: "buy",  ticker: "035420", name: "NAVER",        shares: 5,  price: 195_000, note: "AI 모멘텀" },
  { date: "2026-05-20", type: "buy",  ticker: "035720", name: "카카오",        shares: 20, price: 51_500,  note: "" },
  { date: "2026-05-15", type: "buy",  ticker: "000660", name: "SK하이닉스",   shares: 5,  price: 142_000, note: "" },
  { date: "2026-05-10", type: "buy",  ticker: "005930", name: "삼성전자",     shares: 60, price: 63_800,  note: "초기 매수" },
];

// 30-day equity curve (in 만원 — multiplied later)
const EQUITY_CURVE = [
  1000, 1004, 1012, 1008, 1015, 1023, 1031, 1024, 1018, 1029,
  1041, 1055, 1062, 1058, 1067, 1078, 1085, 1079, 1091, 1102,
  1098, 1107, 1115, 1110, 1118, 1126, 1119, 1131, 1119, 1124.75,
];

// helpers
const fmt = (n, opts={}) => {
  const { sign=false, decimals=0, suffix='' } = opts;
  if (n === null || n === undefined || Number.isNaN(n)) return '–';
  const s = (sign && n > 0 ? '+' : '') + n.toLocaleString('ko-KR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return s + suffix;
};

const fmtKRW = (n) => fmt(n, { decimals: 0 }) + '원';
const fmtCompactKRW = (n) => {
  if (Math.abs(n) >= 1_0000_0000) return (n / 1_0000_0000).toFixed(2) + '억';
  if (Math.abs(n) >= 1_0000)      return Math.round(n / 1_0000) + '만';
  return fmt(n) + '원';
};
const fmtPct = (n, decimals=2) => (n > 0 ? '+' : '') + n.toFixed(decimals) + '%';

// derive holdings stats
const derivedHoldings = HOLDINGS.map(h => {
  const value = h.shares * h.price;
  const cost  = h.shares * h.avg;
  const pnl   = value - cost;
  const pnlPct = (pnl / cost) * 100;
  return { ...h, value, cost, pnl, pnlPct };
});
const holdingsTotal = derivedHoldings.reduce((s, h) => s + h.value, 0);
const totalAssets   = holdingsTotal + PORTFOLIO.cash;
const totalPnl      = totalAssets - PORTFOLIO.principal;
const totalPnlPct   = (totalPnl / PORTFOLIO.principal) * 100;

Object.assign(window, {
  PORTFOLIO, HOLDINGS: derivedHoldings, TRANSACTIONS, EQUITY_CURVE,
  fmt, fmtKRW, fmtCompactKRW, fmtPct,
  holdingsTotal, totalAssets, totalPnl, totalPnlPct,
});
