import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { TransferSummary } from './TransferSummary'

export function TransferConfirmModal({ amount, content, isSubmitting = false, onCancel, onConfirm, recipient, remainingBalance, summaryContent }) {
  return (
    <div className="fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-ink/45 p-4 backdrop-blur-sm sm:p-5">
      <Card className="max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto bg-cream-card text-center">
        <h3 className="text-2xl font-black">{content.title}</h3>
        <p className="mt-2 text-sm text-ink-muted">{content.subtitle}</p>
        <div className="my-6 text-left">
          <TransferSummary amount={amount} content={summaryContent} recipient={recipient} remainingBalance={remainingBalance} showRemaining />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button className="justify-center" disabled={isSubmitting} onClick={onConfirm}>{isSubmitting ? 'Confirmando...' : content.confirmLabel}</Button>
          <Button className="justify-center" disabled={isSubmitting} onClick={onCancel} variant="ghost">{content.cancelLabel}</Button>
        </div>
      </Card>
    </div>
  )
}
