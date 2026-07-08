import { formatCurrency, formatDateTime } from '../../utils/formatters'
import { transactionContent } from '../../config/bankFlow'
import { Icon } from '../ui/Icon'
import { StatusBadge } from '../ui/StatusBadge'

export function MovementList({ emptyMessage, limit, transactions, typeLabels = {}, typePresentation = transactionContent.typePresentation }) {
  const items = limit ? transactions.slice(0, limit) : transactions

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-line/80 bg-white p-6 text-center text-sm font-bold text-ink-muted shadow-soft">
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
    <div className="grid gap-4 rounded-3xl border border-line/80 bg-white p-4 shadow-soft transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-card sm:grid-cols-[auto_1fr_auto] sm:items-center">
      <div className={`grid h-11 w-11 place-items-center rounded-2xl ${type.iconClassName}`}>
        <Icon name={type.icon} className="h-5 w-5" />
      </div>
      <div className="grid gap-1 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-4">
        <div>
          <p className="font-black text-ink">{transaction.counterparty}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
            <p className="text-xs text-ink-muted">{transaction.description}</p>
            <span aria-hidden="true">|</span>
            <p>{formatDateTime(transaction.date)}</p>
          </div>
        </div>
        <StatusBadge variant={type.status}>{typeLabel}</StatusBadge>
      </div>
      <p className={`text-left text-lg font-black sm:text-right ${type.amountClassName}`}>
        {type.sign}{formatCurrency(transaction.amount)}
      </p>
    </div>
  )
}
