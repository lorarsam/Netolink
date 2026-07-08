import { useMemo, useState } from 'react'
import { RecentRecipients } from '../components/bank/RecentRecipients'
import { TransferConfirmModal } from '../components/bank/TransferConfirmModal'
import { TransferForm } from '../components/bank/TransferForm'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { transferContent } from '../config/bankFlow'

const initialForm = {
  recipient: 'james.r@example.com',
  amount: '',
  description: '',
}

export function TransferView({ account, currentUser, onCancel, onConfirm, users }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const availableRecipients = useMemo(() => users.filter((item) => item.id !== currentUser.id), [currentUser.id, users])

  const recipient = useMemo(() => {
    const query = form.recipient.trim().toLowerCase()
    if (!query) return null
    return availableRecipients.find((user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase() === query) || null
  }, [availableRecipients, form.recipient])

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
      setError(transferContent.form.errorMessage)
      return
    }
    setShowConfirm(true)
  }

  function handleConfirm() {
    onConfirm({ amount, description: form.description, recipient })
  }

  function handleSelectRecipient(selectedRecipient) {
    setForm((current) => ({ ...current, recipient: selectedRecipient.email }))
    setError('')
  }

  const recentRecipients = availableRecipients

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(28rem,0.72fr)] xl:items-start">
      <Card interactive className="bg-white p-5 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="break-words text-xl font-black tracking-tight sm:text-2xl">{transferContent.header.title}</h2>
            <p className="mt-2 text-sm font-medium text-ink-muted">{transferContent.header.subtitle}</p>
          </div>
          <Button className="justify-center" onClick={onCancel} type="button" variant="ghost">{transferContent.header.cancelLabel}</Button>
        </div>

        <TransferForm account={account} amount={amount} content={transferContent.form} error={error} form={form} onChange={handleChange} onSubmit={handleSubmit} recipient={recipient} summaryContent={transferContent.summary} users={availableRecipients} />
      </Card>

      <RecentRecipients content={transferContent.recentRecipients} onSelect={handleSelectRecipient} recipients={recentRecipients} />

      {showConfirm && (
        <TransferConfirmModal
          amount={amount}
          content={transferContent.modal}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleConfirm}
          recipient={recipient}
          remainingBalance={account.balance - amount}
          summaryContent={transferContent.summary}
        />
      )}
    </div>
  )
}
