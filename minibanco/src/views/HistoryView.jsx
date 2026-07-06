import { MovementList } from '../components/bank/MovementList'
import { Card } from '../components/ui/Card'
import { formatCurrency } from '../utils/formatters'

export function HistoryView({ onDashboard, transactions }) {
  const incoming = transactions.filter((item) => item.type === 'ingreso').reduce((total, item) => total + item.amount, 0)
  const outgoing = transactions.filter((item) => item.type === 'egreso').reduce((total, item) => total + item.amount, 0)

  return (
    <div className="grid gap-6">
      <Card>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-4xl font-black">Historial de movimientos</h2>
            <p className="mt-2 max-w-xl text-ink-muted">Movimientos en tiempo real, ordenados del mas reciente al mas antiguo.</p>
          </div>
          <button className="text-left text-sm font-black text-brand lg:text-right" onClick={onDashboard} type="button">Volver al Dashboard</button>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <Stat label="Total" value={String(transactions.length)} />
          <Stat label="Ingresos" tone="text-teal" value={formatCurrency(incoming)} />
          <Stat label="Egresos" tone="text-brand-dark" value={formatCurrency(outgoing)} />
        </div>
      </Card>

      <div className="flex flex-wrap gap-3 text-sm font-bold text-ink-muted">
        <span className="rounded-full bg-white px-4 py-3 shadow-soft">Tipo: todos</span>
        <span className="rounded-full bg-white px-4 py-3 shadow-soft">Fecha: recientes</span>
        <span className="rounded-full bg-white px-4 py-3 shadow-soft">Orden: descendente</span>
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
