import { useState } from 'react'
import { formatCurrency } from '../../utils/formatters'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { InputField } from '../ui/InputField'

const initialForm = {
  amount: '',
  cardNumber: '',
}

export function AccountOperationModal({ account, content, isSubmitting = false, mode, onCancel, onConfirm }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const modeContent = content[mode]
  const amount = Number(form.amount || 0)
  const cleanCardNumber = form.cardNumber.replace(/\D/g, '')

  function handleChange(event) {
    const { name, value } = event.target
    const nextValue = name === 'cardNumber' ? value.replace(/\D/g, '').slice(0, 16) : value

    setForm((current) => ({ ...current, [name]: nextValue }))
    setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (amount <= 0) {
      setError(content.errors.amount)
      return
    }

    if (cleanCardNumber.length !== 16) {
      setError(content.errors.card)
      return
    }

    if (mode === 'withdraw' && account.balance <= 0) {
      setError(content.errors.noBalance)
      return
    }

    if (mode === 'withdraw' && amount > account.balance) {
      setError(content.errors.insufficientBalance)
      return
    }

    try {
      await onConfirm({ amount, cardNumber: cleanCardNumber, mode })
    } catch (operationError) {
      setError(operationError.message || content.errors.amount)
    }
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-ink/45 p-4 backdrop-blur-sm sm:p-5">
      <Card className="max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto bg-cream-card">
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <header className="text-center">
            <h3 className="text-2xl font-black">{modeContent.title}</h3>
            <p className="mt-2 text-sm text-ink-muted">{modeContent.description}</p>
          </header>

          {error ? <div className="rounded-2xl bg-blush px-4 py-2.5 text-sm font-bold text-brand-dark">{error}</div> : null}

          <div className="grid gap-4">
            <InputField
              autoComplete="off"
              id={`${mode}-amount`}
              inputMode="numeric"
              label={modeContent.amountLabel}
              name="amount"
              onChange={handleChange}
              placeholder={modeContent.amountPlaceholder}
              prefix={content.form.amountPrefix}
              rightLabel={formatCurrency(account.balance)}
              type="text"
              value={form.amount}
              valueType="number"
              variant="bankAmount"
            />

            <InputField
              autoComplete="off"
              id={`${mode}-card`}
              inputMode="numeric"
              label={modeContent.cardLabel}
              maxLength={16}
              name="cardNumber"
              onChange={handleChange}
              placeholder={modeContent.cardPlaceholder}
              rightLabel={`${cleanCardNumber.length}/16`}
              type="text"
              value={form.cardNumber}
              valueType="number"
              variant="bank"
            />

            <p className="text-xs font-semibold text-ink-muted">{content.form.cardHelper}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button className="justify-center" disabled={isSubmitting} type="submit">
              {isSubmitting ? modeContent.submittingLabel : modeContent.confirmLabel}
            </Button>
            <Button className="justify-center" disabled={isSubmitting} onClick={onCancel} type="button" variant="ghost">
              {content.form.cancelLabel}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
