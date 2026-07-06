import { BalanceCard } from '../components/bank/BalanceCard'
import { FlowStatus } from '../components/bank/FlowStatus'
import { MovementList } from '../components/bank/MovementList'
import { Card } from '../components/ui/Card'
import { formatCurrency } from '../utils/formatters'

export function DashboardView({ account, onHistory, onTransfer, transactions }) {
  const incoming = transactions.filter((item) => item.type === 'ingreso').reduce((total, item) => total + item.amount, 0)
  const outgoing = transactions.filter((item) => item.type === 'egreso').reduce((total, item) => total + item.amount, 0)

  return (
    <div className="grid gap-6">
      <BalanceCard account={account} onHistory={onHistory} onTransfer={onTransfer} />
      <FlowStatus />

      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard label="Ingresos" value={formatCurrency(incoming)} tone="text-teal" />
        <MetricCard label="Egresos" value={formatCurrency(outgoing)} tone="text-brand-dark" />
        <MetricCard label="Movimientos" value={String(transactions.length)} tone="text-ink" />
      </div>

      <Card>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black">Actividad reciente</h2>
            <p className="text-sm text-ink-muted">Historial sincronizado automaticamente.</p>
          </div>
          <button className="text-sm font-black text-brand" onClick={onHistory} type="button">Ver todo</button>
        </div>
        <MovementList limit={4} transactions={transactions} />
      </Card>
    </div>
  )
}

function MetricCard({ label, tone, value }) {
  return (
    <Card className="p-5">
      <p className="text-sm font-black text-ink-muted">{label}</p>
      <p className={`mt-3 text-3xl font-black ${tone}`}>{value}</p>
    </Card>
  )
}
