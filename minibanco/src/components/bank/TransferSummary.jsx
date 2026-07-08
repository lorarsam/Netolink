import { formatCurrency } from '../../utils/formatters'

export function TransferSummary({ amount, content, recipient, showRemaining = false, remainingBalance = 0 }) {
  const total = amount || 0

  return (
    <div className="rounded-2xl border border-line/70 bg-cream-field p-4">
      <p className="mb-3 text-sm font-black">{content.title}</p>
      <SummaryRow label={content.senderLabel} value={content.sender} />
      <SummaryRow label={content.recipientLabel} value={recipient?.name || content.defaultRecipient} />
      <SummaryRow label={content.amountLabel} value={formatCurrency(amount || 0)} />
      <SummaryRow label={content.feeLabel} value={formatCurrency(0)} />
      {showRemaining && <SummaryRow label={content.remainingBalanceLabel} value={formatCurrency(remainingBalance)} />}
      <div className="mt-3 flex justify-between border-t border-line pt-3 text-sm font-black">
        <span>{content.totalLabel}</span>
        <span className="text-brand-dark">{formatCurrency(total)}</span>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm text-ink-soft">
      <span>{label}</span>
      <strong className="text-right text-ink">{value}</strong>
    </div>
  )
}
