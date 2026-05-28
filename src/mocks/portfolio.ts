import type {
  AllocationItem,
  ApiHolding,
  ApiPortfolioSummary,
  ApiTransaction,
  DashboardLayout,
  DashboardWidget,
  EquityCurvePoint,
  Holding,
  MockAsyncState,
  PortfolioSummary,
  Transaction,
} from '@/types';

type MockStateKey = 'loading' | 'error' | 'empty' | 'success';

const defaultSwatch = { colorToken: 'var(--color-sky)', accentToken: 'var(--color-sky-strong)' } as const;

const palette = [
  { colorToken: 'var(--color-sky)', accentToken: 'var(--color-sky-strong)' },
  { colorToken: 'var(--color-mint)', accentToken: 'var(--color-mint-strong)' },
  { colorToken: 'var(--color-lavender)', accentToken: 'var(--color-lavender-strong)' },
  { colorToken: 'var(--color-yellow)', accentToken: 'var(--color-yellow-strong)' },
  { colorToken: 'var(--color-pink)', accentToken: 'var(--color-pink-strong)' },
] as const;

export const mockApiPortfolioSummary: ApiPortfolioSummary = {
  principalAmount: 10_000_000,
  evaluatedAmount: 10_741_320,
  cashBalance: 506_180,
  dailyProfitLossAmount: 134_200,
  dailyProfitLossRate: 1.21,
  baseDate: '2026-05-28',
};

export const mockApiHoldings: ApiHolding[] = [
  {
    stockCode: '005930',
    stockName: '삼성전자',
    quantity: 70,
    averagePurchasePrice: 65_000,
    currentPrice: 72_300,
  },
  {
    stockCode: '000660',
    stockName: 'SK하이닉스',
    quantity: 15,
    averagePurchasePrice: 135_000,
    currentPrice: 148_500,
  },
  {
    stockCode: '035420',
    stockName: 'NAVER',
    quantity: 12,
    averagePurchasePrice: 195_000,
    currentPrice: 178_500,
  },
  {
    stockCode: '035720',
    stockName: '카카오',
    quantity: 30,
    averagePurchasePrice: 52_000,
    currentPrice: 58_400,
  },
  {
    stockCode: '005380',
    stockName: '현대차',
    quantity: 8,
    averagePurchasePrice: 240_000,
    currentPrice: 268_000,
  },
];

export const mockApiTransactions: ApiTransaction[] = [
  {
    tradeDate: '2026-05-26',
    tradeType: 'buy',
    stockCode: '005930',
    stockName: '삼성전자',
    quantity: 10,
    tradePrice: 72_000,
    memo: '조정 구간 추가 매수',
  },
  {
    tradeDate: '2026-05-24',
    tradeType: 'sell',
    stockCode: '373220',
    stockName: 'LG에너지솔루션',
    quantity: 5,
    tradePrice: 380_000,
    memo: '일부 수익 실현',
  },
  {
    tradeDate: '2026-05-22',
    tradeType: 'buy',
    stockCode: '035420',
    stockName: 'NAVER',
    quantity: 5,
    tradePrice: 195_000,
    memo: '장기 보유 목적',
  },
  {
    tradeDate: '2026-05-20',
    tradeType: 'buy',
    stockCode: '035720',
    stockName: '카카오',
    quantity: 20,
    tradePrice: 51_500,
    memo: null,
  },
];

const toPortfolioSummary = (apiSummary: ApiPortfolioSummary): PortfolioSummary => {
  const currentValue = apiSummary.evaluatedAmount + apiSummary.cashBalance;
  const totalProfit = currentValue - apiSummary.principalAmount;
  const totalProfitRate = (totalProfit / apiSummary.principalAmount) * 100;

  return {
    principal: apiSummary.principalAmount,
    currentValue,
    cash: apiSummary.cashBalance,
    totalProfit,
    totalProfitRate,
    todayChange: apiSummary.dailyProfitLossAmount,
    todayChangeRate: apiSummary.dailyProfitLossRate,
    startedAt: '2026-02-12',
    updatedAt: apiSummary.baseDate,
    currency: 'KRW',
  };
};

const toHoldings = (apiHoldings: ApiHolding[]): Holding[] => {
  const holdingValues = apiHoldings.map((holding) => holding.quantity * holding.currentPrice);
  const holdingsTotal = holdingValues.reduce((total, value) => total + value, 0);

  return apiHoldings.map((holding, index) => {
    const purchaseAmount = holding.quantity * holding.averagePurchasePrice;
    const evaluationAmount = holding.quantity * holding.currentPrice;
    const profit = evaluationAmount - purchaseAmount;
    const profitRate = purchaseAmount === 0 ? 0 : (profit / purchaseAmount) * 100;
    const swatch = palette[index % palette.length] ?? defaultSwatch;

    return {
      id: holding.stockCode,
      ticker: holding.stockCode,
      name: holding.stockName,
      shares: holding.quantity,
      averagePrice: holding.averagePurchasePrice,
      currentPrice: holding.currentPrice,
      purchaseAmount,
      evaluationAmount,
      profit,
      profitRate,
      weight: holdingsTotal === 0 ? 0 : (evaluationAmount / holdingsTotal) * 100,
      colorToken: swatch.colorToken,
      accentToken: swatch.accentToken,
    };
  });
};

