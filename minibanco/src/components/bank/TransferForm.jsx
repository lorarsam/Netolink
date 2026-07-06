import { Button } from '../ui/Button'
import { TextField } from '../forms/TextField'
import { TransferSummary } from './TransferSummary'
import { ValidationList } from './ValidationList'

export function TransferForm({ account, checks, error, form, onChange, onSubmit, recipient }) {
  const amount = Number(form.amount || 0)
  const remainingBalance = account.balance - amount

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      {error && <div className="rounded-2xl bg-blush px-4 py-3 text-sm font-bold text-brand-dark">{error}</div>}

      <div className="grid gap-5 lg:grid-cols-2">
        <TextField
          autoComplete="off"
          icon="mail"
          id="recipient"
          label="Destinatario"
          name="recipient"
          onChange={onChange}
          placeholder="Nombre o email registrado"
          type="text"
          value={form.recipient}
        />
        <TextField
          autoComplete="off"
          id="amount"
          label="Monto"
          name="amount"
          onChange={onChange}
          placeholder="Ej: 15000"
          type="number"
          value={form.amount}
        />
      </div>

      <label className="grid gap-2 text-[10px] font-extrabold text-ink-soft" htmlFor="description">
        Descripcion opcional
        <textarea
          className="min-h-28 rounded-2xl bg-cream-field px-4 py-3 text-sm font-semibold outline-none ring-brand/35 transition placeholder:text-ink-muted/75 focus:ring-2"
          id="description"
          name="description"
          onChange={onChange}
          placeholder="Motivo de la transferencia"
          value={form.description}
        />
      </label>

      <ValidationList checks={checks} />
      <TransferSummary amount={amount} recipient={recipient} remainingBalance={remainingBalance} />
      <Button className="w-full" type="submit">Confirmar transferencia</Button>
    </form>
  )
}
