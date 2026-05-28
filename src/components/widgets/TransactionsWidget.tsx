import type { ReactNode } from 'react';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { WidgetEmpty, WidgetError, WidgetLoading } from '@/components/widgets/WidgetState';
import { classNames } from '@/lib/classNames';
import { formatCompactCurrency, formatDate, formatNumber } from '@/lib/formatters';
import type { MockAsyncState, Transaction } from '@/types';

type TransactionsWidgetProps = {
  state: MockAsyncState<Transaction[]>;
  action?: ReactNode;
};

export function TransactionsWidget({ state, action }: TransactionsWidgetProps) {
  return (
    <WidgetCard title="매매 기록" eyebrow="거래 내역" icon="📒" action={action} className="h-full">
      {state.status === 'loading' ? (
        <WidgetLoading title="매매 기록 로딩" description="최근 거래 내역을 불러오는 중입니다." />
      ) : null}

      {state.status === 'error' ? (
        <WidgetError title="불러오지 못했어요" description={state.message} />
      ) : null}

      {state.status === 'empty' ? (
        <WidgetEmpty title="매매 기록이 없어요" description="매수와 매도 기록이 생기면 시간순으로 보여줍니다." />
      ) : null}

      {state.status === 'success' ? <TransactionList transactions={state.data} /> : null}
    </WidgetCard>
  );
}

function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const sortedTransactions = [...transactions].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-0 flex-1 overflow-auto">
      {sortedTransactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const isBuy = transaction.type === 'buy';
  const signedAmount = `${isBuy ? '−' : '+'}${formatCompactCurrency(transaction.totalAmount)}`;

  return (
    <article className="flex min-w-0 items-center gap-3 border-b border-dashed border-border py-3 last:border-b-0">
      <span
        className={classNames(
          'flex size-10 shrink-0 items-center justify-center rounded-soft font-display text-sm',
          isBuy ? 'bg-profit-background text-profit' : 'bg-loss-background text-loss',
        )}
      >
        {isBuy ? '매수' : '매도'}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
          <p className="truncate font-semibold text-foreground">{transaction.name}</p>
          <p className="text-caption text-muted">
            {formatNumber(transaction.quantity)}주 × {formatNumber(transaction.price)}원
          </p>
        </div>
        <p className="mt-1 truncate text-caption text-muted">
          {formatDate(transaction.date)}
          {transaction.note ? <span> · {transaction.note}</span> : null}
        </p>
      </div>

      <p className={classNames('shrink-0 text-right font-bold', isBuy ? 'text-foreground' : 'text-loss')}>
        {signedAmount}
      </p>
    </article>
  );
}
