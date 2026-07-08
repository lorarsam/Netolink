import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { TransferSummary } from './TransferSummary'

export function TransferConfirmModal({ amount, content, onCancel, onConfirm, recipient, remainingBalance, summaryContent }) {
  return (
    <div className="fixed inset-0 z-20 grid place-items-center bg-ink/45 p-5 backdrop-blur-sm">
      <Card className="w-full max-w-md bg-white text-center">
        <h3 className="text-2xl font-black">{content.title}</h3>
        <p className="mt-2 text-sm text-ink-muted">{content.subtitle}</p>
        <div className="my-6 text-left">
          <TransferSummary amount={amount} content={summaryContent} recipient={recipient} remainingBalance={remainingBalance} showRemaining />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button onClick={onConfirm}>{content.confirmLabel}</Button>
          <Button onClick={onCancel} variant="ghost">{content.cancelLabel}</Button>
        </div>
      </Card>
    </div>
  )
}
