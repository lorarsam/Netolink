import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Icon } from '../components/ui/Icon'
import { transferSuccessContent } from '../config/bankFlow'
import { formatCurrency, formatDateTime } from '../utils/formatters'

export function TransferSuccessView({ content, lastTransfer, onDashboard, onHistory, onTransferAgain }) {
  const viewContent = content || transferSuccessContent
  const recipientName = lastTransfer.recipient.name
  const transferType = viewContent.details.typeLabels[lastTransfer.type] || lastTransfer.type

  return (
    <Card className="mx-auto w-full max-w-5xl bg-white px-6 py-10 text-center shadow-card sm:px-12 lg:px-16">
      <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-teal/20 text-teal">
        <Icon name="checkCircle" className="h-12 w-12" />
      </span>
      <h2 className="mt-7 text-3xl font-black tracking-tight sm:text-4xl">{viewContent.title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-6 text-ink-muted sm:text-base">{viewContent.description(recipientName)}</p>

      <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-line/70 bg-cream-field p-5 text-left sm:p-6">
        <p className="mb-4 text-sm font-black tracking-wide text-ink">{viewContent.details.title}</p>
        <Row label={viewContent.details.recipientLabel} value={recipientName} />
        <Row label={viewContent.details.amountLabel} value={formatCurrency(lastTransfer.amount)} />
        <Row label={viewContent.details.dateLabel} value={formatDateTime(lastTransfer.date)} />
        <Row label={viewContent.details.typeLabel} value={transferType} />
        <Row label={viewContent.details.idLabel} value={lastTransfer.id} />
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
        <Button className="py-3.5 sm:col-span-2" onClick={onDashboard}>{viewContent.actions.dashboardLabel}</Button>
        <Button className="py-3.5 ring-1 ring-brand/45" onClick={onTransferAgain} variant="ghost">{viewContent.actions.transferAgainLabel}</Button>
        <Button className="py-3.5 ring-1 ring-brand/20" onClick={onHistory} variant="ghost">{viewContent.actions.historyLabel}</Button>
      </div>
    </Card>
  )
}

function Row({ label, value }) {
  return <div className="flex justify-between gap-4 py-2 text-sm sm:text-base"><span className="text-ink-soft">{label}</span><strong className="text-right text-ink">{value}</strong></div>
}
