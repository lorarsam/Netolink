import { Button } from '../ui/Button'
import { InputField } from '../ui/InputField'
import { formatCurrency } from '../../utils/formatters'
import { RecipientCombobox } from './RecipientCombobox'
import { TransferSummary } from './TransferSummary'

export function TransferForm({ account, amount, content, error, form, onChange, onSubmit, recipient, summaryContent, users }) {
  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      {error && <div className="rounded-2xl bg-blush px-4 py-2.5 text-sm font-bold text-brand-dark">{error}</div>}

      <div className="grid items-start gap-4 xl:grid-cols-2">
        <RecipientCombobox content={content} name="recipient" onChange={onChange} recipient={recipient} users={users} value={form.recipient} />

        <div className="grid content-start gap-3">
          <InputField
            autoComplete="off"
            id="amount"
            inputMode="numeric"
            label={content.amountLabel}
            min="0"
            name="amount"
            onChange={onChange}
            placeholder={content.amountPlaceholder}
            prefix="$"
            rightLabel={`${content.balanceLabel}: ${formatCurrency(account.balance)}`}
            type="text"
            value={form.amount}
            valueType="number"
            variant="bankAmount"
          />

          <InputField
            autoComplete="off"
            id="description"
            label={content.descriptionLabel}
            name="description"
            onChange={onChange}
            placeholder={content.descriptionPlaceholder}
            type="text"
            value={form.description}
            valueType="text"
            variant="bank"
          />
        </div>
      </div>

      <TransferSummary amount={amount} content={summaryContent} recipient={recipient} />
      <Button className="w-full py-3.5" type="submit">{content.submitLabel}</Button>
    </form>
  )
}
