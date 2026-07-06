import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { formatCurrency } from '../utils/formatters'

export function TransferSuccessView({ lastTransfer, onDashboard, onHistory, onTransferAgain }) {
  return (
    <Card className="mx-auto max-w-3xl bg-white text-center">
      <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-teal/20 text-4xl font-black text-teal">✓</span>
      <h2 className="mt-6 text-3xl font-black">Transferencia exitosa</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm text-ink-muted">El saldo del emisor y receptor fue actualizado, y el movimiento quedo registrado en Firestore.</p>

      <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-cream-field p-5 text-left">
        <Row label="Destinatario" value={lastTransfer.recipient.name} />
        <Row label="Monto" value={formatCurrency(lastTransfer.amount)} />
        <Row label="Tipo" value="Egreso" />
        <Row label="ID" value={lastTransfer.id} />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Button onClick={onDashboard}>Dashboard</Button>
        <Button onClick={onTransferAgain} variant="ghost">Otra transferencia</Button>
        <Button onClick={onHistory} variant="ghost">Ver historial</Button>
      </div>
    </Card>
  )
}

function Row({ label, value }) {
  return <div className="flex justify-between py-2 text-sm"><span className="text-ink-muted">{label}</span><strong>{value}</strong></div>
}
