import { BalanceCard } from '../components/bank/BalanceCard'
import { MetricCard } from '../components/bank/MetricCard'
import { MovementList } from '../components/bank/MovementList'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { dashboardContent, transactionContent } from '../config/bankFlow'
import { formatCurrency } from '../utils/formatters'

export function DashboardView({ account, onHistory, onTransfer, transactions }) {
  const incoming = transactions.filter((item) => item.type === transactionContent.typeValues.incoming).reduce((total, item) => total + item.amount, 0)
  const outgoing = transactions.filter((item) => item.type === transactionContent.typeValues.outgoing).reduce((total, item) => total + item.amount, 0)
  const totalMoved = incoming + outgoing
  const netFlow = incoming - outgoing
  const outgoingShare = totalMoved > 0 ? Math.round((outgoing / totalMoved) * 100) : 0
  const incomingShare = totalMoved > 0 ? Math.round((incoming / totalMoved) * 100) : 0
  const metricValues = {
    incoming,
    incomingShare,
    movementCount: transactions.length,
    netFlow,
    outgoing,
    outgoingShare,
  }

  return (
    <div className="grid gap-6">
      <BalanceCard account={account} content={dashboardContent.balance} onHistory={onHistory} onTransfer={onTransfer} />

      <div className="grid gap-5 md:grid-cols-3">
        {dashboardContent.metrics.map((metric) => (
          <MetricCard
            change={getMetricChange(metric, metricValues)}
            changeTone={metric.changeTone || (netFlow >= 0 ? 'success' : 'danger')}
            description={metric.description}
            icon={metric.icon}
            key={metric.id}
            label={metric.label}
            tone={metric.tone}
            value={getMetricValue(metric, metricValues)}
          />
        ))}
      </div>

      <Card interactive>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-black sm:text-xl">{dashboardContent.activity.title}</h2>
            <p className="text-sm text-ink-muted">{dashboardContent.activity.description}</p>
          </div>
          <Button className="justify-center" onClick={onHistory} type="button" variant="ghost">{dashboardContent.activity.actionLabel}</Button>
        </div>
        <MovementList emptyMessage={transactionContent.emptyMessage} limit={4} transactions={transactions} typeLabels={transactionContent.typeLabels} typePresentation={transactionContent.typePresentation} />
      </Card>
    </div>
  )
}

function getMetricChange(metric, values) {
  if (metric.changeKind === 'netFlow') {
    return formatCurrency(values.netFlow)
  }

  return `${values[metric.changeKind]}${metric.changeSuffix || ''}`
}

function getMetricValue(metric, values) {
  if (metric.valueKind === 'currency') {
    return formatCurrency(values[metric.id])
  }

  return String(values[metric.id])
}
