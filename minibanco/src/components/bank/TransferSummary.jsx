import { formatCurrency } from '../../utils/formatters'

export function TransferSummary({ amount, recipient, remainingBalance }) {
  return (
    <div className="rounded-2xl bg-cream-field p-5">
      <p className="mb-4 font-black">Resumen de transferencia</p>
      <SummaryRow label="Emisor" value="Cuenta Principal" />
      <SummaryRow label="Destinatario" value={recipient?.name || 'Sin seleccionar'} />
      <SummaryRow label="Monto" value={formatCurrency(amount || 0)} />
      <SummaryRow label="Comision" value={formatCurrency(0)} />
      <div className="mt-3 flex justify-between border-t border-line pt-4 font-black text-brand-dark">
        <span>Saldo restante</span>
        <span>{formatCurrency(remainingBalance)}</span>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between py-2 text-sm text-ink-soft">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
