export type CurrencyCode = 'KRW';

export type ApiPortfolioSummary = {
  principalAmount: number;
  evaluatedAmount: number;
  cashBalance: number;
  dailyProfitLossAmount: number;
  dailyProfitLossRate: number;
  baseDate: string;
};

export type PortfolioSummary = {
  principal: number;
  currentValue: number;
  cash: number;
  totalProfit: number;
  totalProfitRate: number;
  todayChange: number;
  todayChangeRate: number;
  startedAt: string;
  updatedAt: string;
  currency: CurrencyCode;
};

export type ApiHolding = {
  stockCode: string;
  stockName: string;
  quantity: number;
  averagePurchasePrice: number;
  currentPrice: number;
};

export type Holding = {
  id: string;
  ticker: string;
  name: string;
  shares: number;
  averagePrice: number;
  currentPrice: number;
  purchaseAmount: number;
  evaluationAmount: number;
  profit: number;
  profitRate: number;
  weight: number;
  colorToken: string;
  accentToken: string;
};

export type TransactionType = 'buy' | 'sell';

export type ApiTransaction = {
  tradeDate: string;
  tradeType: TransactionType;
  stockCode: string;
  stockName: string;
  quantity: number;
  tradePrice: number;
  memo: string | null;
};

export type Transaction = {
  id: string;
  date: string;
  type: TransactionType;
  ticker: string;
  name: string;
  quantity: number;
  price: number;
  totalAmount: number;
  note: string | null;
};

export type EquityCurvePoint = {
  date: string;
  totalValue: number;
  profitRate: number;
};

export type AllocationItem = {
  id: string;
  label: string;
  value: number;
  weight: number;
  colorToken: string;
};
