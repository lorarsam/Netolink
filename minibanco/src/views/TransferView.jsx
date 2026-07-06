import { useMemo, useState } from 'react'
import { TransferForm } from '../components/bank/TransferForm'
import { TransferSummary } from '../components/bank/TransferSummary'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

const initialForm = {
  recipient: '',
  amount: '',
  description: '',
}

export function TransferView({ account, currentUser, onCancel, onConfirm, users }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const recipient = useMemo(() => {
    const query = form.recipient.trim().toLowerCase()
    if (!query) return null
    return users.find((user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase() === query) || null
  }, [form.recipient, users])

  const amount = Number(form.amount || 0)
  const checks = {
    recipient: Boolean(recipient),
    amount: amount > 0,
    balance: amount > 0 && amount <= account.balance,
    self: Boolean(recipient) && recipient.id !== currentUser.id,
  }
  const isValid = Object.values(checks).every(Boolean)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!isValid) {
      setError('Revisa las validaciones antes de confirmar la transferencia.')
      return
    }
    setShowConfirm(true)
  }

  function handleConfirm() {
    onConfirm({ amount, description: form.description, recipient })
  }

  return (
    <div className="grid gap-6">
      <Card className="bg-white">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-3xl font-black">Transferir dinero</h2>
            <p className="mt-2 text-sm text-ink-muted">Ingresa destinatario, monto y descripcion opcional.</p>
          </div>
          <Button onClick={onCancel} type="button" variant="ghost">Cancelar</Button>
        </div>

        <TransferForm account={account} checks={checks} error={error} form={form} onChange={handleChange} onSubmit={handleSubmit} recipient={recipient} />
      </Card>

      {showConfirm && (
        <div className="fixed inset-0 z-20 grid place-items-center bg-ink/45 p-5 backdrop-blur-sm">
          <Card className="w-full max-w-md bg-white text-center">
            <h3 className="text-2xl font-black">Confirmar transferencia</h3>
            <p className="mt-2 text-sm text-ink-muted">Verifica los datos antes de actualizar saldos y registrar el movimiento.</p>
            <div className="my-6 text-left">
              <TransferSummary amount={amount} recipient={recipient} remainingBalance={account.balance - amount} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button onClick={handleConfirm}>Confirmar</Button>
              <Button onClick={() => setShowConfirm(false)} variant="ghost">Volver</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
