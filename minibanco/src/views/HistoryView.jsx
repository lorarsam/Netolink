import { MovementList } from '../components/bank/MovementList'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { historyContent } from '../config/bankFlow'
import { formatCurrency } from '../utils/formatters'

export function HistoryView({ onDashboard, transactions }) {
  const incoming = transactions.filter((item) => item.type === 'ingreso').reduce((total, item) => total + item.amount, 0)
  const outgoing = transactions.filter((item) => item.type === 'egreso').reduce((total, item) => total + item.amount, 0)

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
          <Stat label={historyContent.stats.total} value={String(transactions.length)} />
          <Stat label={historyContent.stats.incoming} tone="text-teal" value={formatCurrency(incoming)} />
          <Stat label={historyContent.stats.outgoing} tone="text-brand-dark" value={formatCurrency(outgoing)} />
        </div>
      </Card>

      <div className="flex flex-wrap gap-3 text-sm font-bold text-ink-muted">
        {historyContent.filters.map((filter) => (
          <span className="rounded-full bg-white px-4 py-3 shadow-soft" key={filter}>{filter}</span>
        ))}
      </div>

      <MovementList transactions={transactions} />
    </div>
  )
}

function Stat({ label, tone = 'text-ink', value }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-soft">
      <p className="text-xs font-black uppercase text-ink-muted">{label}</p>
      <p className={`mt-2 text-2xl font-black ${tone}`}>{value}</p>
    </div>
  )
}