const toTransactions = (apiTransactions: ApiTransaction[]): Transaction[] =>
  apiTransactions.map((transaction) => ({
    id: `${transaction.tradeDate}-${transaction.tradeType}-${transaction.stockCode}-${String(transaction.quantity)}`,
    date: transaction.tradeDate,
    type: transaction.tradeType,
    ticker: transaction.stockCode,
    name: transaction.stockName,
    quantity: transaction.quantity,
    price: transaction.tradePrice,
    totalAmount: transaction.quantity * transaction.tradePrice,
    note: transaction.memo,
  }));

export const mockPortfolioSummary = toPortfolioSummary(mockApiPortfolioSummary);
export const mockHoldings = toHoldings(mockApiHoldings);
export const mockTransactions = toTransactions(mockApiTransactions);

export const mockEquityCurve: EquityCurvePoint[] = [
  { date: '2026-04-29', totalValue: 10_000_000, profitRate: 0 },
  { date: '2026-05-03', totalValue: 10_120_000, profitRate: 1.2 },
  { date: '2026-05-07', totalValue: 10_080_000, profitRate: 0.8 },
  { date: '2026-05-11', totalValue: 10_310_000, profitRate: 3.1 },
  { date: '2026-05-15', totalValue: 10_550_000, profitRate: 5.5 },
  { date: '2026-05-19', totalValue: 10_790_000, profitRate: 7.9 },
  { date: '2026-05-23', totalValue: 10_670_000, profitRate: 6.7 },
  { date: '2026-05-28', totalValue: 11_247_500, profitRate: 12.48 },
];

export const mockAllocationItems: AllocationItem[] = [
  ...mockHoldings.map((holding) => ({
    id: holding.id,
    label: holding.name,
    value: holding.evaluationAmount,
    weight: (holding.evaluationAmount / mockPortfolioSummary.currentValue) * 100,
    colorToken: holding.accentToken,
  })),
  {
    id: 'cash',
    label: '예수금',
    value: mockPortfolioSummary.cash,
    weight: (mockPortfolioSummary.cash / mockPortfolioSummary.currentValue) * 100,
    colorToken: 'var(--color-faint)',
  },
];

export const dashboardWidgets: DashboardWidget[] = [
  {
    id: 'portfolio-summary',
    kind: 'summary',
    title: '자산 요약',
    description: '총 자산, 평가 손익, 수익률, 예수금을 보여줍니다.',
    defaultVisible: true,
  },
  {
    id: 'holdings',
    kind: 'holdings',
    title: '보유 종목',
    description: '종목별 평가금액, 손익, 수익률, 비중을 보여줍니다.',
    defaultVisible: true,
  },
  {
    id: 'transactions',
    kind: 'transactions',
    title: '매매 기록',
    description: '최근 매수와 매도 내역을 시간순으로 보여줍니다.',
    defaultVisible: true,
  },
  {
    id: 'equity-curve',
    kind: 'equity-curve',
    title: '수익률 추이',
    description: '기간별 평가금액과 수익률 흐름을 보여줍니다.',
    defaultVisible: true,
  },
];

export const defaultDashboardLayout: DashboardLayout = {
  desktop: [
    { widgetId: 'portfolio-summary', x: 0, y: 0, width: 6, height: 3, minWidth: 4, minHeight: 3 },
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
};

export const portfolioSummaryStates: Record<MockStateKey, MockAsyncState<PortfolioSummary>> = {
  loading: { status: 'loading' },
  error: { status: 'error', message: '포트폴리오 정보를 불러오지 못했습니다.' },
  empty: {
    status: 'empty',
    data: {
      principal: 0,
      currentValue: 0,
      cash: 0,
      totalProfit: 0,
      totalProfitRate: 0,
      todayChange: 0,
      todayChangeRate: 0,
      startedAt: '2026-05-28',
      updatedAt: '2026-05-28',
      currency: 'KRW',
    },
  },
  success: { status: 'success', data: mockPortfolioSummary },
};

export const holdingStates: Record<MockStateKey, MockAsyncState<Holding[]>> = {
  loading: { status: 'loading' },
  error: { status: 'error', message: '보유 종목을 불러오지 못했습니다.' },
  empty: { status: 'empty', data: [] },
  success: { status: 'success', data: mockHoldings },
};

export const transactionStates: Record<MockStateKey, MockAsyncState<Transaction[]>> = {
  loading: { status: 'loading' },
  error: { status: 'error', message: '매매 기록을 불러오지 못했습니다.' },
  empty: { status: 'empty', data: [] },
  success: { status: 'success', data: mockTransactions },
};

export const equityCurveStates: Record<MockStateKey, MockAsyncState<EquityCurvePoint[]>> = {
  loading: { status: 'loading' },
  error: { status: 'error', message: '수익률 추이를 불러오지 못했습니다.' },
  empty: { status: 'empty', data: [] },
  success: { status: 'success', data: mockEquityCurve },
};
