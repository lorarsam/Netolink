import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { formatCurrency } from '../../utils/formatters'
import { TransferSummary } from './TransferSummary'
import { ValidationList } from './ValidationList'

export function TransferForm({ account, checks, error, form, onChange, onSubmit, recipient }) {
  const amount = Number(form.amount || 0)

  return (
    <form className="grid gap-6" onSubmit={onSubmit}>
      {error && <div className="rounded-2xl bg-blush px-4 py-3 text-sm font-bold text-brand-dark">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-3">
          <label className="text-xs font-black text-ink-soft" htmlFor="recipient">Recipient</label>
          <div className="flex items-center gap-3 rounded-2xl bg-cream-field px-4 py-3 text-ink-muted ring-brand/35 transition focus-within:ring-2">
            <Icon name="search" className="h-4 w-4" />
            <input
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-ink-muted/75"
              id="recipient"
              name="recipient"
              onChange={onChange}
              placeholder="Search name or email"
              type="text"
              value={form.recipient}
            />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-2xl bg-cream-field p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-sm font-black text-white">
                {recipient?.name.slice(0, 1) || '?'}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-black">{recipient?.name || 'No recipient selected'}</p>
                <p className="truncate text-xs font-semibold text-ink-muted">{recipient?.email || 'Type a registered email'}</p>
              </div>
            </div>
            <span className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-black ${recipient ? 'bg-white text-teal' : 'bg-white/60 text-ink-muted'}`}>
              {recipient ? 'Active' : 'Pending'}
            </span>
          </div>
        </div>

        <div className="grid content-start gap-3">
          <label className="text-xs font-black text-ink-soft" htmlFor="amount">Amount</label>
          <div className="flex items-center gap-3 rounded-2xl bg-cream-field px-5 py-4 ring-brand/35 transition focus-within:ring-2">
            <span className="text-3xl font-black text-ink-muted">$</span>
            <input
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent text-3xl font-black text-ink outline-none placeholder:text-ink-muted"
              id="amount"
              min="0"
              name="amount"
              onChange={onChange}
              placeholder="0"
              type="number"
              value={form.amount}
            />
          </div>
          <p className="text-xs font-bold text-ink-muted">Available Balance: {formatCurrency(account.balance)}</p>
        </div>
      </div>

      <label className="grid gap-3 text-xs font-black text-ink-soft" htmlFor="description">
        Description (Optional)
        <textarea
          className="min-h-28 rounded-2xl bg-cream-field px-5 py-4 text-sm font-semibold outline-none ring-brand/35 transition placeholder:text-ink-muted/75 focus:ring-2"
          id="description"
          name="description"
          onChange={onChange}
          placeholder="What is this transfer for?"
          value={form.description}
        />
      </label>

      <ValidationList checks={checks} />
      <TransferSummary amount={amount} recipient={recipient} />
      <Button className="w-full py-4" type="submit">Transfer Money</Button>
    </form>
  )
}
