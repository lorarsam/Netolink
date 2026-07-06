import { formatCurrency, formatDateTime } from '../../utils/formatters'
import { StatusBadge } from '../ui/StatusBadge'

export function MovementList({ limit, transactions }) {
  const items = limit ? transactions.slice(0, limit) : transactions

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
      {items.map((transaction) => (
        <div key={transaction.id} className="grid gap-3 border-b border-line p-5 last:border-b-0 md:grid-cols-[1fr_1fr_auto_auto] md:items-center">
          <div>
            <p className="font-black">{transaction.counterparty}</p>
            <p className="text-xs text-ink-muted">{transaction.description}</p>
          </div>
          <p className="text-sm text-ink-muted">{formatDateTime(transaction.date)}</p>
          <StatusBadge variant={transaction.type === 'ingreso' ? 'success' : 'danger'}>{transaction.type}</StatusBadge>
          <p className={`text-right font-black ${transaction.type === 'ingreso' ? 'text-teal' : 'text-brand-dark'}`}>
            {transaction.type === 'ingreso' ? '+' : '-'}{formatCurrency(transaction.amount)}
          </p>
        </div>
      ))}
    </div>
  )
}
