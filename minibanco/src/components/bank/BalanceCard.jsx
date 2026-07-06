import { formatCurrency } from '../../utils/formatters'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function BalanceCard({ account, onHistory, onTransfer }) {
  return (
    <Card>
      <p className="text-xs font-black uppercase tracking-widest text-ink-muted">Saldo total</p>
      <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-4xl font-black tracking-tight sm:text-5xl">{formatCurrency(account.balance)}</p>
          <p className="mt-2 text-xs font-bold text-ink-muted">{account.name} | {account.number}</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={onTransfer}>Transferir</Button>
          <Button onClick={onHistory} variant="ghost">Historial</Button>
        </div>
      </div>
    </Card>
  )
}
