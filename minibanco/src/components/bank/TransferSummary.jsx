import { formatCurrency } from '../../utils/formatters'

export function TransferSummary({ amount, recipient, sender = 'Main Checking', showRemaining = false, remainingBalance = 0 }) {
  const total = amount || 0

  return (
    <div className="rounded-2xl bg-cream-field p-5 sm:p-6">
      <p className="mb-4 text-sm font-black">Transfer Summary</p>
      <SummaryRow label="Sender" value={sender} />
      <SummaryRow label="Recipient" value={recipient?.name || 'Select recipient'} />
      <SummaryRow label="Amount" value={formatCurrency(amount || 0)} />
      <SummaryRow label="Fee" value={formatCurrency(0)} />
      {showRemaining && <SummaryRow label="Remaining Balance" value={formatCurrency(remainingBalance)} />}
      <div className="mt-4 flex justify-between border-t border-line pt-4 text-sm font-black">
        <span>Total</span>
        <span className="text-brand-dark">{formatCurrency(total)}</span>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-2 text-sm text-ink-soft">
      <span>{label}</span>
      <strong className="text-right text-ink">{value}</strong>
    </div>
  )
}
