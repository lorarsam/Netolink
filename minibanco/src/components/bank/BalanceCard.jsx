import { formatCurrency } from '../../utils/formatters'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'

export function BalanceCard({ account, content, onHistory, onTransfer }) {
  return (
    <Card interactive className="overflow-hidden">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-ink-muted">{content.label}</p>
          <p className="mt-3 break-words text-3xl font-black tracking-tight text-ink sm:text-5xl">{formatCurrency(account.balance)}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-bold text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="bank" className="h-4 w-4" />
              {account.name}
            </span>
            <span>{account.number}</span>
            <span>{account.currency}</span>
          </div>
        </div>
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          <Button className="justify-center" onClick={onTransfer}>{content.transferLabel}</Button>
          <Button className="justify-center" onClick={onHistory} variant="ghost">{content.historyLabel}</Button>
        </div>
      </div>
    </Card>
  )
}
