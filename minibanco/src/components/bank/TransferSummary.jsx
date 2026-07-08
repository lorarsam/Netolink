import { formatCurrency } from '../../utils/formatters'

export function TransferSummary({ amount, content, recipient, showRemaining = false, remainingBalance = 0 }) {
  const total = amount || 0

  return (
    <div className="rounded-2xl border border-line/70 bg-cream-field p-3 sm:p-4">
      <p className="mb-3 text-sm font-black">{content.title}</p>
      <SummaryRow label={content.senderLabel} value={content.sender} />
      <SummaryRow label={content.recipientLabel} value={recipient?.name || content.defaultRecipient} />
      <SummaryRow label={content.amountLabel} value={formatCurrency(amount || 0)} />
      <SummaryRow label={content.feeLabel} value={formatCurrency(0)} />
      {showRemaining && <SummaryRow label={content.remainingBalanceLabel} value={formatCurrency(remainingBalance)} />}
      <div className="mt-3 flex flex-wrap justify-between gap-2 border-t border-line pt-3 text-sm font-black">
        <span>{content.totalLabel}</span>
        <span className="text-brand-dark">{formatCurrency(total)}</span>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-1.5 text-sm text-ink-soft">
      <span>{label}</span>
      <strong className="break-words text-right text-ink">{value}</strong>
    </div>
  )
}
