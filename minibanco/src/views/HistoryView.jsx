import { useMemo, useState } from 'react'
import { MovementList } from '../components/bank/MovementList'
import { TransactionFilters } from '../components/bank/TransactionFilters'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { historyContent, transactionContent } from '../config/bankFlow'
import { formatCurrency } from '../utils/formatters'

export function HistoryView({ onDashboard, transactions }) {
  const [filters, setFilters] = useState(() => getInitialFilters(historyContent.filters))
  const filteredTransactions = useMemo(() => applyFilters(transactions, filters), [filters, transactions])
  const incoming = filteredTransactions.filter((item) => item.type === transactionContent.typeValues.incoming).reduce((total, item) => total + item.amount, 0)
  const outgoing = filteredTransactions.filter((item) => item.type === transactionContent.typeValues.outgoing).reduce((total, item) => total + item.amount, 0)

  function handleFilterChange(filterId, value) {
    setFilters((current) => ({ ...current, [filterId]: value }))
  }

  return (
    <div className="grid gap-6">
      <Card>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-4xl font-black">{historyContent.title}</h2>
            <p className="mt-2 max-w-xl text-ink-muted">{historyContent.subtitle}</p>
          </div>
          <Button onClick={onDashboard} type="button" variant="ghost">{historyContent.backLabel}</Button>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <Stat label={historyContent.stats.total} value={String(filteredTransactions.length)} />
          <Stat label={historyContent.stats.incoming} tone="text-teal" value={formatCurrency(incoming)} />
          <Stat label={historyContent.stats.outgoing} tone="text-brand-dark" value={formatCurrency(outgoing)} />
        </div>
      </Card>

      <TransactionFilters filters={historyContent.filters} onChange={handleFilterChange} value={filters} />

      <MovementList emptyMessage={historyContent.emptyMessage} transactions={filteredTransactions} typeLabels={transactionContent.typeLabels} typePresentation={transactionContent.typePresentation} />
    </div>
  )
}

function getInitialFilters(filters) {
  return filters.reduce((values, filter) => ({ ...values, [filter.id]: filter.defaultValue }), {})
}

function applyFilters(transactions, filters) {
  const typeFiltered = filters.type === historyContent.filterValues.allTypes
    ? transactions
    : transactions.filter((transaction) => transaction.type === filters.type)

  return [...typeFiltered].sort((current, next) => {
    if (filters.sortBy === historyContent.filterValues.highestAmount) {
      return next.amount - current.amount
    }

    if (filters.sortBy === historyContent.filterValues.lowestAmount) {
      return current.amount - next.amount
    }

    const currentDate = new Date(current.date)
    const nextDate = new Date(next.date)

    return filters.dateOrder === historyContent.filterValues.oldestDate ? currentDate - nextDate : nextDate - currentDate
  })
}

function Stat({ label, tone = 'text-ink', value }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-soft">
      <p className="text-xs font-black uppercase text-ink-muted">{label}</p>
      <p className={`mt-2 text-2xl font-black ${tone}`}>{value}</p>
    </div>
  )
}
