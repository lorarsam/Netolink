import { formatCurrency, formatDateTime } from '../../utils/formatters'
import { transactionContent } from '../../config/bankFlow'
import { Icon } from '../ui/Icon'
import { StatusBadge } from '../ui/StatusBadge'

export function MovementList({ emptyMessage, limit, transactions, typeLabels = {}, typePresentation = transactionContent.typePresentation }) {
  const items = limit ? transactions.slice(0, limit) : transactions

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-line/80 bg-cream-card p-6 text-center text-sm font-bold text-ink-muted shadow-soft">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {items.map((transaction) => (
        <MovementItem key={transaction.id} transaction={transaction} typeLabels={typeLabels} typePresentation={typePresentation} />
      ))}
    </div>
  )
}

function MovementItem({ transaction, typeLabels, typePresentation }) {
  const type = typePresentation[transaction.type] || typePresentation[transactionContent.defaults.transferType]
  const typeLabel = typeLabels[transaction.type] || transaction.type

  return (
    <div className="grid gap-3 rounded-2xl border border-line/80 bg-cream-card p-3 shadow-soft transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-card sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-4 sm:rounded-3xl sm:p-4">
      <div className={`grid h-10 w-10 place-items-center rounded-2xl sm:h-11 sm:w-11 ${type.iconClassName}`}>
        <Icon name={type.icon} className="h-5 w-5" />
      </div>
      <div className="grid min-w-0 gap-2 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-4">
        <div className="min-w-0">
          <p className="truncate font-black text-ink">{transaction.counterparty}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
            <p className="min-w-0 break-words text-xs text-ink-muted">{transaction.description}</p>
            <span className="hidden sm:inline" aria-hidden="true">|</span>
            <p>{formatDateTime(transaction.date)}</p>
          </div>
        </div>
        <StatusBadge variant={type.status}>{typeLabel}</StatusBadge>
      </div>
      <p className={`break-words text-left text-base font-black sm:text-right sm:text-lg ${type.amountClassName}`}>
        {type.sign}{formatCurrency(transaction.amount)}
      </p>
    </div>
  )
}
