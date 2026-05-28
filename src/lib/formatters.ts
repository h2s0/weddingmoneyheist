const koNumberFormatter = new Intl.NumberFormat('ko-KR');
const currencyFormatter = new Intl.NumberFormat('ko-KR', {
  maximumFractionDigits: 0,
});
const compactFormatter = new Intl.NumberFormat('ko-KR', {
  maximumFractionDigits: 1,
  notation: 'compact',
});
const percentFormatter = new Intl.NumberFormat('ko-KR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  month: 'long',
  day: 'numeric',
});

const isPresentNumber = (value: number | null | undefined): value is number =>
  typeof value === 'number' && Number.isFinite(value);

export const formatNumber = (value: number | null | undefined) => {
  if (!isPresentNumber(value)) {
    return '–';
  }

  return koNumberFormatter.format(value);
};

export const formatCurrency = (value: number | null | undefined) => {
  if (!isPresentNumber(value)) {
    return '–';
  }

  return `${currencyFormatter.format(value)}원`;
};

export const formatCompactNumber = (value: number | null | undefined) => {
  if (!isPresentNumber(value)) {
    return '–';
  }

  return compactFormatter.format(value);
};

export const formatCompactCurrency = (value: number | null | undefined) => {
  if (!isPresentNumber(value)) {
    return '–';
  }

  return `${formatCompactNumber(value)}원`;
};

export const formatPercent = (value: number | null | undefined) => {
  if (!isPresentNumber(value)) {
    return '–';
  }

  const prefix = value > 0 ? '+' : '';
  return `${prefix}${percentFormatter.format(value)}%`;
};

export const formatSignedNumber = (value: number | null | undefined) => {
  if (!isPresentNumber(value)) {
    return '–';
  }

  const prefix = value > 0 ? '+' : value < 0 ? '−' : '';
  return `${prefix}${formatNumber(Math.abs(value))}`;
};

export const formatDate = (isoDate: string | null | undefined) => {
  if (!isoDate) {
    return '–';
  }

  return dateFormatter.format(new Date(`${isoDate}T00:00:00+09:00`));
};
